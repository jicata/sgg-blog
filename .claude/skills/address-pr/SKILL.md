---
name: address-pr
description: Fix the unresolved review threads on a specific open PR and push the fixes. Takes a PR number directly — no PRD lookup, no child enumeration, no classifier. Use when the user says "/address-pr <pr-number>" after a /review-pr pass found issues.
---

# Address PR

Fix the unresolved review threads on a specific PR and push the fixes. The skill does **not** resolve threads — the subsequent `/review-pr` follow-up pass does that once it judges the fixes sufficient.

## Invocation

`/address-pr <pr-number>`

If no PR number is given, ask. Do not guess.

## Process

### Step 1 — Fetch PR and repo context

```bash
gh repo view --json owner,name
gh pr view <pr-number> --json number,title,body,headRefName,baseRefName,state,url,files
```

If `state != "OPEN"`, stop and report — the PR is closed or merged; there is nothing to address.

Parse the PR body for the linked issue (`Fixes #N` / `Closes #N` / `Resolves #N`). Fetch it for context:

```bash
gh issue view <N> --json number,title,body
```

Skim the child issue's Acceptance Criteria — you need them to judge whether a review comment is asking for an in-scope change or scope creep.

### Step 2 — Fetch unresolved review threads

```bash
gh api graphql -f query='
query($owner: String!, $repo: String!, $pr: Int!) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $pr) {
      reviewThreads(first: 100) {
        nodes {
          id
          isResolved
          comments(first: 20) {
            nodes { body path line originalLine author { login } }
          }
        }
      }
    }
  }
}' -f owner=<owner> -f repo=<repo> -F pr=<pr-number>
```

Filter to `isResolved == false`. If there are none, stop and report: "PR #<n> has no unresolved review threads. If it is approved, run `/merge-pr <n>`; otherwise run `/review-pr <n>` for a fresh pass."

Threads authored by `/review-pr` start with `Claude comment 🤖` — prioritize those, but address every unresolved thread regardless of author.

### Step 3 — Check out the branch

```bash
git fetch origin
git checkout <headRefName>
git pull
```

If the branch doesn't exist locally but does on origin: `git checkout -b <headRefName> origin/<headRefName>`.

### Step 4 — Fix each unresolved thread

For each unresolved thread:

1. Read the comment body in full **and** any cited rule source (e.g., `.claude/rules/<file>.md` or `.claude/skills/<file>/SKILL.md`). Understand *why* the reviewer is objecting, not just the literal ask — the literal ask can be wrong even when the concern is valid.
2. Read the current state of the file at the cited path and line.
3. Judge scope: does fixing this concern fall inside the linked issue's Acceptance Criteria? If **yes**, fix it. If **no**, stop and flag the conflict back to the user — they decide whether to expand scope or push back on the reviewer. Do not silently implement out-of-scope changes.
4. Apply the fix using the appropriate implementation lens:
   - Touches `*.cs` or `SvetlinGalovBlog.IntegrationTests` → `.claude/skills/vsa-tdd/SKILL.md`
   - Touches `SvetlinGalovBlog/wwwroot/svetlin-galov-blog/src/**` → `.claude/skills/fe-tdd/SKILL.md`
   - Touches both → both, backend first
5. If a fix reveals a documentation inconsistency, update docs in the same commit per `.claude/rules/documentation-creator.md` (feature README, flow, ADR, ubiquitous language).
6. **Do not resolve the thread yourself.** `/review-pr`'s follow-up pass is the arbiter of whether the fix was sufficient.

### Step 5 — Run the full test suite

- Backend: `dotnet test` at the solution root (if any `*.cs` touched anywhere in the PR)
- Frontend: `cd SvetlinGalovBlog/wwwroot/svetlin-galov-blog && npm test -- --run` (if any `SvetlinGalovBlog/wwwroot/svetlin-galov-blog/src/**` touched)

Both must be green. If pre-existing failures appear unrelated to this PR, stop and report — do not push on a red suite, and do not "fix" unrelated tests to match new behavior.

### Step 6 — Commit and push (batched — one pass only)

Fix **every** unresolved thread from Step 4 before committing. Do not push partial progress — a partial push triggers a `/review-pr` follow-up that runs Axis A + Axis B again on an incomplete state, which is the main cause of 5+ round review loops.

Create **one commit** covering all addressed threads, then **one push**. Default message: `Address review comments on #<child-issue-number>`. Only split into multiple commits if a fix genuinely needs to be isolated for bisection (rare).

```bash
git push
```

Never force-push or rewrite history on a PR under review — reviewers rely on the commit sequence being append-only.

### Step 7 — Report

- PR URL
- Number of unresolved threads addressed (and any you flagged back to the user as out-of-scope)
- Test results (`N passing, 0 failing`)
- Suggest next step: "Re-run `/review-pr <n>` to resolve the addressed threads and get a fresh pass. If it comes back approved with all threads resolved, run `/merge-pr <n>`."

Stop. Do not chain into `/review-pr` or `/merge-pr` yourself.

## Critical Rules

1. **Never resolve review threads yourself.** `/review-pr` is the arbiter. Your job is to fix the code.
2. **Never commit with tests red.** Both backend and frontend suites must be green before you push.
3. **Never silently expand scope.** Out-of-scope review comments get flagged back to the user, not quietly implemented.
4. **Never write implementation without first understanding why the reviewer objected.** The literal ask may be wrong even when the concern is valid — fix the underlying concern.
5. **Never force-push or rewrite history.** Append commits only. Reviewers rely on the commit sequence.
6. **Never touch files unrelated to the cited review threads.** Drive-by improvements get flagged on the next review pass as scope creep.
7. **Never chain into `/review-pr` or `/merge-pr`.** Stop after pushing and hand off — the user drives the next verb.
8. **Never push partial progress.** Fix every unresolved thread, then make one commit and one push. Partial pushes trigger redundant review passes and are the primary cause of multi-round review churn.

## Edge Cases

- **PR is closed or merged** → stop; nothing to do
- **No unresolved threads** → stop; suggest `/merge-pr` (if approved) or `/review-pr` (if not yet reviewed)
- **Thread cites a file that no longer exists** → acknowledge in the commit message and fix the underlying concern wherever the code moved to
- **Fix requires changes in a file not touched by this PR** → acceptable if genuinely required to address the reviewer's concern; not acceptable as a drive-by improvement
- **Branch has diverged from base and needs rebase to apply fixes** → stop and report; rebasing mid-review is a human decision
- **Test suite fails before you change anything** → stop and report; you cannot judge your fixes on a broken baseline
- **A review thread and the acceptance criteria contradict each other** → stop and flag to the user; the user resolves the conflict, you do not
- **Multiple reviewers have left contradictory comments on the same line** → stop and flag to the user; pick-and-choose reviewer judgments are not this skill's job

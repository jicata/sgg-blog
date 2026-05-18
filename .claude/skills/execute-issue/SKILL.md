---
name: execute-issue
description: Pick the next unblocked, unclaimed child issue of a PRD, create the appropriate branches, implement the slice using vsa-tdd for backend and/or fe-tdd for frontend, and open a PR targeted at the PRD's base branch. Use when the user says "/execute-issue <prd-number>" or asks for fresh implementation of a PRD's next work item. For PRs that need review-comment fixes use /address-pr; for PRs that are ready to merge use /merge-pr.
---

# Execute Issue

Pick and implement the next **fresh** work item under a PRD, end-to-end: branch → documentation-first understanding → TDD implementation → push → open PR targeted at the PRD's base branch. Review-feedback fixes and merging are separate skills (`/address-pr`, `/merge-pr`) — this one does not touch existing PRs.

## Invocation

`/execute-issue <prd-number>`

If no PRD number is given, ask the user which PRD to work on. Do not guess.

## Process

### Step 1 — Fetch the PRD and its child issues

```bash
gh issue view <prd-number> --json number,title,body,state,url
gh issue list --state open --limit 200 --json number,title,body,labels,url
```

Filter the second list to children of this PRD — a child is an issue whose body contains `## Parent PRD` followed by a reference to `#<prd-number>`. Child issues use the template from `/prd-to-issues`, so the Parent PRD section and Acceptance Criteria checklist are predictable.

Build a candidate list with `number`, `title`, `url`, and `blockedBy` (parse `Blocked by #N` lines from the body).

### Step 2 — Pick the next eligible child

For each candidate, check whether a PR already exists:

```bash
gh pr list --search "Fixes #<child-number>" --state open --json number,url -q '.[0]'
```

Apply these skip rules in order. Each invocation picks **one** child and runs it to completion.

1. **Child is closed** → skip
2. **Child has any open PR** → skip, and remember the PR URL for the report. This skill does not touch existing PRs — the user runs `/address-pr <pr>` to fix review comments or `/merge-pr <pr>` to merge when approved.
3. **Child is blocked by an unclosed issue** → skip
4. **First candidate satisfying none of the above** → **this is the one**

If no candidate is eligible, report:
- Any children with open PRs (list PR URLs and tell the user to run `/address-pr` or `/merge-pr` against them)
- Any children blocked (with their blockers)
- Otherwise: "PRD looks complete — no open, unclaimed, unblocked children remain."

Then stop.

### Step 3 — Establish branches and rescue state

Derive the base branch name from the PRD title:
- Strip leading `PRD:` (case-insensitive), trim
- Lowercase, replace any run of non-alphanumerics with `-`, collapse doubles, strip leading/trailing `-`
- Cap at 40 chars
- Prepend `prd-<prd-number>-`

Example: `PRD: Add Inventory Forecasting for Retailers` (Issue #10) → `prd-10-add-inventory-forecasting-for-retaile`

Derive the feature branch name from the child issue: `<child-number>-<slug>`, slug derived the same way as the PRD slug, capped at 40 chars.

A previous run may have crashed, leaving uncommitted changes on the wrong branch. Rescue them:

```bash
set -e # Halt immediately if any command fails

# 1. Safely stash any uncommitted work left by a previous interrupted run
git stash push -m "rescue-state" || true

# 2. Ensure the base branch exists and is up to date
git fetch origin

if git show-ref --verify --quiet refs/heads/<base-branch>; then
  git checkout <base-branch>
  git pull origin <base-branch> || true
elif git show-ref --verify --quiet refs/remotes/origin/<base-branch>; then
  git checkout <base-branch>
  git pull
else
  git checkout master
  git pull
  git checkout -b <base-branch>
  git push -u origin <base-branch>
fi

# 3. Check if the feature branch already exists locally or remotely
if git show-ref --verify --quiet refs/heads/<child-number>-<slug> || git show-ref --verify --quiet refs/remotes/origin/<child-number>-<slug>; then
  git checkout <child-number>-<slug>
  git pull origin <child-number>-<slug> || true
else
  git checkout -b <child-number>-<slug>
fi

# 4. Pop the rescued state onto the correct feature branch (if we stashed anything)
git stash pop || true
```

### Step 3.5 — Assess Resumed State

If you inherited uncommitted changes, existing commits on this branch, or merge conflicts from the stash pop, you are resuming an interrupted session. Before writing new code:
1. **Resolve Conflicts:** If `git stash pop` resulted in merge conflicts (`<<<<<<< HEAD`), use your coding tools to resolve them manually. If you cannot resolve them and get the tests to pass, halt and report to the user.
2. **Assess State:** Run `git status` and `git diff` to see exactly what the previous run changed.
3. **Run Tests:** Run the test suites (`dotnet test` and `npm test`) to see if the current state is compiling and what tests are currently failing.
4. **Map to ACs:** Compare the existing code against the Acceptance Criteria to determine what is already done and what is missing.
5. **Resume:** Pick up the TDD loop (Red/Green/Refactor) from exactly where the previous run left off.

### Step 4 — Understand before you code (documentation-first)

**Mandatory** per `.claude/rules/documentation-first-understanding.md`. Do not skip this step even if the issue looks simple.

1. Read `docs/UBIQUITOUS_LANGUAGE.md` — align terminology before inventing synonyms
2. Read the parent PRD in full (Problem Statement, Solution, User Stories, Out of Scope, Implementation Decisions, Testing Decisions)
3. Read the child issue in full (What to build, Acceptance Criteria, User stories addressed)
4. Navigate the docs relevant to this slice:
   - Bottom-up for feature-specific work: start at `Features/{Name}/README.md` if it exists, walk up to flows → architecture
   - Top-down for broad/architectural slices: start at `docs/overview.md` and `docs/architecture.md`, walk down to specific flows and features
5. Check `docs/adr/` for any ADR whose Status is not Superseded/Deprecated and that touches this area
6. Identify documentation gaps as you go — you will need to update them in the same PR

**CRITICAL SCOPE BOUNDARY:** You are reading the parent PRD for *context only*. You must **STRICTLY RESTRICT** your code changes to the Acceptance Criteria of the **single child issue** you selected in Step 2. Do NOT implement future slices, delete out-of-scope files, or build other parts of the PRD.

### Step 5 — Choose the execution lens

Inspect the Acceptance Criteria and the files the slice will touch:

- **Backend-only** (touches `*.cs`, tests in `SvetlinGalovBlog.IntegrationTests`) → follow `.claude/skills/vsa-tdd/SKILL.md` in full. Read every file it references.
- **Frontend-only** (touches `SvetlinGalovBlog/wwwroot/svetlin-galov-blog/src/**`) → follow `.claude/skills/fe-tdd/SKILL.md` in full.
- **Full-stack** (both — and per `/prd-to-issues`'s tracer-bullet rule, most slices are) → follow **both**. Read every file both skills reference before writing a line of code. Backend first (schema/API), then frontend (consume the new API), then integration.

These skills are the authoritative source for how code is structured and how tests are written. They include TDD's red-green-refactor loop — follow it. Do not write implementation before a failing test.

### Step 5.5 — State Your Plan (Anti-Scope-Creep)

Before writing any code, output a brief plan in your internal thought process or to the user stating:
1. The exact branch you are on.
2. The single child issue number you are implementing.
3. The exact Acceptance Criteria you are restricting yourself to.
If your plan includes anything outside the child issue's Acceptance Criteria, STOP and revise your plan.

### Step 6 — Implement the slice

1. **Red**: write a failing test that expresses one Acceptance Criterion
2. **Green**: minimum code to make it pass
3. **Refactor**: improve structure without changing behavior
4. Repeat until every Acceptance Criterion has a passing test
5. Ensure **all** tests pass, not just new ones:
   - Backend: `dotnet test` at the solution root
   - Frontend: `cd frontend && npm test -- --run`
6. Update documentation per `.claude/rules/documentation-creator.md`:
   - Feature README (`Features/{Name}/README.md`) for backend slices — create if this is a new feature
   - Flows (`docs/flows/*.md`) if the slice changes orchestration
   - ADRs (`docs/adr/*.md`) for architectural decisions — **before writing a new ADR**, read [`docs/adr/README.md`](../../docs/adr/README.md) for the Worked Example (canonical header per status flavor) and Common Mistakes to Avoid block. Apply the ADR gate from `.claude/rules/documentation-creator.md` §6 (hard-to-reverse, surprising, real trade-off — all three required). `Governs:` field is mandatory per ADR 053.
   - Ubiquitous language (`docs/UBIQUITOUS_LANGUAGE.md`) for new domain terms
   - Roadmap (`docs/roadmap.md`) for progress tracking
   - If unsure what to update, invoke `/enforce-documentation`
7. Commit in logical units. Descriptive messages — match the repo's existing style (`Add ...`, `Update ...`, `Fix ...`, no prefix tags).

### Step 7 — Push and open the PR

```bash
git push -u origin <child-number>-<slug>
```

Check if a PR already exists (in case a previous run pushed but crashed before reporting). If not, create the PR **targeted at the base branch, not master**:

```bash
if ! gh pr view --json url >/dev/null 2>&1; then
  gh pr create \
    --base <base-branch> \
    --head <child-number>-<slug> \
    --title "<child-issue-title>" \
    --body "$(cat <<'EOF'
Fixes #<child-number>

## Summary
<1–3 bullets describing what was built>

## Acceptance criteria
- [x] Criterion 1
- [x] Criterion 2
- [x] Criterion 3

## Test plan
- [x] Backend: `dotnet test` (if touched)
- [x] Frontend: `npm test -- --run` (if touched)
- [x] Manual verification notes, if any
EOF
)"
else
  echo "PR already exists."
fi
```

The `Fixes #<child-number>` line is load-bearing — `/merge-pr` parses it to explicitly close the linked issue (GitHub's keyword auto-close does **not** fire on PRs merging into a base branch, only into the default branch).

### Step 8 — Hand off and report

Output a concise summary in chat:
- Link to the PR
- Which skill lens(es) you applied (`vsa-tdd`, `fe-tdd`, or both)
- Test results (`N passing, 0 failing`)
- Any documentation updates made
- Any ambiguity you flagged back to the user instead of deciding unilaterally

Then stop. Next step is for the user:
1. `/review-pr <n>` against the new PR
2. If the review finds issues → `/address-pr <n>`, then `/review-pr <n>` again
3. Once approved with all threads resolved → `/merge-pr <n>`
4. Re-invoke `/execute-issue <prd>` to pick up the next child

Do not attempt to review, address, or merge your own work.

## Critical Rules

1. **Never target master with the PR.** Always target the PRD's base branch. That's the whole point of the base-branch-per-PRD structure.
2. **Never skip documentation-first.** Even for "simple" slices. Terminology mistakes are expensive and early-hour speedups create late-hour rewrites.
3. **Never write implementation before a failing test.** TDD is load-bearing for trusting AFK agents — without the red step, there is no evidence the test was ever valid.
4. **Never touch an existing PR.** If a child has an open PR, skip it and tell the user to use `/address-pr` or `/merge-pr`. This skill is for fresh implementation only.
5. **Never commit with the full test suite failing.** Both backend and frontend suites must be green before you push.
6. **Never invent acceptance criteria.** If the issue is ambiguous, flag it back to the user; do not guess and build something.
7. **Keep the slice tracer-bullet tight.** Do not add unrelated improvements, refactors, or "while I'm here" cleanups. Scope creep gets flagged by `/review-pr` and wastes everyone's time.
8. **Update docs in the same commits as the code.** Per `documentation-creator.md`, living documents (flows, feature READMEs) must move in lockstep with code changes.
9. **Never self-review.** This skill does not spawn review subagents and does not approve its own PRs. `/review-pr` is a separate step the user runs manually.
10. **Never exceed the child issue's scope.** The PRD is your map, but the child issue is your strict boundary. Do not modify files, delete pages, or update domain language for features outside your specific Acceptance Criteria.
11. **Halt on Git Failures.** If branch creation, checkout, or pulling fails unexpectedly, you MUST halt and report the error to the user. Do not proceed to write code on the wrong branch.

## Edge Cases

- **PRD is itself closed** → report and stop; ask user if they want to work on a different PRD
- **No child issues exist yet** → report; suggest running `/prd-to-issues` first
- **All children are blocked in a cycle** → report the cycle; stop
- **All children have open PRs** → report each PR URL and tell the user which verb to run next (`/address-pr` or `/merge-pr`)
- **Base branch exists but is behind master with no conflicts** → fast-forward it before branching (push if you have to)
- **Base branch exists but has diverged from master in a way that requires a merge** → stop and report; do not auto-merge
- **Feature branch already exists but no PR** → resume on it; investigate what's there before overwriting
- **Child issue has no Acceptance Criteria section** → flag as a PRD process failure (the `/prd-to-issues` template requires it); review against user stories instead and note the gap in the PR body
- **Tests fail after your changes that were passing before** → you broke something outside the slice; do not "fix" by updating the failing test to match your new behavior — investigate and fix the regression, or report it if it's outside the slice's scope
- **Documentation update would require major rewrites beyond this slice** → do the minimum needed for this slice, open a separate issue for the larger doc overhaul, reference it in the PR body

---
name: afk-merge-pr
description: Autonomous-mode variant of /merge-pr. Verifies merge-readiness, squash-merges, deletes the branch, closes linked issues, and emits a structured JSON return for the orchestrator. Supports a forced-merge flag (--force) for orchestrators after concession has been applied, and a single-issue mode flag (--single) for PRs merging directly into master via /ship-issue. Invoked by /ship-feature (PRD mode) or /ship-issue (--single mode). Do not invoke directly from the CLI; use /merge-pr for human-driven flow.
---

# AFK Merge PR

Autonomous-mode fork of `/merge-pr`. Same merge-and-close logic with three structural changes:

1. **Structured JSON return** for the orchestrator
2. **Forced-merge mode** (`--force` flag) for the orchestrator flow when blocker threads have been conceded by `/afk-concede-thread` and a 🚨 PR comment is posted before merge
3. **Single-issue mode** (`--single` flag) for PRs targeting master directly (light-flow `/ship-issue`), bypassing the PRD-base-branch structural guard

## Invocation

`/afk-merge-pr <pr-number> [--single] [--force <cleanup-issue-number>] [--auto]`

If no PR number, return `{"result": "missing_pr"}` and stop.

- `--single`: target branch is expected to be `master` instead of `prd-*`. Used by `/ship-issue`.
- `--force`: skips review-gate and unresolved-threads gates. Used by both orchestrators after concession. Requires the cleanup-issue number for the pre-merge 🚨 PR comment.
- `--auto`: invoke GitHub auto-merge (`gh pr merge --auto --squash --delete-branch`) instead of a synchronous merge. Used by `/ship-feature --parallel <N>` so GitHub's merge queue linearizes candidates without blocking the orchestrator. The PR is enqueued; the actual merge happens when required checks pass against the latest base tip. Return `{"result": "merge_queued", "pr_number": <n>, "queued_at": "<iso>"}` immediately after queueing, without waiting for the merge to complete. The orchestrator polls `mergedAt` separately. Skip Step 6 (close linked issues) in `--auto` mode — close-on-merge runs in a follow-up tick once the orchestrator observes the merge.

Flags can combine: `--single --force <cleanup>` is valid (force-merge of a single-issue PR after round-7 concession). `--auto --force <cleanup>` is valid (force-enqueue after concession). `--auto --single` is invalid (`/ship-issue` is sequential; reject the combination).

## Step 0 — Orchestrated-mode preamble

### 0a. Git state normalization

```bash
git status --porcelain
```

Dirty foreign work → emit and stop:
```json
{"result": "dirty_tree_foreign", "details": "..."}
```

### 0b. Scratch dir cleanup

```bash
mkdir -p tmp/afk
find tmp/afk/ -type f -mmin +30 -delete 2>/dev/null || true
```

## Step 1 — Fetch PR state

```bash
gh repo view --json owner,name
gh api graphql -f query='
query($owner: String!, $repo: String!, $pr: Int!) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $pr) {
      number
      title
      body
      url
      state
      headRefName
      baseRefName
      reviewDecision
      reviewThreads(first: 100) { nodes { isResolved } }
    }
  }
}' -f owner=<owner> -f repo=<repo> -F pr=<pr-number>
```

## Step 2 — Verify merge-ready

If `state != "OPEN"`:
```json
{"result": "pr_not_open", "pr_state": "..."}
```

Standard merge gate (skip if `--force`):
- **Review gate**: `reviewDecision == "APPROVED"`, **OR** `reviewDecision == null` AND at least one review body starts with `Claude comment 🤖` AND all `reviewThreads` are resolved
- **`reviewDecision == "CHANGES_REQUESTED"`** → block:
  ```json
  {"result": "changes_requested", "pr_url": "..."}
  ```
- **All reviewThreads.isResolved == true** — if not:
  ```json
  {"result": "unresolved_threads", "unresolved_count": <n>}
  ```
- **Base branch matches mode**:
  - PRD mode (default): `baseRefName` must start with `prd-`. If not:
    ```json
    {"result": "structural_bug_master_target"}
    ```
  - `--single` mode: `baseRefName` must equal `master`. If not:
    ```json
    {"result": "structural_bug_wrong_base", "expected": "master", "actual": "<baseRefName>"}
    ```

**Force mode**: skip the review gate and unresolved-threads gate. Still require `state == "OPEN"` and a base-branch match per mode. The orchestrator guarantees concessions have been applied before calling with `--force`.

## Step 3 — Identify linked issue(s)

Parse PR body for `Fixes #N` / `Closes #N` / `Resolves #N`. Collect all matched issue numbers.

If none, note `linked_issues_missing: true` in return.

## Step 4 — Force-mode pre-merge comment (only when --force)

Before merging, post a comment on the PR linking to the cleanup issue:

```bash
gh pr comment <pr-number> --body "Claude comment 🤖

🚨 **Merged with residual concerns.**

This PR is being merged via the autonomous orchestrator (/ship-feature or /ship-issue) after concession of remaining blocker threads. See cleanup issue #<cleanup-issue-number> for the list of deferred concerns to address before next release."
```

## Step 5 — Squash-merge and delete the branch

### Synchronous merge (default)

```bash
gh pr merge <pr-number> --squash --delete-branch
gh pr view <pr-number> --json state,mergedAt,mergeCommit
```

If merge fails:
- Conflict with base branch:
  ```json
  {"result": "merge_conflict", "pr_url": "..."}
  ```
- Branch protection (required check pending/failing or required reviewer missing):
  ```json
  {"result": "branch_protection", "details": "..."}
  ```

Do not attempt to bypass branch protection. Do not retry the merge with different flags.

### Auto-merge via merge queue (`--auto` only)

```bash
gh pr merge <pr-number> --auto --squash --delete-branch
```

This enqueues the PR into GitHub's merge queue on the target branch. GitHub waits for required checks against the latest base tip, rebases siblings as needed, and merges in queue order. The command returns immediately on a successful enqueue.

On enqueue success, skip Step 6 entirely and emit:
```json
{"result": "merge_queued", "pr_number": <n>, "queued_at": "<iso8601-now>", "target_branch": "<base>"}
```

On enqueue failure:
- Required check pending/failing such that `--auto` refuses to schedule → `{"result": "branch_protection", "details": "..."}`
- Merge queue not enabled on target branch → `{"result": "merge_queue_disabled", "target_branch": "<base>"}` (the orchestrator's Step 0c precheck should prevent this; reaching it is a bug)
- Mergeability `CONFLICTING` → `{"result": "merge_conflict", "pr_url": "..."}` (same as sync mode)

## Step 6 — Close linked issues

For each linked issue:

```bash
gh issue view <issue-number> --json state -q '.state'
```

If `OPEN`:
```bash
gh issue close <issue-number> \
  --reason completed \
  --comment "Completed via PR #<pr-number> (<pr-url>), squash-merged into \`<baseRefName>\`."
```

If close fails, retry once. On second failure, log to return as `issue_close_failed: [<issue-number>]` but do not roll back the merge.

## Step 7 — Emit structured return

```json
{
  "skill": "afk-merge-pr",
  "mode": "prd" | "single",
  "result": "merged" | "merge_queued" | "merge_conflict" | "merge_queue_disabled" | "branch_protection" | "changes_requested" | "unresolved_threads" | "structural_bug_master_target" | "structural_bug_wrong_base" | "pr_not_open" | "dirty_tree_foreign" | "missing_pr",
  "auto_mode": <bool>,
  "queued_at": "<iso>" | null,
  "pr_number": <n>,
  "pr_url": "...",
  "merge_commit": "<sha>" | null,
  "merged_at": "<iso>" | null,
  "linked_issues_closed": [<n>...],
  "linked_issues_missing": <bool>,
  "issue_close_failed": [<n>...],
  "force_mode": <bool>,
  "single_mode": <bool>,
  "cleanup_issue_referenced": <n> | null,
  "base_branch": "...",
  "notes": "..."
}
```

## Critical Rules

1. **Never merge without a passing review gate** unless `--force` was passed.
2. **Never merge with unresolved review threads** unless `--force` was passed.
3. **Never bypass branch protection.**
4. **Never merge a PR targeting master in PRD mode** — that's a structural bug from upstream. In `--single` mode, targeting master is required.
5. **Always close linked issues after merge** — that is the load-bearing reason this skill exists over a raw `gh pr merge`.
6. **Never reopen a closed issue to "re-close it cleanly".**
7. **`--force` requires a cleanup-issue number** and posts the 🚨 PR comment before merge. Never `--force` without the comment.
8. **Always emit the structured JSON return.**

## Edge Cases

- **PR already merged** → emit `result: merged`, populate `merge_commit` from existing state, still close any open linked issues
- **Merge conflict with base** → return `merge_conflict`; orchestrator routes back to `/afk-address-pr` for rebase
- **PR closes multiple issues** → close all, each with its own comment
- **Linked issue belongs to different repo** → skip, note in return
- **Squash succeeded but `--delete-branch` failed** → emit `merged` with note

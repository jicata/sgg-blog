---
name: ship-issue
description: Top-level autonomous orchestrator that ships a single bug or enhancement end-to-end. Dispatches afk-coder to implement and address feedback, dispatches afk-reviewer for independent review, applies per-thread concession after 3 rejects (Axis-B only), forces merge after 7 rounds with all-blocker concession. Light-flow counterpart to /ship-feature — one issue, one PR off master, no PRD scaffolding. Never halts; lazy-creates a cleanup issue only if anything is conceded or force-merged. RUNS ON SONNET ONLY. Use when the user runs /ship-issue <issue-number> on a single bug/enhancement issue (typically authored by /log-issue).
---

# Ship Issue

Autonomous orchestrator for shipping a single bug or enhancement end-to-end. Light-flow parallel to `/ship-feature`. The state machine is the same coder↔reviewer loop with the same 3-reject / 7-round bounds, scaled down to a single issue / single PR / direct-to-master.

`/ship-feature` ships PRDs (many issues, many PRs, a base branch, a finalize step). `/ship-issue` ships single issues (one PR off master, no base branch, no finalize).

## Invocation

`/ship-issue <issue-number>`

`/ship-issue <issue-number> --dry-run` — walk the state machine and print planned actions without dispatching subagents or mutating GitHub.

If no issue number, ask. Do not guess.

## Critical principles (read first)

1. **The PR is never abandoned.** It merges clean, with conceded threads, or via forced merge after concession. Residue is logged to a lazily-created cleanup issue.
2. **Never halt for human input.** Every unresolvable condition becomes a cleanup-issue entry; the loop continues to the next state.
3. **Independent review is load-bearing.** Coder and Reviewer are separate `Agent` dispatches. Never collapsed.
4. **GitHub is the durable state.** No local state file. Resumability via reconciliation on re-invocation.
5. **Sonnet end-to-end.** Both the orchestrator and the Coder/Reviewer subagents run on Sonnet. Opus is forbidden in this flow.
6. **The user's main repo checkout is never touched.** All implementation, branching, pushing, and review happens inside a dedicated sibling worktree at `../<repo>-ship-<issue-number>`. The user can keep working on `master` (or any other branch) in their main checkout for the duration of the run.

## Step 0a — Model preflight (fail-fast)

Identical to `/ship-feature` Step 0a. Must run on Sonnet. If the active model is not `claude-sonnet-*`, stop with:

> /ship-issue must run on Sonnet (cost + architecture decision). Active model is `<X>`. Run `/model sonnet`, then re-invoke `/ship-issue <issue-number>`.

## Step 0b — Permission preflight (fail-fast)

Read `.claude/settings.local.json`. Required entries (or broader equivalents) — identical set to `/ship-feature`:

- `Bash(gh:*)`
- `Bash(git status:*)`, `Bash(git checkout:*)`, `Bash(git fetch:*)`, `Bash(git pull:*)`, `Bash(git push:*)`, `Bash(git merge:*)`, `Bash(git rebase:*)`, `Bash(git worktree:*)`, `Bash(git rev-parse:*)`
- `Bash(dotnet test:*)`, `Bash(npm test:*)`
- `Read(./**)`, `Write(./**)`, `Edit(./**)`

If any are missing, stop and tell the user to run `/update-config`.

## Step 1 — Validate issue and reconcile state

```bash
gh issue view <issue-number> --json number,title,body,state,url,labels
```

- `state == "CLOSED"` → stop; ask the user if they meant a different issue.
- Body has no `## Acceptance Criteria` section → log `[ac-missing]` for the upcoming cleanup issue (deferred until lazy-create) and continue. Coder will treat user stories or other prose as de-facto spec.
- Body contains `## Parent PRD` → stop with:
  > Issue #\<n\> is a PRD child. Use `/ship-feature <prd-number>` instead — single-issue flow is for standalone bugs and enhancements.

### Reconcile from GitHub

```bash
gh pr list --search "Fixes #<issue-number>" --state open --json number,title,headRefName,url --limit 5
gh pr list --search "Fixes #<issue-number>" --state merged --json number,title,headRefName,url --limit 5
gh issue list --label ship-cleanup --search "Issue #<issue-number> in:title" --json number,url --limit 1
```

Cases:
- **Merged PR exists** for this issue → stop; report; suggest the user re-open the issue if more work is needed.
- **Open PR exists** → adopt it; resume at REVIEW with `round_count = max(existing review rounds, 1)`.
- **No PR** → enter the loop fresh at NEXT (will dispatch coder to create one).

### Worktree setup (isolation from the user's main checkout)

`/ship-issue` runs the entire implementation flow inside a dedicated git worktree at a sibling path so the user's main repo working copy is never touched. The user's main repo may be on any branch with any uncommitted state — this skill does not care.

1. Compute the worktree path. It is a sibling of the repo root named `<repo-basename>-ship-<issue-number>`:
   ```bash
   REPO_ROOT="$(git rev-parse --show-toplevel)"
   REPO_BASE="$(basename "$REPO_ROOT")"
   WORKTREE_PATH="$(dirname "$REPO_ROOT")/${REPO_BASE}-ship-<issue-number>"
   ```
2. If a worktree already exists at that path (prior crashed run, or active resume), **reuse it**. Verify with `git worktree list --porcelain` matching on the path. Do not delete or recreate — the resumption logic relies on GitHub state as authoritative; the worktree just holds the local checkout.
3. Otherwise create it detached at `origin/master` (detached HEAD so this worktree never claims the `master` branch — the user's main repo keeps that):
   ```bash
   git fetch origin
   git worktree prune
   git worktree add --detach "$WORKTREE_PATH" origin/master
   ```
4. **All subsequent Agent dispatches and any local git/gh operations the orchestrator runs must use `$WORKTREE_PATH` as their working directory.** The orchestrator passes the path into each Agent prompt; agents `cd` into it before any tool use.

The classic "dirty tree → stop" check is intentionally removed: the user's main repo dirtiness is no longer load-bearing because we are not touching it. The afk-* subskills retain their own `dirty_tree_foreign` guard which will fire on the worktree itself if it is unexpectedly dirty.

## Step 2 — Main loop

Track in working memory (no state file):
- `issue_number`, `pr_number` (or `null` until coder creates), `cleanup_issue_number` (or `null` until lazy-created)
- `round_count`, `thread_reject_counts: {<thread_id>: <count>}`
- `outcome` enum: `clean` | `axis_b_residue` | `axis_a_residue` | `force_merged` | `unmergeable`

State machine:

### NEXT

If `pr_number` is set (resuming from reconciliation) → GO TO REVIEW.

Otherwise dispatch `afk-coder` to run `/afk-execute-issue <issue-number> --single`:

```
Agent(
  subagent_type: "afk-coder",      // or "general-purpose" with prompt prefix
  model: "sonnet",                  // MANDATORY
  description: "Implement issue #<n>",
  prompt: "Your working directory is `<WORKTREE_PATH>` — a dedicated git worktree, not the user's main repo checkout. Before any tool use, `cd <WORKTREE_PATH>` so all subsequent Bash, file edits, and git operations stay inside the worktree. Then run /afk-execute-issue <issue-number> --single. Branch directly off origin/master (no PRD base branch). Implement via TDD. Open a PR targeting master with 'Closes #<issue-number>'. Emit your structured JSON return."
)
```

Parse the return:
- `result: pr_opened` → set `pr_number`, `round_count = 1`, GO TO REVIEW
- `result: ac_missing` → cleanup helper logs entry; coder proceeds; expect `pr_opened` on a follow-up turn or in the same turn
- `result: regression` → cleanup helper logs entry; coder may still have opened a PR — check `pr_number` in return; if present GO TO REVIEW, else GO TO ABORT
- `result: git_failure` / `push_failure` → cleanup entry; one retry on a fresh fetch; on second failure mark `outcome = unmergeable`, GO TO DONE
- `result: dirty_tree_foreign` → bug (Step 1 normalized state); halt with diagnostic
- `result: issue_closed` → stop; report
- `result: missing_issue` → halt; bug

### REVIEW

Dispatch `afk-reviewer` to run `/afk-review-pr <pr_number>`. Persist this Reviewer subagent across rounds on the same PR.

```
Agent(
  subagent_type: "afk-reviewer",
  model: "sonnet",
  description: "Review PR #<n> round <r>",
  prompt: "Your working directory is `<WORKTREE_PATH>` — the dedicated worktree for this ship-issue run. Before any tool use, `cd <WORKTREE_PATH>`. Then run /afk-review-pr <pr-number>. <If r > 1: This is round <r>; you have prior threads — arbitrate Coder pushback replies.> Emit your structured JSON return."
)
```

Parse the return:
- `verdict: approve` AND `axis_a_blockers == 0` AND `axis_b_blockers == 0` AND no unresolved threads → GO TO MERGE
- Otherwise → GO TO ADDRESS

For each thread in `thread_outcomes` with state `still_open` or `pushback_rejected`, increment `reject_count` for that thread.

### ADDRESS

Before dispatching Coder:

1. **Per-thread reject limit (Axis-B only).** For each thread with `reject_count >= 3` AND `axis == "B"`:
   - Dispatch `/afk-concede-thread <pr> <thread-id> "rejected 3 rounds"`
   - On success, mark the thread resolved in working memory
   - On `result: refused_axis_a_no_force`, leave thread (normal mode never auto-concedes Axis-A)

2. **Round limit.** If `round_count >= 7`:
   - Force-concede every remaining unresolved thread:
     - Axis-B: `/afk-concede-thread <pr> <id> "round limit reached"`
     - Axis-A: `/afk-concede-thread <pr> <id> "round limit reached" --force-axis-a`
   - Set `outcome = force_merged`, GO TO MERGE with `--force`

3. Otherwise dispatch `afk-coder` to run `/afk-address-pr <pr_number>`:

   ```
   Agent(
     subagent_type: "afk-coder",
     model: "sonnet",
     description: "Address PR #<n> round <r>",
     prompt: "Your working directory is `<WORKTREE_PATH>` — the dedicated worktree for this ship-issue run. Before any tool use, `cd <WORKTREE_PATH>`. Then run /afk-address-pr <pr-number>. This is round <r>. Address every unresolved thread; pushback-reply on out-of-scope concerns. Emit your structured JSON return."
   )
   ```

Parse the return:
- `result: pushed` → increment `round_count`, GO TO REVIEW
- `result: no_unresolved_threads` → GO TO REVIEW
- `result: regression` → cleanup entry; force-concede remaining blocker threads; GO TO MERGE with `--force`
- `result: rebase_conflict` → cleanup entry; one retry after `git fetch`; on second `rebase_conflict`, force-concede + force-merge OR mark `outcome = unmergeable` if push still fails
- `result: push_failure` → mark `outcome = unmergeable`, GO TO DONE
- `result: dirty_tree_foreign` → halt; bug

### MERGE

If forced:
```
/afk-merge-pr <pr_number> --single --force <cleanup-issue-number>
```

Otherwise:
```
/afk-merge-pr <pr_number> --single
```

The `--single` flag tells `/afk-merge-pr` the PR targeting master is intentional (light-flow), so the `structural_bug_master_target` guard does not trip.

Parse the return:
- `result: merged` → set `outcome = clean` (or `axis_b_residue` / `axis_a_residue` / `force_merged` if concessions were applied), GO TO DONE
- `result: merge_conflict` → re-dispatch Coder for `/afk-address-pr` to rebase; one retry; on persistent conflict, mark `outcome = unmergeable`
- `result: branch_protection` → cleanup entry; mark `outcome = unmergeable`, GO TO DONE
- `result: pr_not_open` → reconcile (may already be merged); if merged, set `outcome = clean`, GO TO DONE
- `result: changes_requested` / `unresolved_threads` → orchestrator bug; halt with diagnostic

### DONE

1. Worktree cleanup:
   - If `outcome` is `clean` / `axis_b_residue` / `axis_a_residue` / `force_merged` → remove the worktree, since the PR is merged and no local state needs preserving:
     ```bash
     git worktree remove --force "$WORKTREE_PATH"
     git worktree prune
     ```
   - If `outcome` is `unmergeable` → **leave the worktree in place** so the user can inspect local state. Mention the path in the final report.
2. Generate the final report (Step 3).

### ABORT

Used only when Step NEXT fails fatally before a PR exists. Mark `outcome = unmergeable`, GO TO DONE.

## Step 3 — Final report

Print to chat **and** post a comment on the issue:

```bash
gh issue comment <issue-number> --body "$(cat <<EOF
🤖 /ship-issue autonomous run complete.

## Outcome
<one of: clean-merge | merged-with-axis-b-residue | merged-with-axis-a-residue 🚨 | force-merged | unmergeable>

## PR
#<pr-number> (<state>)

## Cleanup issue
<link, or "none">

## Rounds
<round_count>

## Worktree
<"removed" on clean/residue/force_merged outcomes, or the absolute path on `unmergeable` so the user can inspect>
EOF
)"
```

Chat output mirrors this.

## Cleanup issue (lazy-create on residue only)

Unlike `/ship-feature`, this skill creates a cleanup issue **only if at least one of**:
- A thread was conceded (Axis-B auto or Axis-A forced)
- A force-merge occurred
- A regression was logged
- AC was missing
- `unmergeable` outcome

If none of those, **no cleanup issue is created** and the final report notes `Cleanup issue: none`.

When the helper does fire, mirror `/ship-feature`'s `upsert_cleanup_issue` with issue-scoped titling:

```bash
gh issue list --label ship-cleanup --search "Issue #<issue-number> in:title" --json number,url --limit 1
```

Title format: `[ship-cleanup] Issue #<issue-number> — residual concerns`

Body and entry format identical to `/ship-feature`'s template (see `.claude/skills/ship-feature/examples/cleanup-issue-template.md`), with `PRD #<n>` references replaced by `Issue #<n>`.

## Subagent dispatch — implementation

Identical contract to `/ship-feature`. Every `Agent` dispatch MUST pass `model: "sonnet"` explicitly. Prefer `subagent_type: "afk-coder"` / `"afk-reviewer"`; fall back to `"general-purpose"` with a prompt prefix referencing the agent definition file if the harness doesn't have named subagent types.

## Critical Rules

1. **Never halt for human input.** Every condition is auto-resolvable, force-concedable, or a cleanup-issue entry.
2. **Never abandon the PR.** Every PR merges (clean, conceded, or forced) unless push itself is impossible (`unmergeable`).
3. **Never auto-concede Axis-A** in normal mode. Only the forced-merge path (round 7) uses `--force-axis-a`.
4. **Never create a cleanup issue speculatively.** Lazy-create on first residue only.
5. **Never bypass branch protection.**
6. **Always run permission and model preflight (Step 0a/0b) before anything else.**
7. **Always reconcile from GitHub on re-invocation.** An open PR for the issue is adopted, not duplicated.
8. **Always emit final report to chat AND issue comment.**
9. **Coder and Reviewer must be separate `Agent` dispatches.** Independence is the design.
10. **Sonnet end-to-end.** Both orchestrator and subagents. Every dispatch passes `model: "sonnet"` explicitly.
11. **Never adopt a PR for a different issue.** Reconciliation searches by `Fixes #<issue-number>`; if the only open PR doesn't match, treat as no PR.
12. **Refuse PRD children.** Issues with `## Parent PRD` are explicitly redirected to `/ship-feature`.

## Edge Cases

- **Issue already has a merged PR** → stop; report; user must re-open or file a new issue.
- **Issue is a PRD child** → refuse; redirect to `/ship-feature`.
- **Coder opens PR targeting the wrong branch** → coder bug (the `--single` flag in `/afk-execute-issue` is load-bearing); abort with diagnostic.
- **Round 7 hit with Axis-A blockers still open** → force-concede with `--force-axis-a`, force-merge with cleanup linkage. The 🚨 marker on the cleanup entry makes Axis-A residue visible.
- **Master branch protection blocks the merge** → cleanup entry, `outcome = unmergeable`, leave the PR open for human action.
- **`--dry-run`** → walk the state machine and print intended actions; no `Agent` dispatches, no `gh` mutations, no `git` mutations (including no `git worktree add` / `git worktree remove`), no test runs. Print the worktree path that *would* be used.
- **Worktree already exists at the target path** → reuse it; do not delete or recreate. GitHub state remains the source of truth for resumption.
- **Worktree creation fails** (e.g., path occupied by a non-worktree directory) → log a cleanup-issue entry, mark `outcome = unmergeable`, stop. The user can manually `git worktree remove` or rename the colliding directory and re-invoke.
- **`unmergeable` outcome** → the worktree is intentionally left in place so the user can inspect/recover local state. The final report includes the path. The user removes it manually with `git worktree remove --force <path> && git worktree prune` once done.
- **Issue body references a missing slice or non-existent feature** → coder will detect this during Explore; `result: regression` or `ac_missing` will be logged; orchestrator continues.

## Relationship to /ship-feature

| Aspect | `/ship-feature` | `/ship-issue` |
|---|---|---|
| Input | PRD issue with children | Single bug/enhancement issue |
| Branching | Per-PRD base branch | Direct off master |
| Loop | NEXT_CHILD → REVIEW → ADDRESS → MERGE_CHILD → FINALIZE_PRD | NEXT → REVIEW → ADDRESS → MERGE → DONE |
| Cleanup issue | Always created lazily | Created lazily **only on residue** |
| Finalization | PRD branch → master PR | None — PR merges into master directly |
| Bounds | 3 rejects / 7 rounds | Same |
| Agents | `afk-coder` + `afk-reviewer` | Same |
| Authoring | `/write-a-prd` → `/prd-to-issues` | `/log-issue` |

The two flows share `afk-coder`, `afk-reviewer`, `afk-concede-thread`, `afk-review-pr`, `afk-address-pr`, and (with the `--single` flag) `afk-execute-issue` and `afk-merge-pr`. The ceremony cost difference lives entirely in the orchestrator.

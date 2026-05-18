# Example: Single-issue ship with Axis-B concession

Issue #355 is a bug. The fix is straightforward but the reviewer flags an Axis-B (standards) concern the coder pushes back on three times. Per the 3-reject rule, the orchestrator concedes the thread and merges. A cleanup issue is lazy-created on first concession.

## Setup

```
Issue #355: Frontier reset duplicates categories
  labels: bug
  body:
    ## Problem
    Actual: re-running frontier reset for a retailer creates duplicate
    Category rows instead of updating the existing ones.
    Expected: atomic upsert.
    Repro: reset retailer X twice → row count doubles.
    ## Root Cause Analysis
    CategoryRepository.UpsertAll uses Insert + Update path that's not
    transactional; on second run the Insert branch fires for already-present rows.
    ## TDD Fix Plan
    1. RED: UpsertAll on existing retailer leaves count unchanged
       GREEN: wrap in transaction; use INSERT ... ON CONFLICT UPDATE
    ## Acceptance Criteria
    - [ ] UpsertAll is idempotent for repeated calls
    - [ ] No duplicate Category rows after two reset runs
```

## Run

```
/ship-issue 355
```

### Iteration

- **NEXT**: `/afk-execute-issue 355 --single`
  - Branches off master, implements transactional upsert via `vsa-tdd`
  - Returns `{"mode": "single", "result": "pr_opened", "pr_number": 422, "issue_number": 355, "skill_lens": "vsa-tdd"}`

- **REVIEW (round 1)**: returns 1 Axis-B blocker
  - Thread T1: `[AXIS-B]` — "extract upsert logic to a domain service per VSA single-responsibility"
  - `thread_reject_counts: {T1: 0}`

- **ADDRESS round 1**: coder pushes back on T1 via thread reply ("upsert is internal to repository; extracting would create a shallow module"). Returns `{"result": "pushed"}`.

- **REVIEW (round 2)**: reviewer arbitrates pushback, rejects it
  - T1 still open, `state: pushback_rejected`
  - `thread_reject_counts: {T1: 1}`

- **ADDRESS round 2**: coder pushes back again with a different justification. Returns `{"result": "pushed"}`.

- **REVIEW (round 3)**: reviewer rejects again
  - `thread_reject_counts: {T1: 2}`

- **ADDRESS round 3**: coder pushes back a third time. Returns `{"result": "pushed"}`.

- **REVIEW (round 4)**: reviewer rejects again
  - `thread_reject_counts: {T1: 3}`

- **ADDRESS round 4 — concession trips**:
  - Pre-dispatch check: `T1.reject_count == 3` AND `T1.axis == "B"` → dispatch `/afk-concede-thread 422 T1 "rejected 3 rounds"`
  - `/afk-concede-thread`: base branch is `master` → single-mode cleanup path
  - Lazy-creates `[ship-cleanup] Issue #355 — residual concerns` (cleanup issue #356)
  - Appends `[concession-axis-b]` entry
  - Posts reply marker on thread T1 and resolves it
  - Returns `{"result": "thread_conceded", "cleanup_issue": 356}`
  - Orchestrator marks T1 resolved in working memory
  - No other unresolved threads → no coder dispatch this round; loop continues to REVIEW

- **REVIEW (round 5)**: reviewer reads cleanup issue #356, finds `[concession-axis-b]` matching T1's file+rule, adds to suppression set, returns `{"verdict": "approve", "axis_a_blockers": 0, "axis_b_blockers": 0}`

- **MERGE**: `/afk-merge-pr 422 --single`
  - All threads resolved → standard merge (no `--force` needed)
  - Returns `{"mode": "single", "result": "merged", "linked_issues_closed": [355]}`

- **DONE**

### Final report

```
🤖 /ship-issue autonomous run complete.

## Outcome
merged-with-axis-b-residue

## PR
#422 (merged)

## Cleanup issue
#356

## Rounds
5
```

### Cleanup issue #356 body (excerpt)

```markdown
This issue tracks residual concerns from the /ship-issue autonomous orchestrator's run on Issue #355.

## Concessions

- [ ] [concession-axis-b] PR #422 thread T1 · file: `Features/Categories/CategoryRepository.cs:142` · rule: `vsa-dotnet-backend:single-responsibility` · summary: "extract upsert logic to a domain service" · reason: "rejected 3 rounds"
```

## Note on the concession decision

The Axis-B concession means the reviewer's concern is documented but deferred — the merge happens with a known piece of tech debt. The 🚨 marker would only appear for Axis-A concessions, which never happen in normal mode (only the round-7 forced-merge path uses `--force-axis-a`).

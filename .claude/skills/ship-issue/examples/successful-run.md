# Example: Successful single-issue ship (no residue)

Issue #321 is a small enhancement filed via `/log-issue`. It ships cleanly with two review rounds. No cleanup issue is created.

## Setup

```
Issue #321: Show prices in EUR on homepage
  labels: enhancement
  body:
    ## Motivation
    Users see BGN by default but most browse with EUR mental models.
    ## Scope
    In: homepage price tile component. Out: catalog page, checkout.
    ## Design Note
    PriceTile component reads `currency` prop from page-level config.
    Page sets currency to "EUR" instead of "BGN".
    ## TDD Plan
    1. RED: PriceTile renders "12.34 EUR" when currency="EUR"
       GREEN: pass currency through formatter
    2. RED: HomePage passes currency="EUR" by default
       GREEN: set default in HomePage
    ## Acceptance Criteria
    - [ ] Homepage prices render with "EUR" suffix
    - [ ] Other pages unaffected
    - [ ] All tests pass
```

## Run

User invokes:
```
/ship-issue 321
```

### Step 0 — preflights

- Model preflight: active model is `claude-sonnet-4-6` → proceed
- Permission preflight: all required entries present → proceed

### Step 1 — validate and reconcile

- `gh issue view 321` → state `OPEN`, has AC, no `## Parent PRD` → proceed
- No open or merged PR for `Fixes #321` → enter loop fresh
- No existing cleanup issue → none yet
- Working tree clean → proceed

### Iteration

- **NEXT**: orchestrator dispatches `afk-coder` → `/afk-execute-issue 321 --single`
  - Branches off `master` as `321-show-prices-in-eur-on-homepage`
  - Implements via `fe-tdd` red-green-refactor
  - Opens PR #408 targeting `master` with `Fixes #321`
  - Returns `{"mode": "single", "result": "pr_opened", "pr_number": 408, "issue_number": 321, "skill_lens": "fe-tdd", "tests": {"backend": "n/a", "frontend": "pass"}, "cleanup_issue": null}`

- **REVIEW (round 1)**: dispatches `afk-reviewer` → `/afk-review-pr 408`
  - Step 4.5: base branch is `master` → searches `[ship-cleanup] Issue #321` → not found → proceed with empty suppression set
  - Returns `{"verdict": "request_changes", "axis_a_blockers": 0, "axis_b_blockers": 1, "thread_outcomes": [{"thread_id": "T1", "axis": "B", "state": "new", "reject_count_total": 0, "summary": "extract EUR symbol to theme constant"}]}`

- **ADDRESS**: dispatches `afk-coder` → `/afk-address-pr 408`
  - Returns `{"result": "pushed", "threads_addressed": 1}`

- **REVIEW (round 2)**: `afk-reviewer` returns `{"verdict": "approve", "axis_a_blockers": 0, "axis_b_blockers": 0}`

- **MERGE**: `/afk-merge-pr 408 --single`
  - Base branch check: `baseRefName == "master"` and mode is `--single` → pass
  - Squash-merges, deletes `321-show-prices-in-eur-on-homepage`
  - Closes issue #321 with completion comment
  - Returns `{"mode": "single", "result": "merged", "linked_issues_closed": [321]}`

- **DONE**

### Final report (chat + comment on issue #321)

```
🤖 /ship-issue autonomous run complete.

## Outcome
clean-merge

## PR
#408 (merged)

## Cleanup issue
none

## Rounds
2
```

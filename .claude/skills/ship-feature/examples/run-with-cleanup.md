# Example: PRD Ship with Axis-B Concessions

PRD #156 has 3 children. Child #158 hits a stubborn Axis-B reviewer concern that the Coder cannot satisfactorily resolve. After 3 rounds of rejection, the orchestrator concedes the thread to a cleanup issue and ships the PR.

## Setup

```
PRD #156: Add wholesale-price filter to product list
├── #157  [open] Backend slice
├── #158  [open] Frontend slice                blocked-by #157
└── #159  [open] Documentation update          blocked-by #158
```

## Run

`/ship-feature 156`

### Child #157 — clean

Ships in 2 rounds (one Axis-B suggestion accepted, fixed). No cleanup needed.

### Child #158 — Axis-B concession

- **Round 1**: Reviewer flags `[AXIS-B]` 🟡 issue: "WholesalePriceFilter component imports from `services/` directly, violating frontend-architect.md §4: Data Ownership."
- **Round 2**: Coder restructures, lifts query to page level. Reviewer judges still insufficient: "page now owns the query but passes filter logic via prop drilling 3 levels deep, violating §5: State Placement."
- **Round 3**: Coder restructures again with a Context provider. Reviewer rejects: "Context for transient filter state is overkill; the prop-drilling depth is acceptable since none of the intermediate components re-render."
  - Same thread, third reject. **Reject-count = 3**.
- Orchestrator triggers `/afk-concede-thread <pr-num> <thread-id> "rejected 3 rounds"`:
  - Cleanup issue created (lazy):
    ```
    [ship-cleanup] PRD #156 — residual concerns
    - [ ] [concession-axis-b] PR #208 thread MDExUFJSVDpYWFg=...
       · file: `frontend/src/pages/ProductList/ProductListPage.tsx:47`
       · rule: `frontend-architect.md §5: State Placement`
       · summary: "filter state passed via prop drilling deeper than 2 levels"
       · reason: "rejected 3 rounds"
    ```
  - Reply posted on thread, thread resolved
- **Round 4 REVIEW**: Reviewer passes (no remaining blockers) → APPROVE
- **MERGE_CHILD**: standard `/afk-merge-pr` (no `--force` — concession resolved the blocker normally)

### Child #159 — clean

### FINALIZE_PRD

PRD branch merges into master cleanly. PRD #156 closed.

### DONE

```
🤖 /ship-feature autonomous run complete.

## Summary
- Children shipped clean: 2
- Children shipped with Axis-B residue: 1
- Children shipped with Axis-A residue 🚨: 0
- Children unmergeable: 0
- PRD finalization: merged into master via PR #211

## Cleanup issue
#212 (1 entry)

## Children
| PR | Title | Merged at | Residue |
|----|-------|-----------|---------|
| #207 | Backend wholesale-price filter | … | clean |
| #208 | Frontend wholesale-price filter | … | [concession-axis-b] |
| #209 | Documentation update | … | clean |
```

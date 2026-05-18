# Example: Successful PRD Ship (no residue)

PRD #142 has 4 children. All of them ship cleanly with one or two review rounds each. No cleanup issue is ever created.

## Setup

```
PRD #142: Add brochure search by retailer
├── #143  [open] Add SearchByRetailerQuery handler (backend)
├── #144  [open] Add /api/brochures/search-by-retailer endpoint (backend)  blocked-by #143
├── #145  [open] Add SearchByRetailerPage (frontend)                       blocked-by #144
└── #146  [open] Add navigation link to search page (frontend)             blocked-by #145
```

## Run

User invokes:
```
/ship-feature 142
```

### Iteration 1: child #143

- **NEXT_CHILD**: orchestrator dispatches `afk-coder` → `/afk-execute-issue 142`
  - Returns `{"result": "pr_opened", "pr_number": 201, "child_number": 143, "skill_lens": "vsa-tdd", "tests": {"backend": "pass", "frontend": "n/a"}}`
- **REVIEW (round 1)**: dispatches `afk-reviewer` → `/afk-review-pr 201`
  - Returns `{"verdict": "request_changes", "axis_a_blockers": 0, "axis_b_blockers": 1, "thread_outcomes": [{"thread_id": "T1", "axis": "B", "state": "new", "reject_count_total": 0}]}`
- **ADDRESS**: dispatches `afk-coder` → `/afk-address-pr 201`
  - Returns `{"result": "pushed", "threads_addressed": 1}`
- **REVIEW (round 2)**: `afk-reviewer` returns `{"verdict": "approve", "axis_a_blockers": 0, "axis_b_blockers": 0}`
- **MERGE_CHILD**: `/afk-merge-pr 201`
  - Returns `{"result": "merged", "linked_issues_closed": [143]}`

### Iterations 2-4: children #144, #145, #146

Same pattern. Each ships in 1–2 rounds.

### FINALIZE_PRD

- `NEXT_CHILD` returns `result: no_children` (no open PRs, no eligible)
- Orchestrator opens PR #205 from `prd-142-add-brochure-search-by-retailer` → `master`
- `git merge --no-ff` succeeds with no conflicts
- PR #205 merges via `gh pr merge --merge --delete-branch`
- PRD #142 closed with completion comment

### DONE

Final report to chat:
```
🤖 /ship-feature autonomous run complete.

## Summary
- Children shipped clean: 4
- Children shipped with Axis-B residue: 0
- Children shipped with Axis-A residue 🚨: 0
- Children unmergeable: 0
- PRD finalization: merged into master via PR #205

## Cleanup issue
none

## Children
| PR | Title | Merged at | Residue |
|----|-------|-----------|---------|
| #201 | Add SearchByRetailerQuery handler | 2026-05-05 12:14 | clean |
| #202 | Add /api/brochures/search-by-retailer endpoint | 2026-05-05 12:32 | clean |
| #203 | Add SearchByRetailerPage | 2026-05-05 13:01 | clean |
| #204 | Add navigation link to search page | 2026-05-05 13:18 | clean |
```

Same comment posted on PRD issue #142.

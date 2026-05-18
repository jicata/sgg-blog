# Example: Forced Merge After Pre-Existing Regression

PRD #170 has 2 children. Child #172 reveals a pre-existing test failure that the Coder cannot fix without expanding scope. Per the "never skip a child" principle, the orchestrator force-merges the child with cleanup-issue linkage rather than leaving the PR stranded.

## Setup

```
PRD #170: Migrate brochure-image storage to CDN
├── #171  [open] Add CDN upload helper
└── #172  [open] Switch BrochureImageHandler to use CDN  blocked-by #171
```

## Run

`/ship-feature 170`

### Child #171 — clean

### Child #172 — pre-existing regression

- `afk-coder` runs `/afk-execute-issue 170`
- Implements the slice; tests pass for new code
- During Step 6 final test run, `BrochureImageHandlerTests.LegacyImagePathStillWorks` fails
- Coder runs regression localization: `git stash && dotnet test`
  - Test fails on the clean baseline → pre-existing
- Coder logs to cleanup issue:
  ```
  - [ ] [regression] PR #218 child #172: pre-existing failing test
     `BrochureImageHandlerTests.LegacyImagePathStillWorks` at
     `Brochures.IntegrationTests/UnitTests/BrochureImageHandler/LegacyImagePathTests.cs`.
     Observed: NullReferenceException on `_legacyResolver.Resolve(...)`.
  ```
- Coder unstashes, returns:
  ```json
  {"result": "regression", "pr_number": 218, "tests": {"backend": "fail", "frontend": "n/a"}, "cleanup_issue": 219, "cleanup_entries_added": ["regression"]}
  ```
- Orchestrator routes regression → force-concede every blocker thread + force-merge
  - In this case there are no blocker threads (Reviewer hasn't run yet on a regression-flagged path)
  - Orchestrator decides: open the PR for review anyway, then if Reviewer raises blockers, force-concede them; otherwise force-merge directly because the test failure is documented in cleanup
- **REVIEW round 1**: Reviewer raises 0 Axis-A blockers, 1 Axis-B 🟡 (which will be addressed normally next rounds)
- After 2 normal rounds, Axis-B is clean. APPROVE.
- **MERGE_CHILD**: `/afk-merge-pr 218 --force <cleanup-issue>` (forced because test suite is red)
  - Pre-merge comment posted on PR #218: 🚨 Merged with residual concerns. See cleanup issue #219.
  - Squash-merge proceeds; #172 closed

### FINALIZE_PRD

PRD merges to master. The pre-existing test is **still failing on master**. The cleanup issue is the queue entry to fix it next.

### DONE

```
🤖 /ship-feature autonomous run complete.

## Summary
- Children shipped clean: 1
- Children shipped with Axis-B residue: 0
- Children shipped with Axis-A residue 🚨: 0
- Forced merges: 1 (regression)
- PRD finalization: merged into master via PR #220

## Cleanup issue
#219 (1 entry: pre-existing regression)
```

The cleanup-ship-issues skill (when built in v2) will pick up `#219` and either fix the regression or open a follow-up PR.

# Example: AC vs Review Thread Conflict

Child issue #185's Acceptance Criteria explicitly demand a behavior, but a review comment requests the opposite. The Coder follows the AC (the issue is the spec) and logs the conflict to the cleanup issue for human triage.

## Setup

Child #185 (parent PRD #184):
```
## Acceptance Criteria
- [ ] When user clicks "Reset filters", all filters except `retailer` are cleared
- [ ] The `retailer` filter persists across the reset (UX decision, see PRD §3.2)
```

The "retailer persists across reset" is unusual UX. PRD §3.2 documents the rationale: users want to switch retailer-context less often than other filters.

## Run

`/ship-feature 184` reaches child #185.

### Round 1

- Coder implements the slice exactly per AC: clicking "Reset filters" resets everything except `retailer`
- Tests pass
- PR opened
- Reviewer (cold context, hasn't read PRD §3.2 deeply) flags:
  ```
  [AXIS-B] 🔴 Reset button is incomplete — clicking "Reset filters" should clear ALL
  filters including retailer. Inconsistent state with the button label.
  ```

### Round 2

Coder runs `/afk-address-pr`. Classifies the thread as **Bucket D: AC vs Review Thread Conflict**:

- AC explicitly says retailer persists
- Review says retailer should reset
- These are contradictory

Action:
1. Follow the AC (do not change the code)
2. Post reply on the thread:
   ```
   Claude comment 🤖

   This change would contradict child issue #185 Acceptance Criterion #2 ("The
   retailer filter persists across the reset, see PRD §3.2"). I'm following
   the AC since the issue is the spec.

   If the AC is wrong, please update child #185 and re-run /ship-feature.
   This contradiction has been logged to the PRD cleanup issue for triage.
   ```
3. Append to cleanup issue:
   ```
   - [ ] [ac-conflict] PR #225 thread <id>: contradicts AC §2 of #185
      ("retailer persists"); followed AC. Reviewer suggested clearing retailer.
      Triage: confirm AC vs reviewer intent.
   ```
4. Return `{"result": "pushed", "threads_addressed": 0, "threads_pushed_back": [], "threads_ac_conflict": ["<id>"]}`

### Round 3

Reviewer (now follow-up pass) reads the reply. Pushback arbitration kicks in:
- Reads the AC
- Reads PRD §3.2
- Accepts the pushback: "AC and PRD agree, reviewer was wrong; resolving thread"

Thread resolved. APPROVE.

### MERGE_CHILD

`/afk-merge-pr 225` (no force — Axis-B was conceded normally via reviewer arbitration). Merges.

### DONE

The AC conflict entry stays on the cleanup issue for human triage — it's not a defect, but it's worth a human glance to confirm the AC is what we want.

```
🤖 /ship-feature autonomous run complete.

## Summary
- Children shipped clean: <n>
- Children shipped with Axis-B residue: 0
- Children shipped with Axis-A residue 🚨: 0
- Children with cleanup-issue notes (informational, no concession): 1 ([ac-conflict])

## Cleanup issue
#226 (1 entry: ac-conflict on PR #225 — informational, human triage)
```

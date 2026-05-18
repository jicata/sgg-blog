# Example: Bug report, light flow

A user reports a small bug. `/log-issue` investigates, proposes a fix, the user agrees, and a GitHub issue is created ready for `/ship-issue`. No blast-radius signals trip.

## User prompt

```
/log-issue
```

## Step 1 — capture

Agent: *"What's the problem you're seeing, or what would you like to change?"*

User: *"On the homepage, when I reset the frontier for a retailer twice in a row, the category list shows duplicates. I expect the second reset to be idempotent."*

## Step 2 — classify

Bug-shaped: "duplicates", "expect ... idempotent". Existing behavior is incorrect.

## Step 3 — Explore

Agent dispatches `Explore` subagent. Findings:

- `CategoryRepository.UpsertAll(retailerId, categories)` in `Features/Categories/CategoryRepository.cs`
- The method uses a two-phase Insert-then-Update path with no transaction
- On second call, existing rows trigger the Insert branch because of a stale `existing.Any()` check that runs before the prior INSERTs are committed
- Adjacent code: `RetailerRepository.UpsertAll` (file: `Features/Retailers/RetailerRepository.cs`) uses `INSERT ... ON CONFLICT UPDATE` and is idempotent — that's the working pattern to mirror
- Tests: `CategoryRepositoryTests` exists, but no test covers repeated calls; `RetailerRepositoryTests.UpsertAll_Idempotent` is the prior art

## Step 4 — blast-radius assessment

- Touches >1 vertical slice? **No** — change confined to `Features/Categories/`
- Updates `docs/architecture.md`? **No** — in-slice repository behavior
- Requires new ADR? **No** — mirroring an existing pattern, not a new decision
- DB migration with invariant change? **No** — just adding `ON CONFLICT` clause
- New public API or contract break? **No**
- Touches flow doc? **No**

**Zero signals tripped → fits light flow.**

## Step 5 — propose

Agent presents to user:

> **Findings**
> `CategoryRepository.UpsertAll` is non-transactional and uses a stale existence check, so a second call inserts duplicate rows. The pattern is already solved correctly in `RetailerRepository.UpsertAll` via `INSERT ... ON CONFLICT UPDATE`.
>
> **Proposed approach**
> Mirror `RetailerRepository`'s upsert pattern in `CategoryRepository`. Add a regression test that calls `UpsertAll` twice and asserts row count is stable.
>
> **Blast-radius assessment**
> This fits a single-issue/single-PR flow.
>
> Proceed?

## Step 6 — user gate

User: *"yes"*

## Step 7 — create the issue

Agent picks **Bug template**. Writes scratch body, then:

```bash
gh issue create \
  --title "Frontier reset duplicates categories" \
  --label bug \
  --body-file <scratch>
```

Issue body:

```markdown
## Problem

**Actual behavior:** Re-running frontier reset for a retailer creates duplicate Category rows instead of updating the existing ones.

**Expected behavior:** Repeated calls to UpsertAll should be idempotent — row count stable, content updated.

**Reproduction:**
1. Reset frontier for retailer X (categories created)
2. Reset frontier for retailer X again
3. Row count in Category table for retailer X has doubled

## Root Cause Analysis

`CategoryRepository.UpsertAll` uses a non-transactional Insert+Update path with a stale existence check, causing the Insert branch to fire for already-present rows on the second call. The `RetailerRepository.UpsertAll` slice already solves this pattern correctly via `INSERT ... ON CONFLICT UPDATE`.

## TDD Fix Plan

1. **RED**: `UpsertAll_TwoConsecutiveCalls_LeavesRowCountUnchanged` — call UpsertAll twice with same payload, assert count equals payload length
   **GREEN**: replace Insert+Update with `INSERT ... ON CONFLICT (retailer_id, slug) DO UPDATE` inside a transaction

2. **RED**: `UpsertAll_SecondCallUpdatesChangedFields` — call UpsertAll with same keys but different display_name, assert update happened
   **GREEN**: ensure `ON CONFLICT UPDATE` covers mutable fields

**REFACTOR**: extract common upsert helper if `RetailerRepository` and `CategoryRepository` share enough structure (defer if not).

## Acceptance Criteria

- [ ] UpsertAll is idempotent for repeated identical calls
- [ ] UpsertAll updates changed fields on second call with same keys
- [ ] No duplicate Category rows after two reset runs
- [ ] All new tests pass
- [ ] Existing tests still pass
- [ ] Documentation updated where affected
```

Agent prints:

> Logged issue #355. Run `/ship-issue 355` to autonomously implement, review, and merge.

## What did NOT happen

- No `specs/seed-*.md` was created — no escalation
- No PR yet — `/log-issue` only writes the issue
- No branch yet — `/ship-issue` creates the branch when invoked

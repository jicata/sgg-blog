# Example: Enhancement request that escalates to PRD flow

A user proposes what sounds like a single-issue enhancement, but `/log-issue`'s investigation reveals it touches multiple slices and needs an ADR. The skill recommends escalation; the user agrees; a PRD seed file is written; the user runs `/write-a-prd` next.

## User prompt

```
/log-issue "I'd like the homepage to also show prices in USD for tourists, alongside EUR and BGN."
```

## Step 1 — capture

Description provided inline; skip the opening question.

## Step 2 — classify

Enhancement-shaped: "add", "alongside". Existing behavior is fine but insufficient.

## Step 3 — Explore

Findings:

- Price display lives in `Features/PriceTile/PriceTile.tsx` (frontend)
- Currency formatting helper is in `frontend/src/lib/formatPrice.ts` and currently hardcodes a single currency per call
- Backend price source: `Features/Brochures/BrochureProductDto` carries `price_amount` and `price_currency` (single currency per product)
- Database: `Product` table has `price_amount NUMERIC` and `price_currency VARCHAR(3)`
- No exchange-rate infrastructure exists in the codebase
- Adjacent flow: `docs/flows/brochure-ingestion-flow.md` describes how `price_currency` is captured from the source brochure
- ADRs: `docs/adr/007-canonical-pricing-model.md` (Accepted) explicitly says "one currency per product, no on-the-fly conversion"

## Step 4 — blast-radius assessment

- Touches >1 vertical slice? **YES** — `Features/PriceTile/` (frontend), `Features/Brochures/` (DTO contract), plus a new `Features/CurrencyConversion/` slice would be needed for exchange rates
- Updates `docs/architecture.md`? **YES** — a new slice means the slice map changes
- Requires new ADR? **YES** — ADR-007 explicitly forbids on-the-fly conversion; this proposal would supersede or amend it
- DB migration with invariant change? **Possibly** — if exchange rates are stored, a new table is required; the existing `price_currency` invariant ("single currency per product") may need reframing
- New public API or contract break? **YES** — `BrochureProductDto` shape would need to expose a converted-price array or the frontend would need a `/api/exchange-rates` endpoint
- Touches flow doc? **YES** — pricing display flow changes; ingestion flow changes if rates affect ingestion

**Six signals tripped.** This is a feature, not an enhancement.

## Step 5 — propose with escalation recommendation

Agent presents to user:

> **Findings**
> Price display is single-currency by design (ADR-007). Adding USD alongside EUR/BGN requires either storing multi-currency prices upstream (changing the ingestion contract and DB invariants) or introducing exchange-rate infrastructure (a new slice plus a new ADR superseding 007).
>
> **Proposed approach (high-level)**
> Either:
> - (a) Add a `Features/CurrencyConversion/` slice with periodic rate fetching, expose `/api/exchange-rates`, and have the frontend convert at display time; or
> - (b) Capture multi-currency prices at ingest time and store them in a new `ProductPrice` table keyed on `(product_id, currency)`.
> Both options require superseding ADR-007.
>
> **Blast-radius assessment**
> This looks bigger than a single-issue ship. Tripped signals:
> - **touches-multiple-slices** — PriceTile, Brochures, and a new CurrencyConversion slice
> - **requires-architecture-update** — new slice means the slice map changes
> - **requires-new-adr** — ADR-007 explicitly forbids conversion; needs a new ADR to supersede
> - **breaks-api-contract** — `BrochureProductDto` or a new `/api/exchange-rates` endpoint
> - **touches-flow-doc** — pricing flow and ingestion flow
>
> **Recommended:** stop here and run `/write-a-prd` — I'll seed it with the investigation findings so the interview can skip the parts I already covered.

## Step 6 — user gate

User: *"agreed, let's escalate"*

## Step 7 (skipped) → Step 8 — write the seed

Slug derivation from proposed title `multi-currency-price-display-usd-eur-bgn` → cap at 40 → `multi-currency-price-display-usd-eur-bgn`.

Agent writes `specs/seed-multi-currency-price-display-usd-eur-bgn.md`:

```markdown
---
type: prd-seed
created: 2026-05-11T14:22:00Z
source: /log-issue
triggered_signals:
  - touches-multiple-slices
  - requires-architecture-update
  - requires-new-adr
  - breaks-api-contract
  - touches-flow-doc
---

# Seed: Multi-currency price display (USD alongside EUR/BGN)

## Original report

> I'd like the homepage to also show prices in USD for tourists, alongside EUR and BGN.

## Investigation findings

Price display lives in `Features/PriceTile/PriceTile.tsx`. The formatter in
`frontend/src/lib/formatPrice.ts` is single-currency. Backend `BrochureProductDto`
carries a single `price_amount` + `price_currency` pair. The `Product` table
mirrors this shape.

No exchange-rate infrastructure exists. The ingestion flow
(`docs/flows/brochure-ingestion-flow.md`) captures `price_currency` from the
source brochure as-is.

ADR-007 ("canonical-pricing-model", Accepted) explicitly states "one currency
per product, no on-the-fly conversion."

## Why this escalated

- **touches-multiple-slices**: changes span PriceTile, Brochures, and require a new CurrencyConversion slice
- **requires-architecture-update**: new slice means the slice map in `docs/architecture.md` changes
- **requires-new-adr**: ADR-007 explicitly forbids conversion — needs a successor ADR
- **breaks-api-contract**: `BrochureProductDto` shape changes OR a new `/api/exchange-rates` endpoint is introduced
- **touches-flow-doc**: pricing flow and ingestion flow both change

## Proposed approach (high-level)

Two strategic options for the PRD to choose between:

1. **Display-time conversion**: new `Features/CurrencyConversion/` slice with periodic rate fetching, frontend converts at render time. Lighter ingest impact, heavier frontend, requires a new external dependency (rate provider).
2. **Ingest-time multi-currency capture**: new `ProductPrice` table keyed `(product_id, currency)`, ingest pipeline writes multiple rows per product. Heavier ingest, simpler frontend, no external rate provider needed.

Both supersede ADR-007.

## Open questions for the PRD

- Which strategy: display-time conversion or ingest-time multi-currency? Decision drives most of the design.
- Which exchange-rate provider (if strategy 1)? Cost / refresh cadence / fallback behavior.
- How are stale rates surfaced to users? UX decision affecting `docs/ux-foundations.md`.
- What does the cooking-mode JTBD say about currency? Is USD a real persona need or speculative?
- Do we backfill historical brochures or apply only to new ingest (if strategy 2)?
- Out of scope: checkout currency, invoicing currency, accounting currency. Confirm.
```

Agent prints:

> Wrote `specs/seed-multi-currency-price-display-usd-eur-bgn.md`. Run `/write-a-prd` — it will detect this seed and skip the interview questions already covered.

## What happens next

User invokes `/write-a-prd`. It:
1. Detects the seed in Step 0, asks: *"Found `specs/seed-multi-currency-price-display-usd-eur-bgn.md` (created 2026-05-11, triggered by 5 signals). Use it as the starting point? [Y/n]"*
2. On `Y`, skips re-asking about the original report and the investigation findings
3. Uses the seed's "Open questions for the PRD" as the interview agenda
4. After the PRD issue is created, runs `git rm specs/seed-multi-currency-price-display-usd-eur-bgn.md`
5. Hands off to `/prd-to-issues` and ultimately `/ship-feature`

## What did NOT happen

- No GitHub issue was created by `/log-issue` — the seed file is the only artifact
- `/write-a-prd` was NOT auto-invoked — ceremony transitions are user-gated
- The seed will be deleted by `/write-a-prd` after consumption, not by `/log-issue`

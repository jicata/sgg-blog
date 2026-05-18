---
name: grill-with-docs
description: Grilling session that challenges your plan against the existing domain model, sharpens terminology, and updates documentation (UBIQUITOUS_LANGUAGE, flows, feature READMEs, ADRs) inline as decisions crystallise. Use when user wants to stress-test a plan against their project's language and documented decisions.
---

<what-to-do>

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time, waiting for feedback on each question before continuing.

If a question can be answered by exploring the codebase or the documentation, explore them instead of asking.

</what-to-do>

<supporting-info>

## Documentation awareness

This project is a single bounded context (a .NET Vertical Slice monolith) with a layered documentation matrix governed by `.claude/rules/documentation-creator.md`. Before grilling, orient yourself:

| Layer | File(s) | What it owns |
|---|---|---|
| Glossary | `docs/UBIQUITOUS_LANGUAGE.md` | Domain terms grouped by bounded context (mirrors the slice map). Cross-cutting terms sit in a top-of-file table with a "Shading across contexts" column for per-slice emphasis. |
| UX foundations | `docs/ux-foundations.md` | Personas, JTBDs, interaction principles, mode skeleton |
| Map | `docs/architecture.md` | Stack, cross-cutting rules, slice graph, data lifecycle |
| Orchestration | `docs/flows/*.md` | State machines, sequence diagrams, cross-feature behavior |
| Slice mechanics | `Features/{Name}/README.md` | How a single vertical slice works, edge cases, failure modes |
| Decisions | `docs/adr/*.md` | Point-in-time architectural decisions and their rationale (lifecycle in ADR 021) |
| In-flight planning | `specs/UX-*.md`, `specs/PRD-*.md`, `specs/PLAN-*.md` | Retired on ship |

There is no `CONTEXT-MAP.md` — we are single-context today. If the grilling reveals that two parts of the system want different definitions for the same term (a sign of an emerging bounded-context split), surface that explicitly rather than papering over it in the glossary.

## During the session

### Challenge against the glossary

When the user uses a term that conflicts with `docs/UBIQUITOUS_LANGUAGE.md`, call it out immediately. "The glossary defines '*Confirmation*' as endorsing a Needs Confirmation mapping without changing the category, but you seem to mean a category *change* — those are different: Confirmation vs Correction. Which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term, preferring one already in the glossary. "You're saying 'mapping' — do you mean a *ProductCategorizationMapping* (the durable Corpus entry) or a *ProductCategorizationResult* (the ephemeral per-product record)? Those are different."

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent edge cases that force precision about boundaries between concepts (e.g., "what happens to a Pending mapping if Bulk Re-categorization runs while an admin is in the middle of Correcting it?").

### Cross-reference with code

When the user states how something works, verify against the code and against the relevant flow / feature README. If you find a contradiction, surface it: "The Projects flow says case studies are loaded from MDX via `import.meta.glob`, but the code in `projectsApi.ts` exposes an in-memory array and the `fetch(BASE_URL/...)` branch is unreachable. Which is current?"

### Route findings to the right layer — apply the rot test

When a fact is resolved during grilling, ask: *"Could this sentence become wrong without the file I'm about to write to being touched?"* If yes, you're writing to the wrong layer. Route:

- **A new term, renamed term, or new alias-to-avoid** → `docs/UBIQUITOUS_LANGUAGE.md`. Inline, not batched.
- **A behavior rule, state transition, or orchestration step** → the relevant `docs/flows/*.md`. Update the Mermaid diagram too if it changes.
- **A slice-internal mechanic, edge case, or failure mode** → `Features/{Slice}/README.md`.
- **A new persona, JTBD, interaction principle, or mode-skeleton slot** → `docs/ux-foundations.md` *before* writing any per-feature UX spec that depends on it.
- **A map-level change** (new/removed slice, new cross-cutting rule, stack change) → `docs/architecture.md` (add a row to the slice map; do not summarize behavior here).
- **A design decision with rationale** → ADR (see filter below).
- **A point-in-time planning artifact** → `specs/UX-*.md`, `specs/PRD-*.md`, or `specs/PLAN-*.md` — retire on ship.

`docs/UBIQUITOUS_LANGUAGE.md` is **only** a glossary. Do not put behavior, decisions, configuration, or implementation details there.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse** — the cost of changing your mind later is meaningful (data shape, persistence boundary, public contract, cross-slice protocol).
2. **Surprising without context** — a future reader will wonder "why did they do it this way?" and the code alone won't answer.
3. **The result of a real trade-off** — there were genuine alternatives and you picked one for specific reasons worth recording.

If any of the three is missing, skip the ADR — put the fact in the relevant flow doc or feature README. This gate is also codified in `.claude/rules/documentation-creator.md` §6.

When an ADR *is* warranted, apply ADR 021 lifecycle hygiene before writing:

- Check whether the new decision **supersedes or deprecates** an existing ADR. If so, update the older ADR's header (`Superseded-By`), rename the older file per the suffix convention, update the index in `docs/adr/README.md`, and audit links from `docs/architecture.md` and any flow docs.
- Use the standard header (`Date`, `Status`, `Supersedes`, `Superseded-By`) and the standard structure (Background → Problem → Questions and Answers → Design → Implementation Plan → Examples → Trade-offs).
- If the ADR cites a `specs/PLAN-*.md`, that PLAN must exist (and be retired on ship) — stale PLAN references are a known rot vector.

### Update inline, not in a batch

When a term, behavior rule, or decision is resolved during grilling, write it to its correct layer right then. Do not collect everything for a single end-of-session dump — by then half the precision is lost.

</supporting-info>

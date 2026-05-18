---
description:
alwaysApply: true
---

## Documentation Methodology

This project follows a rigorous, multi-tiered documentation strategy. Documentation is treated as code: it must be kept current, linked properly, and written with **clear boundaries between layers**. Every doc has one job. If you find yourself summarizing another doc, you are in the wrong layer.

## 1. The Documentation Matrix

| Level | Document | Location | Purpose |
| :--- | :--- | :--- | :--- |
| **Macro / Domain** | Ubiquitous Language | `docs/UBIQUITOUS_LANGUAGE.md` | Shared glossary of domain terminology. Grouped by **bounded context** mirroring the slice map in `architecture.md`. Cross-cutting terms (used by 2+ contexts) live in a dedicated top-of-file table with a "Shading across contexts" column naming the per-slice emphasis. |
| **Macro / Stable** | Overview | `docs/overview.md` | Business goals, target audience, scope, and value proposition. |
| **Macro / User (living)** | UX Foundations | `docs/ux-foundations.md` | Target audience, personas, JTBD library, interaction principles, mode skeleton. The user-side counterpart to Ubiquitous Language. Living: updated when research or a new mode reveals a persona/JTBD/principle change. Per-feature UX specs **must** ground in this document and not re-derive its content inline. |
| **Macro / Map** | Architecture | `docs/architecture.md` | **The map of the project.** Stack, cross-cutting rules, slice graph, data lifecycle. Pure links and one-liners — no slice descriptions. |
| **Process / Orchestration** | Flows | `docs/flows/*.md` | Living documentation of state machines, sequence diagrams, and cross-feature orchestration. |
| **Micro / Component** | Feature Readmes | `Features/{Name}/README.md` | Specific implementation details, why specific tech was chosen, and edge cases for a single vertical slice. |
| **Planning / Tracking** | Roadmap | `docs/roadmap.md` | Project phases, progress tracker, future features, and task checklists. |
| **Planning / Specs** | UX specs, PRDs & Plans | `specs/UX-*.md`, `specs/PRD-*.md`, `specs/PLAN-*.md` | Per-feature, point-in-time planning artifacts. UX spec (user-facing surface design, grounded in `docs/ux-foundations.md`) feeds PRD (requirements) feeds PLAN (tracer-bullet implementation plan). All retired on ship — durable knowledge migrates to UX Foundations, Flows, Feature READMEs, or ADRs. |
| **Historical / Decisions** | ADRs | `docs/adr/*.md` | Architecture Decision Records. Why we chose X over Y. Point-in-time records of trade-offs. |

## 2. The Architecture Map Rule (anti-rot)

`docs/architecture.md` is a **map, not a digest**. Two rules govern what may live there:

1. **Quarterly-stable facts only.** Anything that changes more than once a quarter — a step's behavior, a validation rule, a status semantic, a config knob — does **not** belong in architecture.md. It belongs in the relevant flow or feature README. Architecture.md links *to* those, never *summarizes* them.
2. **The rot test.** Before adding a sentence to architecture.md, ask: "Could this sentence become wrong without architecture.md being touched?" If yes, it belongs in a flow or feature README.

Permitted content in architecture.md:
- **Stack** — frameworks, languages, primary/fallback providers (link to the ADR that picked them).
- **Cross-cutting rules** — VSA, CQRS via Wolverine, DB-backed resumability, retailer seeding, partial-success, React Query, etc. One-line each.
- **Slice map** — Mermaid graph + a table of (Slice, Entry point, Owns, Key ADRs, Flow doc). One row per slice.
- **Data lifecycle** — a single diagram showing how the primary input becomes the primary output, with persisted artifacts named at each hop and ADR links.
- **Where-to-look-next** — pointers to flows, ADRs, glossary, roadmap, runbook.

Forbidden in architecture.md:
- Prose summaries of how a slice works.
- Lists of class names inside a slice.
- Configuration tables (those go in the runbook or feature README).
- Any sentence that already exists in a flow or feature README.

## 3. The Web of Documentation (Linking Rules)

Documentation must not exist in isolation. You must link documents to create a discoverable web:
1. **Architecture to Flows**: `docs/architecture.md` links *out* to flows and feature READMEs via the slice map. It does not embed their content.
2. **Flows to Features**: Flow documents must link *down* to the specific Feature Readmes (`Features/{Name}/README.md`) they orchestrate.
3. **Features to Flows**: Feature Readmes must link *up* to the Flow documents they participate in.
4. **Domain Terminology**: Feature Readmes and Architecture docs must use the exact terminology defined in `docs/UBIQUITOUS_LANGUAGE.md` and link to it when introducing core domain concepts.
5. **ADRs anchor everything**: Every entry in the architecture slice map and data lifecycle that has a "why" cites an ADR. ADRs are the single source of *rationale*.
6. **UX specs ground in UX Foundations**: Every `specs/UX-*.md` must reference `docs/ux-foundations.md` for personas, JTBDs, and principles by name/ID — never restate them. Same anti-rot rule as architecture.md (§2): if a sentence in a UX spec could become wrong because foundations changed, that sentence belongs in foundations and the spec should link.

## 4. Documentation Triggers (When to write what)

- **When introducing a new core domain concept, renaming an entity, or changing a lifecycle state**: Update `docs/UBIQUITOUS_LANGUAGE.md` (or run the `/ubiquitous-language` skill).
- **When introducing a new persona, JTBD, interaction principle, or mode skeleton slot**: Update `docs/ux-foundations.md` *before* writing a per-feature UX spec that depends on it. Do not embed foundational UX content inside `specs/UX-*.md`.
- **When designing a new user-facing surface or mode**: write `specs/UX-{feature}.md` first (grounded in `docs/ux-foundations.md`); it becomes the input to `/write-a-prd`.
- **When answering a UX question** ("should we do X?", "is Y a good idea here?", "how does this affect users?"): load `docs/ux-foundations.md` and any relevant `specs/UX-*.md` first, then frame the answer in terms of personas affected, JTBD touched, principles upheld/violated. If foundations doesn't cover the question, flag the gap and update foundations rather than answering from vibes.
- **When completing a task or planning a new phase**: Update the progress tracker in `docs/roadmap.md`.
- **When starting a new Vertical Slice**: Create `Features/{Name}/README.md` **and add a row to the architecture slice map** (`docs/architecture.md`).
- **When orchestrating multiple features or defining a state machine**: Create or update a Flow in `docs/flows/*.md`.
- **When making a major architectural decision, adding new tech, or accepting significant trade-offs**: Create an ADR in `docs/adr/*.md` *before* implementation.
- **When changing the stack, adding/removing a slice, or changing a cross-cutting rule**: Update `docs/architecture.md`. **Do not update it for in-slice changes** — those belong in the slice's flow or README.
- **When implementation of a PRD/spec completes**: Either delete the spec file (preferred) or move it to an archive subdirectory. Stale `specs/PLAN-*.md` files referenced from ADRs are a known rot vector.

## 5. Rules for Living Documents (Flows & Features)

These documents must perfectly reflect the current state of the codebase.
- **Synchronous Updates**: Update these documents in the exact same commit/changeset as the code changes.
- **Flows**: Must include Mermaid sequence diagrams (`sequenceDiagram`) or state diagrams to visualize the process.
- **Feature Readmes**: Must explain *how* the feature works, *why* it was built that way, and document all known *edge cases and failure modes*.

## 6. Rules for Architecture Decision Records (ADRs)

ADRs are point-in-time historical records. Once implemented, they are immutable (except for appending deviations).

**Gate — when to write an ADR at all.** Before opening a new ADR file, all three must be true. If any is missing, skip the ADR and put the information in the relevant flow or feature README instead:
- **Hard to reverse** — the cost of changing your mind later is meaningful (data shape, persistence boundary, public contract, cross-slice protocol).
- **Surprising without context** — a future reader will wonder "why did they do it this way?" and the code alone won't answer.
- **The result of a real trade-off** — there were genuine alternatives and you picked one for specific reasons worth recording.

1. **Structure**: Background → Problem → Questions and Answers → Design → Implementation Plan → Examples → Trade-offs.
2. **Flat Hierarchy**: Keep ADRs flat and numbered sequentially in the `docs/adr/` directory (e.g., `001-feature.md`, `002-other-feature.md`). Do not use subfolders.
3. **Be specific**: Include file paths, type signatures, and validation rules in the design phase. Cite line numbers when referencing existing code.
4. **Explain why**: Don't just describe what you are doing; explain the rationale and the trade-offs you accepted.
5. **Ask Questions**: Use the file to ask and answer questions during the design phase.
6. **Supersession hygiene**: When creating or updating an ADR, check whether it supersedes or deprecates older ADRs. If so, update the older ADR header (`Superseded-By`), rename the file per `docs/adr/README.md`, update the ADR index, and audit any links from `docs/architecture.md` and flow docs.
7. **PLAN file lifecycle**: When an ADR cites `specs/PLAN-*.md`, the PLAN must either exist or the ADR must be updated to reflect that implementation is complete and the PLAN was retired.
8. **`Governs:` field required**: Every ADR must carry a `Governs:` header line listing the slice(s) it constrains (slice names from `docs/architecture.md` §2 slice map column 1), or the special token `cross-cutting` for shared infrastructure / conventions / lifecycle rules. See [ADR 053](../../docs/adr/053-adr-governs-header-field.md).
9. **Canonical shape and common mistakes**: For the worked example of a canonical ADR header (Proposed / Accepted / Implemented / Superseded / multi-slice / cross-cutting flavors) and the list of drift modes that have been observed and should be avoided, see [`docs/adr/README.md`](../../docs/adr/README.md) — the Worked Example and Common Mistakes to Avoid blocks. The rules file is authoritative on rules; the README is authoritative on shape.

## 7. When Implementing Code

1. **Check ADRs**: Read existing ADRs in `docs/adr/` to understand context and constraints before modifying existing systems.
2. **Follow the Plan**: Follow the implementation plan phases from the current ADR.
3. **Update Feature Docs**: Create or update the `README.md` inside the specific `Features/{Name}/` folder as you build the micro-level logic.
4. **Update Flows synchronously**: If your change touches the choreography in a flow doc (status transitions, sequence, failure handling), update the flow in the same changeset.
5. **Touch architecture.md only for map-level changes**: A new slice, a removed slice, a new cross-cutting rule, a stack change. **Do not** update architecture.md for in-slice behavior changes.
6. **Log Deviations**: Do not update the initial design section of an ADR once implementation has started. Instead, append an "Implementation Results" section at the bottom to document any deviations from the original design.
7. **Summarize**: After implementation, add a summary of deviations to the bottom of the ADR.

## 8. When Answering Questions

1. Reference ADRs by number when relevant (e.g., "See ADR 002").
2. Reference specific Flows or Feature Readmes to explain how the system currently works.
3. Use `docs/architecture.md` to find *which* slice/flow/ADR is relevant — not as the source of behavior.
4. Show type signatures and consider backward compatibility.

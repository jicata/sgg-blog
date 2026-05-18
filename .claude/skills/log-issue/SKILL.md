---
name: log-issue
description: Investigate a reported bug or enhancement, propose a fix/approach to the user, and on approval create a fully-populated GitHub issue (with root cause/motivation, TDD plan, and Acceptance Criteria) that is ready for /ship-issue. If investigation reveals the work is too big for a single-issue/single-PR flow, write a PRD seed file and recommend escalation to /write-a-prd. Supersedes /triage-issue.
---

# Log Issue

The authoring counterpart to `/ship-issue`. Light-flow companion to `/write-a-prd`. Investigates a reported problem or enhancement request, proposes an approach, and creates a GitHub issue that the autonomous `/ship-issue` orchestrator can pick up.

If the investigation reveals the work is structurally bigger than a single PR (touches multiple slices, requires an ADR, etc.), the skill writes a PRD seed file and hands off to `/write-a-prd` instead.

## Invocation

`/log-issue` — interview-driven; the user describes the bug or enhancement in chat.

`/log-issue "<description>"` — description passed inline; skill skips the opening question.

## Process

### Step 1 — Capture the report

If no inline description, ask **one** question: *"What's the problem you're seeing, or what would you like to change?"*

Do not ask follow-up questions yet. The interview comes after Explore.

### Step 2 — Classify the report shape

Infer from the description (you may revise after Explore):

- **Bug-shaped** — words like "broken", "wrong", "shouldn't", "doesn't work", "fails", "regression". Existing behavior is incorrect.
- **Enhancement-shaped** — words like "add", "change", "improve", "instead of", "would be nice", "support X". Existing behavior is fine but insufficient.

Record the classification but do not lock it. Investigation may reclassify.

### Step 3 — Explore

Use the `Agent` tool with `subagent_type=Explore` to investigate. Tell it:

- For **bug-shaped**: trace the code path that produces the wrong behavior, identify the root cause (not just the symptom), find adjacent tests and similar working patterns elsewhere
- For **enhancement-shaped**: locate where the change would land (which slice, which files, which component), identify the current behavior in that area, find adjacent code that does something similar

Mandatory per `.claude/rules/documentation-first-understanding.md`: the Explore agent must read `docs/UBIQUITOUS_LANGUAGE.md` and any relevant `Features/{Name}/README.md` / flows / ADRs before answering.

**State-shaped bug detection.** If the bug touches any of the following, classify it as **state-shaped** and apply the extra rigor below:

- URL / route / query-string state
- Persisted state (DB rows, local storage, cookies, session)
- In-memory store state shared across components (React Query cache, Redux, Context)
- Event payloads, message contracts, or any serialized hand-off between modules
- Anything with an encoder/decoder pair, or a "write here, read there" shape

**For state-shaped bugs, Explore must trace the full pipeline, not just the symptomatic side.** That means:

1. **Encoder side** — what writes the state
2. **Decoder side** — what reads it back
3. **Consumer(s)** — what acts on the decoded state (filter queries, render logic, hydration, downstream events)
4. **Round-trip property** — does encode → decode → consume produce the same observable behavior as the pre-encode in-memory state?

A symptom on one side is frequently caused by a contract mismatch on another side. Reading only the side the symptom appeared on is the failure mode that produced the homepage URL bug cascade (#340 → #342 → #344) — each pass fixed one side and shipped, then the next side broke.

**Verify "the other side already does X" claims.** If the diagnosis leans on a behavior of code Explore did not modify (e.g. "the backend already expands descendants", "the cache already invalidates this key"), Explore MUST cite the file and symbol it inspected to confirm that claim. An unverified cross-module assumption is a halt condition — go read it, or strike the claim from the findings.

**Sibling-symptom sweep.** Before returning, Explore must answer: *"While tracing this pipeline, did I notice other broken or contract-violating behavior the user did not report?"* List any sibling symptoms with the same root cause. The user gets to decide in Step 5 whether to bundle them into one issue, file siblings, or escalate — but they must be surfaced, not silently dropped.

**Surface map (aggressive enumeration).** Explore must enumerate the **observable behaviors of the affected surface** (UI region, endpoint, contract) *exhaustively*, not just the broken one. The user will be shown this list at Step 6 and asked whether anything is missing — recognition is easier than recall, but only if the list is thorough enough to actually prompt the user's memory. A thin list defeats the gate. Walk these axes for any UI surface and produce one row per axis on which the surface has observable behavior:

- **Effects on the local pane** — what changes in the section the user is interacting with (rows added/removed, sort order, item state, expansion state, etc.)
- **Effects on other panes** — sidebars, headers, breadcrumbs, related sections, badges, counters, dialogs that open/close, anything that reacts elsewhere in the page
- **URL / route state** — does the control mutate the URL, query string, hash, or history? what does back/forward do?
- **Persistence** — does the effect survive reload, session, share-link, or device switch?
- **Data fetching** — does the control trigger a request? what query keys invalidate? what cache changes?
- **Keyboard / focus / a11y** — shortcuts, focus movement, screen-reader announcements
- **Empty / boundary states** — what happens when there's no data, max data, or the control is in an indeterminate state?

Include behaviors that are currently working but share state, props, URL params, rendering paths, or event handlers with the defect — they constrain the fix and define the "do not regress" envelope. **A behavior that "obviously isn't affected" is exactly the kind that gets silently regressed; list it anyway.** For the homepage Show More button, the surface map must include both *"expands the category subtree in the sidebar"* and *"expands the product grid in the main pane"* — those are two distinct effects on two different panes triggered by one control, and missing either is the failure mode this rule exists to prevent.

This list is the input to the Current vs Desired table the user signs off on in Step 6, and the user is explicitly asked there whether it is complete.

**Open Questions output.** Explore returns four sections: (a) findings, (b) sibling symptoms (if any), (c) surface map, (d) **open questions** — branches of the contract / decision tree that code alone cannot resolve. Examples: "What URL should represent a strict-subset selection vs a whole-subtree selection?" "Should Show More writes interact with the URL the same way root-tick does?" "Is the legacy URL form still in the wild and required to load?" These feed Step 5.

### Step 4 — Assess blast radius

Before proposing a fix, assess whether this work fits in a single-issue/single-PR flow. **Any of the following structural signals** flips the recommendation to escalate to `/write-a-prd`:

1. **Touches >1 vertical slice** — code changes span `Features/A/...` AND `Features/B/...`
2. **Requires updating `docs/architecture.md`** — per `.claude/rules/documentation-creator.md`, the architecture map only changes for new slices, removed slices, or new cross-cutting rules. Any of those = not in-slice.
3. **Requires a new ADR** — architectural decisions worth recording belong in a PRD
4. **Requires a DB migration that changes invariants** — new `NOT NULL`, new FK, type change on populated column
5. **Adds a new public API endpoint or breaks an existing contract**
6. **Touches a flow doc** (`docs/flows/*.md`) — orchestration change is cross-slice by definition

File counts and LOC are **not** signals — they rot. Stick to the structural list above.

### Step 5 — Resolve open questions (conditional grill)

If Explore returned a non-empty **Open Questions** list, ask them before proposing. Use `AskUserQuestion` — one question per branch, with concrete options derived from Explore's findings (and an implicit "Other" escape hatch).

Skip this step entirely if Explore returned no open questions. Do not invent questions just to ask them — most trivial bugs have a fully-determined fix shape and need no grilling. The trigger is unresolved branches, not bug type.

If the user's answers reveal additional contract decisions, loop once: re-ask Explore (or do a focused read yourself) to confirm the chosen branch is implementable, then proceed. Do not loop more than once — if the contract is still unsettled after one round, that itself is a blast-radius signal: recommend escalation in Step 6.

### Step 6 — Propose

Present to the user, in chat:

1. **Findings**: one or two paragraphs of what Explore found (root cause for bugs, orientation for enhancements)
2. **Sibling symptoms** (if Explore surfaced any): list them. Ask the user explicitly: *"Bundle these into one issue, file separately, or ignore?"* Default recommendation: bundle if they share a root cause; file separately if they're independent symptoms that just happened to surface during the same trace.
3. **Behavior contract — Current vs Desired**: a two-column table built from the surface map (one row per observable behavior on the affected surface). Left column = current behavior (from Explore). Right column = desired behavior (from the report + grill answers + your inference). The **desired** column is the source of truth — currently-correct behaviors get a desired entry that says "unchanged" so the fix's non-regression envelope is explicit. If a desired entry is unknown after the grill, mark it `?` and ask once more — do not file with `?` rows. This is the artifact the user signs off on; the AC list in Step 8 is derived from the Desired column, not invented separately.

   **Inventory completeness gate.** After presenting the table, ask the user one explicit question before continuing: *"Is this list of behaviors complete, or am I missing any responsibility of this control/feature?"* Do not move to Step 7 until the user confirms completeness or supplies additions. If they add rows, fold them in (re-run a focused Explore trace for any new rows that need code grounding) and re-present. This gate is the last line of defense against shipping a fix that regresses a behavior the agent never knew existed.
4. **Proposed approach**: the shape of the fix/change — modules touched, contracts affected, key invariants. Do NOT include code or line numbers.
5. **Blast-radius assessment**:
   - If **no signals tripped** → "This fits a single-issue/single-PR flow."
   - If **one or more signals tripped** → list them by name and recommend escalation:

     > "This looks bigger than a single-issue ship. Tripped signals: \<list\>. **Recommended:** stop here and run `/write-a-prd` — I'll seed it with the investigation findings so the interview can skip the parts I already covered."

### Step 7 — User gate

Wait for the user's decision. Three valid responses:

- **Proceed (light flow)** — go to Step 8
- **Escalate to PRD flow** — go to Step 9
- **Abort** — stop; do not write any artifact

If the user is silent or asks clarifying questions, answer them and re-present the gate. Do not auto-decide.

### Step 8 — Light flow: create the GitHub issue

Pick the template by report shape (final classification after Explore):

#### Bug template

```markdown
## Problem

**Actual behavior:** <what happens now>

**Expected behavior:** <what should happen>

**Reproduction:**
1. <step>
2. <step>
3. <step>

## Root Cause Analysis

<2–5 sentences describing the code path and why it produces the wrong behavior. Describe modules, contracts, and behaviors — NOT file paths or line numbers. The issue must remain useful after refactors.>

## Behavior Contract (Current vs Desired)

| Behavior | Current | Desired |
|---|---|---|
| <surface behavior 1> | <what it does today> | <what it must do after the fix — or "unchanged"> |
| <surface behavior 2> | ... | ... |

The Desired column defines the fix envelope. "Unchanged" entries are the non-regression contract. ACs below derive from the Desired column.

## TDD Fix Plan

1. **RED**: <test that captures the broken behavior>
   **GREEN**: <minimal change to make it pass>
2. **RED**: <next test>
   **GREEN**: <change>
...

**REFACTOR**: <cleanup, if any>

## Acceptance Criteria

- [ ] <criterion 1>
- [ ] <criterion 2>
- [ ] All new tests pass
- [ ] Existing tests still pass
- [ ] Documentation updated where affected
```

#### Enhancement template

```markdown
## Motivation

<2–4 sentences: what user pain or product gap drives this? Reference personas/JTBDs from `docs/ux-foundations.md` if relevant.>

## Scope

**In scope:**
- <item>
- <item>

**Out of scope:**
- <item>

## Design Note

<2–5 sentences on the shape of the change — which modules, which contracts, which invariants. No file paths or code. Reference relevant ADRs and feature READMEs.>

## Behavior Contract (Current vs Desired)

| Behavior | Current | Desired |
|---|---|---|
| <surface behavior 1> | <what it does today> | <what it must do after the change — or "unchanged"> |
| <surface behavior 2> | ... | ... |

The Desired column defines the change envelope. "Unchanged" entries are the non-regression contract. ACs below derive from the Desired column.

## TDD Plan

1. **RED**: <test that expresses one AC>
   **GREEN**: <minimal change to make it pass>
2. **RED**: <next>
   **GREEN**: <change>
...

## Acceptance Criteria

- [ ] <criterion 1>
- [ ] <criterion 2>
- [ ] All new tests pass
- [ ] Existing tests still pass
- [ ] Documentation updated where affected
```

Create the issue:

```bash
gh issue create \
  --title "<short imperative title>" \
  --label <bug|enhancement> \
  --body-file <scratch-path>
```

Title style: imperative, lowercase except proper nouns, no trailing period. Examples: `Show prices in EUR on homepage`, `Fix duplicate categories after frontier reset`.

Print the issue URL and tell the user:

> Logged issue #\<n\>. Run `/ship-issue <n>` to autonomously implement, review, and merge.

### Step 9 — Escalation: write PRD seed

Derive a slug from the proposed title: lowercase, non-alphanum → `-`, collapse, trim, cap 40.

Write `specs/seed-<slug>.md`:

```markdown
---
type: prd-seed
created: <ISO 8601 timestamp>
source: /log-issue
triggered_signals:
  - <signal-name>
  - <signal-name>
---

# Seed: <one-line summary>

## Original report

<user's verbatim description from Step 1>

## Investigation findings

<Explore output, fully captured. Code paths traced, slices touched, root cause if bug, current behavior if enhancement. This is the expensive part — preserve it verbatim.>

## Behavior Contract (Current vs Desired)

| Behavior | Current | Desired |
|---|---|---|
| <surface behavior 1> | <what it does today> | <what it must do — or "unchanged" / "?"> |
| <surface behavior 2> | ... | ... |

Carry over the table presented to the user in Step 6. Rows still marked `?` are open contract questions for the PRD interview to resolve.

## Why this escalated

- **<signal-name>**: <one-sentence justification>
- **<signal-name>**: <one-sentence justification>

## Proposed approach (high-level)

<2–4 sentences on the shape of the work — not a full design, just the direction.>

## Open questions for the PRD

- <question Explore couldn't resolve>
- <question requiring user input>
- <question about scope boundary>
```

Print the seed path and tell the user:

> Wrote `specs/seed-<slug>.md`. Run `/write-a-prd` — it will detect this seed and skip the interview questions already covered.

Stop. Do not chain to `/write-a-prd` automatically — the user invokes it explicitly. This preserves the user-gated ceremony transition.

## Critical Rules

1. **Never create a GitHub issue without the user gate.** The HITL gate sits between Propose (Step 6) and Create (Step 8).
2. **Never auto-escalate.** Blast-radius signals trigger a *recommendation*, not an action. The user picks light or PRD flow.
3. **Never chain to `/write-a-prd` automatically.** Write the seed and stop. Ceremony transitions are user-gated.
4. **Use the existing classification labels** (`bug`, `enhancement`) when creating GH issues. If a label is missing, create it: `gh label create bug --color d73a4a` or `gh label create enhancement --color a2eeef`.
5. **Issue body must describe behaviors and contracts**, not file paths or line numbers. The issue should survive a major refactor.
6. **Never invent Acceptance Criteria the user didn't agree to.** If you proposed an AC and the user pushed back, drop it.
7. **Seed files are ephemeral.** They live in `specs/seed-*.md`. `/write-a-prd` deletes them after consumption.
8. **One issue per invocation.** If the user describes two unrelated problems, ask which to log first; suggest they re-invoke for the second.
9. **Explore is mandatory.** Do not skip it even if the user describes a "trivial" fix — the blast-radius assessment depends on it.
10. **Verify cross-module claims.** Any claim in the RCA about behavior of code Explore did not modify (e.g. "the backend already does X", "the cache already invalidates Y") must cite the file/symbol Explore actually inspected to confirm it. Unverified cross-module assumptions are forbidden — they are the failure mode that produced the homepage URL bug cascade.
11. **State-shaped bugs require full pipeline trace.** For URL/persisted/store/event-state bugs, Explore must trace encoder + decoder + consumer, not just the symptomatic side. See Step 3.
12. **Surface sibling symptoms, never silently drop them.** If Explore noticed broken behavior the user didn't report on the same pipeline, it goes in the Step 6 presentation. The user decides bundle/split/ignore.
13. **Behavior contract before AC.** Every issue body has a Current vs Desired table covering the full surface map (not just the broken row). ACs are derived from the Desired column — never invented independently. Adjacent surface behaviors that must stay unchanged get an explicit "unchanged" Desired entry so the non-regression envelope is part of the contract.
14. **Surface inventory is agent-first, user-verified.** Explore enumerates the affected surface aggressively along the axes listed in Step 3 (local pane, other panes, URL, persistence, fetching, a11y, boundary states) — including behaviors that "obviously aren't affected". Step 6 then presents that list to the user with an explicit completeness gate: *"Am I missing any responsibility of this control?"* The user is the final authority, but reacts to a prompted list rather than recalling from cold. The order is load-bearing: cold-recall surface inventories miss the most important behaviors; recognition against a thorough enumeration does not. A thin agent enumeration defeats the gate, so Step 3 demands the list be exhaustive even when that feels redundant.

## Edge Cases

- **User describes a problem with no clear bug or enhancement framing** → run Explore anyway; classification falls out of findings
- **Explore reveals the reported "bug" is actually working as designed** → present that finding in Step 5; user may abort or reframe as an enhancement
- **Explore can't find the code path** → present findings honestly ("could not locate"); ask the user for additional context before proposing
- **Multiple signals trip but user wants to proceed with light flow anyway** → respect the override; create the GH issue; note in the issue body under a `## Note` section that signals were tripped and overridden, so `/ship-issue` can use that context
- **User asks "what's the difference between this and `/write-a-prd`?"** → light flow = one issue, one PR, autonomous merge via `/ship-issue`. PRD flow = multi-issue feature with `/ship-feature` orchestration. Ceremony scales with blast radius.
- **A `specs/seed-*.md` already exists for similar work** → flag it to the user; ask whether to merge into the existing seed or write a new one
- **`/triage-issue` invoked instead** → `/triage-issue` is superseded; tell the user to run `/log-issue`

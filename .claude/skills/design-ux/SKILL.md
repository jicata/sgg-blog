---
name: design-ux
description: Design and reason about UX, grounded in `docs/ux-foundations.md`. Two modes — DESIGN (interview the user and produce/update a `specs/UX-*.md`) and EVALUATE (answer "should we do X for UX?" / "is Y a good idea?" / review an existing surface). Use when the user wants to design a feature's UX, structure a new mode (cooking, DIY, fashion, etc.), decide entry points and user flows, or asks any UX-shaped question ("should we…", "what should the flow look like", "how should this feel", "is this good UX").
---

This skill governs all UX work in this project. It forces the design tree to be walked deliberately — user goal → entry point → core loop → trade-offs → spec — instead of leaping to wireframes or components, **and** it grounds every decision in the durable foundations doc rather than re-deriving personas, JTBDs, and principles per feature.

Follow the documentation-first methodology in `.claude/rules/documentation-creator.md` and `.claude/rules/documentation-first-understanding.md`. Personas, JTBDs, and interaction principles live in `docs/ux-foundations.md` — never invent them inline.

The DESIGN-mode output is a UX spec markdown saved to `specs/UX-<feature-name>.md` that the user can hand to `/write-a-prd`, `/prd-to-issues`, or `frontend-architect`.

## 0. Always-load grounding (every invocation, both modes)

Before any UX reasoning:

1. **Read `docs/ux-foundations.md`.** This is the durable source of personas, JTBD library, interaction principles, target audience, and the shared mode skeleton. If it does not exist, jump to the **Bootstrap** section below — you must build foundations before designing or evaluating anything.
2. **Read project memory** for the product thesis ("modes over the catalog" — see `project_product_thesis_modes.md`) and the strategic anchor (the Mapping Corpus). Any UX work must be argued *with respect to* that thesis. If a feature contradicts it, surface that explicitly.
3. **Read `docs/overview.md` and `docs/UBIQUITOUS_LANGUAGE.md`** to anchor terminology. Don't invent synonyms for existing domain entities.
4. **Read any `specs/UX-*.md`** relevant to the question. If the user is designing a new mode, scan all existing UX specs to ensure the new mode is consistent with shipped/in-design ones.
5. If the question concerns a shipped feature, also load the relevant `Features/{Name}/README.md` and `docs/flows/*.md`.

## 1. Decide which mode you're in

- **DESIGN mode** — user wants a new or updated UX spec. Triggers: "design the UX of…", "structure the new mode for…", "what should the flow look like for…". Output: `specs/UX-{feature}.md` written/updated.
- **EVALUATE mode** — user is asking a UX-shaped question without intending to author a spec. Triggers: "should we do X to better the UX?", "is Y a good idea?", "how does this affect users?", "review the cook home for me". Output: a structured verdict in chat, optionally a recommended change to a UX spec or to foundations. **No file is written by default.**

When ambiguous, ask the user once which mode they want.

---

## 2. DESIGN mode

### Grounding rules — non-negotiable

- The spec's "User & JTBD" section names *which* persona(s) from `docs/ux-foundations.md` and which JTBD ID(s) the feature serves. Do **not** restate persona descriptions or JTBD statements inline.
- The "Fit with product thesis" section cites principles by name (e.g., *Modes over the catalog*, *Zero-friction landing*) instead of redefining them.
- The "Trade-offs decided" table must, for each row, be evaluable against a foundations principle. If a trade-off contradicts a principle, that row's "Why" column must justify the deviation explicitly.
- If a new mode is being designed, fill the mode-skeleton slot mapping (catalog input, intent vocabulary, LLM-as-bridge, outcome unit, refinement affordance, exit action).
- If during design you find yourself wanting to write something foundational (a new persona, a new principle, a new JTBD, a new mode-skeleton slot), **stop and update `docs/ux-foundations.md` first.** Then return to the spec.

### The interview (do not skip)

Walk the user through these branches *one at a time*. Resolve each before moving on. Push back when answers are vague — *"users want to find recipes"* is not a goal; *"a user with chicken in the fridge wants to find a recipe that uses what's on sale this week"* is.

#### 1. User & Job-To-Be-Done
- Which persona from `docs/ux-foundations.md` does this serve? (Pick a sharp one — not "everyone.")
- Which JTBD ID does this serve? Frame as the foundations format: *"When [situation], I want to [motivation], so I can [outcome]."* If the job isn't in the library, propose adding it to foundations first.
- What are users doing *today* without this feature? What's painful about it?
- What's the success signal — what would make them say "yes, this worked"?

#### 2. Fit with product thesis
- How does this feature express the foundations principle *Modes over the catalog*?
- What does it contribute to (or extract from) the Mapping Corpus? (Note: foundations principle *Read-only on the corpus* says modes are consumers, not writers.)
- Is it a *mode* (a lens over the catalog) or a *tool* (a utility orthogonal to the catalog)? Different shapes.

#### 3. Entry point
- Where does the user *enter* this feature from? (Home? Search? A retailer page? A push notification?)
- Is the entry point persistent (a tab, a nav item) or contextual (a CTA in another flow)?
- What does the user see in the first 2 seconds? State the screen in one sentence. (Apply principle *Zero-friction landing*.)

#### 4. Core loop
- What is the *single* repeating action the user takes inside this feature? (Browsing recipes, swiping cards, building a list, comparing offers...)
- What's the input → output of one loop iteration?
- What keeps them in the loop? What ends it? (Apply principle *Leave for the store* — the natural exit is success, not failure.)
- Sketch the loop as 3–6 steps. No more.

#### 5. Information density & navigation
- What's the primary unit of content? (Recipe card? Offer? Retailer? Ingredient?)
- How many of these does the user see at once? Why that number? (Apply principle *Decisiveness over completeness*.)
- How do they move between units — scroll, swipe, tabs, search, filter?
- What's hidden behind a tap vs. shown upfront? Defend each hide.

#### 6. State & memory
- What does the feature remember between sessions? (Saved recipes, dismissed offers, pantry contents, dietary prefs...)
- What's ephemeral and resets? Why?
- Where does that state live — device, account, both? (Apply principle *Silent grounding* — infer rather than asking.)

#### 7. Trade-offs (force a decision on each)
Present at least two options with trade-offs. Don't let the user pick "both." Examples:
- **Discoverability vs. focus**: prominent search bar (discoverable, but admits the user doesn't know what they want) vs. curated feed (focused, but limits exploration).
- **Breadth vs. depth**: show every retailer's offers (breadth, more noise) vs. one personalized retailer at a time (depth, risk of feeling thin).
- **Editorial vs. algorithmic**: hand-picked recipe collections (trust, doesn't scale) vs. ranked by Mapping Corpus signals (scales, cold-start problem).
- **Action-first vs. browse-first**: open into a "what can I cook tonight?" prompt (action) vs. open into a recipe gallery (browse).

For each trade-off, the chosen option must be checkable against a foundations principle. If it violates one, explain why explicitly.

#### 8. Failure & empty states
- What does the screen look like with zero data? (New user, no offers in their region, no matching recipes...)
- What does it look like when something errors?
- What does it look like when the user has *too much* data and is overwhelmed?

#### 9. Out of scope
- What is this feature explicitly *not* doing in v1?
- What's a tempting add-on you're going to refuse? Why?

### After the interview

1. **Walk the design back to the user as a story.** "A user opens the app on Tuesday evening. They tap the Cooking tab. They see…" — narrate the happy path in 6–10 sentences. If the user objects, you missed something; loop back.
2. **List the open questions.** Anything you and the user could not resolve goes here, not into the spec.
3. **Run the rot test on the draft:** for each sentence, ask *"could this become wrong without this spec being touched?"* If yes, hoist to `docs/ux-foundations.md` and link.
4. **Write the UX spec** to `specs/UX-<feature-name>.md` using the template below.
5. **Add `docs/ux-foundations.md` to the spec's "Related documentation"** section as the grounding source.
6. **Offer the next step.** Usually `/write-a-prd` to convert the UX spec into a PRD. Don't run it automatically.

### UX spec template

```markdown
# UX Spec: <Feature Name>

> Grounded in [`docs/ux-foundations.md`](../docs/ux-foundations.md). Personas, JTBDs, and principles are referenced by name/ID — not restated here.

## User & JTBD
- **Persona served:** <persona name from foundations>
- **Job served:** **JTBD-<ID>** — <one-line restatement>
- **Today's workaround:** <what the user does without this>
- **Success signal:** <what "this worked" looks like>

## Fit with product thesis
<One paragraph: how this expresses *Modes over the catalog* and what it gives to / takes from the Mapping Corpus. Cite principles by name. If the feature contradicts the thesis, say so explicitly and explain why we're building it anyway.>

## Mode skeleton (for new modes)
| Slot | This mode |
|---|---|
| Catalog input | <slice of catalog consumed> |
| Intent vocabulary | <user-facing categories> |
| LLM-as-bridge | <reasoning step> |
| Outcome unit | <atomic content card> |
| Refinement affordance | <how user redirects> |
| Exit action | <success state> |

## Entry point
- **Where from:** <home tab / search / contextual CTA / notification>
- **Persistence:** <persistent nav | contextual>
- **First 2 seconds:** <one sentence describing the opening screen>

## Core loop
1. <step>
2. <step>
3. <step>
(3–6 steps max)

- **Loop input:** <what the user brings>
- **Loop output:** <what the user gets>
- **Why they stay:** <the engagement hook>
- **Why they leave:** <the natural exit, ideally aligned with *Leave for the store*>

## Primary content unit
- **Unit:** <e.g., recipe card>
- **Density:** <N visible at once, why — cite *Decisiveness over completeness*>
- **Hidden behind tap:** <list, with one-line justification each>

## State & memory
| What | Persisted? | Where |
|---|---|---|
| <thing> | yes/no | device / account |

## Trade-offs decided
| Decision | Chosen | Rejected | Why (cite principle) |
|---|---|---|---|
| <axis> | <option> | <option> | <one-line rationale, naming the foundations principle it upholds or justifying the deviation> |

## Empty / error / overload states
- **Empty:** <what the user sees with no data>
- **Error:** <what they see when something fails>
- **Overload:** <what they see when there's too much>

## Out of scope (v1)
- <thing we are deliberately not doing>

## Open questions
- <unresolved item>

## Next steps
- [ ] Convert to PRD via `/write-a-prd`
- [ ] Hand to `frontend-architect` for component decomposition
- [ ] Validate with <N> users before building

## Related documentation
- [UX Foundations](../docs/ux-foundations.md) — **this spec grounds in this document.**
- <other links: feature READMEs, flows, related research>
```

---

## 3. EVALUATE mode

This is the high-frequency case. The user asks a UX question; your job is to answer it grounded in foundations, not in vibes.

**Output structure** (use this verbatim as the response shape):

```
**Persona affected:** [which persona(s) from foundations]
**JTBD touched:** [JTBD-ID(s) and one-line restatement]
**Principles upheld:** [which principles the change supports]
**Principles in tension:** [which principles the change conflicts with, if any]
**Trade-off:** [what the user gives up vs. gains]
**Verdict:** [recommend / recommend with caveats / push back]
**If shipped, where to update:** [which `specs/UX-*.md` trade-off table needs revisiting; whether `docs/ux-foundations.md` needs an update]
```

**Gap-flagging:** if the question can't be answered cleanly from foundations because:
- a relevant persona isn't listed, or
- the underlying job isn't in the JTBD library, or
- the question hinges on a principle that doesn't exist yet,

then **do not invent the missing piece in the answer.** Say so explicitly: *"This question would extend foundations — specifically [persona / JTBD / principle X]. I recommend updating `docs/ux-foundations.md` first; want me to draft that addition?"* Convert ad-hoc UX decisions into deliberate updates of the foundations doc.

**Cross-spec consistency check:** if the answer contradicts a row in an existing `specs/UX-*.md` trade-offs table, surface it: *"This conflicts with the [feature] spec's decision on [topic] — was that decision revisited?"*

---

## 4. Bootstrap (foundations doesn't exist)

If `docs/ux-foundations.md` is missing on first invocation:

1. Tell the user the skill cannot proceed without foundations and that the first run will build them.
2. Interview to extract: target audience, primary persona(s), recurring JTBDs, interaction principles, mode-skeleton slots.
3. Use existing `specs/UX-*.md` files (if any) as a source by extracting their inline persona/JTBD/principle content into foundations, then leave a note that those specs should be slimmed to reference the new foundations doc.
4. Save to `docs/ux-foundations.md`. Then proceed to the original DESIGN or EVALUATE request.

## 5. Foundations updates (any mode)

When the work reveals that foundations needs an update (new persona, new JTBD, refined principle):

1. Make the foundations update its own deliberate step — propose the diff to the user, confirm, then save.
2. After foundations is updated, re-evaluate whether existing `specs/UX-*.md` files need slimming or re-grounding to match.
3. Note the foundations change in the spec or evaluation that triggered it.

## 6. Anti-patterns to refuse

- **Writing persona/JTBD/principle content inside a `specs/UX-*.md`.** Foundations is the single source of truth.
- **Answering "should we do X?" without loading foundations.** Vibes-based answers drift from stated commitments.
- **Inventing a persona** to justify a feature instead of grounding in the existing personas.
- **Adding a trade-off row that violates a principle** without an explicit justification in the row's "Why" column.
- **Writing a UX spec for a mode without filling out the mode-skeleton slot mapping.**
- **Designing components before flows.** If the user starts naming buttons, redirect to the loop.
- **Skipping the JTBD.** "It's like Yuka but for groceries" is not a JTBD.
- **"Both" answers on trade-offs.** Force a choice. The whole point is to commit.
- **Wireframes in the spec.** Words first. Wireframes are downstream.
- **Designing for a hypothetical future user.** Design for the sharp persona in foundations. Future users get future iterations (and possibly future personas added to foundations).
- **Pretending memory and foundations don't exist.** Always load both before starting.

## 7. Handoff

After a DESIGN mode run completes, the natural next step is `/write-a-prd` using `specs/UX-{feature}.md` as the input. Tell the user this explicitly.

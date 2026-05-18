---
name: write-a-prd
description: Create a PRD through user interview, codebase exploration, and module design, then submit as a GitHub issue. Use when user wants to write a PRD, create a product requirements document, or plan a new feature.
---

This skill will be invoked when the user wants to create a PRD. You may skip steps if you don't consider them necessary, but still confirm your understading with the user before continuing

### Step 0 — Check for a PRD seed (from `/log-issue` escalation)

Before asking the user anything, check for an existing seed file written by `/log-issue` when an investigation revealed the work was too big for a single-issue flow:

```bash
ls specs/seed-*.md 2>/dev/null
```

For each seed file, read the frontmatter and confirm `type: prd-seed`.

- **Exactly one seed exists** → present its summary to the user and ask: *"Found `specs/seed-<slug>.md` from `/log-issue` (created \<date\>, triggered by: \<signals\>). Use it as the starting point for this PRD? [Y/n]"*
- **Multiple seeds exist** → list them with creation dates and triggered signals; ask the user which to consume (or "none")
- **No seed exists, or user declines** → proceed to Step 1 cold

If the user consumes a seed:
- The seed's **Original report**, **Investigation findings**, and **Why this escalated** sections become input context for Step 2 (codebase exploration) — you've already done much of this work, so verify rather than re-explore from scratch
- The seed's **Proposed approach (high-level)** becomes the starting point for Step 4 (module sketch) — refine it, don't re-derive it
- The seed's **Open questions for the PRD** section becomes the **interview agenda** for Step 3 — these are the questions Explore couldn't answer alone
- After the PRD GitHub issue is created successfully in Step 5, **delete the seed file**:
  ```bash
  git rm specs/seed-<slug>.md
  ```
  Seed files are ephemeral per the `specs/` lifecycle rule in `.claude/rules/documentation-creator.md` — they retire on consumption, just like PLAN files retire on ship.

1. Ask the user for a long, detailed description of the problem they want to solve and any potential ideas for solutions.

   (If a seed was consumed in Step 0, you already have this in the seed's "Original report" section — confirm with the user that the original framing still holds and skip ahead.)

2. Explore the repo to verify their assertions and understand the current state of the codebase.

3. Interview the user relentlessly about every aspect of this plan until you reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one.

4. ALWAYS Sketch out the major modules you will need to build or modify to complete the implementation. Actively look for opportunities to extract deep modules that can be tested in isolation.

A deep module (as opposed to a shallow module) is one which encapsulates a lot of functionality in a simple, testable interface which rarely changes.

Check with the user that these modules match their expectations. Check with the user which modules they want tests written for.

5. Once you have a complete understanding of the problem and solution, use the template below to write the PRD. The PRD should be submitted as a GitHub issue. Prefix the issues with "PRD:"

<prd-template>

## Problem Statement

The problem that the user is facing, from the user's perspective.

## Solution

The solution to the problem, from the user's perspective.

## User Stories

A LONG, numbered list of user stories. Each user story should be in the format of:

1. As an <actor>, I want a <feature>, so that <benefit>

<user-story-example>
1. As a mobile bank customer, I want to see balance on my accounts, so that I can make better informed decisions about my spending
</user-story-example>

This list of user stories should be extremely extensive and cover all aspects of the feature.

## Implementation Decisions

A list of implementation decisions that were made. This can include:

- The modules that will be built/modified
- The interfaces of those modules that will be modified
- Technical clarifications from the developer
- Architectural decisions
- Schema changes
- API contracts
- Specific interactions

Do NOT include specific file paths or code snippets. They may end up being outdated very quickly.

## Testing Decisions

A list of testing decisions that were made. Include:

- A description of what makes a good test (only test external behavior, not implementation details)
- Which modules will be tested
- Prior art for the tests (i.e. similar types of tests in the codebase)

## Out of Scope

A description of the things that are out of scope for this PRD.

## Further Notes

Any further notes about the feature.

## Further Notes

Documentation that will be affected by the implementation of this PRD

</prd-template>
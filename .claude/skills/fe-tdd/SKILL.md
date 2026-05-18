---
name: fe-tdd
description: Enforces frontend architectural standards, component/page boundaries, and Test-Driven Development for React/TypeScript work. Use when making frontend code changes, building new pages or components, or doing red-green-refactor TDD in the frontend.
---

# Frontend Architecture + TDD

## Instructions

**Before doing ANY work**, read and fully internalize the skill and rule files listed below. Do not proceed until you have read and understood every file.

### Skill 1: Meta Coding Guidelines

Read all of the following rule files:

- `.claude/skills/karpathy-guidelines/SKILL.md` — General approach to your coding


### Skill 2: TDD (Test-Driven Development)

Read all of the following files in the `tdd` skill directory:

- `.cursor/skills/tdd/SKILL.md` — Core TDD philosophy and red-green-refactor workflow
- `.cursor/skills/tdd/tests.md` — Test examples and patterns
- `.cursor/skills/tdd/mocking.md` — Mocking guidelines
- `.cursor/skills/tdd/deep-modules.md` — Deep module design for testability
- `.cursor/skills/tdd/interface-design.md` — Interface design principles
- `.cursor/skills/tdd/refactoring.md` — Refactoring candidates and approach

### Skill 3: Frontend Architecture + Implementation

Read all of the following rule files:

- `.cursor/rules/frontend-architect.md` — Folder structure, page/component split, data ownership, state placement
- `.cursor/rules/frontend-developer.md` — Implementation standards: performance, accessibility, styling, component quality

### Conflict Resolution

If guidance conflicts between the rules, prefer:
- `frontend-architect.md` for structural decisions (where code lives, what owns data, how state is scoped)
- `frontend-developer.md` for implementation details (how a component is written once its place is decided)
- TDD's behavior-driven testing approach for test design — test user-visible behavior, not implementation details

### Execution

Once both skills are fully understood, execute the user's task applying all three lenses simultaneously:
- **Architecture** for folder layout and data ownership
- **Developer standards** for performance, a11y, and styling
- **TDD** for the red-green-refactor loop

When implementation is complete, invoke `/enforce-documentation` to update ADRs, feature READMEs, flows, and the roadmap.

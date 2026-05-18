---
name: vsa-tdd
description: Enforces .NET backend coding standards, Vertical Slice Architecture, and Test-Driven Development. Use when making C#/.NET code changes, building new feature slices, writing tests, or doing red-green-refactor TDD.
---

# VSA + TDD (.NET Backend)

## Instructions

**Before doing ANY work**, read and fully internalize all three skill definitions below. Do not proceed until you have read and understood every file listed.

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

### Skill 3: VSA + .NET Backend

Read all of the following rule files:

- `.claude/rules/net-backend-master.md` — .NET coding standards
- `.claude/rules/vertical-slice-architecture-specialist.md` — VSA structure and principles

### Conflict Resolution

If any guidance conflicts among the three skills, prefer VSA isolation and feature-first structure for code organization, and TDD's behavior-driven testing approach for test design.

### Execution

Once all three skills are fully understood, execute the user's task applying all three simultaneously: VSA for code structure, .NET rules for code style, and TDD for the development loop.

When implementation is complete, invoke `/enforce-documentation` to update ADRs, feature READMEs, flows, and roadmap.

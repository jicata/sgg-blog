---
name: coder-lens
description: The composite lens every coder run loads before writing code in this repo — routing from changed paths to the doctrine and skills that govern them. Use when implementing any change to pages, layouts, components, content collections, styles, or the deploy workflow.
---

# Coder lens — SvetlinGalovBlog

**GENERATED.** This is a manifest: which installed files a coder run loads, and when. It holds no rules of its own. Rules live in `.claude/doctrine/`; repo facts and scars live in `.claude/doctrine/project-profile.md`. Regenerate via `/skill-sync` when the installed set changes.

## Always load, before any code

1. `.claude/doctrine/project-profile.md` — repo facts, `check_commands`, and the constraints that override everything below. Read **Transition** first while the revamp is in flight.
2. `.claude/doctrine/00-doctrine-index.md` — the routing table this lens mirrors.
3. `.claude/skills/karpathy-guidelines/SKILL.md` — general coding approach.
4. `.claude/skills/codebase-design/SKILL.md` — module depth and clean seams (applies to layouts and helpers even in a static site).

`.claude/skills/tdd/SKILL.md` is installed but is **not** in the always-load set: this repo has no unit-test runner by decision (profile → Testing). Load it only when a change introduces behaviour worth a test, and say so in the PR.

## Then load by what you are changing

| Changing | Also load |
| --- | --- |
| Anything under `src/pages/`, `src/layouts/`, `src/components/` | `.claude/doctrine/arch-frontend.md` (structure: page vs component, promotion rule) + profile → Frontend (Astro idiom, zero-JS default, tokens) |
| A post or project under `src/content/`, or `src/content.config.ts` | profile → Content (frontmatter contract, draft filtering, the ADR gate on schema changes) |
| The global stylesheet or any style | profile → Frontend (tokens only) + `specs/design-handoff/design-spec.md` (the token source) |
| `.github/workflows/**`, `astro.config.*`, `public/CNAME` | profile → Deploy & environments |
| Anything under `docs/` | `.claude/doctrine/documentation-first.md` + profile → Documentation (the lean canon; the ADR gate) |

## Conflict resolution

- **Profile beats doctrine.** A constraint in `project-profile.md` is this repo's recorded reality; a base doctrine file is the generic default.
- **Architecture wins on placement, the profile carries idiom.** Where a file lives and who owns data: `arch-frontend.md`. How Astro code is written: profile → Frontend, because no `frontend-astro.md` core exists yet (`.claude/doctrine/AXES.md` explains why it is not authored here).
- **Simplicity is a requirement, not a preference.** Any client script, framework island, dependency, or build step beyond Astro's defaults is declared by name in the issue or PR before it is written (profile → Working style).

## Definition of done

`npm run build` exits 0 — that is `astro check` (types + content schemas) plus `astro build`. For a layout or styling change, the PR body records which pages were viewed in `npm run preview` at desktop and phone width (profile → Testing).

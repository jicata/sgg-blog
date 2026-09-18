# Doctrine Index — SvetlinGalovBlog

**GENERATED.** This is a manifest over what `.claude/doctrine/` actually contains — not prose. Regenerate it when doctrine is added, removed, or renamed (`/skill-sync`). Do not hand-write rules here; they belong in a doctrine file or in `project-profile.md`.

## Always on

Only `CLAUDE.md` is harness-loaded. These files earn a line there; the line is the loading path, this table is the reason.

| File | How it reaches context |
| --- | --- |
| `project-profile.md` | `CLAUDE.md` names it as the first read of every session. The overlay: repo facts + scar tissue. |
| `surface-dont-chase.md` | Its one-line form is inlined in `CLAUDE.md` → Never; the file carries the contract. |
| `how-to-explain.md` | Its one-line form is inlined in `CLAUDE.md`; the file carries the shape and the exemplar. |

## Load on trigger

| Trigger — what you are about to do | Load |
| --- | --- |
| Write or change **anything under `src/`** (pages, layouts, components, content) | `arch-frontend.md` (structure) + profile → Frontend, Content. There is no Astro framework core — profile → Frontend carries the idiom |
| Add, rename, or reshape a **content collection or its schema** | profile → Content (the ADR gate on schema changes) |
| Understand a prompt, answer a "how does X work" question, or plan a change | `documentation-first.md` — glossary → ADRs → architecture map, before the code |
| **Review** a PR (Standards axis) | `fowler-smell-baseline.md` + whichever of the above match the changed paths |
| Author or edit **an `arch-*`, `backend-*` or `frontend-*` doctrine core** | `AXES.md` — cores never name a peer on another axis; raise gaps via `/skill-sync`, never author a core here |
| Write or edit **a skill, agent, or doctrine file** | `writing-skills.md` + `writing-skills-glossary.md` |
| Explain a change, write a teaching briefing, or justify an approach in prose | `how-to-explain.md` + profile → Working style |
| Name a domain concept, or argue about what something should be called | profile → Domain language + `docs/UBIQUITOUS_LANGUAGE.md` |

## Routing by changed path (for the review skills)

> Enforced natively by `.claude/rules/*.md`, each carrying `paths:` frontmatter, so Claude Code loads the matching rule the moment it reads a file in that path. This table is the reviewer's explicit checklist and the source of truth if the two disagree.

| Path | Rule | Doctrine |
| --- | --- | --- |
| `src/**` (`.astro`, `.ts`, `.css`) | `rules/site.md` | `arch-frontend.md` + profile → Frontend |
| `src/content/**/*.md`, `src/content/**/*.mdx`, `src/content.config.ts` | `rules/content.md` | profile → Content |
| `.claude/**/*.md` | `rules/skill-authoring.md` | `writing-skills.md` |
| `docs/**` | `rules/docs.md` | `documentation-first.md` + profile → Documentation |

## Known base-library gaps

| Gap | Effect here | Raised |
| --- | --- | --- |
| No `frontend-astro.md` framework core | `arch-frontend.md` installs alone; Astro idiom lives in profile → Frontend until upstream has a core | To raise via `/skill-sync` — not yet filed |
| No architecture core for a no-backend repo | `architecture_core: none`; `AXES.md` installed for the tie-break rule only | Not a real gap — nothing to place |

## Not installed, and why

`arch-vsa.md`, `arch-clean.md`, `arch-onion.md`, `arch-layered.md`, `backend-dotnet.md`, `backend-python.md`, `frontend-react.md`, `frontend-vue.md`, `relational-persistence.md`, `llm-prompt-craft.md` — no backend, no database, no framework runtime, no model calls. If the site ever grows any of these, re-run the relevant `/setup` question and copy the core verbatim from the base library.

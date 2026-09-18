# SvetlinGalovBlog

Personal portfolio + blog for a senior backend tech lead. **Stack: Astro static site** — Markdown posts in `src/content/posts/`, plain CSS tokens, zero client JS by default, deployed to GitHub Pages from `main`.

## Where the rules actually live

- **`.claude/doctrine/project-profile.md`** — this repo's constraints, each with the incident behind it. Read it first every session. It is the only writable skill surface; base files under `.claude/skills/` and `.claude/doctrine/` install verbatim from `jicata/skills`.
- **`.claude/doctrine/00-doctrine-index.md`** — which doctrine governs which activity.
- **`.claude/rules/`** — path-scoped; loaded automatically when a matching file is opened.
- Don't know which skill fits → `/ask-svet`.

## Canon — three durable documents

- **`docs/UBIQUITOUS_LANGUAGE.md`** — what things are called. Post, Project, Page, Component, Design token.
- **`docs/adr/`** — why hard-to-reverse decisions were made. Gate: hard to reverse + surprising + a real trade-off.
- **`docs/architecture.md`** — the map. Positions things; does not describe them.

Feature READMEs, flow docs, roadmap, UX foundations and `specs/UX-*.md` were retired at adoption. Do not recreate them; a durable decision is an ADR or a profile constraint with evidence.

## Checks

```bash
npm run build
```

That is `astro check` + `astro build`. There is no unit-test runner by decision — do not flag its absence. Layout or styling changes are verified in `npm run preview` at desktop and phone width, recorded in the PR body.

## Never

- **Never make publishing a post require a code change.** A post is one Markdown file with frontmatter; if adding one touches a `.ts` array, a route, or an index, the design has failed the one thing the revamp exists for.
- **Never add client JavaScript, a framework island, a dependency, or a runtime without naming it in the issue first.** The old site had four runtimes for zero dynamic behaviour; simplicity is the requirement here, not a style preference.
- **Never hardcode a color, font, or spacing value.** Tokens come from the global stylesheet, ported from the locked May-2026 design; ad-hoc values are how it erodes.
- **A smell noticed in passing gets one line and an offer to log it — never a refactor.** `.claude/doctrine/surface-dont-chase.md`.
- **Explain top-down, in the map's names, for a senior backend engineer new to frontend.** `.claude/doctrine/how-to-explain.md`; profile → Working style.
- **Never paste GitHub tool input/output into the console.** Summarize.

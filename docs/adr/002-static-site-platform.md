# ADR-002: Static Site Platform — Astro, Markdown Content, GitHub Pages

**Status**: Implemented
**Governs**: cross-cutting
**Date**: 2026-09-18
**Supersedes**: ADR-001 Decision 2 (`usePageMeta`) and Decision 4 (deploy target)

## Background

PRD #1 (2026-05) launched the site as a React 19 + MUI + React Query SPA wrapped in an ASP.NET Core static-file shell, deployed to Azure App Service. ADR-001 recorded four decisions from that launch: OKLCH color tokens (Decision 1, still valid — see Design below), a custom `usePageMeta` hook for head tags (Decision 2), MDX-via-`import.meta.glob` for project discovery (Decision 3, superseded in shape but not in spirit — see Design), and Azure App Service as the deploy target (Decision 4).

Four runtimes ran a site with zero dynamic behaviour: React for interactivity nothing used, a Vite build step, a .NET host serving static files, and an Azure App Service billing every month to keep that host warm. The one capability the owner actually wanted — publish a post now and then — was never built. `/article` shipped in PRD #1 as a single hard-coded demo object; there was no post pipeline.

## Problem

The owner decided on 2026-09-18 (session recorded in project memory) to replace the runtime wholesale: "simple and fast, kinda like html only, with the ability to add new blog posts every now and then." Two requirements fell out of that:

1. Publishing a post must never require a code change — a Markdown file with frontmatter, full stop.
2. The four-runtime stack must go. Whatever replaces it should be static output with no framework island unless something on the page actually needs client-side interactivity, and nothing here does.

A secondary shift: the owner also wants the site blog-first rather than portfolio-first — Home is the post list, not a hero grid of project cards. That reshapes the IA (`/projects` and `/contact` fold into `/about`) but is a content decision, not this ADR's subject; it is recorded in `docs/architecture.md`'s route table and `docs/UBIQUITOUS_LANGUAGE.md`.

## Design

**Framework — Astro, static output.** Astro's content collections give schema-validated Markdown frontmatter (Zod, via `src/content.config.ts`) with zero client JS emitted unless a component explicitly opts in. A Post becomes exactly what the owner asked for: one file under `src/content/posts/`, validated at build time by `astro check`, filtered for `draft: true` in one query helper (`getPublishedPosts()` in `src/lib/content.ts`), never touched by a route or an index array. Astro was chosen over a hand-rolled static-site generator because content collections, the build-time `render()` API (which yields both rendered `Content` and `headings` for a table of contents with no client JS), RSS/sitemap integrations, and `astro check` are exactly the surface this site needs and nothing more.

**Content — two collections, Posts and Projects.** Both Zod-validated in `src/content.config.ts`. Schema changes are ADR-gated per profile → Content: fields are additive, and removing one requires migrating every existing entry in the same PR. The three job case studies (SoftUni, Dow Jones, VSG) and the featured "This site, agent-augmented" case study port from the old SPA's MDX files into this shape, with the VSG body replaced by a marked placeholder — its prototype text described a different company entirely and was never real copy (see PRD #21 Out of Scope). MDX support itself (`@astrojs/mdx`) was not carried over — nothing in the ported content needs JSX-in-Markdown, so both collections' loaders match `**/*.md` only.

**Head tags — Astro layout props, not a library.** ADR-001 Decision 2 chose a 60-line `usePageMeta` React hook over `react-helmet-async` because the site had few routes and no SSR. That trade-off doesn't carry over: Astro sets `<title>`, meta description, canonical, Open Graph, and Twitter tags directly in `src/layouts/Base.astro` from page props — no hook, no library, no client-side head manipulation at all, because there's no client-side anything. This ADR supersedes Decision 2 outright rather than replacing it with an equivalent; the problem it solved (avoiding a heavy head-management dependency in a React SPA) doesn't exist in a framework that renders head tags at build time.

**Deploy — GitHub Actions to GitHub Pages, not Azure App Service.** ADR-001 Decision 4 chose Azure App Service because the site needed a running .NET process. A static site has no process to run — `dist/` is a folder of HTML, CSS, and font links. GitHub Pages is free, requires no cloud account setup beyond enabling Pages on the repo, and the `withastro/action` GitHub Action (`.github/workflows/deploy.yml`) builds and publishes on every push to `main`. This supersedes Decision 4's entire rationale: the "why not Render / why not Docker / why not IIS" comparison in ADR-001 was answering "which host runs a .NET process," a question that no longer applies.

**Design tokens — OKLCH custom properties, unchanged in kind.** ADR-001 Decision 1 (OKLCH values as CSS custom properties) is not superseded; it's carried forward exactly, just without the MUI `createTheme()` intermediary that decision was written against. `src/styles/global.css` defines every token from the locked May-2026 design spec (§2–§7 and §10–§11; the spec document itself is in main's git history, deleted from the working tree once its tokens were ported) as a `:root` custom property — colors, type scale, spacing, radii, motion — and every page/component consumes them via `var()`. No literal color, font, or spacing value exists outside that one file (profile → Frontend; `.claude/rules/site.md`).

**Discovery — content collections, not `import.meta.glob`.** ADR-001 Decision 3 used `import.meta.glob` because Vite had no first-class content story for a plain React SPA. Astro's content collections replace it with a typed, schema-validated equivalent (`getCollection`), so Decision 3's *goal* — no-code-change publishing via file discovery — is not superseded, it's finally actually achieved. (Decision 3 is not listed in this ADR's Supersedes line because its outcome, not its mechanism, is what mattered, and the outcome holds.)

## Trade-offs

| Decision | What we gain | What we give up |
|---|---|---|
| Astro static output over React SPA | Zero client JS by default, content collections with build-time schema validation, no framework island unless named | React's component ecosystem, client-side routing, any future interactivity has to be named and justified per profile → Frontend |
| Layout props over `usePageMeta` | No dependency, head tags set at build time, simpler than any hook | None meaningful — the hook's own trade-off (replace if SSR is added) is moot; Astro *is* the SSR-at-build-time model |
| GitHub Pages over Azure App Service | Free, zero ongoing cloud config, deploy is fully in-repo | No server-side capability ever (already true — the site has none), custom domain DNS is still the owner's manual step |
| Markdown + Zod schema over `import.meta.glob` frontmatter parsing | Build fails loud on a bad field (the PRD's User Story 3), typed content in `.astro` files | A frontmatter field rename or removal is now an ADR-gated decision, not a free edit |

Open question carried forward from ADR-001, still open: whether the Azure App Service from the old deploy is still running (and billing) is the operator's to check and decommission — this ADR does not touch Azure resources, only the repo's deploy target.

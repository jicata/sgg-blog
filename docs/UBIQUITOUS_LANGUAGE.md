# Ubiquitous Language — SvetlinGalovBlog

One bounded context: **the site**. Use these names in code, issues, PRs and prose. When a term is missing, add it here before using it in code; when two words compete, this file decides.

Seeded 2026-09-18 at skills adoption, from `DESIGN-BRIEF.md` and the revamp decision. Terms describing the retired React SPA are listed under *Retired* so nobody resurrects them.

## Core terms

| Term | Meaning | Notes |
| --- | --- | --- |
| **Post** | A dated piece of writing, one Markdown/MDX file under `src/content/posts/`, published by adding the file. | Never "article" — that was the old SPA's route name. A Post with `draft: true` exists in the repo but not on the site. |
| **Project** | A career-arc case study, one MDX file under `src/content/projects/`. Three at launch (SoftUni, Dow Jones, VSG) plus the featured slot-4 case study. | "Job project" and "slot-4" come from the brief's IA and may appear in old artifacts; the collection term is Project. |
| **Page** | A route-addressable entry point, one file under `src/pages/`. Owns its URL and fetches its content. | Home, Posts index, Post, Projects index, Project, About, Contact, 404. |
| **Layout** | The shared frame a Page renders into: head, nav, footer, global styles. Under `src/layouts/`. | One base layout; page-family layouts only if two pages actually share more than the base. |
| **Component** | A props-only building block under `src/components/`. Never reads a collection. | Promoted out of a page's folder only when a second page imports it. |
| **Collection** | A typed set of content entries (Posts, Projects) declared in `src/content.config.ts` with a frontmatter schema. | Schema changes are ADR-gated (profile → Content). |
| **Frontmatter** | The YAML block at the top of a content entry, validated against its Collection schema at build. | `title`, `description`, `pubDate`, optional `draft` for a Post. |
| **Design token** | A CSS custom property carrying one locked visual value: color, type, spacing. | Source of truth: `specs/design-handoff/design-spec.md` until ported into the global stylesheet. |
| **The brief** | The positioning and voice decisions in `DESIGN-BRIEF.md` §1: senior backend tech lead, agentic-first, career-arc voice, no urgency. | Governs every word on the site. Migrates here when that file is retired. |
| **Build** | `npm run build`: `astro check` then `astro build`. The only gate. | Emits static HTML to `dist/`. |
| **Deploy** | The GitHub Actions run on push to `main` that publishes `dist/` to GitHub Pages. | In-repo; nothing leaves the repository. |

## Retired (do not reuse)

| Term | Was | Why retired |
| --- | --- | --- |
| Article, `/article` | The old SPA's single hard-coded demo route. | Replaced by Post / `/posts/:slug`. |
| `usePageMeta` | A React hook setting `<title>` and OG tags (ADR-001 Decision 2). | Astro sets head tags in the Layout; the hook goes with the SPA. |
| Slice, VSA, Feature folder | Vertical-slice vocabulary from the retired backend rules. | No backend exists. |
| Server state, React Query | The old data-ownership model. | A static build has no server state; Pages read Collections at build time. |
| Signup form | The copy-pasted Contact form killed in PR #17. | Contact is links-only. |

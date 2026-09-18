# Ubiquitous Language — SvetlinGalovBlog

One bounded context: **the site**. Use these names in code, issues, PRs and prose. When a term is missing, add it here before using it in code; when two words compete, this file decides.

Seeded 2026-09-18 at skills adoption, from `DESIGN-BRIEF.md` and the revamp decision. Terms describing the retired React SPA are listed under *Retired* so nobody resurrects them.

## Core terms

| Term | Meaning | Notes |
| --- | --- | --- |
| **Post** | A dated piece of writing, one Markdown file under `src/content/posts/`, published by adding the file. | Never "article" — that was the old SPA's route name. A Post with `draft: true` exists in the repo but not on the site. |
| **Project** | A career-arc case study, one Markdown file under `src/content/projects/`. Three in the repo (SoftUni, Dow Jones, VSG) plus the featured slot-4 case study. | Hidden; content retained, no route. Owner decision 2026-09-18 — the collection and its Markdown files stay in the repo, but no page reads them. "Job project" and "slot-4" come from the brief's IA and may appear in old artifacts. |
| **Page** | A route-addressable entry point, one file under `src/pages/`. Owns its URL and fetches its content. | Home (`/`), Post (`/posts/:slug/`), About (`/about/`, folds in the old Contact page), 404 (`/404`), RSS feed (`/rss.xml`). |
| **Layout** | The shared frame a Page renders into: head, nav, footer, global styles. Under `src/layouts/`. | One base layout; page-family layouts only if two pages actually share more than the base. |
| **Component** | A props-only building block under `src/components/`. Never reads a collection. | Promoted out of a page's folder only when a second page imports it. |
| **Collection** | A typed set of content entries (Posts, Projects) declared in `src/content.config.ts` with a frontmatter schema. | Schema changes are ADR-gated (profile → Content). |
| **Frontmatter** | The YAML block at the top of a content entry, validated against its Collection schema at build. | `title`, `description`, `pubDate`, optional `draft` for a Post. |
| **Design token** | A CSS custom property carrying one locked visual value: color, type, spacing. | Source of truth: `src/styles/global.css`. |
| **The brief** | The positioning and voice decisions that govern every word on the site. Migrated here at PRD #21 from `DESIGN-BRIEF.md` §1, now deleted. See table below. | Applies to Posts, Project case studies, and About copy alike. |
| **Build** | `npm run build`: `astro check` then `astro build`. The only gate. | Emits static HTML to `dist/`. |
| **Deploy** | The GitHub Actions run on push to `main` that publishes `dist/` to GitHub Pages. | In-repo; nothing leaves the repository. |

## The brief (positioning & voice)

Condensed from `DESIGN-BRIEF.md` §1 (deleted at PRD #21; locked in a `/grill-me` session, 2026-05-15). Governs every word written on the site — posts, project case studies, About copy.

| Decision | Value |
| --- | --- |
| Site purpose, ranked | CV/LinkedIn URL that survives a 5-minute hiring-manager scan → shareable/opens doors → writing habit. Site-as-craft-artifact explicitly not prioritized. |
| Target audience | Hiring managers and senior engineers evaluating a backend tech lead, remote-global. Secondary: peers, recruiters. |
| Lead positioning | "Backend tech lead, agentic-development first." |
| Agentic flavor, in order of overlap with reality | (1) Builds dev tooling/harnesses that make agents productive engineers · (2) Ships with agents as a team member · (3) Architects agent-friendly backends · (4) Leads teams adopting this · (5) Production LLM/agent systems — de-prioritized. |
| Career arc | SoftUni (backend dev + teacher) → Dow Jones (senior SWE) → VSG Bulgaria (tech lead, where the agentic shift is happening now). |
| Voice | Career arc, not pitch. No urgency. Senior, talks to peers. Backend-engineer framing for frontend concepts. No exclamation marks. |
| Litmus test | Would this fit a senior engineer's personal site a hiring manager would respect, or does it look like a candidate trying too hard? If the latter, dial it back. |

## Retired (do not reuse)

| Term | Was | Why retired |
| --- | --- | --- |
| Article, `/article` | The old SPA's single hard-coded demo route. | Replaced by Post / `/posts/:slug`. |
| `usePageMeta` | A React hook setting `<title>` and OG tags (ADR-001 Decision 2). | Astro sets head tags in the Layout; the hook goes with the SPA. |
| Slice, VSA, Feature folder | Vertical-slice vocabulary from the retired backend rules. | No backend exists. |
| Server state, React Query | The old data-ownership model. | A static build has no server state; Pages read Collections at build time. |
| Signup form | The copy-pasted Contact form killed in PR #17. | Contact is links-only. |

# SvetlinGalovBlog — Agent Handoff

**Date**: 2026-05-15
**Status**: Mid-discovery session. Stock-take done, launch shape decided, punch list drafted, content/pipeline design (A+B) in progress as a Q&A "grill" — waiting on user's answers to Volley 1.

---

## Who the user is

Svetlin Galov — backend engineer / tech lead (currently VSG Bulgaria; previously Dow Jones Senior SWE, SoftUni Backend Developer). C#/.NET background. He uses this project deliberately to **learn frontend**. Treat him as senior; don't dumb things down. Frame React/CSS in terms a backend engineer already understands (typing, DI, layering analogies).

## What this project is

Personal **blog + portfolio** hybrid. Driving toward first deployment milestone.

## Project shape

- **Outer**: `SvetlinGalovBlog/` — a near-empty .NET 9 minimal-API shell (`.sln`, `Program.cs` with only the boilerplate `/weatherforecast` endpoint). Plan is to serve the SPA statically from this host, but nothing is wired yet.
- **Inner (the real work)**: `SvetlinGalovBlog/wwwroot/svetlin-galov-blog/` — Vite + React 19 + TS SPA. React Router v7, React Query, `@mdx-js/rollup` + `@mdx-js/react`, ESLint, no tests.

Treat the inner path as the project root for all frontend work.

## Launch decisions (already made)

| Question | Answer |
|---|---|
| MVP shape | Portfolio (About + Projects) + 1–2 real articles |
| Deploy target | Static Vite build served behind the existing .NET host (NOT static-only on Vercel/Netlify) |
| Contact page | Links-only (email + socials). No form, no backend. |

Don't propose switching to Next.js, an SSR framework, or a CMS — Vite SPA + MDX was a deliberate learning choice.

---

## Current state inventory

Routes wired in `src/main.tsx`:

| Route | State |
|---|---|
| `/` Home | Shell + sidebar exist. Renders 2 hardcoded `<Article/>` cards of lorem ipsum, both linking to `/`. Sidebar has `Categories` + `PopularContents` stubs. |
| `/article` | One hardcoded article object in `ArticlePage.jsx`. Full-bleed grid + sticky ToC + IntersectionObserver works. No slug routing, no listing. |
| `/projects` | React Query → `projectsApi.ts` (hardcoded in-memory array; the `fetch()` calls are unreachable dead code after early `return`). 3 projects: softuni, dowjones, vsg. |
| `/projects/:name` | MDX pipeline with custom components (`Section`, `Cluster`, `StatCard`, `TextCard`, `BeforeAfterCard`, `UnorderedList`). Only `vsg.mdx` has real content — `softuni.mdx` and `dowjones.mdx` are 2-line "Veepee operates..." stubs. The `vsg.mdx` body is itself UX-design-system template copy, not the user's real story. |
| `/contact` | A signup form (Title / First / Last / Email / Password / T&C) copy-pasted from an exercise. Not a real contact page. To be replaced with links-only. |
| `/about` AND `/AboutMe` | Both render the same `<About/>` under different layouts. `CoreSkills` is 4× identical "Backend & Database Design" placeholder cards. `AboutMe` body is UX-designer-flavored copy ("I refactor tokens") that doesn't match the user. |

**What's solid (don't underestimate)**: the article grid + ToC, the MDX project-details pipeline, the navbar (scroll state, hamburger, body-scroll lock), the layout hierarchy. The bones are there.

## Known bugs / rot

- `index.html` script tag points to `/src/main.jsx`; actual file is `main.tsx`
- `NavbarMenu.tsx` uses `../../../../public/IF_inyoface.png` (filesystem path) — should be `/IF_inyoface.png` for Vite public assets
- `main.tsx` has unused `Routes`/`BrowserRouter`/`Route` imports
- `Navbar.tsx` reads `remInPixels` and never uses it
- `projectsApi.ts` has unreachable `fetch()` code after every `return`; `BASE_URL` is dead
- `.csproj` has a long rotten block of `_ContentIncludedByDefault Remove="..."` pointing to obsolete paths
- Stray files in `wwwroot/`: `testing.html`, a random `V002_..._seed_vendor_configurations.sql`
- No 404 route
- `<title>` is `svetlin-galov-blog`, favicon is still `vite.svg`, no meta/OG tags
- `/AboutMe` and `/about` both exist; only one should ship (`/about`, since navbar links there)
- Project array in `projectsApi.ts` is mutated with `.reverse()`

---

## Punch list

User explicitly delegated **C, D, E, F** to be done without further input. **A + B** are being co-designed with the user via a grill-me session (in progress).

### A. Content — user-driven (in progress, blocked on user)
1. Fill `softuni.mdx` and `dowjones.mdx` to the depth of `vsg.mdx` (and rewrite `vsg.mdx` since current body is template copy about Veepee).
2. About page: real CoreSkills, real AboutMe copy in his voice, photo.
3. Write 1–2 real articles in MDX.

### B. Article pipeline — co-design with user (in progress)
4. Move article from hardcoded JS object → `src/content/articles/*.mdx` + an `index.ts` registry mirroring `src/content/projects/index.ts`.
5. Add `/articles` listing route and `/articles/:slug` detail route. Decommission demo `/article`.
6. Wire Home page article cards to real article metadata instead of cloned lorem-ipsum placeholders.

### C. Cleanup / bugs (delegated — do without user)
7. `index.html`: fix `/src/main.jsx` → `/src/main.tsx`.
8. `NavbarMenu.tsx`: fix image path to `/IF_inyoface.png`.
9. `projectsApi.ts`: delete dead code after `return`s. Consider replacing in-memory array with `import.meta.glob` on MDX frontmatter so MDX is single source of truth.
10. Delete `/contact` signup form, replace with links-only page (email + socials — user has not yet specified which socials; ask if not obvious from About content). Drop `/AboutMe` route, keep `/about`. Remove unused imports in `main.tsx`. Remove `remInPixels` dead var in `Navbar.tsx`.
11. Add NotFound route + element.
12. Delete `wwwroot/testing.html` and `wwwroot/V002_..._seed_vendor_configurations.sql`.
13. Clean rotten `_ContentIncludedByDefault Remove` block in `SvetlinGalovBlog.csproj`.

### D. .NET host wiring (delegated)
14. `Program.cs`: delete weatherforecast demo. Add `UseDefaultFiles()` + `UseStaticFiles()` + `MapFallbackToFile("index.html")` for SPA deep-link survival.
15. Wire `npm run build` into the `.csproj` as a pre-publish step. Vite output → `wwwroot/` (or a subfolder served as root).
16. Pick a host (Azure App Service / Docker / IIS) — user hasn't specified.

### E. SEO / metadata polish (delegated)
17. Real `<title>` + `<meta name="description">` per page.
18. Real favicon (`IF_logo.png` exists in `public/`).
19. OG image + tags for link previews.

### F. Optional cheap wins (delegated)
20. Add `.gitignore` and `git init` — this directory isn't yet a git repo.
21. Smoke-test responsive breakpoints once real content is in.

**Suggested sequence**: do C+D in one bundled pass (mechanical, unblocks deploy independently of content), then E, then F. A+B happen in parallel based on user input.

---

## Where we are RIGHT NOW

Mid grill-me session. I sent Volley 1; user has not answered yet. Pick up here.

### Volley 1 — sent, awaiting answer

> 1. **Articles**: name the 1-2 articles you'd write first. Working title + 1 sentence on the point. If you have nothing concrete yet, just tell me what topics you'd be willing to write *from your actual work* — migrations you ran, decisions you made, things you debugged at 2am.
> 2. **Projects**: for SoftUni, Dow Jones, and VSG — for each one, what's the *single thing* you want a hiring manager to walk away knowing? One line each.
> 3. **About**: what's your one-sentence positioning? Tech lead who can ship product, backend specialist, generalist senior, architect, something else?

### Volley 2 — to send after Volley 1 lands

Pipeline-shape questions, informed by his content answers:
- Does the article reader need ToC + RelatedArticles + categories from day one, or thinner v1?
- What frontmatter does the article MDX need (title, subtitle, category, date, readingTime, hero image, tags, draft flag, slug)?
- Does Home become the article index, or stay an intro page with `/articles` as a separate index?
- Should the existing `Categories` + `PopularContents` sidebar stubs become real, or be cut?
- Reading-time: computed or authored?

### Volley 3 (likely) — schema reconciliation

Once shape is clear, reconcile projects + articles into a single content model so the `import.meta.glob` pattern is consistent.

---

## Persistent memory

User-scoped memory was written at `C:\Users\SGalov\.claude\projects\C--Users-SGalov-MasterFolder-Trainings-SGG-SvetlinGalovBlog\memory\`:
- `MEMORY.md` (index)
- `user_profile.md` — Svetlin's background + how to talk to him
- `project_goal.md` — MVP shape + deploy decisions
- `project_repo_layout.md` — the `.NET shell wrapping Vite SPA` quirk + where MDX content lives

Read those before doing anything; they're the durable context for future sessions.

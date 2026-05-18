# SvetlinGalovBlog — Design Pack (self-contained handoff)

> Paste this entire document into a fresh Claude session. Everything the design agent needs is inline. No filesystem access required.

---

## §0 — How to use this pack

You are receiving a packaged design brief for a personal portfolio + blog site. The brief and all surrounding context are below. Read sections in order. The **DESIGN BRIEF (§3)** is the authoritative document; everything else is supporting context.

**Your job — pick one based on what the user (Svetlin) asks for at the bottom:**

- **(a) Component-level design spec** — typography scale, color tokens, component states, layout primitives. No code. Output as a structured document.
- **(b) Visual mockups** — ASCII or Mermaid renderings of each page in the locked structures, fleshed out with type / color / spacing intent.
- **(c) Implementation** — actual React/TSX code that redesigns the existing pages against the brief. Must honor §4 (frontend-architect rules) and §5 (frontend-developer rules).

**Default if Svetlin doesn't specify**: (a) → then (c). Skip (b) unless explicitly requested — for a single-user portfolio, mockups are usually wasted iteration.

**Do not re-decide anything locked in §3. Do not add routes, kill routes, change page shapes, or reposition slot 4.** If you want to push back, surface the disagreement to Svetlin as a discrete question; don't redesign unilaterally.

---

## §1 — Quick context

### About Svetlin (user profile)

Backend engineer / tech lead. Currently at VSG Bulgaria. Previously Senior SWE at Dow Jones; Backend Developer + teacher at SoftUni. C#/.NET background, ~10 years. **Senior — don't dumb down.** He is *learning frontend* through this project, so:

- Frame React/CSS in terms a backend engineer already understands (analogies to typing, DI, layering).
- Don't assume familiarity with React idioms or modern CSS patterns — explain *why* a pattern works, not just *that* it's the convention.
- Don't simplify or talk down. He just hasn't lived in the FE ecosystem.
- Architecture / backend decisions can be discussed directly without scaffolding.

### About the project

Personal **blog + portfolio** hybrid. Driving toward first deployment milestone. Launch decisions (locked):

- **MVP scope**: portfolio (About + Projects) + 1–2 real articles. **Not** a full blog yet.
- **Deploy target**: static Vite build served behind the existing .NET host. **Not** static-only on Vercel/Netlify.
- **Contact**: links-only (email + socials). No form, no backend.
- **Stack stays Vite SPA + MDX.** Deliberate learning choice — *do not propose moving to Next.js, SSR, or a CMS.*

### Repo layout quirk (non-obvious)

The Vite + React SPA lives at `SvetlinGalovBlog/wwwroot/svetlin-galov-blog/` — nested two levels inside the .NET project. The outer `.sln` + `Program.cs` are a near-empty ASP.NET Core minimal-API shell with only the boilerplate `/weatherforecast` endpoint.

For all frontend work, **treat `SvetlinGalovBlog/wwwroot/svetlin-galov-blog/` as the project root** (where `package.json`, `vite.config.js`, `src/`, etc. live).

Project case studies are MDX files in `src/content/projects/*.mdx`, auto-registered via `src/content/projects/index.ts` (`import.meta.glob`). Articles do **not** yet have the same pipeline — `/article` renders one hardcoded JS object in `ArticlePage.jsx`. Building the article MDX pipeline is on the punch-list (see §2).

---

## §2 — Current codebase state (what exists, what's broken)

### Routes currently wired in `src/main.tsx`

| Route | State |
|---|---|
| `/` Home | Shell + sidebar exist. Renders 2 hardcoded `<Article/>` cards of lorem ipsum, both linking to `/`. Sidebar has `Categories` + `PopularContents` stubs. |
| `/article` | One hardcoded article object in `ArticlePage.jsx`. Full-bleed grid + sticky ToC + IntersectionObserver works. No slug routing, no listing. |
| `/projects` | React Query → `projectsApi.ts` (hardcoded in-memory array; the `fetch()` calls are unreachable dead code after early `return`). 3 projects: softuni, dowjones, vsg. |
| `/projects/:name` | MDX pipeline with custom components (`Section`, `Cluster`, `StatCard`, `TextCard`, `BeforeAfterCard`, `UnorderedList`). Only `vsg.mdx` has real content; `softuni.mdx` and `dowjones.mdx` are 2-line stubs. The `vsg.mdx` body is itself UX-design-system template copy, **not** Svetlin's real story. |
| `/contact` | A signup form (Title / First / Last / Email / Password / T&C) copy-pasted from an exercise. **Not** a real contact page. To be replaced with links-only. |
| `/about` AND `/AboutMe` | Both render the same `<About/>` under different layouts. `CoreSkills` is 4× identical "Backend & Database Design" placeholder cards. `AboutMe` body is UX-designer-flavored copy that doesn't match Svetlin. |

### What's solid (don't redesign for the sake of it)

- The article grid + ToC (full-bleed, sticky, IntersectionObserver-driven).
- The MDX project-details pipeline.
- The navbar (scroll state, hamburger, body-scroll lock).
- The layout hierarchy.

The bones are there.

### Known bugs / rot (orthogonal to design — being fixed in a separate mechanical pass)

- `index.html` script tag points to `/src/main.jsx`; actual file is `main.tsx`.
- `NavbarMenu.tsx` uses `../../../../public/IF_inyoface.png` (filesystem path) — should be `/IF_inyoface.png` for Vite public assets.
- `main.tsx` has unused `Routes` / `BrowserRouter` / `Route` imports.
- `Navbar.tsx` reads `remInPixels` and never uses it.
- `projectsApi.ts` has unreachable `fetch()` code after every `return`; `BASE_URL` is dead.
- Stray files in `wwwroot/`: `testing.html`, a random `V002_..._seed_vendor_configurations.sql`.
- No 404 route.
- `<title>` is `svetlin-galov-blog`, favicon is still `vite.svg`, no meta/OG tags.
- `/AboutMe` and `/about` both exist; only one should ship (`/about`, since navbar links there).
- Project array in `projectsApi.ts` is mutated with `.reverse()`.

### Existing key file paths (so you can name them in your design)

```
SvetlinGalovBlog/wwwroot/svetlin-galov-blog/
├── package.json
├── vite.config.js
├── index.html
├── public/
│   ├── IF_inyoface.png
│   └── IF_logo.png
└── src/
    ├── main.tsx
    ├── content/
    │   └── projects/
    │       ├── index.ts          (import.meta.glob registry)
    │       ├── vsg.mdx
    │       ├── softuni.mdx
    │       └── dowjones.mdx
    ├── components/
    │   ├── footer/footer.tsx
    │   ├── header/MainHeader.tsx
    │   ├── fuzzy-cursor/FuzzyCursor.tsx        (REMOVE — see §3 tone)
    │   ├── MaxWidthWrapper/max-width-wrapper.tsx
    │   ├── navbar/Navbar.tsx
    │   ├── navbar/navbar-logo/NavbarLogo.tsx
    │   ├── navbar/navbar-menu/NavbarMenu.tsx
    │   ├── navbar/navbar-menu/navbar-item/NavbarItem.tsx
    │   ├── navbar/navbar-toggle/NavbarToggle.tsx
    │   └── Content/                            (Paragraph, Blockquote, ContentImage, Span, CodeBlock)
    ├── layouts/
    │   ├── BaseLayout.tsx
    │   ├── MainLayout.tsx
    │   ├── about/AboutLayout.tsx
    │   └── projects/ProjectDetailsLayout.tsx
    ├── pages/
    │   ├── home/                               (HomePage.jsx + MainContent/* — currently article-led, REDESIGN)
    │   ├── about/                              (About.tsx + AboutMe + CoreSkills — REDESIGN)
    │   ├── contact/contact.jsx                 (signup form — REPLACE with links-only)
    │   ├── article/                            (ArticlePage.jsx, ArticleGrid, TableOfContents, RelatedArticles, ArticleHeading)
    │   └── projects/
    │       ├── list/ProjectsList.tsx           (REDESIGN — 3-tier)
    │       ├── list/project/ProjectCard.tsx
    │       ├── details/ProjectDetails.tsx
    │       ├── details/header/ProjectDetailsHeader.tsx
    │       ├── details/header/project-info/ProjectInfo.tsx
    │       ├── details/next-project/NextProject.tsx
    │       ├── details/mdx-components/         (StatCard, TextCard, BeforeAfterCard, UnorderedList)
    │       ├── shared/components/              (BasicCard, Section, Cluster, Stack, Tags)
    │       ├── shared/services/api/projectsApi.ts
    │       └── shared/types/project.ts
    └── hooks/
        └── useLockBodyScroll.tsx
```

---

## §3 — DESIGN BRIEF (authoritative)

> The strategic decisions below are locked. Do not relitigate. If you want to push back on any of them, surface the disagreement to Svetlin as a question; do not redesign unilaterally.

### 3.1 Positioning & Voice

| Decision | Value |
|---|---|
| **Site purpose, ranked** | A (CV/LinkedIn URL that survives a 5-min hiring-manager scan) → C (shareable / opens doors) → B (writing habit). D (site-as-craft-artifact) explicitly **not** prioritized. |
| **Target audience** | Hiring managers + senior engineers evaluating Svetlin for a **backend tech lead role, remote global**. Secondary: peers, recruiters, CFP committees. |
| **Search context** | Passive + active blend. Already looking. **No urgency tone** — voice reads as career arc, not pitch. |
| **Lead positioning** | "Backend tech lead, agentic-development first." |
| **Agentic flavor (in order of overlap with reality today)** | (1) Builds dev tooling/harnesses that make agents productive engineers · (2) Senior who ships with agents as a team member · (3) Architects backends to be agent-friendly · (4) Leads teams adopting this · (5) Production LLM/agent systems. Lead with (1)+(2); de-prioritize (5). |
| **Career arc** | SoftUni (backend dev + teacher) → Dow Jones (senior SWE) → VSG Bulgaria (tech lead, where the agentic shift is happening now). Pre-VSG roles had no agentic work; that's a recent development. |
| **Voice** | Career arc. No urgency. Senior. Talks to peers, not down to readers. |

### 3.2 The 5-minute hiring-manager brief (acceptance criteria)

A hiring manager spending 5 minutes on the site **must** walk away knowing:

1. **Senior backend engineer / tech lead with real depth** — ~10 years C#/.NET, scaled orgs, currently leading at VSG. Credibility floor.
2. **Agentic-development first** — evidenced by slot-4 case study + an article. The differentiator.
3. **Actually ships** — VSG (current), Dow Jones (scaled org impact), this blog (live artifact). Counters "agentic-positioning person who just configures tools."
4. **Communicates at senior level** — article(s) and project case studies have voice + opinion. Carried by craft, not declaration.
5. **Available for the right conversation** — clear, low-friction contact; voice signals "listening" without "hire-me-now."

Things deliberately **off** the brief: frontend skills, stack-badge checklists, open-source track record, speaking history.

### 3.3 Tone translation (design intent)

The strategic voice — *"career arc, no urgency"* — translates into design intent below. These are **directions**, not specifications. You own the actual visual choices; this is the box you should fit in.

- **Reference point**: senior trade publication (Stripe Press, Increment-era), or considered personal sites (Maggie Appleton, Robin Sloan, Julia Evans). **Not** aspirational-startup (Vercel hero, Linear marketing), **not** corporate-blog (Medium, default StackOverflow), **not** brutalist raw-markdown.
- **Type**: lean transitional or trade-publication. Avoid Inter / Manrope / geometric "tech aspirational" stacks. Body type should reward reading 800 words; headings sturdy, not punchy.
- **Color**: restrained, 2–3 colors total. One accent at most. Slight warmth or slight cool — not pure white-on-black. Hierarchy comes from weight and size, not from bright accents.
- **Motion**: UI feedback only, not decoration. Hover states, focus rings, subtle route-change transitions. **No** scroll-triggered animations, parallax, fly-ins, or marketing-landing reveals. The existing `FuzzyCursor` component contradicts this tone — **recommend removal.**
- **Microcopy**: direct, declarative. No exclamation marks. No *"Welcome!"* / *"Let's build something amazing"* / *"Get in touch and..."* Either neutral (`Email · GitHub · LinkedIn`) or dry-personal (*"If you want to talk, here's how."*). Empty/loading states: skeletons over spinners. Error states: honest, not jokey (*"Couldn't load this. Refresh, or send me a message if it keeps happening."*).
- **Imagery**: photo of Svetlin should look like a working engineer (relaxed, natural light, no studio pose). Project pages do not need hero images — code excerpts and well-structured text carry more weight than stock photography.

**Litmus test for any visual choice**: *would this fit on a senior engineer's personal site that a hiring manager would respect, or does it look like a candidate trying too hard?* If the latter, dial it back.

### 3.4 Information Architecture

**Routes at launch:**

| Route | Purpose | Status |
|---|---|---|
| `/` Home | Portfolio-first landing. Delivers brief items 1–3 in first viewport, 4 below the fold. | Redesign — current is article-led, wrong shape. |
| `/projects` | 3 career-arc job projects + 1 featured slot-4 case study + breadth list (2 upcoming). | Rework — see §3.6. |
| `/projects/:name` | Per-project MDX deep-dive. Existing pipeline works. | Keep mechanic; rewrite content. |
| `/articles` | Listing route. Forward-compat — 1–2 cards at launch, scales. | **New**. |
| `/articles/:slug` | Article detail. Existing ArticlePage mechanics reused. | **New routing** — current `/article` is one hardcoded demo. |
| `/about` | Career-arc story + tag-row of capabilities + contact links. Linchpin page. | Rework — see §3.7. |
| `/contact` | Links-only. Email + socials (which socials TBD). No form, no backend. | Rework — kill the copy-pasted signup form. |
| `*` 404 | Not-found page. | **New**. |

**404 page**: matches site tone. Two links: `/` and `/projects`. **No** 404-themed illustration, **no** *"Oops!"* / *"Lost in space"* microcopy. Suggested copy: *"That page isn't here. Try [Home] or [Projects]."*

**Killed at launch:**

- `/article` singular demo route — replaced by `/articles/:slug`.
- `/AboutMe` duplicate route — keep `/about` only.
- `Categories` + `PopularContents` sidebar stubs on Home — blog-IA, doesn't fit portfolio-first.

**Navbar:** `Home · Projects · Articles · About · Contact` — 5 items, no overflow, no hamburger-only nav until breakpoint.

### 3.5 Home (`/`) — Locked shape: H4 Variant A

*Compact hero, balanced grid, scroll to reveal.*

```
┌─────────────────────────────────────────────────┐
│ Home · Projects · Articles · About · Contact   │
├─────────────────────────────────────────────────┤
│  [80px]  Svetlin Galov                          │
│          Backend tech lead. Agentic-first.      │
│          ~10 yrs C#/.NET. Currently at VSG.     │
├─────────────────────────────────────────────────┤
│  Featured work                                  │
│  ┌───────────────────────────────────────────┐ │
│  │  This site, agent-augmented               │ │
│  │  A case study in agentic engineering   →  │ │
│  └───────────────────────────────────────────┘ │
│  ┌────────────────┐  ┌────────────────┐        │
│  │ VSG            │  │ Dow Jones      │        │
│  │ Tech lead   →  │  │ Senior SWE  →  │        │
│  └────────────────┘  └────────────────┘        │
├─────────────────────────────────────────────────┤
│  Writing                                        │
│  ┌───────────────────────────────────────────┐ │
│  │  Latest article title                     │ │
│  │  One-line dek · 6 min read             →  │ │
│  └───────────────────────────────────────────┘ │
├─────────────────────────────────────────────────┤
│  Email · GitHub · LinkedIn                      │
└─────────────────────────────────────────────────┘
```

**Locked decisions on Home:**

- **Slot 4 visually outranks job projects.** Full-width card vs 2-up. Lead positioning gets the visual lead.
- **SoftUni is not on Home.** Lives on `/projects` only.
- **Breadth list (skill library, Brochures) is not on Home.** Lives on `/projects` only.
- **One article on Home, not multiple.** Delivers brief item 4 inline.
- **No sidebar.** Categories + Popular stubs are cut.
- **Hero photo is small (~80px), photo-left.** Personality without taking the visual lead.
- **Each section earns its own scroll-screen.** No "everything in one viewport" density.

**Fallback shape if articles slip:** If no launch articles are ready, the "Writing" section is omitted entirely (don't show "Coming soon" — looks juvenile). Home becomes Hero → Featured work → Contact. Article strip drops back in when first article ships.

### 3.6 Projects (`/projects`) — Locked shape

```
┌─────────────────────────────────────────────────┐
│  [Navbar]                                        │
├─────────────────────────────────────────────────┤
│  Projects                                       │
│  (short framing sentence — one line)            │
├─────────────────────────────────────────────────┤
│  FEATURED                                       │
│  ┌───────────────────────────────────────────┐ │
│  │  This site, agent-augmented               │ │
│  │  Case study in agentic engineering        │ │
│  │  Tags: agentic engineering, dev tooling   │ │
│  └───────────────────────────────────────────┘ │
├─────────────────────────────────────────────────┤
│  CAREER                                         │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│  │ VSG        │ │ Dow Jones  │ │ SoftUni    │  │
│  │ Tech lead  │ │ Senior SWE │ │ Backend +  │  │
│  │ (current)  │ │ (scaled)   │ │ teaching   │  │
│  └────────────┘ └────────────┘ └────────────┘  │
├─────────────────────────────────────────────────┤
│  SHIPPING NEXT  (breadth list, lighter)         │
│  • Claude Code skill library — coming public    │
│  • Brochures — agentic consumer tool — coming   │
└─────────────────────────────────────────────────┘
```

**Locked decisions on Projects:**

- **Three tiers**: FEATURED (1 card, prominent) → CAREER (3-up, equal weight) → SHIPPING NEXT (lighter list).
- **VSG sits leftmost in CAREER** — current. Dow Jones middle (scale). SoftUni rightmost (teaching foundation).
- **The breadth list is visibly lighter** — bullets or compact cards, not equal-weight project cards. Communicates "in flight, not yet public" honestly without hiding it.
- **Breadth list entries reserve link slots** — when skill library or Brochures go public, the slot fills with a real link without page restructuring.
- **No "View all" pagination, no infinite scroll.**

**Slot 4 deep-dive (`/projects/this-site-agent-augmented` or similar slug):** Treat as a peer-quality case study to a real job project, not a "how I made this" tutorial. Required sections (rough):

- **What it is**: this site, the artifact you're reading. One paragraph.
- **The harness**: orchestrators (`/ship-feature`, `afk-coder`, `afk-reviewer`), skill library structure, persistent memory across sessions. Code excerpts from real `.claude/rules/` files (e.g., `vsa-tdd`, `documentation-creator`).
- **Workflow shown**: what a typical change looks like — issue → grill → plan → ship → review → merge.
- **What it's not**: not a generic "AI coding" pitch. Not a productivity-hack post. Honest about what's automated vs. what's curated.
- **Where this is heading**: skill library going public, Brochures, etc. Links to breadth list entries.

The case study can excerpt real rules files as syntax-highlighted blocks. This is the publicly-clickable evidence of agentic positioning at launch, before the skill library repo is public.

**Job-project pages (`/projects/:name` for VSG, Dow Jones, SoftUni):**

The existing per-project MDX pipeline works — `ProjectDetailsHeader`, `ProjectInfo`, `NextProject`, and the in-MDX components (`Section`, `Cluster`, `StatCard`, `TextCard`, `BeforeAfterCard`, `UnorderedList`) are kept. What was missing: a **shared shape** across the three job projects so they read as peers.

**Required sections, in order:**

1. **Header strip** — role title, company, dates, one-line context. Existing `ProjectDetailsHeader` + `ProjectInfo`.
2. **What I did** — 1–3 `Section`s. The substance. Concrete work, not generic *"I led the team."*
3. **What I learned** — 1 short section, prose. The senior-comms signal. Be honest about trade-offs and what didn't go to plan.
4. **Outcomes / artifacts** — short. Use `StatCard` only when there's a defensible number. **Skip the section** rather than fabricate metrics.
5. **Next project** — existing `NextProject` component. Site chrome, always present.

**First-class MDX components** (use freely): `Section`, `UnorderedList`, `StatCard` (when honest).

**Use sparingly**: `BeforeAfterCard` (only for a real concrete migration/improvement — at most one per project), `Cluster` / `TextCard` (visual variety only, not load-bearing).

**Anti-patterns to resist:**

- Templated marketing sub-sections (*"The Challenge / My Approach / The Solution / The Result"*) — junior-consulting-deck.
- Fabricated stats. If you can't source the number, drop the `StatCard`.
- Multiple `BeforeAfterCard`s per project — overuse kills the device.
- **The same shape across all three projects.** VSG is current tech-lead work, Dow Jones is scale / senior IC, SoftUni is teaching / foundation. They should *feel* different because the work was different.

**Project ordering** in the Career strip is locked: VSG (left, current) → Dow Jones (middle, scale) → SoftUni (right, teaching foundation). `NextProject` traversal follows this order.

### 3.7 About (`/about`) — Locked shape

```
┌─────────────────────────────────────────────────────┐
│  [Navbar]                                           │
├─────────────────────────────────────────────────────┤
│  HERO  (same one-liner as Home, photo a bit bigger)│
│  [photo, ~120px]                                    │
│  Svetlin Galov                                      │
│  Backend tech lead. Agentic-first.                  │
├─────────────────────────────────────────────────────┤
│  STORY  (3 short paragraphs, career arc — no h2s)   │
│  ¶1  Where I am now. VSG. What I do day-to-day.     │
│       The agentic shift happening on the team.      │
│  ¶2  How I got here. Dow Jones senior SWE,          │
│       SoftUni backend dev/teacher. One line each.   │
│  ¶3  What I'm building / where I'm heading.         │
│       Mentions slot 4 + skill library + Brochures   │
│       inline with links to /projects.               │
├─────────────────────────────────────────────────────┤
│  WHAT I WORK ON  (tag-row, not card-grid)           │
│  C# · .NET · distributed systems · DDD · VSA ·      │
│  system design · agentic engineering · Claude Code  │
│  · MCP                                              │
├─────────────────────────────────────────────────────┤
│  GET IN TOUCH                                       │
│  Email · GitHub · LinkedIn · (X? Bluesky? TBD)      │
└─────────────────────────────────────────────────────┘
```

**Locked decisions on About:**

- **No subheadings inside Story.** Three flowing paragraphs. The visitor here chose to read; reward with prose.
- **CoreSkills 4-card grid replaced by a tag-row.** At tech-lead seniority, 4 themed cards read as a feature list. A tag-row reads as "here's the surface area," which is more accurate. Also cheaper to maintain.
- **¶3 names slot 4 + skill library + Brochures inline.** Don't gate the agentic positioning behind clicking into `/projects`.
- **Photo at ~120px on About.** Bigger than Home (~80px). Humanizes the career-arc tone.
- **"Get in touch" links repeat at bottom.** `/contact` is a separate route but About shouldn't dead-end.

### 3.8 Contact (`/contact`)

- **Links-only**. No form, no backend.
- **Required**: Email, GitHub, LinkedIn.
- **TBD with Svetlin**: X/Twitter, Bluesky, Mastodon, personal Telegram/Signal — which (if any) does he want to expose.
- **Voice**: signal-listening, not hire-me-now. Career arc, no urgency.

### 3.9 Articles (`/articles`, `/articles/:slug`)

The pipeline mechanics (frontmatter shape, registry pattern, ToC, Related, draft flag, reading time) are **not yet locked** — separate grill needed before design pass. Two things are locked:

- **Listing route exists at launch** even with 1–2 articles. Forward-compat for goal B (writing habit).
- **Existing per-article mechanics** (full-bleed grid + sticky ToC + IntersectionObserver) are kept and rewired to slug routing.

Do not over-design `/articles` for visible content density. With 1–2 entries, restraint reads as confident; clutter reads as desperate.

### 3.10 Mobile shape

All ASCII in this brief is desktop. Mobile reflow direction for each page:

**Home (mobile):**
- Hero: photo centered above name/positioning. All centered. Photo stays ~80px.
- Featured work: slot 4 stays full-width. VSG and Dow Jones **stack 1-up below**.
- Writing: same — full-width card.
- Contact strip: same.

**Projects (mobile):**
- Featured: same full-width card.
- Career 3-up → 1-up stack below threshold.
- Shipping next: bullet list stays.

**About (mobile):**
- Hero: photo centered above name; positioning beneath; all centered.
- Story: full-width paragraphs.
- Tag-row: wraps naturally; chips do not shrink — they wrap to a second/third line.
- Get in touch: same.

**Job-project pages (mobile):**
- Header: stacked rows (title → company/dates → context line).
- MDX content: full-width.
- `NextProject`: full-width tap target.

**Navbar (mobile):**
- Existing hamburger + body-scroll lock mechanic kept.
- Hamburger threshold around ~768px (or whatever fits 5 nav items + logo without crowding).
- Inside the open hamburger, nav items stack vertically with generous tap targets.

**Touch / hit targets:**
- Minimum 44×44px on all interactive elements.
- Project cards on mobile are **fully tappable**, not just the title link.
- Focus rings preserved on keyboard nav (don't `outline: none` and forget to replace).

### 3.11 What's NOT yet decided (do not invent)

| Item | Why deferred |
|---|---|
| **Final copy** — hero one-liner, About story, project intros, article voice | Needs Svetlin's voice |
| **Article topics** — what the 1–2 launch articles are about | Content decision, Svetlin-owned |
| **Article pipeline shape** — frontmatter, slug strategy, ToC v1, Related, reading time | Co-design with Svetlin once topics are clearer |
| **Project-page rewrites** — actual content for VSG, Dow Jones, SoftUni, slot-4 | Content decision |
| **Contact list** — which socials specifically | Svetlin's call |
| **Visual system** — type, color, spacing, components, animation, motion | **This is your job.** |

**Things you must NOT decide unilaterally:**
- Killing or adding routes.
- Changing the 5-min brief priorities.
- Repositioning slot 4 below the job projects.
- Reintroducing the Categories/Popular sidebar.
- Switching to a different home-page shape (H1/H2/H3 were rejected).
- Adding a CMS / SSR / Next.js / static-only-on-Vercel path.

If you want to push back on any of the above, surface it as a discrete question to Svetlin; don't redesign unilaterally.

---

## §4 — Frontend architecture rules (must honor)

> Governs folder boundaries, page/component separation, data ownership, state placement. Implementation must conform.

### Page vs Component Boundary (non-negotiable)

- A **Page** is a route-addressable entry point. It owns a URL, owns data fetching, composes components.
- A **Component** is a reusable building block. Receives data via props. Does not fetch.
- A Page and a Component must **never** sit at the same folder level.

### Canonical Folder Structure

```text
src/
├── pages/
│   └── {PageName}/
│       ├── {PageName}Page.tsx          ← the route entry point
│       ├── {PageName}Page.test.tsx     ← colocated test
│       ├── components/                 ← page-scoped components
│       │   ├── {Component}.tsx
│       │   └── {Component}.test.tsx
│       └── hooks/                      ← page-scoped hooks (optional)
├── components/                         ← CROSS-page shared components only
│   └── {Shared}/
│       ├── {Shared}.tsx
│       └── {Shared}.test.tsx
├── services/                           ← API wrappers grouped by domain
│   └── {domain}Api.ts
└── types/                              ← shared TypeScript types
    └── {entity}.ts
```

**Promotion rule**: a page-scoped component only moves to `src/components/` when a *second* page actually imports it. Never preemptively.

### One Component Per File

- Filename matches the default export.
- No multi-component files. Small helper components used only by one parent may be inlined as named functions, but if they grow past ~20 lines or get their own tests, they get their own file.

### Data Ownership Lives in Pages (via React Query)

- **Server state is managed by React Query** (`@tanstack/react-query`). Pages call service functions from `src/services/*Api.ts` *through* `useQuery` for reads and `useMutation` for writes. Raw `useEffect` + `fetch` + `useState` for server data is an anti-pattern.
- **Pages own the query hooks.** Components receive the resolved data (and loading/error state if they need it) via props. Components do not import from `services/` and do not call `useQuery` directly.
- **Query key conventions**: use a tuple `['domain', 'entity', ...params]`. Define key factories in the service module so mutations can invalidate precisely.
- **Mutations invalidate, not refetch manually.** After a `useMutation` succeeds, call `queryClient.invalidateQueries({ queryKey: ... })` — never manually re-call the GET function.
- **QueryClientProvider** is mounted once at the app root (`src/main.tsx`). One shared `QueryClient` instance.
- Exception: long-lived cross-cutting client state (current user, auth token, theme) may live in a React Context provider mounted at the App level. React Query is for *server* state.

### State Placement

- **Server state** → React Query. Never duplicated into `useState`. Never manually synchronized.
- **Local client state** (form inputs, UI toggles, modal open) → component-level `useState`.
- **Shared client state across siblings within one page** → lift to the page via `useState`.
- **Cross-page client state** → React Context at the appropriate level. No prop drilling past 2 levels.

### Service Module Conventions

- One file per domain: `projectsApi.ts`, `articlesApi.ts`, `contactApi.ts`.
- Each exported function maps 1:1 to a backend endpoint. Do not bundle multiple endpoints behind a single "facade" function.
- Types used by the service live in `src/types/{entity}.ts`, not inline.

### Test Colocation

- `{Name}.test.tsx` sits next to `{Name}.tsx`.
- Pages get integration-style tests (Testing Library queries by role/label).
- Components get focused tests with fixture props — no service mocking because components shouldn't touch services.

### Styling Conventions

- Use MUI (`@mui/material`) components as the primitive layer.
- Custom styling: Emotion (`@emotion/styled`) or MUI's `sx` prop — not `.css` files unless genuinely global/page-level layout.
- Theme tokens come from the MUI theme. No hard-coded colors, spacings, or font sizes in components.

### Anti-patterns to flag

1. Flat page folders: pages, modals, layouts all at one level in `pages/{Name}/`.
2. Fetching inside components.
3. Raw `useEffect` for server data.
4. Manual refetch after mutation.
5. Server data stuffed into `useState`.
6. Multi-component files.
7. Prop drilling >2 levels.
8. Hand-rolled buttons/inputs/modals when MUI has them.
9. Hard-coded theme values.
10. Shared components added speculatively to `src/components/`.
11. Cross-slice imports across pages.

---

## §5 — Frontend implementation rules (must honor)

> Governs in-component implementation quality: performance, a11y, styling specifics.

- **Performance**: Core Web Vitals optimization from the start. Code splitting, lazy loading, image optimization (WebP/AVIF, responsive sizes). Monitor and maintain excellent Lighthouse scores.
- **Accessibility**: WCAG 2.1 AA. Proper ARIA labels, semantic HTML, keyboard navigation, screen-reader compatibility. Test with real assistive technologies.
- **Component implementation**: memoization (`memo`, `useCallback`, `useMemo`) where measurably needed. Virtualization for long lists. Proper TypeScript types throughout.
- **Styling**: MUI primitives + Emotion or `sx` for custom. CSS files only for global / page-level layout. No hard-coded colors / spacing / type sizes — use theme tokens.
- **Testing**: comprehensive unit + integration tests; accessibility testing with real ATs; cross-browser; e2e for critical flows.

Where this rule conflicts with §4 (architecture), §4 wins on folder/layer decisions; this rule wins on in-component implementation specifics.

---

## §6 — Your deliverable

Svetlin will tell you which of these he wants. If he doesn't specify, default to **(a) → (c)**.

**(a) Component-level design spec** — structured document:

- Typography scale (sizes, weights, line-heights, families with fallbacks).
- Color tokens (1–3 colors + neutrals + semantic mappings). Hex/HSL.
- Spacing scale.
- Component states (default / hover / focus / active / disabled / loading / error / empty).
- Layout primitives (container max-widths, grid, breakpoints).
- Motion tokens (durations, easings — kept minimal per §3.3).
- A redlines pass on each of the 6 page shapes in §3 (Home, Projects, Project Detail, About, Contact, 404) — concrete type/spacing/spacing decisions for each element in the ASCII.

**(b) Visual mockups** *(only if requested)* — ASCII or Mermaid renderings of each page with type / color / spacing filled in. For a single-user portfolio, this is usually skippable; (a) → (c) is faster.

**(c) Implementation** — actual React/TSX code. Must:

- Honor §4 (folder structure, React Query, page/component split, one-component-per-file).
- Honor §5 (MUI primitives, Emotion/sx custom, theme tokens, no hard-coded values).
- Touch only the files needed; leave the article-pipeline mechanics in `src/pages/article/` intact (just rewire routing).
- Remove `FuzzyCursor` and the Categories/Popular sidebar stubs.
- Preserve the MDX project-details pipeline and the article grid/ToC/IntersectionObserver.
- Add `/articles` listing route + `/articles/:slug` detail route; redirect or remove `/article` and `/AboutMe`.
- Add a 404 route.
- For each page redesigned, also update the relevant page-level test if one exists; add basic tests if missing.

For (c), proceed in this order:
1. Confirm understanding with a 5-bullet plan back to Svetlin before writing code.
2. Theme + tokens + global primitives first (MUI theme setup).
3. Layout components + navbar update.
4. Home, then About (linchpin pages).
5. Projects list (3-tier), then slot-4 project page scaffold.
6. Job-project page template (apply shared shape to VSG / Dow Jones / SoftUni shells — content rewrites are NOT your job).
7. Articles listing + slug routing.
8. Contact links-only page.
9. 404.

Do **not** write copy. Use `[placeholder]` for body text. Svetlin owns copy and will draft separately.

---

## §7 — When in doubt

- Default to **restraint over flourish**. Senior trade publication, not aspirational startup.
- If a decision isn't in §3, ask Svetlin — don't invent.
- If a §3 decision feels wrong, surface it as a discrete question — don't redesign unilaterally.
- Apply the litmus test: *would this fit on a senior engineer's personal site that a hiring manager would respect, or does it look like a candidate trying too hard?*

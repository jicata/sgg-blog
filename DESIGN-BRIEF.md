# SvetlinGalovBlog — Design Brief

**For**: the design agent picking this up.
**From**: locked decisions from a `/grill-me` session, 2026-05-15.
**Read first**: `HANDOFF.md` (codebase state + punch list), `~/.claude/projects/.../memory/` (user/project memory).

This document captures **the design brief** — what each page must do and the locked structural decisions. It does **not** specify visual design (typography, color, spacing, animation, components). That's the design agent's job. It also does **not** specify final copy — only placeholders and intent.

---

## 1. Positioning & Voice

| Decision | Value |
|---|---|
| **Site purpose, ranked** | A (CV/LinkedIn URL that survives a 5-min hiring-manager scan) → C (shareable / opens doors) → B (writing habit). D (site-as-craft-artifact) explicitly **not** prioritized. |
| **Target audience** | Hiring managers + senior engineers evaluating Svetlin for a **backend tech lead role, remote global**. Secondary: peers, recruiters, CFP committees. |
| **Search context** | Passive + active blend. Already looking. **No urgency tone** — voice reads as career arc, not pitch. |
| **Lead positioning** | "Backend tech lead, agentic-development first." |
| **Agentic flavor (in order of overlap with reality today)** | (1) Builds dev tooling/harnesses that make agents productive engineers · (2) Senior who ships with agents as a team member · (3) Architects backends to be agent-friendly · (4) Leads teams adopting this · (5) Production LLM/agent systems. Lead with (1)+(2); de-prioritize (5). |
| **Career arc** | SoftUni (backend dev + teacher) → Dow Jones (senior SWE) → VSG Bulgaria (tech lead, where the agentic shift is happening now). Pre-VSG roles had no agentic work; that's a recent development. |
| **Voice** | Career arc. No urgency. Senior. Talks to peers, not down to readers. Backend-engineer framing for FE concepts. |

### The 5-minute hiring-manager brief (the design's acceptance criteria)

A hiring manager spending 5 minutes on the site **must** walk away knowing:

1. **Senior backend engineer / tech lead with real depth** — ~10 years C#/.NET, scaled orgs, currently leading at VSG. Credibility floor.
2. **Agentic-development first** — evidenced by slot-4 case study + an article. The differentiator.
3. **Actually ships** — VSG (current), Dow Jones (scaled org impact), this blog (live artifact). Counters "agentic-positioning person who just configures tools."
4. **Communicates at senior level** — article(s) and project case studies have voice + opinion. Carried by craft, not declaration.
5. **Available for the right conversation** — clear, low-friction contact; voice signals "listening" without "hire-me-now."

Things deliberately **off** the brief: frontend skills, stack-badge checklists, open-source track record, speaking history.

### Tone translation (for the design agent)

The strategic voice — *"career arc, no urgency"* — translates into design intent below. These are **directions**, not specifications. The design agent owns visual choices; this is the box they should fit in.

- **Reference point**: senior trade publication (Stripe Press, Increment-era), or considered personal sites (Maggie Appleton, Robin Sloan, Julia Evans). **Not** aspirational-startup (Vercel hero, Linear marketing), **not** corporate-blog (Medium, default StackOverflow), **not** brutalist raw-markdown.
- **Type**: lean transitional or trade-publication. Avoid Inter / Manrope / geometric "tech aspirational" stacks. Body type should reward reading 800 words; headings sturdy, not punchy.
- **Color**: restrained, 2–3 colors total. One accent at most. Slight warmth or slight cool — not pure white-on-black. Hierarchy comes from weight and size, not from bright accents.
- **Motion**: UI feedback only, not decoration. Hover states, focus rings, subtle route-change transitions. **No** scroll-triggered animations, parallax, fly-ins, or marketing-landing reveals. The existing `FuzzyCursor` component contradicts this tone — recommend removal.
- **Microcopy**: direct, declarative. No exclamation marks. No *"Welcome!"* / *"Let's build something amazing"* / *"Get in touch and..."* Either neutral (`Email · GitHub · LinkedIn`) or dry-personal (*"If you want to talk, here's how."*). Empty/loading states: skeletons over spinners. Error states: honest, not jokey (*"Couldn't load this. Refresh, or send me a message if it keeps happening."*).
- **Imagery**: photo of Svetlin should look like a working engineer (relaxed, natural light, no studio pose). Project pages do not need hero images — code excerpts and well-structured text carry more weight than stock photography.

**Litmus test for any visual choice**: *would this fit on a senior engineer's personal site that a hiring manager would respect, or does it look like a candidate trying too hard?* If the latter, dial it back.

---

## 2. Information Architecture

### Routes at launch

| Route | Purpose | Status |
|---|---|---|
| `/` Home | Portfolio-first landing. Delivers brief items 1–3 in first viewport, 4 below the fold. | Redesign — current is article-led, wrong shape. |
| `/projects` | 3 career-arc job projects + 1 featured slot-4 case study + breadth list (2 upcoming). | Rework — see §4. |
| `/projects/:name` | Per-project MDX deep-dive. Existing pipeline works. | Keep mechanic; rewrite content. |
| `/articles` | Listing route. Forward-compat — 1–2 cards at launch, scales. | **New**. |
| `/articles/:slug` | Article detail. Existing ArticlePage mechanics (full-bleed grid, sticky ToC, IntersectionObserver) reused. | **New routing** — current `/article` is one hardcoded demo. |
| `/about` | Career-arc story + tag-row of capabilities + contact links. Linchpin page. | Rework — see §5. |
| `/contact` | Links-only. Email + socials (which socials TBD). No form, no backend. | Rework — kill the copy-pasted signup form. |
| `*` 404 | Not-found page. | **New**. |

### 404 page

Matches site tone. Two links: `/` and `/projects`. **No** 404-themed illustration, **no** *"Oops!"* / *"Lost in space"* microcopy. Suggested copy: *"That page isn't here. Try [Home] or [Projects]."*

### Killed at launch

- `/article` singular demo route — replaced by `/articles/:slug`.
- `/AboutMe` duplicate route — keep `/about` only.
- `Categories` + `PopularContents` sidebar stubs on Home — blog-IA, doesn't fit portfolio-first.

### Navbar

`Home · Projects · Articles · About · Contact`

5 items, no overflow, no hamburger-only nav until breakpoint.

---

## 3. Home (`/`)

### Locked shape: H4 Variant A — *Compact hero, balanced grid, scroll to reveal*

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

### Locked decisions on Home

- **Slot 4 visually outranks job projects.** Full-width card vs 2-up. Lead positioning gets the visual lead.
- **SoftUni is not on Home.** Lives on `/projects` only.
- **Breadth list (skill library, Brochures) is not on Home.** Lives on `/projects` only.
- **One article on Home, not multiple.** Delivers brief item 4 inline.
- **No sidebar.** Categories + Popular stubs are cut.
- **Hero photo is small (~80px), photo-left.** Personality without taking the visual lead.
- **Each section earns its own scroll-screen.** No "everything in one viewport" density. Hero, then featured work, then writing, then contact — each is its own beat.

### Fallback shape if articles slip

If no launch articles are ready, the "Writing" section is omitted entirely (don't show "Coming soon" — looks juvenile). Home becomes Hero → Featured work → Contact. Article strip drops back in when first article ships.

---

## 4. Projects (`/projects`)

### Locked shape

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

### Locked decisions on Projects

- **Three tiers**: FEATURED (1 card, prominent) → CAREER (3-up, equal weight) → SHIPPING NEXT (lighter list).
- **VSG sits leftmost in CAREER** — it's current, and its case study honestly mentions the team's agentic shift. Dow Jones in the middle (scale signal). SoftUni rightmost (teaching foundation).
- **The breadth list is visibly lighter** — bullets or compact cards, not equal-weight project cards. Communicates "in flight, not yet public" honestly without hiding it.
- **Breadth list entries reserve link slots** — designed so when skill library or Brochures go public, the slot fills with a real link without page restructuring.
- **No "View all" pagination, no infinite scroll.** The project list is finite at this stage.

### Slot 4 deep-dive content (`/projects/this-site-agent-augmented` or similar slug)

Treat as a peer-quality case study to a real job project, not a "how I made this" tutorial.

Required sections (rough):
- **What it is**: this site, the artifact you're reading. One paragraph.
- **The harness**: orchestrators (`/ship-feature`, `afk-coder`, `afk-reviewer`), skill library structure, persistent memory across sessions. Code excerpts from real `.claude/rules/` files (e.g., `vsa-tdd`, `documentation-creator`).
- **Workflow shown**: what a typical change looks like — issue → grill → plan → ship → review → merge.
- **What it's not**: not a generic "AI coding" pitch. Not a productivity-hack post. Honest about what's automated vs. what's curated.
- **Where this is heading**: skill library going public, Brochures, etc. Links to breadth list entries.

The case study can excerpt real rules files as syntax-highlighted blocks. This is the publicly-clickable evidence of agentic positioning at launch, before the skill library repo is public.

### 4.1 Job-project pages (`/projects/:name` for VSG, Dow Jones, SoftUni)

The existing per-project MDX pipeline works — `ProjectDetailsHeader`, `ProjectInfo`, `NextProject`, and the in-MDX components (`Section`, `Cluster`, `StatCard`, `TextCard`, `BeforeAfterCard`, `UnorderedList`) are kept. What was missing: a **shared shape** across the three job projects so they read as peers.

**Required sections, in order:**

1. **Header strip** — role title, company, dates, one-line context. Existing `ProjectDetailsHeader` + `ProjectInfo`.
2. **What I did** — 1–3 `Section`s. The substance. Concrete work, not generic *"I led the team."*
3. **What I learned** — 1 short section, prose. The senior-comms signal. Be honest about trade-offs and what didn't go to plan.
4. **Outcomes / artifacts** — short. Use `StatCard` only when there's a defensible number. **Skip the section** rather than fabricate metrics.
5. **Next project** — existing `NextProject` component. Site chrome, always present.

**First-class MDX components** (use freely): `Section`, `UnorderedList`, `StatCard` (when honest).

**Use sparingly**: `BeforeAfterCard` (only for a real concrete migration/improvement — at most one per project), `Cluster` / `TextCard` (visual variety only, not load-bearing).

**Anti-patterns the design agent should resist:**

- Templated marketing sub-sections (*"The Challenge / My Approach / The Solution / The Result"*) — these read junior-consulting-deck.
- Fabricated stats. If you can't source the number, drop the `StatCard`.
- Multiple `BeforeAfterCard`s per project — overuse kills the device.
- **The same shape across all three projects.** VSG is current tech-lead work, Dow Jones is scale / senior IC, SoftUni is teaching / foundation. They should *feel* different because the work was different. Resist the urge to template them identically.

**Project ordering in the Career strip** on `/projects` is locked: VSG (left, current) → Dow Jones (middle, scale) → SoftUni (right, teaching foundation). `NextProject` traversal should follow this order.

---

## 5. About (`/about`)

### Locked shape

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

### Locked decisions on About

- **No subheadings inside Story.** Three flowing paragraphs. The visitor here chose to read; reward with prose.
- **CoreSkills 4-card grid replaced by a tag-row.** At tech-lead seniority, 4 themed cards read as a feature list. A tag-row reads as "here's the surface area," which is more accurate. Also cheaper to maintain.
- **¶3 names slot 4 + skill library + Brochures inline.** Don't gate the agentic positioning behind clicking into `/projects` — About is the linchpin.
- **Photo at ~120px on About.** Bigger than Home (~80px). Humanizes the career-arc tone.
- **"Get in touch" links repeat at bottom.** `/contact` is a separate route but About shouldn't dead-end.

---

## 6. Contact (`/contact`)

- **Links-only**. No form, no backend.
- **Required**: Email, GitHub, LinkedIn.
- **TBD with Svetlin**: X/Twitter, Bluesky, Mastodon, personal Telegram/Signal — which (if any) does he want to expose.
- **Voice**: signal-listening, not hire-me-now. Career arc, no urgency.

---

## 7. Articles (`/articles`, `/articles/:slug`)

The pipeline mechanics (frontmatter shape, registry pattern, ToC, Related, draft flag, reading time) are **not yet locked** — separate grill needed before design pass. Two things are locked:

- **Listing route exists at launch** even with 1–2 articles. Forward-compat for goal B (writing habit).
- **Existing per-article mechanics** (full-bleed grid + sticky ToC + IntersectionObserver) are kept and rewired to slug routing.

Design agent: do not over-design `/articles` for visible content density. With 1–2 entries, restraint reads as confident; clutter reads as desperate.

---

## 8. Mobile shape

All ASCII in this brief is desktop. Mobile reflow direction for each page:

### Home (mobile)

- **Hero**: photo centered above name/positioning. All centered. Photo stays ~80px.
- **Featured work**: slot 4 stays full-width. VSG and Dow Jones **stack 1-up below** (no side-by-side on narrow).
- **Writing**: same — full-width card.
- **Contact strip**: same.

### Projects (mobile)

- **Featured**: same full-width card.
- **Career 3-up → 1-up stack** below threshold.
- **Shipping next**: bullet list stays.

### About (mobile)

- **Hero**: photo centered above name; positioning beneath; all centered.
- **Story**: full-width paragraphs.
- **Tag-row**: wraps naturally; chips do not shrink — they wrap to a second/third line.
- **Get in touch**: same.

### Job-project pages (mobile)

- **Header**: stacked rows (title → company/dates → context line).
- **MDX content**: full-width, no side margins beyond layout padding.
- **`NextProject`**: full-width tap target.

### Navbar (mobile)

- Existing hamburger + body-scroll lock mechanic kept (it already works per `HANDOFF.md`).
- Hamburger threshold around ~768px (or whatever fits 5 nav items + logo without crowding).
- Inside the open hamburger, nav items stack vertically with generous tap targets.

### Touch / hit targets

- Minimum 44×44px on all interactive elements (MUI button defaults are fine).
- Project cards on mobile are **fully tappable**, not just the title link.
- Focus rings preserved on keyboard nav (don't `outline: none` and forget to replace).

---

## 9. What's NOT yet decided (do not invent)

| Item | Why deferred | Where it'll come from |
|---|---|---|
| **Final copy** — hero one-liner, About story, project intros, article voice | Needs Svetlin's voice, not a stand-in | Future grill or direct draft |
| **Article topics** — what the 1–2 launch articles are about | Content decision, Svetlin-owned | Future grill |
| **Article pipeline shape** — frontmatter, slug strategy, ToC v1, Related, reading time | Co-design with Svetlin once topics are clearer | Future grill (Volley 2 territory) |
| **Project-page rewrites** — actual content for VSG, Dow Jones, SoftUni, slot-4 | Content decision | Future drafting |
| **Contact list** — which socials specifically | Trivial but needs Svetlin's call | Quick check-in |
| **Visual system** — type, color, spacing, components, animation, motion | This is the design agent's job, not the brief's | Design agent |

Things the design agent **must not** decide unilaterally:
- Killing or adding routes.
- Changing the 5-min brief priorities.
- Repositioning slot 4 below the job projects.
- Reintroducing the Categories/Popular sidebar.
- Switching to a different home-page shape (H1/H2/H3 were rejected).
- Adding a CMS / SSR / Next.js / static-only-on-Vercel path (deploy = behind .NET host, locked).

If the design agent wants to push back on any of the above, that's a decision for Svetlin, not a unilateral redesign.

---

## 10. References

- `HANDOFF.md` — codebase state, known bugs, the C/D/E/F delegated punch list (mechanical cleanup + .NET host wiring + SEO + git init).
- `~/.claude/projects/C--Users-SGalov-MasterFolder-Trainings-SGG-SvetlinGalovBlog/memory/` — user profile, project goals, repo layout quirks. Read before designing.
- `.claude/rules/frontend-architect.md` — folder/layer boundaries, page/component separation, React Query conventions.
- `.claude/rules/frontend-developer.md` — performance, a11y, MUI + Emotion styling rules.

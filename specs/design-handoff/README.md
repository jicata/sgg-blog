# Handoff: Personal Blog/Portfolio — visual redesign

> **For the porting agent**: read this README first, then `design-spec.md` (the token source of truth), then walk the per-page reference HTMLs in `prototype/pages/`. The source under `prototype/src/` is the implementation reference, not the target.

---

## What this handoff IS and IS NOT

**IS**: a frozen, single-configuration design output. Every visual decision is
made. There is exactly one design to port — the one rendered in
`prototype/prototype.html` and `prototype/pages/*.html`.

**IS NOT**: a menu of options. You are not being asked to pick a type pairing,
accent color, theme mode, density, or any other knob. **You are not asked to open
anything and "choose."** If you see references elsewhere to a "Tweaks panel,"
"toggle," or asking Svetlin to "lock" anything — that's from an older version of
the brief. **Disregard. This handoff is the locked version.**

---

## Locked configuration

No decisions remain. These are the only values that ship:

| Knob | Value |
|---|---|
| Theme mode | **Dark only** |
| Type pairing | **IBM Plex Sans** (display/UI) + **Source Serif 4** (body) + **IBM Plex Mono** (labels/code) |
| Accent color | **Warm amber** — `oklch(0.78 0.10 75)` |
| Background | Cool slate — `oklch(0.16 0.012 250)` |
| Hero density | Compact (photo 80px on Home, 120px on About) |
| Slot-4 card | Assertive — elevated surface gradient, accent eyebrow |
| Project card meta | Minimal — no tag strip on job project cards |
| Writing section on Home | Shown |

Full token detail in `design-spec.md`. The per-page reference HTMLs already
render these locked values; what you see is what ships.

---

## Overview

This is a complete visual + IA redesign of Svetlin Galov's personal portfolio + blog
(`SvetlinGalovBlog/wwwroot/svetlin-galov-blog/`). The redesign honors a locked design
brief (positioning, page shapes, IA, voice) and produces a concrete visual system
on top of it.

**Driving intent**: a 5-minute hiring-manager visit walks away knowing Svetlin is a
*senior backend tech lead, agentic-first, who actually ships.* Restraint over flourish.
Senior trade publication, not aspirational startup.

---

## About the design files

**The files in this bundle are design references created in HTML/React with Babel
in the browser. They are prototypes showing intended look and behavior — not
production code to copy directly.**

Your task is to **recreate these designs in the target codebase** (`SvetlinGalovBlog/wwwroot/svetlin-galov-blog/`)
using its established stack:

- React 18 + Vite + TypeScript
- React Router (the prototype uses a state-based dispatch — *replace with real React Router*)
- MUI primitives + Emotion / `sx` (the prototype uses inline styles — *replace with MUI theme tokens*)
- React Query for server state (no server state at launch; just wire the provider)
- MDX for content (project case studies + articles)

**Do not ship the HTML directly.** The HTML is reference. The TSX you write is the product.

---

## Fidelity

**High-fidelity.** Final type pairing, color tokens, spacing scale, component shapes,
hover/focus states, and motion durations are all decided and live in
`design-spec.md`. Recreate pixel-fidelity:

- Exact `oklch()` color tokens
- Type scale named in `design-spec.md` §2
- 4pt spacing grid (§4)
- Hover = surface tint shift only (no shadow lift) per §5
- Focus rings always present (`:focus-visible`)

**Placeholder content** is marked. Don't ship placeholder copy — Svetlin owns final
copy. But ship the *structure* of the placeholder text (clamps, line counts) so
the layout doesn't shift when real copy lands.

---

## Repository context (must read before porting)

The original `DESIGN-PACK.md` Svetlin handed off establishes hard constraints. The
ones that govern *your* work:

### §4 — Frontend architecture (non-negotiable)

- **Page vs Component**: pages are route-addressable, own data fetching, compose
  components. Components receive props, do not fetch. Pages and components NEVER
  sit at the same folder level.
- **Folder shape** (per page):
  ```
  src/pages/{PageName}/
    {PageName}Page.tsx          ← route entry
    {PageName}Page.test.tsx
    components/                 ← page-scoped, ONLY used here
      {Component}.tsx
      {Component}.test.tsx
  ```
- A component graduates to `src/components/` ONLY when a second page imports it.
  Never preemptively.
- **One component per file.** Filename matches default export.
- **Server state → React Query.** Never `useState` + `useEffect` + `fetch`.
- **MUI primitives + Emotion/`sx`.** No hard-coded colors / spacing / type sizes
  in components — read from the MUI theme.

### §5 — Frontend implementation

- Core Web Vitals from the start. Code splitting per route. Image optimization
  (WebP/AVIF; responsive sizes).
- WCAG 2.1 AA. Semantic HTML, focus management, keyboard nav.
- Memoization (`memo`/`useCallback`/`useMemo`) where measurably needed — not
  reflexively.

### What to preserve (don't redesign)

- The MDX project-details pipeline (`Section`, `Cluster`, `StatCard`, `TextCard`,
  `BeforeAfterCard`, `UnorderedList` in-MDX components). Visual treatment of these
  components changes per the spec; their **API does not**.
- The article full-bleed grid + sticky ToC + IntersectionObserver active-section
  mechanic. The prototype shows the *visual* refresh; lift the *mechanism* from
  the existing `src/pages/article/` code.
- The navbar scroll-state + hamburger + body-scroll-lock mechanism.

### What to remove

- `FuzzyCursor.tsx` and its mount point. Contradicts the design tone.
- The Categories + PopularContents sidebar stubs on Home.
- The `/AboutMe` duplicate route (keep `/about` only).
- The signup form on `/contact` (replace with links-only).
- The single hardcoded `/article` demo route (replaced by `/articles/:slug`).
- Unused imports flagged in `DESIGN-PACK.md` §2 ("Known bugs / rot").

### What to add

- `/articles` listing route (forward-compat; 1–2 entries at launch).
- `/articles/:slug` detail route (rewires the existing article mechanic).
- `*` 404 route.

---

## Screens / Views

Every screen below has a corresponding reference HTML in `prototype/pages/` and
a source component under `prototype/src/pages/`. Layout decisions, copy structure,
and spacing are taken from those references.

### 1. Home — `/` → `prototype/pages/home.html`

**Purpose**: First viewport delivers brief items 1–3 (senior, agentic, ships).
Below the fold delivers item 4 (writing) and the contact strip.

**Locked shape** (see `DESIGN-PACK.md` §3.5):
- Compact hero, photo-left at 80px
- Featured work section: slot-4 case study full-width + 2-up (VSG, Dow Jones)
- Writing section: single article card
- Contact strip footer

**Implementation notes**:
- The slot-4 card visually outranks the job cards (full-width vs 2-up). Do not
  equalize them.
- SoftUni is NOT on Home. Lives on `/projects` only.
- "Shipping next" breadth list is NOT on Home.
- **Fallback shape**: if no launch articles are ready, omit the Writing section
  entirely. Do not render "Coming soon."
- **Mobile**: photo above name (centered), card grid 1-up below 640px.

### 2. Projects list — `/projects` → `prototype/pages/projects.html`

**Purpose**: 3-tier project list — Featured, Career, Shipping Next.

**Locked shape** (`DESIGN-PACK.md` §3.6):
- **Featured** (1 card, full-width, emphasized): slot-4 case study.
- **Career** (3-up grid, equal weight): VSG (left, current) → Dow Jones (middle, scale)
  → SoftUni (right, foundation). Order is locked.
- **Shipping Next** (lighter list, no card chrome): bullet rows for Claude Code
  skill library + Brochures. `--fg-faint` colored. Reserved link slots.

**Implementation notes**:
- "View all" pagination forbidden. Infinite scroll forbidden.
- The 3 career cards are equal weight but `NextProject` traversal follows
  VSG → Dow Jones → SoftUni → slot-4 → VSG.
- Shipping Next rows MUST visually read lighter than career cards — `--fg-faint`,
  no card border, hairline divider only.

### 3. Project detail — slot-4 case study — `/projects/this-site-agent-augmented` (slug TBD)
   → `prototype/pages/project-this-site.html`

**Purpose**: The publicly-clickable evidence of agentic positioning at launch.

**Required sections** (in order):
1. Hero: eyebrow "CASE STUDY · agentic engineering", title, dek, tag row.
2. **What it is** — one paragraph.
3. **The harness** — orchestrators, skill library, persistent memory. Includes
   real `.claude/rules/` excerpts as code blocks.
4. **What a change looks like** — step ladder (Issue / Grill / Plan / Ship /
   Review / Merge) with one-line each.
5. **What this is not** — left-rule-quoted block, italic. Honest disclaimer.
6. **Where this is heading** — links forward to skill library + Brochures.
7. Next project footer card.

**Implementation notes**:
- This treats as a peer-quality case study to a real job project. Not a tutorial.
- Code excerpts in the prototype are PLACEHOLDER — Svetlin will replace with
  real files from his repo's `.claude/rules/`. Honor the filename strip + lang
  badge pattern at port time.
- 720px prose width. Sections separated by 64px (`--space-8`).

### 4. Project detail — job project — `/projects/:name` (vsg / dowjones / softuni)
   → `prototype/pages/project-vsg.html`, `project-dowjones.html`, `project-softuni.html`

**Purpose**: Shared shape across VSG, Dow Jones, SoftUni so they read as peers.
Existing `ProjectDetailsHeader`, `ProjectInfo`, `NextProject` and the in-MDX
components are *kept* — what's new is the shared **section order**.

**Required sections** (`DESIGN-PACK.md` §3.6):
1. Header strip (dates eyebrow, title, company line, context paragraph).
2. **What I did** — 1–3 `<Section>` MDX blocks with `h2` heading + body.
3. **What I learned** — single short prose block in a left-ruled quote.
4. **Outcomes / artifacts** — optional `<StatCard>` row. *Only if there are
   defensible numbers.* Skip the section rather than fabricate.
5. **Next project** — existing `NextProject` component.

**Anti-patterns to avoid** (called out in source brief):
- Templated marketing sub-sections (Challenge/Approach/Solution/Result).
- Fabricated stats.
- More than one `<BeforeAfterCard>` per project.
- The same shape across all three projects feeling identical. VSG is current
  tech-lead work, Dow Jones is scale/IC, SoftUni is teaching. They should
  *feel* different because the work was different.

**Implementation notes**:
- The MDX pipeline is `import.meta.glob`-registered. New MDX files for VSG /
  Dow Jones / SoftUni go in `src/content/projects/` and auto-register.
- Content rewrites are NOT in this handoff — copy is Svetlin's. Build the
  template; he writes the bodies.

### 5. About — `/about` → `prototype/pages/about.html`

**Purpose**: Career arc story + tag row + contact links.

**Locked shape** (`DESIGN-PACK.md` §3.7):
- Hero: 120px photo (bigger than Home), `display-xl` name, dek.
- **Story**: 3 paragraphs, `body-l` serif, 720px width. **No h2 inside Story.**
  Paragraph spacing 0.85em.
- **What I work on**: tag-row of capabilities. Wrap, no shrink. Replaces the
  old 4-card `CoreSkills` grid (which was 4× identical placeholder cards).
- **Get in touch**: link row matching Home's contact strip.

**Implementation notes**:
- The current `/AboutMe` route is killed. Only `/about` remains.
- Story ¶3 names slot-4, skill library, Brochures inline with internal links to
  `/projects` — do NOT gate agentic positioning behind clicking deeper.

### 6. Contact — `/contact` → `prototype/pages/contact.html`

**Purpose**: Links-only. Email + GitHub + LinkedIn. No form. No backend.

**Layout**: page title, dek one-liner, then a vertical list of link rows.
Each row: mono label (left) + mono accent value (middle) + arrow glyph (right).
Hover row tint on `--surface-1` at 50% alpha.

**Content** (confirmed by Svetlin):
- Email: `svetlingalov@gmail.com`
- GitHub: `https://github.com/jicata`
- LinkedIn: `https://www.linkedin.com/in/svetlin-galov/`

No other socials at launch.

### 7. Articles list — `/articles` → `prototype/pages/articles.html`

**Purpose**: Forward-compat listing for `/articles` route. 1 entry at launch is
fine; restraint reads as confident.

**Layout**: hairline-rule row per article (NO card chrome). Each row:
`label` mono date + read time, `h1` title, `body-l muted` dek.

**Implementation notes**:
- Article pipeline (frontmatter shape, slug strategy, ToC v1, Related, reading
  time) is NOT yet locked per `DESIGN-PACK.md` §3.9. Build the *listing visual*
  per this handoff; co-design the pipeline mechanics with Svetlin separately.
- Cards on hover get a row-background tint, not a border. Whole-row is the
  tap target on mobile (`role="button"` or `<a>` wrap).

### 8. Article detail — `/articles/:slug` → `prototype/pages/article-agents.html`

**Purpose**: Long-form reading. Preserves the existing article mechanism;
refreshes the visuals.

**Required mechanics** (lift from existing `src/pages/article/`):
- Full-bleed grid: prose column + sticky ToC sidebar.
- IntersectionObserver-driven active-heading highlight in ToC.
- 720px prose width, `body-l` serif, 0.85em paragraph spacing.

**Refreshed visuals**:
- Header strip with date / read time / byline as mono `label`.
- `display-l` title, `body-l muted` dek, hairline-rule divider before body.
- ToC: 220px right rail, mono `ui-s`, 2px `--accent` vertical bar on active
  heading. Hides below 1024px.

### 9. 404 — `*` → `prototype/pages/not-found.html`

**Layout**: centered column, 480px max. `label` "404", `display-l` title:
*"That page isn't here."*, `body-l muted` paragraph, two arrow links: Home,
Projects.

**Forbidden**: 404 illustration, "Oops!" / "Lost in space" copy.

---

## Interactions & Behavior

### Navigation

- 5-item navbar: `Home · Projects · Articles · About · Contact`.
- Current route gets `--fg` color + 1px accent underline 2px below baseline.
- Hover: `--fg-muted` → `--fg`, no underline.
- Mobile (< 768px): collapses to hamburger. Open state body-scroll-locked.
- Brand mark left: 8px accent square + `svetlin.galov` in mono.

### Card hover

- 200ms transition.
- Background: `--surface-1` → `--surface-2`.
- Border: `--border` → `--border-strong`.
- **No** translate, **no** shadow.
- Cursor: pointer for whole-card-as-link.
- Focus-within: visible ring on the card.

### Route transitions

- 200ms opacity crossfade only (`@keyframes routeIn` in `theme.jsx`).
- No transform. No stagger.
- `prefers-reduced-motion: reduce` reduces to instant via global rule.

### Links

- Inline links: `--accent` color, 1px underline at 0.18em offset.
- Hover: `--accent-strong`, underline thickness 2px.
- Focus-visible: 2px outline ring at 2px offset.

### Loading / empty / error states

- **Loading**: skeleton rectangles in `--surface-1` with subtle 1.2s opacity
  pulse. Never spinners.
- **Empty (articles, 1 entry)**: render the one card. NO "Coming soon" /
  placeholder cards.
- **Error**: 16px mono prose at `--fg-muted`. Honest copy template:
  *"Couldn't load this. Refresh, or send me a message if it keeps happening."*

### Keyboard / focus

- Skip link as first focusable element on every page: "Skip to main content."
- All cards are tab-stops via `tabIndex={0}` + `role="link"` + Enter/Space handler.
- Focus rings ALWAYS visible on `:focus-visible`. Never `outline: none` without
  a styled replacement.

---

## State Management

Minimal at launch — there is no server state.

- **Routing**: React Router. Replace the prototype's `RouterProvider` state-machine
  with `<BrowserRouter>` + `<Routes>` + `<Route>` per §4. URL is source of truth.
- **Navbar mobile open**: local `useState` in the Navbar component.
- **Article active-heading**: local `useState` in the ArticlePage, driven by
  IntersectionObserver per existing mechanic.
- **React Query**: mount `<QueryClientProvider>` at app root even though there
  are no queries yet. Forward-compat for projects API if/when it goes live
  (currently `projectsApi.ts` returns a hardcoded in-memory array; that's a
  separate mechanical cleanup, not a design concern).

---

## Design Tokens

**See `design-spec.md` for the full source of truth.** Summary below; spec
document has all six page redlines, motion durations, semantic mappings.

### Color (dark theme — only theme at launch)

```
--bg              oklch(0.16 0.012 250)
--surface-1       oklch(0.20 0.012 250)
--surface-2       oklch(0.235 0.012 250)
--surface-3       oklch(0.27 0.012 250)
--border          oklch(0.30 0.012 250)
--border-strong   oklch(0.42 0.012 250)

--fg              oklch(0.95 0.006 250)
--fg-muted        oklch(0.72 0.006 250)
--fg-dim          oklch(0.55 0.006 250)
--fg-faint        oklch(0.42 0.012 250)

--accent          oklch(0.78 0.10 75)        warm amber
--accent-strong   oklch(0.85 0.12 75)
--accent-fg       oklch(0.18 0.012 250)
--focus           oklch(0.82 0.10 75)
```

### Typography

- Display + UI: `IBM Plex Sans` (weights 400, 500, 600)
- Body: `Source Serif 4` (weights 400, 500, 600; opsz 8..60)
- Mono: `IBM Plex Mono` (weights 400, 500)

Font load:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&display=swap" />
```

Scale (see spec §2):

| Token | Size / Line | Weight | Family |
|---|---|---|---|
| display-xl | clamp(36,5vw,56) / 1.08 | 600 | sans |
| display-l  | clamp(30,4vw,44) / 1.15 | 600 | sans |
| h1 | 28/35 | 600 | sans |
| h2 | 22/28.6 | 600 | sans |
| h3 | 17/23.8 | 600 | sans |
| body-l | 18/29.7 | 400 | serif |
| body | 16/25.6 | 400 | serif |
| body-s | 14/21.7 | 400 | serif |
| ui | 15/21 | 500 | sans |
| ui-s | 13/18.2 | 500 | sans |
| label | 11/14 | 500 | mono UPPERCASE, +0.08em tracking |

### Spacing (4pt grid)

```
4 8 12 16 24 32 48 64 96 128
```

### Radii

```
--radius-1  2   tags
--radius-2  6   inputs
--radius-3  10  cards
--radius-4  14  hero/featured card
```

### Motion

```
--duration-fast  120ms
--duration       200ms
--duration-slow  320ms
--ease           cubic-bezier(0.2, 0, 0, 1)
```

**Allowed**: hover transitions, focus ring fade, route crossfade, ToC active-bar slide.
**Forbidden**: parallax, scroll-triggered reveals, fly-ins, animated cursor.

---

## MUI theme port

When you set up the MUI theme, map tokens like this (illustrative — adjust for
your typing of the theme):

```ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'oklch(0.16 0.012 250)',
      paper:   'oklch(0.20 0.012 250)',
    },
    text: {
      primary:   'oklch(0.95 0.006 250)',
      secondary: 'oklch(0.72 0.006 250)',
      disabled:  'oklch(0.42 0.012 250)',
    },
    primary: {
      main:  'oklch(0.78 0.10 75)',
      light: 'oklch(0.85 0.12 75)',
      contrastText: 'oklch(0.18 0.012 250)',
    },
    divider: 'oklch(0.30 0.012 250)',
  },
  typography: {
    fontFamily: "'Source Serif 4', Charter, Georgia, serif",
    h1: { fontFamily: "'IBM Plex Sans', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(30px, 4vw, 44px)', lineHeight: 1.15, letterSpacing: '-0.018em' },
    h2: { fontFamily: "'IBM Plex Sans', system-ui, sans-serif", fontWeight: 600, fontSize: 28, lineHeight: 1.25 },
    h3: { fontFamily: "'IBM Plex Sans', system-ui, sans-serif", fontWeight: 600, fontSize: 22, lineHeight: 1.3 },
    body1: { fontSize: 18, lineHeight: 1.65 },
    body2: { fontSize: 16, lineHeight: 1.6 },
    button: { fontFamily: "'IBM Plex Sans', system-ui, sans-serif", fontWeight: 500, textTransform: 'none' },
    caption: { fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' },
  },
  spacing: 4, // 4pt grid: theme.spacing(1) = 4px, theme.spacing(6) = 24px
  shape: { borderRadius: 10 },
  transitions: {
    duration: { shortest: 120, shorter: 200, short: 320 },
    easing:   { easeOut: 'cubic-bezier(0.2, 0, 0, 1)' },
  },
});
```

Then within components, prefer `sx={{ p: 6, bgcolor: 'background.paper' }}`
over hard-coded values. `theme.spacing(6) === 24px` on the 4pt grid.

---

## Assets

- **Photo of Svetlin**: not yet provided. Prototype uses placeholder boxes
  (`<PhotoPlaceholder />` component) sized 80px on Home and 120px on About.
  Replace with WebP/AVIF + responsive `srcset` when the real photo lands.
- **Icons**: none imported. Arrow affordances use mono `→` / `↗` characters,
  not SVG. If real icons are needed later (search, RSS, social marks), use
  Lucide at 18px stroke 1.5px.
- **Brand mark**: 8px accent-colored square + `svetlin.galov` in IBM Plex Mono.
  Lives in the Navbar component.

---

## Files in this bundle

```
design_handoff_personal_blog/
├── README.md                              ← this file
├── design-spec.md                         ← TOKEN SOURCE OF TRUTH
└── prototype/
    ├── prototype.html                     ← clickable demo across all routes
    ├── pages/                             ← per-route reference HTMLs (one per screen)
    │   ├── home.html
    │   ├── projects.html
    │   ├── project-this-site.html         ← slot-4 case study
    │   ├── project-vsg.html
    │   ├── project-dowjones.html
    │   ├── project-softuni.html
    │   ├── articles.html
    │   ├── article-agents.html
    │   ├── about.html
    │   ├── contact.html
    │   └── not-found.html
    └── src/
        ├── theme.jsx                      ← :root tokens + global styles
        ├── components.jsx                 ← Navbar, Footer, Card, Tag, etc.
        ├── app.jsx                        ← state-router dispatch (replace with React Router)
        └── pages/
            ├── home.jsx
            ├── projects.jsx
            ├── project-slot4.jsx
            ├── project-job.jsx
            ├── about.jsx
            ├── articles.jsx               ← list + detail
            ├── contact.jsx
            └── not-found.jsx
```

**Do not port**:
- The state-based `RouterProvider` / `useRouter` in `components.jsx`. Replace
  with React Router. The `navigate(name, params)` semantics map 1:1 to
  `useNavigate()` calling `navigate("/projects")` etc.
- The `applyTweaks(...)` call in `app.jsx`. It exists only because the prototype
  applies its locked configuration via runtime CSS variable overrides. In the
  ported app, the same values live in the MUI theme directly — see "MUI theme
  port" below.

**Do port (with structural translation)**:
- Every `src/pages/*.jsx` → corresponding `src/pages/{Name}/{Name}Page.tsx`
  following §4 folder shape.
- `theme.jsx` :root CSS variables → MUI theme tokens (see "MUI theme port"
  above). The CSS variable approach is fine to keep in parallel for non-MUI
  surfaces, but the canonical source is the MUI theme.
- All components from `components.jsx` → either page-scoped or in
  `src/components/` per the promotion rule (a component graduates when a
  second page imports it). `Navbar`, `Footer`, `Card`, `Tag`, `Label`,
  `PhotoPlaceholder`, `ArrowLink` are cross-page; the rest are page-scoped.

---

## Port order (recommended)

Follow `DESIGN-PACK.md` §6 (c) sequence:

1. **MUI theme + global tokens** (from `design-spec.md` + section above).
2. **Layout + navbar** (refresh existing `Navbar.tsx`; remove FuzzyCursor;
   fix the `IF_inyoface.png` path bug).
3. **Home** — linchpin. Get the visual system landing here first.
4. **About** — second linchpin (story page; tag-row replaces CoreSkills).
5. **Projects list** — 3-tier shape.
6. **Slot-4 case study page** — new MDX file in `src/content/projects/`.
7. **Job-project pages** — apply shared shape to VSG / Dow Jones / SoftUni
   shells. *Content rewrites are not in scope; Svetlin owns copy.*
8. **Articles listing + slug routing** — rewire from current `/article` demo.
9. **Contact** — replace signup form with links-only.
10. **404** — new route.

At each step:
- Write the page test (`{Name}Page.test.tsx`) with at least one Testing Library
  query by role/label.
- Run a Lighthouse pass before moving to the next page. Catch regressions early.

---

## Open items the porting agent should surface back to Svetlin

These were `DESIGN-PACK.md` §3.11 deferred items; they are NOT design
ambiguities but content/strategy questions the agent should NOT invent answers to:

1. **Final copy** — every body string in the prototype is illustrative. Hero
   one-liner, About story, project intros, article body all need Svetlin's
   words.
2. **Article pipeline shape** — frontmatter, slug strategy, ToC v1, Related
   articles, reading-time calculation. §3.9 explicitly deferred.
3. **Photo** — when Svetlin drops it in, optimize per §5 (WebP/AVIF + responsive).
4. **Slot-4 code excerpts** — replace placeholder `.claude/rules/` excerpts
   with real files from Svetlin's repo.
5. **Slot-4 slug** — the prototype uses `project-slot4` as a route name; the
   real slug is TBD (suggested: `this-site-agent-augmented`).

If anything in `design-spec.md` or this README conflicts with what's already
in the repo or with §4/§5 of `DESIGN-PACK.md`, **§4 wins on folder/layer
decisions, §5 wins on in-component implementation, and this handoff wins on
visual decisions**.

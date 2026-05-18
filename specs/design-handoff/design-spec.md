# SvetlinGalovBlog — Design Spec

> Companion document to the clickable prototype (`prototype.html`). The prototype renders these tokens live; this doc is the source of truth for what to port into the MUI theme in `SvetlinGalovBlog/wwwroot/svetlin-galov-blog/`.

## 1. Strategy → Visual System

The brief reduces to one design instruction: **make a senior backend engineer's site that a hiring manager respects in 5 minutes.** Translation into visual decisions:

| Strategic intent (§3.3) | Visual translation |
|---|---|
| Career arc, no urgency | Restrained scale, no marketing reveals, hierarchy by weight not color |
| Trade-publication reference set | Serif body that rewards reading. Sturdy sans for UI. Mono for engineer signal. |
| Senior, not aspirational-startup | Cool slate near-black. One accent (warm amber) for links/focus only. |
| Agentic-first, evidenced not declared | Mono treatment on labels and slot-4 code excerpts does the visual signaling |
| Terminal-leaning senior-IC (your call) | Dark-only at launch. Faint texture allowed; phosphor-green refused as too on-the-nose. |

## 2. Type

Three families. Free (Google Fonts). Zoned, not mixed.

| Role | Family | Why |
|---|---|---|
| **Display + UI** | `IBM Plex Sans` — 400, 500, 600 | Humanist sans with engineering DNA; reads sturdy and trade-publication, not Inter-aspirational |
| **Body prose** | `Source Serif 4` — 400, 500, 600 | Transitional serif designed for screen reading; rewards 800-word article bodies |
| **Labels + code** | `IBM Plex Mono` — 400, 500 | Pairs natively with Plex Sans; for metadata, tags, code excerpts, slot-4 case study |

**Fallbacks**: `-apple-system, BlinkMacSystemFont, system-ui` for sans; `Charter, Iowan Old Style, Georgia, serif` for serif; `ui-monospace, "SF Mono", Menlo, monospace` for mono.

### Type scale

`rem` based, root = 16px.

| Token | Size / Line | Weight | Family | Use |
|---|---|---|---|---|
| `display-xl` | 56 / 60 | 600 | sans | About hero name |
| `display-l` | 44 / 52 | 600 | sans | Home hero name, page H1 |
| `h1` | 32 / 40 | 600 | sans | Section heads, article titles |
| `h2` | 24 / 32 | 600 | sans | Sub-section heads, card titles |
| `h3` | 18 / 26 | 600 | sans | Card titles inline |
| `body-l` | 18 / 30 | 400 | serif | Article body, About story |
| `body` | 16 / 26 | 400 | serif | Card descriptions, prose |
| `body-s` | 14 / 22 | 400 | serif | Captions, secondary text |
| `ui` | 15 / 22 | 500 | sans | Nav, buttons, UI chrome |
| `ui-s` | 13 / 20 | 500 | sans | Card metadata, secondary UI |
| `label` | 11 / 14 | 500 | mono | Eyebrow labels, tags — UPPERCASE + 0.08em tracking |
| `code` | 14 / 22 | 400 | mono | Inline code, code blocks |

**Tracking**: -0.01em on display sizes; default elsewhere; +0.08em on mono labels (uppercase only).

**`text-wrap: pretty`** on all headings and body. `text-wrap: balance` on display-l and above.

## 3. Color

Single dark theme at launch. Cool slate base, single warm accent.

### Surface

| Token | Value | Use |
|---|---|---|
| `--bg` | `oklch(0.16 0.012 250)` | Page background |
| `--surface-1` | `oklch(0.20 0.012 250)` | Cards, panels |
| `--surface-2` | `oklch(0.24 0.012 250)` | Card hover, slot-4 emphasis |
| `--surface-3` | `oklch(0.28 0.012 250)` | Code block background |
| `--border` | `oklch(0.30 0.012 250)` | Default rules, card edges |
| `--border-strong` | `oklch(0.42 0.012 250)` | Focus-adjacent, dividers |

### Foreground

| Token | Value | Use |
|---|---|---|
| `--fg` | `oklch(0.95 0.006 250)` | Primary text |
| `--fg-muted` | `oklch(0.72 0.006 250)` | Body prose, descriptions |
| `--fg-dim` | `oklch(0.55 0.006 250)` | Metadata, captions |
| `--fg-faint` | `oklch(0.40 0.012 250)` | "Shipping next" lighter tier |

### Accent

| Token | Value | Use |
|---|---|---|
| `--accent` | `oklch(0.78 0.10 75)` | Links, focus rings, key signal |
| `--accent-strong` | `oklch(0.85 0.12 75)` | Hover on accent |
| `--accent-fg` | `oklch(0.18 0.012 250)` | Text on accent fills |

**Single accent rule**: amber is for links, focus rings, and at most one signal per viewport. Tags, badges, and metadata are mono-on-muted — they do not eat the accent.

### Semantic mapping

- Links inline in prose: `--accent`, underlined with `text-underline-offset: 0.15em` and `text-decoration-thickness: 1px`.
- Focus ring: 2px solid `--accent` + 2px outline-offset. **Never** `outline: none` without replacement.
- Selection: `::selection { background: oklch(0.78 0.10 75 / 0.25); }`.
- Code background: `--surface-3`; code text: `--fg` at slightly muted opacity.

## 4. Spacing & Layout

4pt grid. Half-steps (2px) only for icon nudges.

| Token | px |
|---|---|
| `space-1` | 4 |
| `space-2` | 8 |
| `space-3` | 12 |
| `space-4` | 16 |
| `space-5` | 24 |
| `space-6` | 32 |
| `space-7` | 48 |
| `space-8` | 64 |
| `space-9` | 96 |
| `space-10` | 128 |

### Containers

| Name | Max width | Use |
|---|---|---|
| `container` | 1120px | Home, Projects list, About |
| `prose` | 720px | Article body, About story column |
| `wide` | 1280px | Full-bleed article grid sidebar accommodation |

Page horizontal padding: 24px mobile, 48px ≥640, 64px ≥1200.

### Vertical rhythm

- Page header → first section: `space-9` (96px)
- Section → section: `space-9` (96px) desktop, `space-8` (64px) mobile
- Within section, heading → body: `space-5` (24px)
- Paragraph spacing in prose: `0.85em` (margin-top on adjacent paragraphs)

### Grid

CSS Grid with `gap` (no margin spacing). Two-column patterns use `grid-template-columns: repeat(2, 1fr)` collapsing to single column under 640px. Three-column career strip: `repeat(3, 1fr)` → 1-up under 768px.

## 5. Radii, Borders, Shadows

| Token | Value | Use |
|---|---|---|
| `radius-1` | 2px | Tags, chips |
| `radius-2` | 6px | Inputs, small buttons |
| `radius-3` | 10px | Cards, code blocks |
| `radius-4` | 14px | Hero featured card (slight elevation) |
| `border` | 1px solid `--border` | Default card edge |
| `border-thin` | 1px solid `--border` at 0.5 opacity | Subtle dividers |

**No shadows** in default state. Hover lifts use surface tint change (`--surface-1` → `--surface-2`) and 1px border lighten — no drop shadow. Terminal-leaning aesthetic; shadows read web 2.0.

## 6. Motion

Strict. UI feedback only. **No** scroll-triggered animation, parallax, fly-ins, or reveal effects.

| Token | Value |
|---|---|
| `duration-fast` | 120ms |
| `duration` | 200ms |
| `duration-slow` | 320ms |
| `ease` | `cubic-bezier(0.2, 0, 0, 1)` (standard ease-out) |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |

**Allowed:**
- Hover state transitions (200ms).
- Focus ring fade-in (120ms).
- Route change crossfade (200ms opacity, no transform).
- ToC active state slide (120ms transform on the indicator).

**Refused (called out in §3.3):**
- Scroll-jacked reveals.
- Parallax on hero.
- Fly-in on card grids.
- Animated cursor (`FuzzyCursor` — recommend removal).

## 7. Component States

Every interactive component declares all six states.

### Link (inline prose)
- **default**: `--accent`, underlined 1px offset 0.15em
- **hover**: `--accent-strong`, underline thickness 2px
- **focus-visible**: 2px ring + 2px offset
- **active**: `--accent` darkened 4%
- **visited**: same as default (don't differentiate; reads anxious)
- **disabled**: n/a for inline links

### Nav item
- **default**: `--fg-muted`, no underline
- **hover**: `--fg`
- **current**: `--fg` + 1px underline at `--accent` offset 0.5em
- **focus-visible**: ring

### Button (primary — Contact CTAs only)
- **default**: `--accent` fill, `--accent-fg` text, no border
- **hover**: `--accent-strong` fill, 1px translateY(-1px) — *no shadow*
- **focus-visible**: ring + 2px offset
- **active**: translateY(0), `--accent` darkened
- **disabled**: surface-1, fg-dim, cursor: not-allowed
- **loading**: in-place mono "…" — no spinner

### Button (ghost — secondary nav, "Read more")
- **default**: transparent, `--fg-muted`, 1px border `--border`
- **hover**: `--surface-1`, `--fg`, border `--border-strong`
- focus / active / disabled: analogous

### Card (Project / Article)
- **default**: `--surface-1`, 1px border `--border`, no shadow
- **hover**: `--surface-2`, border `--border-strong`, 200ms transition. **No** translate, no shadow.
- **focus-within**: ring on the card itself (since the whole card is the target on mobile per §3.10)
- **disabled** (Shipping Next without a link): no hover state, cursor: default, `--fg-faint` on body

### Tag (capability row, project metadata)
- mono uppercase, `--fg-muted` on `--surface-1`
- No hover state (decorative, not interactive)

### Input (future, not used at launch)
- 1px border `--border`, 8px padding, `--bg` fill
- focus: `--accent` border, ring outside
- Spec'd but not built — no form at launch.

## 8. Empty / Loading / Error States

Per §3.3:

- **Loading**: skeleton rectangles in `--surface-1` with subtle 1.2s opacity pulse. No spinners.
- **Empty (articles, 1 entry only)**: just render the 1 card. No "Coming soon," no placeholder cards.
- **Error**: 16px mono prose at `--fg-muted`, no icon. Copy template: *"Couldn't load this. Refresh, or send me a message if it keeps happening."*
- **404**: matches site. Two links to `/` and `/projects`. No illustration.

## 9. Iconography

Minimal. No icon set imported.

- Arrow glyph: `→` (real character, not SVG) for card forward affordances.
- External link: `↗` (real character).
- ToC active marker: 2px `--accent` vertical bar, CSS only.

If a real icon need surfaces during build (search, RSS, social marks), use **Lucide** at 18px stroke 1.5px. Until then, characters.

## 10. Responsive

Breakpoints (mobile-first):

| Name | px |
|---|---|
| `sm` | 640 |
| `md` | 768 |
| `lg` | 1024 |
| `xl` | 1200 |

§3.10 reflow rules govern; this spec adds:

- Display-l on hero scales down to 32px under 640.
- Container padding: 24 / 48 / 64 across breakpoints.
- Navbar collapses to hamburger under `md` (768).
- ToC hides under `lg` (1024); article body widens to fill.

## 11. Accessibility (§5)

- **Contrast**: `--fg` on `--bg` = 13.4:1 (AAA). `--fg-muted` on `--bg` = 7.2:1 (AAA body). `--accent` on `--bg` = 7.9:1 (AAA — verified before shipping). `--fg-dim` on `--bg` = 4.6:1 (AA large text only — used only on captions ≥14px).
- **Focus rings always present** — `:focus-visible` styled, never removed.
- **Semantic HTML** — nav, article, section, header, footer used correctly.
- **Skip link** — first focusable element on every page: "Skip to main content."
- **Heading order** — H1 once per page; no skipped levels.
- **`prefers-reduced-motion`**: route transitions and hover lifts disable to instant. Already minimal; this is a safety net.
- **Hit targets**: 44×44 minimum. Card whole-tap on mobile (§3.10).

## 12. Page Redlines (matches §3 ASCII)

### Home
- Container: 1120, padded 64.
- Hero: photo 80×80 (`radius-3`, 1px border), name `display-l`, dek `body-l` `--fg-muted`. Vertical gap 24 between photo+name and dek.
- **Featured work** label: `label` style (mono uppercase), `--fg-dim`.
- Slot-4 card: full-width, `radius-4`, 32px padding, two-column inside (title block left, arrow right). 1px border `--border`. Inside: `h2` title, `body` dek `--fg-muted`, mono tag row.
- VSG / Dow Jones cards: 2-column grid, `radius-3`, 24px padding, each ~50% width. `h3` title, `ui-s` `--fg-dim` role line, mono tag row.
- Writing section: full-width card, same treatment as job cards but title `h3`, dek `body-s`, mono "6 min read · Apr 2026" line.
- Contact strip footer: `ui` size, `--fg-muted`, separator `·` not `|`.

### Projects
- Page title `display-l`. Framing sentence `body-l` `--fg-muted`. Gap 48.
- Tier label `label` mono before each tier.
- FEATURED: full-width, `radius-4`, 40px padding. Slot-4 emphasis.
- CAREER: 3-up grid, equal width. `radius-3`, 28px padding. Each card: company `h2`, role `ui-s` `--fg-dim`, dates `label` mono, body `body-s` 3-line clamp.
- SHIPPING NEXT: bullet list, `ui` body, `--fg-faint` for unshipped entries. No card chrome. 1.2em row gap.

### Project Detail — Slot 4 (case study)
- Hero: eyebrow `label` "CASE STUDY", title `display-l`, dek `body-l`. Tag row mono. 96px bottom gap.
- Body: 720 prose width. Sections separated by 64px and a hairline rule.
- Code blocks: `radius-3`, `--surface-3` background, mono 14/22, 20px padding, label strip on top (filename in mono `label`).
- "What it's not" section: 1px left rule in `--border-strong`, italic body.

### Project Detail — Job (VSG)
- Header strip: title `h1`, company `ui` `--fg-muted`, dates `label` mono, context `body` `--fg-muted` one line. Stacked rows on mobile.
- "What I did" → `h2` + body. `Section` MDX component renders as `<section>` with 48px bottom margin.
- "What I learned" → 1 prose section, italic eyebrow.
- "Outcomes" → optional `StatCard` row, mono numbers display-xl, label mono.
- NextProject footer: full-width card, ghost-styled, arrow right.

### About
- Hero photo 120×120 `radius-3`. Name `display-xl`, dek `body-l`. Centered on mobile only.
- Story: 3 paragraphs, `body-l` serif, 720 width. No h2s. 0.85em paragraph spacing.
- Tag row: mono uppercase chips, wrap, 8px row gap, 8px column gap. No interaction.
- Get in touch: 3-4 link cards inline, mono accent.

### Contact
- Page title `display-l` "Contact". Dek `body-l` `--fg-muted` one line.
- Link list: large mono uppercase labels (email, github, linkedin), 24/32, accent underline, each its own row with email-value below in serif.
- 60% width column, left-aligned.

### Articles listing
- Page title `display-l`. Dek one-liner.
- Article cards: 1-col stack, full-width within container. Each card: date `label` mono, title `h2`, dek `body-l` `--fg-muted` 2-line clamp, "6 min read" mono.
- Hairline rule between cards (no card chrome).

### Article detail
- Existing full-bleed grid + sticky ToC mechanic preserved.
- Title `display-l`, dek `body-l`, byline `ui-s` mono.
- Body: 720 prose, `body-l` serif, paragraph spacing 0.85em.
- ToC: right rail, 240 wide, sticky, mono `ui-s`, active indicator 2px `--accent` vertical bar.
- Related articles footer: 2-up card grid.

### 404
- Center column, 480 width.
- `display-l` "404"
- `body-l` *"That page isn't here. Try Home or Projects."*
- No illustration. Two links inline.

## 13. Implementation notes (for §4 / §5 port)

- All tokens above become MUI theme values (`palette`, `typography`, `spacing` via `theme.spacing(n)` with `n` matching the 4pt grid, `shape.borderRadius` overridden per component, `transitions` set).
- Custom font loading via `<link>` in `index.html`, not `@fontsource` (faster initial paint for the 3 families).
- All hard-coded values in current `*.tsx` files (colors in `Navbar.tsx`, sizes in `ProjectCard.tsx`) are replaced with `theme.palette.*` and `sx={{ p: 3 }}` form.
- `FuzzyCursor.tsx` is removed (not styled).
- The `Article` cards on `HomePage.jsx` and the `Categories` / `PopularContents` sidebar stubs are removed (§3.5 locked decision).

---

## Open items not in this spec

- **Copy**: every body string in the prototype is `[placeholder]` or short factual. You own copy.
- **Photo**: 80px / 120px placeholder boxes in the prototype. Drop your image in when ready.
- **Slot-4 code excerpts**: prototype shows realistic shapes with fake content per your call. Replace with real `.claude/rules/` files at port time.
- **Article pipeline**: per §3.9, mechanics not yet locked. Article *detail* is rendered against the locked ToC mechanic; *listing* card shape is locked here.
- **MUI theme port**: spec → theme is straightforward but mechanical. Happy to draft `theme.ts` as a separate deliverable when you want it.

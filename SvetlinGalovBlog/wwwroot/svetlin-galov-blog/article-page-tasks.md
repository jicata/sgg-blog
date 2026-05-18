# Article Page Tasks

## Task 1: Article Page Route & Two Grid Layouts

**CSS focus:** Build two grid variants for the article page using Josh's full-bleed pattern.

**No-ToC layout (3-column):**
- `grid-template-columns: 1fr min(42rem, 100%) 1fr`
- All children default to center column via `.wrapper > * { grid-column: 2 }`
- Full-bleed children span all columns via `grid-column: 1 / -1`
- Handle edge padding on narrow screens

**With-ToC layout (4-column):**
- `grid-template-columns: 1fr 42.875rem 21.875rem 1fr`
- Content in column 2, ToC in column 3
- Requires a media query to collapse on narrow screens (the fixed rem values won't fit)

**React focus:** Conditional className on a wrapper component based on a `hasToc` prop. New `/article` route already in place.

**Guiding questions:**
1. What happens to a plain `<p>` child vs a full-bleed `<img>`? How do you assign them to different columns?
2. Once working, shrink to a very narrow width -- what happens to edge padding?
3. On the 4-column grid, resize below ~1050px. What breaks, and what do you reach for?
4. When the ToC grid collapses -- should it become the same 3-column grid as no-ToC, or something different?
5. What's the simplest prop shape to pass "this article has a ToC" into your layout?

---

## Task 2: Article Header / Metadata Bar

**CSS focus:** Flexbox for the metadata row (category, date, reading time with separator dots). Typography hierarchy for h1/subtitle/meta. The `ch` unit for `max-width` on titles.

**React focus:** Props into an `<ArticleHeader>` component (`title`, `subtitle`, `category`, `date`, `readingTime`).

---

## Task 3: Article Body & Vertical Rhythm

**CSS focus:** The "lobotomized owl" pattern (`> * + *` with `margin-top`) for consistent spacing. `line-height` tuning. `max-width` in `ch` units on prose. Styling `<blockquote>` and inline `<code>`.

**React focus:** An `<ArticleBody>` component receiving children. Hardcoded HTML content for now.

---

## Task 4: Code Blocks with Overflow Handling

**CSS focus:** `overflow-x: auto` on `<pre>` blocks. Dark background, `border-radius`, `padding`. Custom scrollbar styling. Monospace font stack. `white-space: pre`.

**React focus:** A `<CodeBlock>` component taking `children`.

---

## Task 5: Sticky Table of Contents

**CSS focus:** `position: sticky` + `top` inside the grid sidebar column. The critical gotcha: `align-self: start` (without it, sticky won't work inside grid). Active section styling.

**React focus:** `IntersectionObserver` in a `useEffect` to track which `<h2>` is visible. `useState` for `activeId`. Props: `sections` array + `activeId` passed to `<TableOfContents>`. `scroll-behavior: smooth` in CSS.

---

## Task 6: Responsive Sidebar Collapse

**CSS focus:** Media query switching the 4-column grid to the 3-column no-ToC grid. `display: none` on the sidebar below the breakpoint. Optionally a mobile-only collapsible ToC above the article.

**React focus:** Minimal -- almost entirely CSS. Optional `useState` toggle for mobile collapsible version.

---

## Task 7: Related Articles Grid

**CSS focus:** `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` -- auto-adjusting column count with no media query needed. Card hover effects with `transform` + `box-shadow` transition.

**React focus:** An `<ArticleCard>` component with props (`title`, `category`, `href`, `imageSrc`). Mapping over an array.

---

## Suggested Order & Estimates

| # | Task | Primary Skill | ~Time |
|---|------|--------------|-------|
| 1 | Two grid layouts | Grid + `min()` | 45 min |
| 2 | Article header | Flexbox + Typography | 45 min |
| 3 | Body + vertical rhythm | Flow spacing | 1 hour |
| 4 | Code blocks | Overflow + styling | 30 min |
| 5 | Sticky ToC | Sticky + IntersectionObserver | 1 hour |
| 6 | Responsive collapse | Media queries | 30 min |
| 7 | Related articles | `auto-fill` / `minmax` | 45 min |

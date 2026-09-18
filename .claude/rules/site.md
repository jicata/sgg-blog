---
paths:
  - "src/**/*.astro"
  - "src/**/*.ts"
  - "src/**/*.css"
  - "astro.config.*"
---

# Site source (pages, layouts, components, styles)

Full doctrine: `.claude/doctrine/arch-frontend.md` (structure), plus `project-profile.md` → Frontend (Astro idiom — there is no framework core yet), Content, Testing.

- **Pages fetch, components receive.** Only `src/pages/**` calls `getCollection`/`getEntry`; a component under `src/components/` takes props and never reads a collection. A component is promoted out of a page's folder only when a second page imports it.
- **Zero client JavaScript by default.** A `<script>` tag or framework island needs a named reason in the PR. The build target is HTML + one CSS file.
- **No literal color, font, or spacing value.** Use the CSS custom properties in the global stylesheet; they are the locked May-2026 design ported 1:1 into `src/styles/global.css` (spec in git history).
- **One component per file, filename matches the export.**
- **`npm run build` is the gate.** `astro check` catches type and schema errors that a dev server hides. Layout or styling changes are also viewed in `npm run preview` at desktop and phone width, and the PR body says so.

# ADR-001: Design Port — OKLCH Tokens, usePageMeta, MDX Glob, Deploy Target

**Status**: Implemented
**Governs**: cross-cutting
**Date**: 2026-05-18
**Superseded-By**: [ADR-002](002-static-site-platform.md) — Decision 2 (`usePageMeta`) and Decision 4 (deploy target) only. Decisions 1 (OKLCH tokens) and 3 (MDX discovery, in outcome if not mechanism) remain in effect; see ADR-002's Design section.

## Background

PRD #1 (Portfolio launch — design port, cleanup, .NET host wiring, deploy) specified four non-obvious technical decisions that future agents or contributors might revisit. This ADR locks the rationale for each.

## Decision 1 — OKLCH color values as CSS custom properties rather than MUI hex palette

**Decision**: Color tokens are stored as OKLCH values in CSS custom properties on `:root` (e.g., `--accent`, `--bg`, `--text-primary`). MUI's `createTheme()` palette entries reference those variables via `var(--accent)` rather than holding hex/rgb literals.

**Why**: OKLCH provides perceptually uniform lightness steps, which means hover/active/disabled variants can be derived mechanically (lighten/darken L by a fixed delta) without visually uneven results. Storing the canonical value once in CSS avoids the MUI theme double-encode problem (MUI converts its palette to `rgb()` internally, which loses perceptual uniformity). Components consume color through `theme.palette.*` or `sx={{ color: 'var(--accent)' }}`.

**Trade-off accepted**: MUI's `palette.augmentColor` and automatic contrast calculation don't work directly on `var(--accent)` at theme-creation time. We accepted this because the palette is small (one accent, dark mode only at launch) and no MUI component relies on auto-contrast for this site.

**Alternative rejected**: Hard-coding hex/rgb in `createTheme()`. Rejected because perceptual drift on hover states was visible in prototype comparisons.

## Decision 2 — `usePageMeta` hook over `react-helmet-async`

**Decision**: Per-page `<title>`, `<meta name="description">`, and OG tags are set via a custom `usePageMeta(...)` hook in `src/hooks/usePageMeta.ts`. No third-party head management library.

**Why**: The site has fewer than 10 routes, each sets the same 4–6 meta properties. The hook is 60 lines, fully tested, and has no dependency surface. `react-helmet-async` adds ~12 kB and its async rendering context is overkill for a statically-served SPA where crawlers see the live DOM, not SSR output.

**Trade-off accepted**: If the page count grows significantly or SSR is added later, the hook will need replacing with a proper head manager. That migration is additive (delete the hook, add the library, update call sites).

**Default OG image**: `usePageMeta` always sets `og:image` to `/og-image.png` when an `og` block is provided without an explicit `image` field. This ensures every shared link has a preview card. The `og-image.png` (1200×630) is generated at design-port time and committed to `public/`.

## Decision 3 — MDX as single source of truth for projects via `import.meta.glob`

**Decision**: `src/services/projectsApi.ts` uses `import.meta.glob('../content/projects/*.mdx', { eager: true })` to discover project MDX files and extract frontmatter. The previous in-memory array is replaced.

**Why**: Adding a new project requires dropping an MDX file and defining frontmatter — no code changes needed. The approach also eliminates the dead `fetch()` code and `BASE_URL` constant that were in the original implementation.

**Trade-off accepted**: `import.meta.glob` is a Vite-specific API. If the build tool changes, the discovery mechanism needs rewriting. Accepted because Vite is locked by the PRD and this is a single-developer portfolio site with no near-term toolchain migration.

## Decision 4 — Deploy target: Azure App Service (GitHub Actions CI/CD)

**Decision**: The site is deployed to Azure App Service (Linux, .NET 8 runtime) via a GitHub Actions workflow at `.github/workflows/deploy.yml`. The workflow runs `dotnet publish` (which triggers `npm install` + `npm run build` via the `.csproj` `PublishSpa` target), then deploys the publish output to Azure.

**Why**: Azure App Service natively runs .NET 8 apps, requires no Docker knowledge, and gives a stable `azurewebsites.net` subdomain for free while a custom domain is purchased. The GitHub Actions integration (publish profile secret) is well-documented and requires no Azure CLI setup on the developer's machine post-initial-config.

**Why not Render**: Render's free tier sleeps after 15 minutes of inactivity — a hiring manager landing on a sleeping instance waits 30+ seconds for the cold start, which fails the 5-minute brief AC. Azure's free tier (F1) also sleeps; the B1 paid tier ($13/month) does not. Decision: use B1 or the developer's MSDN subscription credits.

**Why not Docker**: Adds operational complexity (registry, image tagging, port binding) without benefit for a single-app deployment.

**Why not IIS**: Windows-only. The GitHub Actions runner and Azure Linux app service are both Unix. IIS would require a Windows runner and Windows App Service plan.

**Credentials required (human action before first deploy)**:
1. Create an Azure App Service (B1 or higher, .NET 8, Linux).
2. Download the Publish Profile from Azure portal → App Service → Deployment Center.
3. Add two GitHub repository secrets:
   - `AZURE_WEBAPP_PUBLISH_PROFILE` — the full XML from the publish profile download.
   - `AZURE_WEBAPP_NAME` — the App Service name (e.g. `sgg-blog`).
4. (Optional) Configure a custom domain and managed TLS certificate in the Azure portal.

**Vite build output**: The vite config `outDir` is set to `'../'` (i.e., `SvetlinGalovBlog/wwwroot/`) so that `dotnet publish` picks up the built SPA assets from the standard `.NET SDK.Web` wwwroot include. Built files are gitignored (`SvetlinGalovBlog/wwwroot/assets/`, `SvetlinGalovBlog/wwwroot/index.html`); CI rebuilds them every deploy.

## Trade-offs Summary

| Decision | What we gain | What we give up |
|----------|-------------|-----------------|
| OKLCH CSS vars | Perceptual uniformity, single source of color truth | MUI auto-contrast helpers |
| usePageMeta hook | Zero dependency, fully tested | Must replace if SSR added |
| MDX glob | No-code project addition | Vite-specific API |
| Azure App Service | Native .NET, stable URL, HTTPS | $13/month B1, manual secret setup |

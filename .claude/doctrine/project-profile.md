# Project Profile — SvetlinGalovBlog

**Priority:** High. Pointed at from the generated `CLAUDE.md`, so an agent is told to read it every session — but it is **not** auto-loaded, and nothing but `CLAUDE.md` is. Constraints that must survive regardless (the catastrophic, non-discoverable few) belong *in* `CLAUDE.md`; everything else lives here and is read on the way in. This is the repo's overlay over the read-only base skill library: the machine-readable facts other skills key off, and the repo's own scar tissue. Base files are never edited; everything repo-specific lands here.

```yaml
stack: "Astro (static output) + Markdown/MDX content collections + plain CSS custom properties. Zero client-side JS by default. TARGET stack — see Transition below; the React SPA + .NET shell on main is being deleted, not maintained"
architecture: "Astro conventions — src/pages (routes), src/layouts, src/components (presentational, props only), src/content/{posts,projects} (typed collections). No backend, no server, no database"
architecture_core: none               # no backend; Astro's page/layout/content split is governed by arch-frontend.md (structure) — see doctrine/AXES.md
backend_core: none                    # static site — there is no backend language to govern
frontend_core: none                   # BASE-LIBRARY GAP: no frontend-astro.md core exists. arch-frontend.md installs alone. Raise via /skill-sync; never author a core here
tracker: "GitHub issues (jicata/sgg-blog, private, default branch main)"
check_commands:
  - "npm run build"                   # astro check (types + content schema) + astro build; the single gate. Real once the Astro revamp lands
mode: brownfield                      # content, design tokens and docs carry over; the runtime is replaced wholesale
chassis: none
legacy_oracle: none
doc_appetite: lean                    # canon = glossary + ADRs + architecture map; everything else lives on its work item
pipeline_tier: full
ci: none                              # deploy workflow only (GitHub Pages, after the revamp); no test/build check-runs on PRs yet
axis_c: off                           # no CI check-runs exist to read. Promote to advisory when a build workflow runs on PRs; to enforcing once it has been green on ~5 consecutive PRs
review_identity: app                  # claude-reviewer-jicata[bot], reused from jicata/Brochures — see Merge gates
review_app_token_cmd: "GH_APP_ID=4515491 GH_APP_INSTALLATION_ID=151915759 GH_APP_PRIVATE_KEY_PATH=$HOME/.ssh/claude-reviewer-jicata.pem node $HOME/.claude/gh-app-token.js"
coder_lens: {default: coder-lens}     # the generated composite lens; execute-issue / afk-execute-issue / afk-coder resolve it from here
worktree_root: sibling                # ../SvetlinGalovBlog-<branch>; the ship lanes already used ../SvetlinGalovBlog-ship-prd-1 for PRD #1
design_pipeline: none                 # the May-2026 design handoff (specs/design-handoff/) is a one-off port, not a running pipeline
models:                               # per-role tiers (2026-09-18): opus makes concession/arbitration calls and grades; sonnet is the cheap implementation seat
  orchestrator: opus
  coder: sonnet
  reviewer: opus                      # must never be weaker than coder
workhorse_model: sonnet               # legacy fallback the ship-* skills read when `models` is absent
glossary: docs/UBIQUITOUS_LANGUAGE.md
smell_routing: "file a GitHub issue on jicata/sgg-blog via /log-issue; never refactor in place (see doctrine/surface-dont-chase.md)"
base_version: b8b7d75                 # jicata/skills main, installed 2026-09-18 by /setup
```

## How to maintain this file (the fill-in convention)

- **Every constraint is: imperative + WHY + evidence pointer.** A rule with a scar attached gets obeyed; a bare imperative gets relitigated. Evidence = a commit, incident, issue, doc, or dated observation — something a skeptical future agent can check.
- **Edit in place, never append chronologically.** When reality changes, rewrite or delete the constraint. This file is a map, not a log.
- **Trigger-indexed:** constraints live under the activity that should trip them, so an agent doing content work reads Content, not everything.
- **Axis conflicts resolve one way:** the architecture core wins on **placement**, the language core wins on **idiom**, and a constraint in *this file* beats both. See `doctrine/AXES.md`.
- **Graduate at a screen:** when a section outgrows one screen, move its body to its own doctrine file (e.g. `.claude/doctrine/<topic>.md`) and leave one index line here pointing at it.

## Transition (read first until the revamp lands)

> **The profile describes the TARGET stack (Astro static site), not what is on `main` today.** `main` still holds the May-2026 launch shape: a React 19 + MUI + React Query SPA at `SvetlinGalovBlog/wwwroot/svetlin-galov-blog/`, wrapped in an ASP.NET Core static-file shell, deployed to Azure App Service. All of it is scheduled for deletion by the revamp PRD. Until that PRD merges, `check_commands` and the `.claude/rules/` globs point at paths that do not exist yet — that is expected, not drift. **Do not extend, fix, or document the React/.NET code**; any work on it is wasted. WHY: the operator decided on 2026-09-18 to replace the runtime wholesale ("simple and fast, kinda like html only, with the ability to add new blog posts every now and then"). Evidence: session 2026-09-18; the revamp plan is recorded in the operator's project memory and will become a `PRD:` issue.

> **What carries over from the old shape, verbatim in intent:** the locked visual design (dark only, warm amber accent `oklch(0.78 0.10 75)`, IBM Plex Sans + Source Serif 4 + IBM Plex Mono — full tokens in `specs/design-handoff/design-spec.md`), the three project case studies (`src/content/projects/*.mdx` in the old SPA), the About and Contact copy, `public/og-image.png`, the photo. The positioning brief in `DESIGN-BRIEF.md` (senior backend tech lead, agentic-first, career-arc voice, no urgency) still governs every word on the site. Evidence: `DESIGN-BRIEF.md`, `specs/design-handoff/README.md` ("no decisions remain").

## Working style

> **Always-on context is `CLAUDE.md` + `.claude/rules/`; everything else loads on demand.** `.claude/rules/*.md` are all `paths:`-scoped. WHY: before 2026-09-18 this repo carried ten unscoped rules (~1,000 lines: five agent personas, a documentation matrix, a VSA guide) that loaded every session, three of which demanded contradictory reply prefixes. Deleted wholesale at adoption. Evidence: git history of `.claude/rules/` before the `skills-adoption` branch.

> **A new `.claude/rules/` file must carry `paths:` frontmatter.** Without it the file loads in every session forever. Keep each rule to its sharpest few imperatives plus a pointer to the full doctrine — the rule is a loader, not a copy.

> **Explain top-down for a senior backend engineer who is not resident in the frontend ecosystem.** Frame frontend concepts through what he already knows (typing, DI, layering, build pipelines); explain *why* a pattern works, not that it is convention; never simplify or talk down. Full doctrine: `doctrine/how-to-explain.md`. WHY: the operator is a C#/.NET tech lead using this repo deliberately to learn frontend. Evidence: operator's user memory, 2026-05.

> **Fight for simplicity: plan from the simplest design that fits Astro's built-in conventions, and declare any complexity beyond that by name before building.** In this repo "simple" has a concrete meaning: a page is a file, a post is a Markdown file, styling is one CSS file of tokens, and there is no client JavaScript unless a specific interaction needs it. A component framework, a state library, a CMS, or a server runtime each need a written justification in the issue. WHY: the whole point of the revamp is to get out from under four runtimes for a site with zero dynamic behaviour. Evidence: operator's brief, 2026-09-18.

> **Never paste the input or output of GitHub tool calls into the console.** Summarize instead. WHY: issue and PR bodies are long and drown the conversation. Evidence: carried from the retired `Be-concise` rule.

## Security & live-data safety

None — no live environments, databases, or secrets are reachable from this repo. The only "live" surface is the deployed site itself, which is rebuilt from `main` on every push; a bad merge is a bad deploy, and a revert is the fix.

## Content

> **A blog post is one Markdown file under `src/content/posts/` with schema-validated frontmatter (`title`, `description`, `pubDate`, optional `draft`). Adding a post never touches code.** WHY: this is the one user-facing capability the revamp exists to deliver — "add a new post every now and then" — and any design where publishing requires editing a TypeScript array, a route file, or an index has already failed it. Evidence: the old SPA's article pipeline never got built; `/article` shipped as one hard-coded JS object (`docs/archive/HANDOFF-2026-05.md`).

> **`draft: true` posts build locally and are excluded from the production build, the post index, RSS and the sitemap — filter in one place, the collection query helper, never per-page.** WHY: a draft leaking through one forgotten route is the classic static-site bug. Evidence: convention set at adoption, 2026-09-18.

> **Content schema changes are an ADR-gated decision.** Renaming or removing a frontmatter field breaks every existing post silently until the build runs. Add fields as optional; remove nothing without a migration of every file in the same PR. Evidence: convention set at adoption, 2026-09-18.

## Frontend

Base doctrine: `doctrine/arch-frontend.md` governs structure (page vs component boundary, promotion rule, one component per file). There is **no framework core** for Astro in the base library — `frontend_core: none` — so Astro idiom is recorded here until one exists upstream.

> **Pages (`src/pages/`) fetch content via `getCollection`/`getEntry` and compose; components (`src/components/`) receive props and never read collections.** This is `arch-frontend.md` B2 ("pages own the data") translated: the content collection is the "server state". WHY: keeps every component renderable from fixture props and every data dependency visible per route. Evidence: `doctrine/arch-frontend.md` §B2.

> **Zero client JavaScript by default. `<script>` tags and framework islands need a named reason in the PR.** WHY: page weight and simplicity are the revamp's success criteria; every island is a runtime the site did not have. Evidence: operator's brief, 2026-09-18.

> **Colors, type and spacing come from the CSS custom properties in the global stylesheet, ported 1:1 from `specs/design-handoff/design-spec.md`. No literal color, font or pixel value in a component.** WHY: the design was locked in May 2026 after a full design pass; ad-hoc values are how it erodes. Evidence: `specs/design-handoff/README.md`, ADR-001 Decision 1 (OKLCH tokens).

## Testing

> **`npm run build` is the test suite.** `astro check` type-checks `.astro` and `.ts` files and validates every content entry against its collection schema; `astro build` fails on a broken link in a `getStaticPaths`, a missing asset, or an invalid frontmatter. There are deliberately **no unit tests** for a static site with no logic — do not flag their absence as a gap, and do not add a test runner without a component that actually has behaviour worth testing. WHY: the old SPA carried Vitest + Testing Library + jsdom + xUnit integration tests for pages that rendered static text. Evidence: `SvetlinGalovBlog/wwwroot/svetlin-galov-blog/package.json` on `main`; decision at adoption, 2026-09-18.

> **Visual verification is a browser check, not a screenshot diff.** Before a PR that changes layout or styling, load the built site (`npm run preview`) and check the changed pages at desktop and phone width. Record what was checked in the PR body. WHY: no visual-regression tooling is installed and none is planned.

## Merge gates

> **Local `npm run build` is the only gate. There is no CI on PRs yet, so `axis_c: off` — reviewers must not query, poll, or flag missing check-runs.** `off` has defined semantics in `.claude/skills/_shared/axis-c.md`: emit `axis_c: "off"` and move on. WHY: the deploy workflow (GitHub Pages, after the revamp) runs on push to `main`, not on PRs; there is nothing to read on a PR head. **Promotion path:** when a `pull_request`-triggered build workflow exists, set `advisory`; after ~5 consecutive green PRs, `enforcing`. Record the date and reason here when that happens, or it becomes permanent by neglect. Evidence: set at adoption, 2026-09-18.

> **Reviews post as `claude-reviewer-jicata[bot]` via the GitHub App shared with jicata/Brochures, with native `APPROVE` / `REQUEST_CHANGES` events.** The token is minted per call from `review_app_token_cmd`; only the review POST uses it. App ID 4515491, installation 151915759; the private key lives at `~/.ssh/claude-reviewer-jicata.pem` and the helper at `~/.claude/gh-app-token.js`. Neither is in this repo. WHY: GitHub rejects APPROVE/REQUEST_CHANGES from a PR's own author (422), and this pipeline authors and reviews from one account. Evidence: verified on jicata/Brochures PR #978, 2026-08-07; installation extended to this repo 2026-09-18 (see verification note below).

> **`reviewDecision` is `null` on this repo regardless — never gate on it. Read `latestReviews[].state` and the `**Verdict:**` marker** (`.claude/skills/_shared/review-protocol.md`). WHY: that field needs branch protection with a review requirement, unavailable on a private repo on the free plan.

> **A fresh clone has the config for `app` mode but not the capability.** Run `/fix-review-identity`; it rewrites a missing helper and finds a moved key. Only a genuinely lost key needs the human. `/ship-issue` Step 0d and `/ship-feature` Step 0b probe the token at startup.

> **The `gh` CLI must be on the `jicata` account for this repo.** The workstation also holds a work account (`SGalovVSG`) that cannot see `jicata/sgg-blog`; with it active every `gh` call fails with "Could not resolve to a Repository", which reads like a deleted repo. Check `gh auth status`, fix with `gh auth switch --user jicata`. WHY: the git author on `main` is the work identity, which is misleading. Evidence: hit at adoption, 2026-09-18.

## Worktrees

> **Worktrees are siblings of the repo root, `../SvetlinGalovBlog-<slug>`, never `.worktrees/` inside it.** WHY: PRD #1's ship lane already used `../SvetlinGalovBlog-ship-prd-1`; keep one convention. Evidence: the old `settings.local.json` allowlist referenced that path.

> **"Branch already checked out" is another lane working — stop, never force.**

## Deploy & environments

> **Deploy is in-repo: a GitHub Actions workflow builds on push to `main` and publishes to GitHub Pages.** No GitOps, no gateway, no sibling infra repos. WHY: the path from merged code to a running site never leaves this repository, so `templates/deploy-infra` was not instantiated. **Until the revamp lands**, `.github/workflows/deploy.yml` on `main` still targets Azure App Service via `dotnet publish`; it is deleted with the .NET shell. Whether the Azure App Service is still running (and billing) is an open question for the operator.

> **The custom domain, if any, is a CNAME file in `public/` plus a DNS record — both are the operator's to set.** Record the domain here once chosen.

## Documentation

The lean canon, per `doctrine/documentation-first.md`:

- **Glossary** — `docs/UBIQUITOUS_LANGUAGE.md` (seeded at adoption; one bounded context).
- **ADRs** — `docs/adr/NNN-slug.md`, index and shape rules in `docs/adr/README.md`. ADR-001 (design port) is `Implemented`; the revamp ADR will supersede its deploy-target and `usePageMeta` decisions. The ADR gate (hard to reverse + surprising without context + a real trade-off) applies; most decisions in a static site do not clear it and belong here as constraints instead.
- **Architecture map** — `docs/architecture.md` (seeded at adoption; a positional map, never a description).

> **The pre-adoption documentation matrix (feature READMEs, flow docs, roadmap, UX foundations, `specs/UX-*.md`) is retired and must not be recreated.** `specs/design-handoff/` stays only as the design-token source until the tokens are ported into the stylesheet, then it is deleted. `DESIGN-BRIEF.md`, `DESIGN-PACK.md`, `HANDOFF.md` are point-in-time artifacts from PRD #1; their still-binding content (positioning, voice) migrates into the glossary and the revamp ADR, then they go. WHY: the old `documentation-creator` rule prescribed seven document tiers for a five-page site. Evidence: deleted `.claude/rules/documentation-creator.md`, 2026-09-18.

## External contracts

None. No API is consumed or exposed. RSS (`/rss.xml`) and the sitemap are generated, not contracted; their shape is whatever the Astro integrations emit.

## Domain language

Glossary: `docs/UBIQUITOUS_LANGUAGE.md`. One bounded context — the site. Load-bearing terms: **Post** (a dated Markdown entry under `src/content/posts/`), **Project** (a career-arc case study under `src/content/projects/`), **Page** (a route file), **Component** (a props-only building block), **Design token** (a CSS custom property from the locked design). Use these names in code, issues and PRs; do not say "article" for a Post — the old SPA's `/article` route is gone.

# SvetlinGalovBlog

Personal site and blog for Svetlin Galov — backend tech lead, agentic-first engineering, C#/.NET, distributed systems.

A static Astro site. Posts are Markdown files, styling is one CSS file of design tokens, and there is zero client JavaScript by default. No React, no .NET host, no server, no database — see [`docs/adr/002-static-site-platform.md`](docs/adr/002-static-site-platform.md) for why.

## Live URL

https://jicata.github.io/sgg-blog/

Deployed to GitHub Pages from `main`. A custom domain hasn't been purchased yet — see [Custom domain](#custom-domain-when-purchased) below for what changes when it is.

## Run locally

```bash
npm install
npm run dev
```

The dev server prints a local URL (default `http://localhost:4321/sgg-blog/` — the `base` path applies locally too).

## Add a post

Drop a Markdown file in `src/content/posts/` with this frontmatter:

```md
---
title: "A real post title"
description: "One sentence — shows up in the list and the meta tags. Max 200 characters."
pubDate: 2026-10-02
tags: ["backend", "agents"]
---

The post body goes here, as plain Markdown.
```

`description`, `pubDate` (and `title`) are required; `updatedDate`, `tags`, and `draft` are optional. Set `draft: true` to keep a post out of the production build, the post list, RSS, and the sitemap — it stays visible in `npm run dev`. That's the only place drafts are filtered: `src/lib/content.ts`'s `getPublishedPosts()`. Nothing else needs to change; publishing is `git push`.

Adding a project (a career case study) works the same way under `src/content/projects/` — see `src/content.config.ts` for that collection's schema. The Projects collection is retained but unrouted (2026-09-18): adding or editing a file there changes nothing on the live site until a route exists again.

## Build gate

```bash
npm run build
```

Runs `astro check` (type checking + content-schema validation against `src/content.config.ts`) then `astro build`. This is the only gate — there's no unit-test runner by decision (a static site with no logic has nothing worth unit-testing). A layout or styling change should also be checked with `npm run preview` at desktop and phone width before it ships.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main` (or via manual `workflow_dispatch`). Nothing to configure — GitHub Pages just needs to be set to the "GitHub Actions" source once, in the repo's Settings → Pages.

## Custom domain (when purchased)

1. Buy the domain and add the DNS records GitHub Pages asks for (an `A`/`AAAA` set for an apex domain, or a `CNAME` record for a subdomain, pointing at `jicata.github.io`).
2. Add a `public/CNAME` file containing just the domain (e.g. `svetlingalov.dev`).
3. In `astro.config.mjs`, set `site` to the new domain and `base` to `'/'` (it's currently `'/sgg-blog'` for the project-pages URL).
4. Push to `main` — the next deploy picks up the new `site`/`base` and GitHub Pages issues a TLS certificate automatically once DNS resolves.

## Architecture

`docs/architecture.md` is the map — stack, routes, content collections, data lifecycle. `docs/UBIQUITOUS_LANGUAGE.md` defines the terms (Post, Project, Page, Component, Design token). `docs/adr/` holds the why behind hard-to-reverse decisions.

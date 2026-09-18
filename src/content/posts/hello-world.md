---
title: "Hello, world (placeholder)"
description: "A short note on why this site is a static Markdown blog now, and what happens to this post once real writing starts."
pubDate: 2026-09-18
tags: ["meta"]
---

This is the first post on the rebuilt site, and it exists mostly to prove the pipeline works. The real first post replaces it once I have something worth writing about.

The short version of how I got here: I've spent close to a decade on backend systems — C#/.NET, distributed services, the kind of DDD that survives past the original whiteboard session. Somewhere in the last year that work started overlapping with a second interest, building the harness and rules that let coding agents do real production work rather than autocomplete. This site is where I plan to write about both, without much urgency about a schedule.

## Why a static site

The previous version of this site ran four runtimes for a page with zero dynamic behavior: a React SPA, an ASP.NET Core host wrapping it, a build step gluing them together, and a deploy pipeline moving the result to a cloud app service. None of that machinery earned its keep. Nothing here needs a server, a database, or client-side JavaScript, so none of those are in the stack anymore.

### Posts are Markdown files

Every post, including this one, is a single Markdown file with a frontmatter block at the top — title, description, publish date, optional tags. Publishing a new post means dropping a file in a folder and pushing; nothing in the code has to change. A draft can sit in the repository with `draft: true` and it stays off the live site, the RSS feed, and the sitemap until that flag comes out.

Here's the shape of it:

```md
---
title: "A real post title"
description: "One sentence, shows up in the list and the meta tags."
pubDate: 2026-10-02
tags: ["backend", "agents"]
---

The post body goes here, as plain Markdown.
```

That's the whole mechanism. No CMS, no admin panel, no build step beyond the one that already runs on every push. This post will be gone the day a real one takes its place — consider it a placeholder doing its job.

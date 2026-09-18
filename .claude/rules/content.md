---
paths:
  - "src/content/**/*.md"
  - "src/content/**/*.mdx"
  - "src/content.config.ts"
---

# Content (posts, projects, collection schemas)

Full doctrine: `project-profile.md` → Content and Domain language; `docs/UBIQUITOUS_LANGUAGE.md` for the terms.

- **A Post is one Markdown file with frontmatter — `title`, `description`, `pubDate`, optional `draft`.** Adding one never touches code. If you find yourself editing a `.ts` file to publish, stop: that is the failure the revamp exists to remove.
- **`draft: true` is filtered in the one collection-query helper, never per page.** A draft that leaks through one route is the classic static-site bug.
- **Schema changes are ADR-gated.** Add fields as optional. Removing or renaming a field means migrating every existing entry in the same PR.
- **Voice is the brief's: career arc, no urgency, senior, no exclamation marks.** `docs/UBIQUITOUS_LANGUAGE.md` → The brief.
- **Say Post, not article.** The old `/article` route is gone; the glossary term is Post.

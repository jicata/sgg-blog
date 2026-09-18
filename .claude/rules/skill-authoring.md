---
paths:
  - ".claude/**/*.md"
---

# Editing skills, agents and doctrine

Full doctrine: `.claude/doctrine/writing-skills.md` + `.claude/doctrine/writing-skills-glossary.md`.

- **Base files install verbatim; repo-specifics live in the overlay.** `.claude/skills/**`, `.claude/agents/**` and every `.claude/doctrine/*.md` except the profile and the index come from `jicata/skills`. A repo-specific edit to one of them is debt `/skill-sync` must reclaim — put the constraint in `project-profile.md` instead.
- **`project-profile.md` is the one writable surface.** Every constraint is imperative + WHY + evidence pointer, edited in place, never appended chronologically.
- **Only manifests are generated:** `coder-lens`, `00-doctrine-index.md`, `ask-svet`, `CLAUDE.md`, this `rules/` set. Add or rename a doctrine file → regenerate the index and re-check the router.
- **A new rule file must carry `paths:` frontmatter.** Without it, it loads in every session forever.
- **Never author a missing doctrine core here** (Astro has none). Record the gap in the index and raise it via `/skill-sync`.

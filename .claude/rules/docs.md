---
paths:
  - "docs/**/*.md"
---

# Durable documentation

Full doctrine: `.claude/doctrine/documentation-first.md`; `project-profile.md` → Documentation; ADR shape in `docs/adr/README.md`.

- **The canon is exactly three artifacts:** `docs/UBIQUITOUS_LANGUAGE.md`, `docs/adr/`, `docs/architecture.md`. Anything else is a temporary artifact that lives on its work item (issue, PR, comment) — do not add a fourth standing file.
- **ADR gate:** hard to reverse + surprising without context + a real trade-off. All three, or it is a profile constraint with evidence, not an ADR.
- **`docs/architecture.md` is a map.** It positions pages, collections, and the deploy path; it never describes how one works. If a sentence could go stale without the map being touched, it belongs in the profile.
- **Consult docs before code, and cite them.** Glossary for terms, ADRs for why, the map for where.
- **The retired matrix stays retired:** no feature READMEs, flow docs, roadmap, or UX foundations.

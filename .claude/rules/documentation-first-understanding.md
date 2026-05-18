---
description: 
alwaysApply: true
---

# Documentation-First Understanding

This project utilizes robust documentation processes. To thoroughly understand the user's prompt (whether an issue, a question, or a feature request), you must **always consult the documentation before exploring the codebase**.

## 1. Documentation Navigation Strategy

Depending on the prompt, choose the appropriate navigation path through the documentation (`docs/` folder, `README.md` files, `Features/*/README.md`):

- **Foundational (Domain Terminology):** If the prompt contains domain-specific terms or you are unsure about the exact naming conventions for entities/processes, always check `docs/UBIQUITOUS_LANGUAGE.md` first to ensure you don't invent synonyms.
- **Top-Down (Broad/Architectural Prompts):** Start at the macro level (`docs/overview.md`, `docs/architecture.md`) and dig down into specific flows or feature READMEs until you grasp the context.
- **Bottom-Up (Specific/Feature-Level Prompts):** Start at the most local level (e.g., `Features/{FeatureName}/README.md`) that pertains to the issue, and navigate up the chain of documentation (to Flows or Architecture) to understand how it fits into the broader system.
- **ADR focus for current understanding:** Prefer ADRs whose Status is not `Superseded` or `Deprecated`. Use superseded/deprecated ADRs only for historical context and call that out explicitly.

## 2. Communication & Referencing

- **Cite Your Sources:** Once you have read the relevant documentation, explicitly use and reference it in your conversation with the user.
- **Identify Gaps:** Actively point out any gaps, inconsistencies, or missing information in the documentation you review.

## 3. Documentation Maintenance

- **Anticipate Updates:** If the user's prompt involves making changes to the project, always consider and explicitly state which pieces of the documentation will need to be updated to reflect those changes (e.g., ADRs, Feature READMEs, Flows).

## Examples

### ❌ BAD: Jumping straight to code
> "Let me search the codebase for the `ProcessUrl` method to see how ingestion works..."

### ✅ GOOD: Documentation-first approach
> "Before diving into the code, let me check the documentation for the Articles pipeline. I'll start with `Features/Articles/README.md`..."
> 
> *(After reading)*
> "According to `Features/Articles/README.md`, articles are authored as MDX and auto-registered via `import.meta.glob`. I noticed the README doesn't mention how draft articles are excluded from the index. Also, since we're changing the registration logic, we'll need to update `docs/flows/article-publishing-flow.md` alongside the code changes. Let's look at the code now."

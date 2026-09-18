---
name: ask-svet
description: Ask which skill or flow fits your situation. A router over this repo's skill stack.
disable-model-invocation: true
---

# Ask Svet

You don't remember every skill, so ask. This router names the flows and the edges between skills — it gists and routes, it never restates a skill's contents.

**Maintenance rule:** any skill add / rename / behavior change triggers a re-check of this file. A new skill it never mentions, or a stale one it still routes to, is a router that lies.

A **flow** is a path through the skills. Most work travels the main flow; on-ramps merge onto it.

## The main flow

1. Sharpen the idea by interview — `/grill-with-docs` when it should leave a paper trail in the glossary or an ADR; `/grill-me` for a plan that doesn't touch the doc set. Work too big for one session → `/wayfinder` charts it as decision tickets first.
2. `/write-a-prd` — interview → codebase exploration → module design → files a `PRD:` issue.
3. `/prd-to-issues` — slices the PRD into child issues with `Blocked by` edges. Prints the execution order.
4. Build — two lanes. HITL (default): `/expand-issue` → `/execute-issue` → `/review-pr` → `/address-pr` → `/merge-pr`, running ahead on expands while the coder builds. Autonomous: `/ship-feature <prd>` loops coder + reviewer subagents over every child.
5. Finalize — `/execute-issue` (all-merged path) or `/ship-feature` merges the base branch to `main` and closes the PRD.

## On-ramps

- Something feels off and you can't name it yet → `/triage`. It comes back with what's actually going on and no fix attached, then exits to `/log-issue`, `/write-a-prd`, `/diagnosing-bugs`, or nothing-to-file.
- A bug or small enhancement you *can* name → `/log-issue` → `/ship-issue <n>` (autonomous) or the HITL lane off `main`. Outgrows one PR → `/write-a-prd`. A bug that *resists* drops into `/diagnosing-bugs`.
- A design question that needs a throwaway answer → `/prototype`; an empirical one that needs numbers → `/lab`.
- A PR someone (or some agent) else wrote → `/review-pr <n>`; fixes via `/address-pr`; merge via `/merge-pr`. Only Axis-B threads left after max rounds → `/concede-pr`.
- A `[ship-cleanup]` issue accumulated residue → `/drain-cleanup`.
- A run's **Execution conformance** block flagged a review-identity mismatch, or a review posted as the PR author instead of `claude-reviewer-jicata[bot]` → `/fix-review-identity`.
- A merge or rebase stuck on conflicts → `/resolving-merge-conflicts`.

## Understanding the system

- `/flow-map` / `/miro-diagram` — visual: grow a diagram step-by-step as you reason, or draw one in a single pass. Both need the Miro MCP connected.
- `/explain-diff-html` — a change, branch, or PR explained as a self-contained HTML document with self-grading questions.
- `/wait-what` — the last answer didn't land; re-pitch it in plain technical English using the glossary's own terms.
- `/teach` — a multi-session tutor for a topic you want to learn, not codebase-grounded. Useful here: this repo is the operator's frontend classroom.

## Codebase health

- Ambient smell while working → surface, don't chase (`CLAUDE.md` → Never): one line, offer to log via `/log-issue`.
- Structural drift worth a real diagnosis → `/improve-codebase-architecture <area>`.
- Working-diff quality → `/code-review` (bugs) or `/simplify` (built-ins).

## Vocabulary & doctrine underneath

- `/codebase-design` — deep-module vocabulary; `/tdd` and `/improve-codebase-architecture` speak it.
- `/coder-lens` — the generated composite implementation lens. Coders load it; you rarely type it.
- `/tdd` — installed but not on the default lens: this static site has no test runner by decision. Load it when a change introduces real behaviour.
- `/code-reviewer-persona` — the reviewer persona the review skills adopt.
- `/ubiquitous-language` — extracts glossary terms from a conversation into `docs/UBIQUITOUS_LANGUAGE.md`.
- `/karpathy-guidelines` — behavioural guidelines against common LLM coding pitfalls.
- `.claude/doctrine/00-doctrine-index.md` — the load-on-demand doctrine table.

## Never type these

Orchestrator internals, dispatched by `/ship-feature` / `/ship-issue`: `afk-execute-issue`, `afk-address-pr`, `afk-review-pr`, `afk-merge-pr`, `afk-concede-thread`, and the `afk-coder` / `afk-reviewer` agents. Use the human-driven equivalents in the main flow.

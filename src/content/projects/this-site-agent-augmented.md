---
title: "This site, agent-augmented"
role: "Case study"
dates: "2026"
summary: "How I rebuilt my personal site with Claude Code as a working teammate — the harness, the rules, the review loop."
tags: ["agentic engineering", "Claude Code", "dev tooling", "Astro"]
order: 0
featured: true
---

## What it is

You're reading it. A static Astro site — Markdown posts, one CSS file of design tokens, zero client JavaScript by default. No React, no .NET host, no server. The point isn't the stack; it's the workflow underneath. This revamp, like the production work it mirrors, went through the same skill harness: doctrine files that route by what's changing, a profile that carries the repo's scar tissue, and a build gate (`npm run build`) that fails loud on a bad frontmatter field or a broken type.

## The harness

Three pieces: doctrine that routes by what you're touching, a profile that records this repo's specific facts and incidents, and a skill library the agent reaches for by name. Here's the rule this very rebuild had to obey — the repo's `CLAUDE.md`, verbatim:

`CLAUDE.md`
```md
## Never

- **Never make publishing a post require a code change.** A post is one Markdown file with frontmatter; if adding one touches a `.ts` array, a route, or an index, the design has failed the one thing the revamp exists for.
- **Never add client JavaScript, a framework island, a dependency, or a runtime without naming it in the issue first.** The old site had four runtimes for zero dynamic behaviour; simplicity is the requirement here, not a style preference.
- **Never hardcode a color, font, or spacing value.** Tokens come from the global stylesheet, ported from the locked May-2026 design; ad-hoc values are how it erodes.
- **A smell noticed in passing gets one line and an offer to log it — never a refactor.** `.claude/doctrine/surface-dont-chase.md`.
- **Explain top-down, in the map's names, for a senior backend engineer new to frontend.** `.claude/doctrine/how-to-explain.md`; profile → Working style.
- **Never paste GitHub tool input/output into the console.** Summarize.
```

Every rule there is load-bearing. The zero-JS rule and the no-literal-token rule are the two this rebuild leaned on hardest — the whole point was fewer runtimes, not a differently-shaped React app.

## What a change looks like

Before a coder writes a line, it loads the composite lens for this repo — the manifest that routes from "what's changing" to "which doctrine governs it." Here's the always-load list, verbatim from `.claude/skills/coder-lens/SKILL.md`:

`.claude/skills/coder-lens/SKILL.md`
```md
## Always load, before any code

1. `.claude/doctrine/project-profile.md` — repo facts, `check_commands`, and the constraints that override everything below.
2. `.claude/doctrine/00-doctrine-index.md` — the routing table this lens mirrors.
3. `.claude/skills/karpathy-guidelines/SKILL.md` — general coding approach.
4. `.claude/skills/codebase-design/SKILL.md` — module depth and clean seams (applies to layouts and helpers even in a static site).
```

Past that always-load set, a path-scoped table routes to the rest: touch `src/pages/`, `src/layouts/`, or `src/components/` and it pulls in the frontend architecture doctrine; touch `src/content/` and it pulls in the content rules (draft filtering, the ADR gate on schema changes). The routing is mechanical on purpose — a coder shouldn't have to remember which doctrine applies, the manifest should tell it.

When the work itself is ambiguous — which skill fits a given situation — there's a router for that too. First 12 lines of `.claude/skills/ask-svet/SKILL.md`'s main flow:

`.claude/skills/ask-svet/SKILL.md`
```md
## The main flow

1. Sharpen the idea by interview — `/grill-with-docs` when it should leave a paper trail in the glossary or an ADR; `/grill-me` for a plan that doesn't touch the doc set. Work too big for one session → `/wayfinder` charts it as decision tickets first.
2. `/write-a-prd` — interview → codebase exploration → module design → files a `PRD:` issue.
3. `/prd-to-issues` — slices the PRD into child issues with `Blocked by` edges. Prints the execution order.
4. Build — two lanes. HITL (default): `/expand-issue` → `/execute-issue` → `/review-pr` → `/address-pr` → `/merge-pr`, running ahead on expands while the coder builds. Autonomous: `/ship-feature <prd>` loops coder + reviewer subagents over every child.
5. Finalize — `/execute-issue` (all-merged path) or `/ship-feature` merges the base branch to `main` and closes the PRD.

## On-ramps
```

This PRD ran the HITL lane off that flow: a PRD issue, sliced into child work, planned and coded by hand rather than looped by the autonomous orchestrator — appropriate for a wholesale runtime replacement, where the judgment calls (what copy to keep, what to placeholder, what to delete) needed a human in the loop at every step.

## What this is not

Not a generic AI-coding pitch. Not a productivity-hack post. Not a claim that agents replace senior engineering judgment. Most of the work on this harness is figuring out where to draw the line — what an agent should never do unattended, what should get pushback, what I'm willing to be wrong about. The rules above exist because a version of me got burned by their absence: four runtimes for a static page, a documentation matrix built for a five-page site, contradictory reply prefixes loading on every session. The doctrine is scar tissue, written down so it doesn't have to be re-learned.

## Where this is heading

The skill library keeps evolving with the repo — doctrine gets added, retired, or rewritten as the site's actual shape changes, same as this PRD retired the old Transition-era rules once the revamp landed. The pattern generalizes past this site: the same harness runs production work at VSG, just with higher stakes and a bigger blast radius. This is the low-stakes place to iterate on the harness itself before that work happens for real.

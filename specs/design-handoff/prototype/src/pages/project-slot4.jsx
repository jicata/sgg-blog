// pages/project-slot4.jsx — case study with code excerpts.

function ProjectSlot4Page() {
  const { navigate } = useRouter();
  return (
    <Page>
      <article className="container" style={{ paddingBottom: 'var(--space-9)' }}>
        {/* Hero */}
        <header style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 820, marginBottom: 'var(--space-8)' }}>
          <Label style={{ color: 'var(--accent)' }}>Case study · agentic engineering</Label>
          <h1 className="display-l">This site, agent-augmented</h1>
          <p className="body-l muted" style={{ maxWidth: 700 }}>
            How I rebuilt my personal site with Claude Code as a working teammate.
            The harness, the rules, the review loop — and an honest accounting of
            what the agents did, what I curated, and what didn&apos;t work the first time.
          </p>
          <div style={{ marginTop: 'var(--space-3)' }}>
            <TagRow tags={['agentic engineering', 'Claude Code', 'dev tooling', 'TypeScript', 'MDX', 'Vite']} />
          </div>
        </header>

        {/* Body */}
        <div className="prose" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>

          {/* What it is */}
          <section>
            <h2 className="h1" style={{ marginBottom: 'var(--space-4)' }}>What it is</h2>
            <p className="body-l">
              You&apos;re reading it. A static Vite + React SPA + MDX site, served behind a thin
              .NET host. The point isn&apos;t the stack — it&apos;s the workflow underneath. Every commit
              on this site went through the same harness I use at VSG for production work,
              just smaller-stakes so I could iterate on the harness itself.
            </p>
          </section>

          {/* The harness */}
          <section>
            <h2 className="h1" style={{ marginBottom: 'var(--space-4)' }}>The harness</h2>
            <p className="body-l muted">
              Three pieces: orchestrators that drive multi-step work, a skill library the
              agent reaches for, and a persistent memory layer so sessions don&apos;t start cold.
            </p>

            <CodeBlock filename=".claude/commands/ship-feature.md" lang="md">{`---
name: ship-feature
description: Drive a feature from issue → plan → impl → review → merge.
allowed-tools: Read, Write, Edit, Bash, Task
---

# Ship a feature

1. Read the issue. If it's ambiguous, GRILL the user before planning.
2. Skim affected files. Reach for skills: vsa-tdd, vertical-slice-discipline.
3. Draft a plan. Surface trade-offs. Wait for "go".
4. Implement in one slice. Tests first when the contract is clear.
5. Self-review against .claude/rules/review-checklist.md.
6. Hand off to /afk-reviewer for second pass.
7. Open PR only after both passes are clean.

If at any step you feel the work is bigger than the issue claimed,
STOP and surface the size delta. Do not silently scope-creep.`}</CodeBlock>

            <p className="body-l muted">
              The skill library is the surface area: each skill is a discrete capability the
              agent can compose. Skills are versioned, written in plain markdown, and live
              alongside the code they govern.
            </p>

            <CodeBlock filename=".claude/rules/vsa-tdd.md" lang="md">{`# Vertical-slice TDD

When implementing a feature, structure work as a vertical slice:
endpoint → handler → domain → persistence → tests, in that order.

Write the integration test FIRST against the endpoint signature.
It should fail with a clear "not implemented" message.
Then walk the slice inward, making the test pass one layer at a time.

Refuse to write a domain method without a failing test calling it.
Refuse to add a persistence method without a domain method needing it.

If asked to "just add a quick endpoint," push back: name what the slice would be.`}</CodeBlock>
          </section>

          {/* Workflow shown */}
          <section>
            <h2 className="h1" style={{ marginBottom: 'var(--space-4)' }}>What a change looks like</h2>
            <p className="body-l muted">
              Concretely, here&apos;s the change that produced the project list page you came
              in on:
            </p>
            <ol style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', paddingLeft: 0, listStyle: 'none', marginTop: 'var(--space-4)' }}>
              {[
                ['Issue', 'Project list reads as a feature checklist, not as a career story. Rework into 3 tiers.'],
                ['Grill', 'Agent asked four follow-ups before planning. Two were good; one I redirected; one was wrong and I corrected it.'],
                ['Plan', 'Surfaced two trade-offs I hadn\'t thought through (where SoftUni sits, whether breadth list belongs on Home).'],
                ['Ship', 'One slice. Three files touched. Integration test against the route first.'],
                ['Review', 'Self-review caught two missed accessibility issues. The afk-reviewer pass caught one type narrowing the first pass missed.'],
                ['Merge', 'PR opened with the change, the trade-off log, and the two rejected alternatives. I merged after a 10-minute read.'],
              ].map(([step, body], i) => (
                <li key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 'var(--space-5)', alignItems: 'baseline' }}>
                  <div className="label" style={{ color: 'var(--accent)' }}>{step}</div>
                  <p className="body" style={{ color: 'var(--fg)' }}>{body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* What it's not */}
          <section style={{
            borderLeft: '2px solid var(--border-strong)',
            paddingLeft: 'var(--space-5)',
            marginLeft: 0,
          }}>
            <h2 className="h2" style={{ marginBottom: 'var(--space-3)', fontStyle: 'italic' }}>What this is not</h2>
            <p className="body-l muted">
              Not a generic AI-coding pitch. Not a productivity-hack post. Not a claim that
              agents replace senior engineering judgment. Most of the work I do on this
              harness is figuring out where to draw the line — what an agent should never
              do unattended, what I want it to push back on, what I&apos;m willing to be wrong about.
            </p>
          </section>

          {/* Where this is heading */}
          <section>
            <h2 className="h1" style={{ marginBottom: 'var(--space-4)' }}>Where this is heading</h2>
            <p className="body-l muted">
              The skill library is going public this quarter; the orchestrators will follow.
              <em> Brochures</em>, the consumer tool, is the same pattern applied to a non-engineering
              domain — different harness, same shape.
              See the <ArrowLink onClick={() => navigate('projects')}>projects list</ArrowLink> for
              what&apos;s queued.
            </p>
          </section>
        </div>

        {/* Next project */}
        <NextProjectFooter to={{ name: 'project-job', params: { id: 'vsg' }, label: 'VSG Bulgaria · tech lead' }} />
      </article>
    </Page>
  );
}

function NextProjectFooter({ to }) {
  const { navigate } = useRouter();
  return (
    <div style={{ marginTop: 'var(--space-9)' }}>
      <Card onClick={() => navigate(to.name, to.params)} padding="var(--space-6)" radius="var(--radius-3)">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-4)', alignItems: 'center' }}>
          <div>
            <Label>Next project</Label>
            <div className="h2" style={{ marginTop: 8 }}>{to.label}</div>
          </div>
          <Arrow size={20} />
        </div>
      </Card>
    </div>
  );
}

window.ProjectSlot4Page = ProjectSlot4Page;
window.NextProjectFooter = NextProjectFooter;

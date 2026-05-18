// pages/project-job.jsx — shared shape for VSG / Dow Jones / SoftUni.

const JOB_CONTENT = {
  vsg: {
    title: 'Tech lead, backend',
    company: 'VSG Bulgaria',
    dates: '2024 — present',
    context: 'Backend tech lead on a team transitioning to agent-augmented development.',
    did: [
      {
        h: 'Reshape the contract layer',
        p: 'Took a service boundary that had drifted into a "shared-DTOs" pile and re-cut it into versioned contracts owned per-consumer. Eight teams stopped tripping over each other\'s shape changes within a quarter.',
      },
      {
        h: 'Land agentic-development on the team',
        p: 'Built the rules, orchestrators, and review-loop guardrails that let engineers ship with coding agents without losing review discipline. The hard part wasn\'t the prompts — it was tuning the harness against real production work week over week.',
      },
      {
        h: 'Hire senior, not laterally',
        p: 'Rewrote the loop, pushed back on the org\'s "any C# 5+ years" default, and brought in two senior IC peers who could push back on me. Saved more time than the agentic work did.',
      },
    ],
    learned: 'The interesting tech-lead problems aren\'t technical. The agentic shift only worked once I treated it as a team-norms problem first and a tooling problem second — and I had it backwards for the first two months.',
    stats: [
      { n: '8 → 0', l: 'cross-team breakages / quarter' },
      { n: '~40%', l: 'PR cycle time, agent-assisted' },
      { n: '2', l: 'senior IC hires landed' },
    ],
    next: { name: 'project-job', params: { id: 'dowjones' }, label: 'Dow Jones · senior software engineer' },
  },
  dowjones: {
    title: 'Senior software engineer',
    company: 'Dow Jones',
    dates: '2020 — 2024',
    context: 'Internal platforms. Four years of scaled-org work — more processes, longer review loops, higher blast radius.',
    did: [
      {
        h: 'Migrate a fragile sync to event-driven',
        p: 'Replaced a polling sync between two internal systems with an event-driven pipeline. The migration ran in parallel for six weeks; we cut over once the divergence rate hit zero. Surfaced two upstream bugs the polling sync had been silently papering over.',
      },
      {
        h: 'Build the on-call playbook the team didn\'t have',
        p: 'Wrote and rotated through the runbooks. Caught two recurring incident classes that had been treated as "weird, restart it." Both turned out to be fixable in a day each once we stopped restarting.',
      },
    ],
    learned: 'At scaled-org size, the cost of a shape change isn\'t the code — it\'s the meetings. I spent the first year over-engineering for flexibility I didn\'t need and under-engineering for the cross-team review that I did.',
    stats: [
      { n: '6 wks', l: 'parallel-run migration window' },
      { n: '2', l: 'recurring incident classes retired' },
    ],
    next: { name: 'project-job', params: { id: 'softuni' }, label: 'SoftUni · backend dev + teacher' },
  },
  softuni: {
    title: 'Backend developer + teacher',
    company: 'SoftUni',
    dates: '2016 — 2020',
    context: 'Half engineering, half curriculum. The foundation: shipping software while explaining it to people who hadn\'t done it yet.',
    did: [
      {
        h: 'Teach C# / .NET to ~400 students/year',
        p: 'Designed and ran the backend track. The discipline of having to defend a design choice to a room of beginners — out loud, on a whiteboard, against questions you didn\'t prepare for — taught me more about clarity than any code review since.',
      },
      {
        h: 'Ship the platform you taught on',
        p: 'Backend on the internal LMS — judge service, course registration, grade pipeline. Whatever broke on Monday morning, you got to look ~200 students in the eye about by Tuesday.',
      },
    ],
    learned: 'Teaching is the single best way to find the gaps in your own model. Anything I couldn\'t explain to a first-year, I didn\'t actually understand — I had just memorized the rhythm of it.',
    next: { name: 'project-slot4', params: {}, label: 'This site, agent-augmented' },
  },
};

function ProjectJobPage({ id = 'vsg' }) {
  const p = JOB_CONTENT[id] || JOB_CONTENT.vsg;
  return (
    <Page>
      <article className="container" style={{ paddingBottom: 'var(--space-9)' }}>
        {/* Header strip */}
        <header style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'var(--space-4)',
          maxWidth: 820,
          marginBottom: 'var(--space-8)',
          paddingBottom: 'var(--space-6)',
          borderBottom: '1px solid var(--border)',
        }}>
          <Label>{p.dates}</Label>
          <h1 className="display-l">{p.title}</h1>
          <div className="ui mono" style={{ color: 'var(--fg-muted)' }}>
            {p.company}
          </div>
          <p className="body-l muted" style={{ maxWidth: 680, marginTop: 'var(--space-2)' }}>
            {p.context}
          </p>
        </header>

        <div className="prose" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          {/* What I did */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <Label>What I did</Label>
            {p.did.map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <h2 className="h1">{s.h}</h2>
                <p className="body-l muted">{s.p}</p>
              </div>
            ))}
          </section>

          {/* What I learned */}
          <section style={{
            borderLeft: '2px solid var(--border-strong)',
            paddingLeft: 'var(--space-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}>
            <Label>What I learned</Label>
            <p className="body-l" style={{ fontStyle: 'italic', color: 'var(--fg)' }}>
              {p.learned}
            </p>
          </section>

          {/* Outcomes — only if there are honest numbers */}
          {p.stats && p.stats.length > 0 && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <Label>Outcomes</Label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${p.stats.length}, 1fr)`,
                gap: 'var(--space-4)',
              }} className="stat-grid">
                {p.stats.map((s, i) => (
                  <div key={i} style={{
                    padding: 'var(--space-5)',
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-3)',
                  }}>
                    <div className="sans" style={{
                      fontSize: 32,
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                      color: 'var(--fg)',
                    }}>{s.n}</div>
                    <div className="label" style={{ marginTop: 8 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <NextProjectFooter to={p.next} />

        <style>{`
          @media (max-width: 640px) {
            .stat-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </article>
    </Page>
  );
}

window.ProjectJobPage = ProjectJobPage;
window.JOB_CONTENT = JOB_CONTENT;

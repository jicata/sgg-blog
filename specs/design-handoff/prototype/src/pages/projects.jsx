// pages/projects.jsx — 3-tier list. FEATURED · CAREER · SHIPPING NEXT.

const CAREER_PROJECTS = [
  { id: 'vsg',      company: 'VSG Bulgaria', role: 'Tech lead',          dates: '2024 — present', body: 'Leading backend architecture and the agentic-development shift on the team. The most current work.', tags: ['.NET', 'DDD', 'agentic'] },
  { id: 'dowjones', company: 'Dow Jones',    role: 'Senior SWE',          dates: '2020 — 2024',    body: 'Internal-platform work at scaled-org size. Distributed systems, longer review loops, higher blast radius.', tags: ['C#', 'distributed', 'scale'] },
  { id: 'softuni',  company: 'SoftUni',      role: 'Backend dev + teacher', dates: '2016 — 2020',    body: 'Half engineering, half teaching. Curriculum design, classroom hours, and the discipline of explaining backend to people who hadn\'t done it yet.', tags: ['teaching', 'C#', 'curriculum'] },
];

const SHIPPING_NEXT = [
  { label: 'Claude Code skill library', note: 'Going public soon — orchestrators + rules I use day-to-day.', shipped: false },
  { label: 'Brochures',                 note: 'Small agentic consumer tool — design phase.',                shipped: false },
];

function ProjectsPage({ tweaks }) {
  const { navigate } = useRouter();
  const slot4Assertive = tweaks.slot4Treatment !== 'quiet';
  const projectMetaStrip = tweaks.projectMeta === 'with-strip';

  return (
    <Page>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-9)',
        paddingBottom: 'var(--space-9)',
      }}>
        {/* Header */}
        <header style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Label>Projects</Label>
          <h1 className="display-l">Work, in three tiers</h1>
          <p className="body-l muted" style={{ maxWidth: 640 }}>
            The current bet, the career arc that got me here, and what&apos;s shipping next.
          </p>
        </header>

        {/* ── FEATURED ─────────────────────────────────────────────── */}
        <Section label="Featured">
          <Card
            onClick={() => navigate('project-slot4')}
            padding="var(--space-7)"
            radius="var(--radius-4)"
            style={slot4Assertive ? {
              background: 'linear-gradient(180deg, var(--surface-2), var(--surface-1))',
              borderColor: 'var(--border-strong)',
            } : {}}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-5)', alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <Label style={{ color: slot4Assertive ? 'var(--accent)' : 'var(--fg-dim)' }}>
                  Case study · current
                </Label>
                <h2 className="display-l" style={{ fontSize: 32, maxWidth: 700 }}>
                  This site, agent-augmented
                </h2>
                <p className="body-l muted" style={{ maxWidth: 640 }}>
                  Rebuilding my personal site as a working artifact of agentic engineering.
                  The harness, the rules, the review loop — and an honest accounting of what
                  the agents did and what I curated.
                </p>
                <TagRow tags={['agentic engineering', 'Claude Code', 'dev tooling', 'TypeScript', 'MDX']} />
              </div>
              <Arrow size={22} />
            </div>
          </Card>
        </Section>

        {/* ── CAREER ───────────────────────────────────────────────── */}
        <Section label="Career">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-4)',
          }}>
            {CAREER_PROJECTS.map((p) => (
              <Card key={p.id} onClick={() => navigate('project-job', { id: p.id })} padding="var(--space-6)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 className="h2">{p.company}</h3>
                    <Arrow size={16} dim />
                  </div>
                  <div className="ui-s mono" style={{ color: 'var(--fg-dim)' }}>{p.role}</div>
                  <div className="label">{p.dates}</div>
                  <p className="body-s muted" style={{ marginTop: 'var(--space-2)' }}>{p.body}</p>
                  {projectMetaStrip && (
                    <div style={{ marginTop: 'auto', paddingTop: 'var(--space-3)' }}>
                      <TagRow tags={p.tags} />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* ── SHIPPING NEXT (lighter) ──────────────────────────────── */}
        <Section label="Shipping next">
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {SHIPPING_NEXT.map((s, i) => (
              <li key={i} style={{
                padding: 'var(--space-5) 0',
                borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                borderBottom: '1px solid var(--border)',
                display: 'grid',
                gridTemplateColumns: '180px 1fr auto',
                gap: 'var(--space-5)',
                alignItems: 'baseline',
              }} className="shipping-row">
                <div className="label" style={{ color: 'var(--fg-faint)' }}>
                  In flight
                </div>
                <div>
                  <div className="h3" style={{ color: 'var(--fg-muted)' }}>{s.label}</div>
                  <p className="body-s" style={{ color: 'var(--fg-dim)', marginTop: 4 }}>{s.note}</p>
                </div>
                <div className="ui-s mono" style={{ color: 'var(--fg-faint)' }}>
                  — soon
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .shipping-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </Page>
  );
}

window.ProjectsPage = ProjectsPage;
window.CAREER_PROJECTS = CAREER_PROJECTS;

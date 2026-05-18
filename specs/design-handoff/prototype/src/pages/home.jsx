// pages/home.jsx — H4 Variant A: compact hero, balanced grid, scroll to reveal.

function HomePage({ tweaks }) {
  const { navigate } = useRouter();
  const showWriting = tweaks.showWriting !== false;
  const slot4Assertive = tweaks.slot4Treatment !== 'quiet';
  const heroRoomy = tweaks.heroDensity === 'roomy';
  const projectMetaStrip = tweaks.projectMeta === 'with-strip';

  return (
    <Page>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: heroRoomy ? 'var(--space-10)' : 'var(--space-9)',
        paddingBottom: 'var(--space-9)',
      }}>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section style={{
          paddingTop: heroRoomy ? 'var(--space-8)' : 'var(--space-6)',
          display: 'flex',
          gap: 'var(--space-5)',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}>
          <PhotoPlaceholder size={80} />
          <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span className="label" style={{ color: 'var(--accent)' }}>● available for senior backend roles</span>
            </div>
            <h1 className="display-l" style={{ marginTop: 4 }}>
              Svetlin Galov
            </h1>
            <p className="body-l muted" style={{ maxWidth: 560 }}>
              Backend tech lead, agentic-first. Ten years building C#/.NET systems —
              currently leading at <span style={{ color: 'var(--fg)' }}>VSG Bulgaria</span>,
              where I&apos;m reshaping how the team ships with coding agents as teammates.
            </p>
          </div>
        </section>

        {/* ── Featured work ────────────────────────────────────────────── */}
        <Section label="Featured work">
          {/* slot 4 — full-width, visually outranks job projects */}
          <Card
            onClick={() => navigate('project-slot4')}
            padding={slot4Assertive ? 'var(--space-7)' : 'var(--space-6)'}
            radius="var(--radius-4)"
            style={slot4Assertive ? {
              background: 'linear-gradient(180deg, var(--surface-2), var(--surface-1))',
              borderColor: 'var(--border-strong)',
            } : {}}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 'var(--space-5)',
              alignItems: 'start',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <Label style={{ color: slot4Assertive ? 'var(--accent)' : 'var(--fg-dim)' }}>
                  Case study · agentic engineering
                </Label>
                <h3 className="h1" style={{ maxWidth: 680 }}>
                  This site, agent-augmented
                </h3>
                <p className="body muted" style={{ maxWidth: 620 }}>
                  How I rebuilt my personal site using Claude Code as a teammate — the
                  harness, the skill library, the workflow shown end-to-end. Honest about
                  what&apos;s automated and what&apos;s curated.
                </p>
                <div style={{ marginTop: 'var(--space-2)' }}>
                  <TagRow tags={['agentic engineering', 'dev tooling', 'Claude Code', 'TypeScript']} />
                </div>
              </div>
              <Arrow size={20} />
            </div>
          </Card>

          {/* 2-up: VSG + Dow Jones */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-4)',
          }}>
            {[
              { id: 'vsg', company: 'VSG Bulgaria', role: 'Tech lead · current', body: 'Leading backend architecture and the agentic-development shift on the team.', tags: ['.NET', 'DDD', 'team lead'] },
              { id: 'dowjones', company: 'Dow Jones', role: 'Senior software engineer', body: 'Scaled-org work on internal platforms. Bigger systems, bigger blast radius.', tags: ['distributed', 'C#', 'scale'] },
            ].map((p) => (
              <Card key={p.id} onClick={() => navigate('project-job', { id: p.id })} padding="var(--space-6)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 className="h2">{p.company}</h3>
                    <Arrow size={16} dim />
                  </div>
                  <div className="ui-s mono" style={{ color: 'var(--fg-dim)' }}>{p.role}</div>
                  <p className="body-s muted">{p.body}</p>
                  {projectMetaStrip && (
                    <div style={{ marginTop: 'var(--space-2)' }}>
                      <TagRow tags={p.tags} />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* ── Writing ──────────────────────────────────────────────────── */}
        {showWriting && (
          <Section label="Writing">
            <Card onClick={() => navigate('article', { slug: 'agents-as-teammates' })} padding="var(--space-6)">
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 'var(--space-5)',
                alignItems: 'start',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div className="label" style={{ color: 'var(--fg-dim)' }}>
                    <span>Apr 2026</span>
                    <span style={{ margin: '0 8px' }}>·</span>
                    <span>6 min read</span>
                  </div>
                  <h3 className="h2" style={{ maxWidth: 580 }}>
                    Treating agents as teammates, not autocomplete
                  </h3>
                  <p className="body-s muted" style={{ maxWidth: 600 }}>
                    The mental model shift that makes coding agents productive — and the
                    harness you need around them to keep that productivity honest.
                  </p>
                </div>
                <Arrow size={18} />
              </div>
            </Card>
          </Section>
        )}

        {/* ── Contact strip ───────────────────────────────────────────── */}
        <section style={{
          paddingTop: 'var(--space-6)',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
        }}>
          <Label>Get in touch</Label>
          <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'baseline' }}>
            <a href="mailto:svetlingalov@gmail.com" className="ui" style={{ color: 'var(--fg)', textDecoration: 'none' }}>
              svetlingalov@gmail.com
            </a>
            <a href="https://github.com/jicata" target="_blank" rel="noreferrer" className="ui mono" style={{ color: 'var(--fg-muted)', textDecoration: 'none' }}>
              github.com/jicata <span style={{ opacity: 0.5 }}>↗</span>
            </a>
            <a href="https://www.linkedin.com/in/svetlin-galov/" target="_blank" rel="noreferrer" className="ui mono" style={{ color: 'var(--fg-muted)', textDecoration: 'none' }}>
              linkedin.com/in/svetlin-galov <span style={{ opacity: 0.5 }}>↗</span>
            </a>
          </div>
        </section>
      </div>
    </Page>
  );
}

window.HomePage = HomePage;

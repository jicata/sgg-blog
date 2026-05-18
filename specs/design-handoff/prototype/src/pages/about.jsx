// pages/about.jsx — career arc, no h2s in story, tag-row capabilities.

function AboutPage() {
  const { navigate } = useRouter();
  return (
    <Page>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-9)',
        paddingBottom: 'var(--space-9)',
      }}>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section style={{
          display: 'flex',
          gap: 'var(--space-6)',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }} className="about-hero">
          <PhotoPlaceholder size={120} />
          <div style={{ flex: '1 1 360px', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <Label>About</Label>
            <h1 className="display-xl">Svetlin Galov</h1>
            <p className="body-l muted" style={{ maxWidth: 580 }}>
              Backend tech lead. Agentic-first. Based in Sofia, working remote-global.
            </p>
          </div>
        </section>

        {/* ── Story (3 paragraphs, no h2s) ─────────────────────────── */}
        <section className="prose" style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          <p className="body-l" style={{ color: 'var(--fg)' }}>
            I&apos;m a backend tech lead at <strong style={{ fontWeight: 600 }}>VSG Bulgaria</strong>,
            where my day is split between system design (services, contracts, the edges
            between them) and the harder problem — figuring out how a team of senior engineers
            actually <em>ships</em> with coding agents as teammates rather than as autocomplete.
            That second part is where most of my recent energy goes: building the orchestrators,
            rules, and review loops that make agents pull their weight on production work.
          </p>
          <p className="body-l muted">
            Before VSG I spent four years at <strong style={{ fontWeight: 600, color: 'var(--fg)' }}>Dow Jones</strong> as
            a senior software engineer on internal platforms — scaled-org work, bigger blast
            radius, slower feedback loops. Before that, I taught backend development at
            <strong style={{ fontWeight: 600, color: 'var(--fg)' }}> SoftUni</strong> while shipping
            software full-time. Roughly a decade of C#/.NET, distributed systems, and the kind of
            DDD that survives a year past the original whiteboard session.
          </p>
          <p className="body-l muted">
            What I&apos;m building now: <ArrowLink onClick={() => navigate('project-slot4')}>a case study on agent-augmented engineering</ArrowLink>,
            a Claude Code skill library going public soon, and <em>Brochures</em> — a small
            agentic consumer tool I&apos;ll ship later this year. None of these are
            generic &ldquo;AI coding&rdquo; pitches; they&apos;re the artifacts of doing the work and
            keeping notes. If any of that is interesting,
            {' '}<ArrowLink onClick={() => navigate('contact')}>get in touch</ArrowLink>.
          </p>
        </section>

        {/* ── What I work on (tag-row) ─────────────────────────────── */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <Label>What I work on</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              'C#', '.NET', 'distributed systems', 'DDD', 'vertical-slice architecture',
              'system design', 'agentic engineering', 'Claude Code', 'MCP', 'TypeScript',
              'PostgreSQL', 'event-driven', 'tech leadership',
            ].map((t) => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--fg-muted)',
                background: 'var(--surface-1)',
                padding: '6px 10px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-1)',
              }}>{t}</span>
            ))}
          </div>
        </section>

        {/* ── Get in touch ─────────────────────────────────────────── */}
        <section style={{
          paddingTop: 'var(--space-6)',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}>
          <Label>Get in touch</Label>
          <p className="body muted" style={{ maxWidth: 580 }}>
            If you want to talk — about a role, a system, or anything in the
            paragraph above — here&apos;s how.
          </p>
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

window.AboutPage = AboutPage;

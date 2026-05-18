// pages/contact.jsx — links-only.

function ContactPage() {
  return (
    <Page>
      <div className="container" style={{ paddingBottom: 'var(--space-9)' }}>
        <header style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 720, marginBottom: 'var(--space-8)' }}>
          <Label>Contact</Label>
          <h1 className="display-l">If you want to talk, here&apos;s how.</h1>
          <p className="body-l muted">
            No form. Email or the socials below — whichever is easier. I read everything;
            I answer most things within a day or two.
          </p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', maxWidth: 720 }}>
          {[
            { label: 'Email',    value: 'svetlingalov@gmail.com',         href: 'mailto:svetlingalov@gmail.com', external: false },
            { label: 'GitHub',   value: 'github.com/jicata',              href: 'https://github.com/jicata', external: true },
            { label: 'LinkedIn', value: 'linkedin.com/in/svetlin-galov',  href: 'https://www.linkedin.com/in/svetlin-galov/', external: true },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noreferrer' : undefined}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr auto',
                gap: 'var(--space-5)',
                alignItems: 'baseline',
                padding: 'var(--space-5) 0',
                borderTop: '1px solid var(--border)',
                textDecoration: 'none',
                color: 'var(--fg)',
                transition: 'background var(--duration) var(--ease)',
              }}
              className="contact-row"
              onMouseEnter={e => e.currentTarget.style.background = 'color-mix(in oklab, var(--surface-1) 50%, transparent)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div className="label">{l.label}</div>
              <div className="ui mono" style={{ color: 'var(--accent)' }}>{l.value}</div>
              <span className="mono" style={{ color: 'var(--fg-dim)', fontSize: 18 }} aria-hidden>
                {l.external ? '↗' : '→'}
              </span>
            </a>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>

        <p className="body muted" style={{ maxWidth: 580, marginTop: 'var(--space-7)' }}>
          Best for: senior backend / tech-lead conversations, remote-global roles, anything
          agentic-engineering shaped. Not great for: cold pitch decks, recruiter
          mass-mail, or anything that starts with &ldquo;quick favor.&rdquo;
        </p>
      </div>
    </Page>
  );
}

window.ContactPage = ContactPage;

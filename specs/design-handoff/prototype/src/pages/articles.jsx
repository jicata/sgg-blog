// pages/articles.jsx — listing + detail. Listing is hairline-rule rows; detail
// preserves the full-bleed grid + sticky ToC mechanic from the existing app.

const ARTICLES = [
  {
    slug: 'agents-as-teammates',
    date: 'Apr 2026',
    title: 'Treating agents as teammates, not autocomplete',
    dek: 'The mental model shift that makes coding agents productive — and the harness you need to keep that productivity honest.',
    readMin: 6,
    body: [
      { kind: 'p', text: 'Most teams I talk to are still using agents the way they used the first wave of LLM autocomplete: as a faster way to write the line they were already going to write. That works. It also wastes the agent.' },
      { kind: 'p', text: 'The shift that produces a different kind of leverage is treating the agent as a teammate. Specifically: a junior teammate with a perfect memory of your codebase, no ego, and a tendency to confidently overreach if you don\'t give it a structure to push back inside.' },
      { kind: 'h', id: 'the-harness', text: 'The harness' },
      { kind: 'p', text: 'A teammate needs context. A teammate needs a job description. A teammate needs to know what it is and is not allowed to ship unattended. That\'s the harness.' },
      { kind: 'p', text: 'Concretely, mine has three layers: orchestrators (multi-step commands that drive work), a skill library (discrete capabilities written in plain markdown), and a review loop (an agent that reviews the first agent\'s output against a checklist before I see it).' },
      { kind: 'h', id: 'what-this-buys', text: 'What this buys' },
      { kind: 'p', text: 'The honest answer: not raw productivity. The change is in the shape of the work, not the speed.' },
      { kind: 'p', text: 'I spend more time at the start of a feature — grilling the agent on what it understood, surfacing alternatives I wouldn\'t have written down — and less time in the middle. The middle is where the harness pays for itself.' },
      { kind: 'h', id: 'what-it-isnt', text: 'What this isn\'t' },
      { kind: 'p', text: 'It\'s not a productivity-hack pitch. It\'s not "AI replaces senior engineers." The agent and I disagree several times a day; we\'re both wrong some of the time, and the harness is what makes those disagreements productive instead of confusing.' },
    ],
  },
];

function ArticlesPage() {
  const { navigate } = useRouter();
  return (
    <Page>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-8)',
        paddingBottom: 'var(--space-9)',
      }}>
        <header style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 720 }}>
          <Label>Articles</Label>
          <h1 className="display-l">Notes on backend, agents, and shipping</h1>
          <p className="body-l muted">
            Long-form when the idea earns it. Not a posting cadence.
          </p>
        </header>

        <section>
          {ARTICLES.map((a, i) => (
            <button
              key={a.slug}
              onClick={() => navigate('article', { slug: a.slug })}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: 'var(--space-6) 0',
                borderTop: '1px solid var(--border)',
                borderBottom: i === ARTICLES.length - 1 ? '1px solid var(--border)' : 'none',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'background var(--duration) var(--ease)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'color-mix(in oklab, var(--surface-1) 50%, transparent)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 'var(--space-5)',
                alignItems: 'baseline',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 760 }}>
                  <div className="label">
                    <span>{a.date}</span>
                    <span style={{ margin: '0 8px' }}>·</span>
                    <span>{a.readMin} min read</span>
                  </div>
                  <h2 className="h1">{a.title}</h2>
                  <p className="body-l muted">{a.dek}</p>
                </div>
                <Arrow size={18} dim />
              </div>
            </button>
          ))}
        </section>
      </div>
    </Page>
  );
}

function ArticlePage({ slug = 'agents-as-teammates' }) {
  const article = ARTICLES.find(a => a.slug === slug) || ARTICLES[0];
  const headings = article.body.filter(b => b.kind === 'h');
  const [active, setActive] = React.useState(headings[0]?.id);

  // IntersectionObserver for active section
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [slug]);

  return (
    <Page>
      <article style={{ paddingBottom: 'var(--space-9)' }}>
        {/* Hero — container-bound */}
        <div className="container">
          <header style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            maxWidth: 820,
            marginBottom: 'var(--space-8)',
            paddingBottom: 'var(--space-6)',
            borderBottom: '1px solid var(--border)',
          }}>
            <div className="label">
              <span>{article.date}</span>
              <span style={{ margin: '0 8px' }}>·</span>
              <span>{article.readMin} min read</span>
              <span style={{ margin: '0 8px' }}>·</span>
              <span>Svetlin Galov</span>
            </div>
            <h1 className="display-l">{article.title}</h1>
            <p className="body-l muted" style={{ maxWidth: 720 }}>{article.dek}</p>
          </header>
        </div>

        {/* Body — grid layout with ToC */}
        <div className="container">
          <div className="article-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 220px',
            gap: 'var(--space-7)',
            alignItems: 'start',
          }}>
            <div className="prose" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              {article.body.map((b, i) => {
                if (b.kind === 'h') {
                  return (
                    <h2 key={i} id={b.id} className="h1" style={{ scrollMarginTop: 'var(--space-8)', marginTop: 'var(--space-5)' }}>
                      {b.text}
                    </h2>
                  );
                }
                return <p key={i} className="body-l" style={{ color: 'var(--fg)' }}>{b.text}</p>;
              })}
            </div>

            <aside style={{ position: 'sticky', top: 88, alignSelf: 'start' }} className="toc">
              <Label style={{ marginBottom: 'var(--space-3)' }}>On this page</Label>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4, borderLeft: '1px solid var(--border)' }}>
                {headings.map((h) => {
                  const isActive = active === h.id;
                  return (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="ui-s"
                        style={{
                          display: 'block',
                          padding: '6px 0 6px 14px',
                          marginLeft: -1,
                          borderLeft: `2px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                          color: isActive ? 'var(--fg)' : 'var(--fg-muted)',
                          textDecoration: 'none',
                          transition: 'color var(--duration) var(--ease), border-color var(--duration) var(--ease)',
                        }}
                      >
                        {h.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </div>

        <style>{`
          @media (max-width: 1023px) {
            .article-grid { grid-template-columns: 1fr !important; }
            .toc { display: none !important; }
          }
        `}</style>
      </article>
    </Page>
  );
}

window.ArticlesPage = ArticlesPage;
window.ArticlePage = ArticlePage;
window.ARTICLES = ARTICLES;

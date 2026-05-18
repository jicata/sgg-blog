// pages/not-found.jsx — matches site tone, no illustration, two links.

function NotFoundPage() {
  const { navigate } = useRouter();
  return (
    <Page>
      <div className="container" style={{
        paddingBottom: 'var(--space-9)',
        paddingTop: 'var(--space-9)',
      }}>
        <div style={{
          maxWidth: 560,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-5)',
        }}>
          <div className="label" style={{ color: 'var(--accent)' }}>404</div>
          <h1 className="display-l">That page isn&apos;t here.</h1>
          <p className="body-l muted">
            Either the link is wrong, the page was never built, or I retired it.
            Try one of these instead.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-5)', marginTop: 'var(--space-3)' }}>
            <ArrowLink onClick={() => navigate('home')}>Home</ArrowLink>
            <ArrowLink onClick={() => navigate('projects')}>Projects</ArrowLink>
          </div>
        </div>
      </div>
    </Page>
  );
}

window.NotFoundPage = NotFoundPage;

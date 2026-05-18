// app-frozen.jsx — handoff variant. No Tweaks panel, no review knobs.
// Production-locked configuration applied on boot. This is the version the
// porting agent should treat as the canonical design output.

const FROZEN_CONFIG = {
  typePairing: 'plex+source',   // IBM Plex Sans + Source Serif 4 + IBM Plex Mono
  accent:      'amber',         // warm amber against cool slate
  mode:        'dark',          // dark only at launch
  heroDensity: 'compact',       // hero photo 80px, tight spacing
  slot4Treatment: 'assertive',  // slot-4 card uses elevated surface gradient
  projectMeta: 'minimal',       // job cards do not show tag strip
  showWriting: true,            // Writing section shown on Home
};

function App() {
  // Apply the locked configuration once. CSS variables only — no React state for
  // the tokens because the production build doesn't toggle them.
  React.useEffect(() => { applyTweaks(FROZEN_CONFIG); }, []);

  return (
    <RouterProvider>
      <GlobalStyles />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <RouteSwitch tweaks={FROZEN_CONFIG} />
      <Footer />
    </RouterProvider>
  );
}

function RouteSwitch({ tweaks }) {
  const { route } = useRouter();
  const key = route.name + JSON.stringify(route.params);

  let view;
  switch (route.name) {
    case 'home':           view = <HomePage tweaks={tweaks} />; break;
    case 'projects':       view = <ProjectsPage tweaks={tweaks} />; break;
    case 'project-slot4':  view = <ProjectSlot4Page />; break;
    case 'project-job':    view = <ProjectJobPage id={route.params.id} />; break;
    case 'articles':       view = <ArticlesPage />; break;
    case 'article':        view = <ArticlePage slug={route.params.slug} />; break;
    case 'about':          view = <AboutPage />; break;
    case 'contact':        view = <ContactPage />; break;
    case '404':            view = <NotFoundPage />; break;
    default:               view = <NotFoundPage />;
  }

  return <div key={key}>{view}</div>;
}

window.App = App;

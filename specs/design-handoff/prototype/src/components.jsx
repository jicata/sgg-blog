// components.jsx — shared layout + UI primitives.

const { useState, useEffect, useContext, createContext } = React;

// ── Router (state-based, no real URL routing) ───────────────────────────────
const RouterCtx = createContext(null);

function useRouter() {
  return useContext(RouterCtx);
}

function RouterProvider({ children }) {
  // Honor an initial-route hook so per-page reference HTMLs can mount one screen.
  const initialName = (typeof window !== 'undefined' && window.__INITIAL_ROUTE) || 'home';
  const initialParams = (typeof window !== 'undefined' && window.__INITIAL_PARAMS) || {};
  const [route, setRoute] = useState({ name: initialName, params: initialParams });
  const navigate = (name, params = {}) => {
    setRoute({ name, params });
    // scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  return (
    <RouterCtx.Provider value={{ route, navigate }}>
      {children}
    </RouterCtx.Provider>
  );
}

// ── Navbar ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'home',     label: 'Home',     route: 'home' },
  { id: 'projects', label: 'Projects', route: 'projects' },
  { id: 'articles', label: 'Articles', route: 'articles' },
  { id: 'about',    label: 'About',    route: 'about' },
  { id: 'contact',  label: 'Contact',  route: 'contact' },
];

function Navbar() {
  const { route, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isCurrent = (id) => {
    if (id === 'projects' && (route.name === 'projects' || route.name === 'project-slot4' || route.name === 'project-job')) return true;
    if (id === 'articles' && (route.name === 'articles' || route.name === 'article')) return true;
    return route.name === id;
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'color-mix(in oklab, var(--bg) 92%, transparent)' : 'transparent',
      backdropFilter: scrolled ? 'blur(8px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'background var(--duration) var(--ease), border-color var(--duration) var(--ease)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
      }}>
        <button
          onClick={() => navigate('home')}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--fg)',
            letterSpacing: '-0.01em',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            background: 'var(--accent)',
            borderRadius: 1,
          }} />
          svetlin.galov
        </button>

        {/* desktop nav */}
        <nav className="nav-desktop" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className="ui"
              style={{
                padding: '8px 14px',
                color: isCurrent(item.id) ? 'var(--fg)' : 'var(--fg-muted)',
                position: 'relative',
                transition: 'color var(--duration) var(--ease)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--fg)'}
              onMouseLeave={(e) => e.currentTarget.style.color = isCurrent(item.id) ? 'var(--fg)' : 'var(--fg-muted)'}
            >
              {item.label}
              {isCurrent(item.id) && (
                <span style={{
                  position: 'absolute',
                  left: 14,
                  right: 14,
                  bottom: 2,
                  height: 1,
                  background: 'var(--accent)',
                }} />
              )}
            </button>
          ))}
        </nav>

        {/* mobile hamburger */}
        <button
          className="nav-toggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          style={{
            display: 'none',
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{
            width: 18,
            height: 12,
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <span style={{ height: 1.5, background: 'var(--fg)' }} />
            <span style={{ height: 1.5, background: 'var(--fg)' }} />
            <span style={{ height: 1.5, background: 'var(--fg)' }} />
          </span>
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--bg)',
          padding: 'var(--space-4) 0',
        }} className="nav-mobile">
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { navigate(item.route); setOpen(false); }}
                className="ui"
                style={{
                  padding: '14px 0',
                  textAlign: 'left',
                  color: isCurrent(item.id) ? 'var(--fg)' : 'var(--fg-muted)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const { navigate } = useRouter();
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      marginTop: 'var(--space-10)',
      padding: 'var(--space-7) 0 var(--space-8)',
    }}>
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-5)',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}>
        <div className="ui-s dim" style={{ fontFamily: 'var(--font-mono)' }}>
          © 2026 Svetlin Galov · built with Claude Code
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-5)' }}>
          {[
            { label: 'Email', href: 'mailto:svetlingalov@gmail.com' },
            { label: 'GitHub', href: 'https://github.com/jicata' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/svetlin-galov/' },
          ].map(s => (
            <a key={s.label} href={s.href} className="ui-s mono" style={{ color: 'var(--fg-muted)', textDecoration: 'none' }}
               onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg)'; }}
               onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-muted)'; }}>
              {s.label} <span style={{ opacity: 0.6 }}>↗</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── Primitives ──────────────────────────────────────────────────────────────
function Label({ children, style }) {
  return <div className="label" style={style}>{children}</div>;
}

function Tag({ children }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.04em',
      color: 'var(--fg-muted)',
      background: 'var(--surface-1)',
      padding: '4px 8px',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-1)',
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

function TagRow({ tags }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {tags.map((t, i) => <Tag key={i}>{t}</Tag>)}
    </div>
  );
}

// Card with hover lift (no shadow, surface tint only)
function Card({ children, onClick, padding = 'var(--space-6)', radius = 'var(--radius-3)', as = 'div', style = {}, accent = false }) {
  const [hover, setHover] = useState(false);
  const interactive = !!onClick;
  const Comp = as;
  return (
    <Comp
      onClick={onClick}
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'link' : undefined}
      style={{
        background: hover ? 'var(--surface-2)' : 'var(--surface-1)',
        border: `1px solid ${hover ? 'var(--border-strong)' : 'var(--border)'}`,
        borderRadius: radius,
        padding,
        cursor: interactive ? 'pointer' : 'default',
        transition: 'background var(--duration) var(--ease), border-color var(--duration) var(--ease)',
        position: 'relative',
        ...style,
      }}
    >
      {children}
    </Comp>
  );
}

// Arrow affordance — character, not SVG
function Arrow({ size = 18, dim = false }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: size,
      color: dim ? 'var(--fg-dim)' : 'var(--accent)',
      lineHeight: 1,
      display: 'inline-block',
    }} aria-hidden>→</span>
  );
}

// Section wrapper with rhythm
function Section({ children, label, title, dek, gap = 'var(--space-7)', style = {} }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>
      {(label || title || dek) && (
        <header style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {label && <Label>{label}</Label>}
          {title && <h2 className="h1">{title}</h2>}
          {dek && <p className="body-l muted" style={{ maxWidth: 640 }}>{dek}</p>}
        </header>
      )}
      {children}
    </section>
  );
}

// Photo placeholder — sized box with initials
function PhotoPlaceholder({ size = 80, initials = 'SG' }) {
  return (
    <div
      role="img"
      aria-label="Photo placeholder"
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--fg-dim)',
        fontFamily: 'var(--font-mono)',
        fontSize: size * 0.22,
        letterSpacing: '0.02em',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* subtle scanline texture to hint terminal */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent 0, transparent 3px, oklch(0.30 0.012 250 / 0.4) 3px, oklch(0.30 0.012 250 / 0.4) 4px)',
        pointerEvents: 'none',
      }} />
      <span style={{ position: 'relative' }}>{initials}</span>
    </div>
  );
}

// Code block — file label strip + body
function CodeBlock({ filename, lang = 'ts', children }) {
  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-3)',
      overflow: 'hidden',
      margin: 'var(--space-5) 0',
    }}>
      {filename && (
        <div style={{
          padding: '8px 14px',
          background: 'var(--surface-2)',
          borderBottom: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--fg-dim)',
          textTransform: 'lowercase',
          letterSpacing: '0.02em',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <span>{filename}</span>
          <span style={{ opacity: 0.7 }}>{lang}</span>
        </div>
      )}
      <pre style={{
        margin: 0,
        padding: 'var(--space-5)',
        background: 'var(--surface-3)',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        lineHeight: 1.65,
        color: 'var(--fg)',
        overflowX: 'auto',
      }}><code>{children}</code></pre>
    </div>
  );
}

// External / internal link rendered as inline arrow link
function ArrowLink({ children, onClick, href, external = false, dim = false, size = 'ui' }) {
  const props = href
    ? { href, target: external ? '_blank' : undefined, rel: external ? 'noreferrer' : undefined }
    : { onClick, role: 'button', tabIndex: 0, onKeyDown: (e) => { if (e.key === 'Enter') onClick?.(); } };
  const Comp = href ? 'a' : 'span';
  return (
    <Comp
      {...props}
      className={size}
      style={{
        color: dim ? 'var(--fg-muted)' : 'var(--accent)',
        textDecoration: href && external ? 'underline' : 'none',
        textUnderlineOffset: '0.18em',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      {children}
      <span style={{ fontFamily: 'var(--font-mono)' }} aria-hidden>
        {external ? '↗' : '→'}
      </span>
    </Comp>
  );
}

// Main wrapper for pages
function Page({ children, key: k }) {
  return (
    <main id="main-content" className="route-fade" style={{
      minHeight: 'calc(100vh - 64px)',
      paddingTop: 'var(--space-8)',
    }}>
      {children}
    </main>
  );
}

Object.assign(window, {
  RouterProvider, useRouter, Navbar, Footer,
  Label, Tag, TagRow, Card, Arrow, Section, PhotoPlaceholder, CodeBlock, ArrowLink, Page,
  NAV_ITEMS,
});

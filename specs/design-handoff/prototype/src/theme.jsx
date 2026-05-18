// theme.jsx — design tokens, type scale, global styles.
// All tokens are CSS custom properties so Tweaks can override them at runtime.

const GlobalStyles = () => (
  <style>{`
    :root {
      /* color — dark, cool slate, near-black */
      --bg: oklch(0.16 0.012 250);
      --surface-1: oklch(0.20 0.012 250);
      --surface-2: oklch(0.235 0.012 250);
      --surface-3: oklch(0.27 0.012 250);
      --border: oklch(0.30 0.012 250);
      --border-strong: oklch(0.42 0.012 250);

      --fg: oklch(0.95 0.006 250);
      --fg-muted: oklch(0.72 0.006 250);
      --fg-dim: oklch(0.55 0.006 250);
      --fg-faint: oklch(0.42 0.012 250);

      /* accent — warm amber against cool slate */
      --accent: oklch(0.78 0.10 75);
      --accent-strong: oklch(0.85 0.12 75);
      --accent-fg: oklch(0.18 0.012 250);
      --focus: oklch(0.82 0.10 75);

      /* type */
      --font-display: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
      --font-body: 'Source Serif 4', Charter, 'Iowan Old Style', Georgia, serif;
      --font-mono: 'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace;

      /* spacing 4pt */
      --space-1: 4px;
      --space-2: 8px;
      --space-3: 12px;
      --space-4: 16px;
      --space-5: 24px;
      --space-6: 32px;
      --space-7: 48px;
      --space-8: 64px;
      --space-9: 96px;
      --space-10: 128px;

      /* radii */
      --radius-1: 2px;
      --radius-2: 6px;
      --radius-3: 10px;
      --radius-4: 14px;

      /* motion */
      --duration-fast: 120ms;
      --duration: 200ms;
      --duration-slow: 320ms;
      --ease: cubic-bezier(0.2, 0, 0, 1);

      /* containers */
      --container: 1120px;
      --prose: 720px;

      color-scheme: dark;
    }

    * { box-sizing: border-box; }

    html, body {
      margin: 0;
      padding: 0;
      background: var(--bg);
      color: var(--fg);
      font-family: var(--font-body);
      font-size: 16px;
      line-height: 1.625;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }

    body {
      min-height: 100vh;
    }

    ::selection { background: oklch(0.78 0.10 75 / 0.28); color: var(--fg); }

    /* headings — sans display */
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-display);
      font-weight: 600;
      letter-spacing: -0.01em;
      color: var(--fg);
      margin: 0;
      text-wrap: pretty;
    }

    p { margin: 0; text-wrap: pretty; }
    p + p { margin-top: 0.85em; }

    a {
      color: var(--accent);
      text-decoration: underline;
      text-underline-offset: 0.18em;
      text-decoration-thickness: 1px;
      transition: color var(--duration) var(--ease), text-decoration-thickness var(--duration) var(--ease);
    }
    a:hover { color: var(--accent-strong); text-decoration-thickness: 2px; }

    button {
      font-family: var(--font-display);
      font-size: 15px;
      cursor: pointer;
      background: none;
      border: none;
      color: inherit;
      padding: 0;
    }

    :focus { outline: none; }
    :focus-visible {
      outline: 2px solid var(--focus);
      outline-offset: 2px;
      border-radius: 2px;
    }

    code, pre { font-family: var(--font-mono); }

    img { max-width: 100%; display: block; }

    /* utility classes */
    .label {
      font-family: var(--font-mono);
      font-size: 11px;
      line-height: 14px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--fg-dim);
    }

    .mono { font-family: var(--font-mono); }
    .sans { font-family: var(--font-display); }
    .muted { color: var(--fg-muted); }
    .dim { color: var(--fg-dim); }
    .faint { color: var(--fg-faint); }

    .display-xl {
      font-family: var(--font-display);
      font-weight: 600;
      font-size: clamp(36px, 5vw, 56px);
      line-height: 1.08;
      letter-spacing: -0.02em;
      text-wrap: balance;
    }
    .display-l {
      font-family: var(--font-display);
      font-weight: 600;
      font-size: clamp(30px, 4vw, 44px);
      line-height: 1.15;
      letter-spacing: -0.018em;
      text-wrap: balance;
    }
    .h1 { font-family: var(--font-display); font-weight: 600; font-size: 28px; line-height: 1.25; letter-spacing: -0.012em; }
    .h2 { font-family: var(--font-display); font-weight: 600; font-size: 22px; line-height: 1.3; letter-spacing: -0.01em; }
    .h3 { font-family: var(--font-display); font-weight: 600; font-size: 17px; line-height: 1.4; }

    .body-l { font-family: var(--font-body); font-size: 18px; line-height: 1.65; }
    .body { font-family: var(--font-body); font-size: 16px; line-height: 1.6; }
    .body-s { font-family: var(--font-body); font-size: 14px; line-height: 1.55; }

    .ui { font-family: var(--font-display); font-size: 15px; line-height: 1.4; font-weight: 500; }
    .ui-s { font-family: var(--font-display); font-size: 13px; line-height: 1.4; font-weight: 500; }

    /* container */
    .container { max-width: var(--container); margin: 0 auto; padding: 0 var(--space-5); }
    @media (min-width: 640px) { .container { padding: 0 var(--space-7); } }
    @media (min-width: 1200px) { .container { padding: 0 var(--space-8); } }

    .prose { max-width: var(--prose); }

    /* skip link */
    .skip-link {
      position: absolute;
      left: -9999px;
      top: var(--space-3);
      background: var(--accent);
      color: var(--accent-fg);
      padding: 8px 12px;
      font-family: var(--font-mono);
      font-size: 12px;
      text-decoration: none;
      border-radius: var(--radius-2);
      z-index: 1000;
    }
    .skip-link:focus { left: var(--space-4); }

    /* reduce-motion safety net */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        transition-duration: 0.001ms !important;
      }
    }

    /* route crossfade */
    .route-fade {
      animation: routeIn var(--duration) var(--ease);
    }
    @keyframes routeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `}</style>
);

// Type pairing variants for Tweaks
const TypePairings = {
  'plex+source': {
    label: 'Plex Sans + Source Serif',
    display: "'IBM Plex Sans', system-ui, sans-serif",
    body: "'Source Serif 4', Charter, Georgia, serif",
    mono: "'IBM Plex Mono', ui-monospace, monospace",
  },
  'plex+plex': {
    label: 'Plex Sans + Plex Mono (terminal-leaning)',
    display: "'IBM Plex Sans', system-ui, sans-serif",
    body: "'IBM Plex Sans', system-ui, sans-serif",
    mono: "'IBM Plex Mono', ui-monospace, monospace",
  },
  'source+source': {
    label: 'Source Serif throughout',
    display: "'Source Serif 4', Charter, Georgia, serif",
    body: "'Source Serif 4', Charter, Georgia, serif",
    mono: "'IBM Plex Mono', ui-monospace, monospace",
  },
};

// Accent color variants for Tweaks
const Accents = {
  amber:   { label: 'Amber',   c: 'oklch(0.78 0.10 75)',  strong: 'oklch(0.85 0.12 75)' },
  teal:    { label: 'Teal',    c: 'oklch(0.78 0.10 195)', strong: 'oklch(0.85 0.11 195)' },
  green:   { label: 'Green',   c: 'oklch(0.78 0.10 145)', strong: 'oklch(0.85 0.11 145)' },
  oxblood: { label: 'Oxblood', c: 'oklch(0.62 0.14 25)',  strong: 'oklch(0.70 0.14 25)' },
  mono:    { label: 'None',    c: 'oklch(0.92 0.006 250)', strong: 'oklch(0.97 0.006 250)' },
};

function applyTweaks(t) {
  const root = document.documentElement;
  const pair = TypePairings[t.typePairing] || TypePairings['plex+source'];
  root.style.setProperty('--font-display', pair.display);
  root.style.setProperty('--font-body', pair.body);
  root.style.setProperty('--font-mono', pair.mono);

  const accent = Accents[t.accent] || Accents.amber;
  root.style.setProperty('--accent', accent.c);
  root.style.setProperty('--accent-strong', accent.strong);
  root.style.setProperty('--focus', accent.strong);

  if (t.mode === 'light') {
    root.style.setProperty('--bg', 'oklch(0.97 0.005 80)');
    root.style.setProperty('--surface-1', 'oklch(0.94 0.005 80)');
    root.style.setProperty('--surface-2', 'oklch(0.91 0.005 80)');
    root.style.setProperty('--surface-3', 'oklch(0.88 0.005 80)');
    root.style.setProperty('--border', 'oklch(0.85 0.005 80)');
    root.style.setProperty('--border-strong', 'oklch(0.72 0.005 80)');
    root.style.setProperty('--fg', 'oklch(0.20 0.012 250)');
    root.style.setProperty('--fg-muted', 'oklch(0.42 0.012 250)');
    root.style.setProperty('--fg-dim', 'oklch(0.55 0.012 250)');
    root.style.setProperty('--fg-faint', 'oklch(0.68 0.012 250)');
    root.style.setProperty('color-scheme', 'light');
  } else {
    root.style.setProperty('--bg', 'oklch(0.16 0.012 250)');
    root.style.setProperty('--surface-1', 'oklch(0.20 0.012 250)');
    root.style.setProperty('--surface-2', 'oklch(0.235 0.012 250)');
    root.style.setProperty('--surface-3', 'oklch(0.27 0.012 250)');
    root.style.setProperty('--border', 'oklch(0.30 0.012 250)');
    root.style.setProperty('--border-strong', 'oklch(0.42 0.012 250)');
    root.style.setProperty('--fg', 'oklch(0.95 0.006 250)');
    root.style.setProperty('--fg-muted', 'oklch(0.72 0.006 250)');
    root.style.setProperty('--fg-dim', 'oklch(0.55 0.006 250)');
    root.style.setProperty('--fg-faint', 'oklch(0.42 0.012 250)');
    root.style.setProperty('color-scheme', 'dark');
  }
}

Object.assign(window, { GlobalStyles, TypePairings, Accents, applyTweaks });

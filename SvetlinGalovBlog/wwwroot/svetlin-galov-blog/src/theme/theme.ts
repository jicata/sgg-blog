import { createTheme } from '@mui/material/styles';

export const CSS_VARS = {
  bg: 'var(--bg)',
  surface1: 'var(--surface-1)',
  surface2: 'var(--surface-2)',
  surface3: 'var(--surface-3)',
  border: 'var(--border)',
  borderStrong: 'var(--border-strong)',
  fg: 'var(--fg)',
  fgMuted: 'var(--fg-muted)',
  fgDim: 'var(--fg-dim)',
  fgFaint: 'var(--fg-faint)',
  accent: 'var(--accent)',
  accentStrong: 'var(--accent-strong)',
  accentFg: 'var(--accent-fg)',
} as const;

export const COLORS = {
  bg: '#1a1c24',
  surface1: '#20222b',
  fg: '#f1f2f5',
  fgMuted: '#9fa3b0',
  accent: '#c9a227',
  accentFg: '#1a1c24',
} as const;

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: COLORS.bg,
      paper: COLORS.surface1,
    },
    primary: {
      main: COLORS.accent,
      contrastText: COLORS.accentFg,
    },
    text: {
      primary: COLORS.fg,
      secondary: COLORS.fgMuted,
    },
    divider: '#30323d',
  },
  typography: {
    fontFamily: 'var(--font-body)',
    h1: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.25,
      letterSpacing: '-0.012em',
    },
    h2: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '1.375rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '1.0625rem',
      lineHeight: 1.4,
    },
    body1: {
      fontFamily: 'var(--font-body)',
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: 'var(--font-body)',
      fontSize: '0.875rem',
      lineHeight: 1.55,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        :root {
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
          --accent: oklch(0.78 0.10 75);
          --accent-strong: oklch(0.85 0.12 75);
          --accent-fg: oklch(0.18 0.012 250);
          --focus: oklch(0.82 0.10 75);
          --font-display: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          --font-body: 'Source Serif 4', Charter, 'Iowan Old Style', Georgia, serif;
          --font-mono: 'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace;
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
          --radius-1: 2px;
          --radius-2: 6px;
          --radius-3: 10px;
          --radius-4: 14px;
          --duration-fast: 120ms;
          --duration: 200ms;
          --duration-slow: 320ms;
          --ease: cubic-bezier(0.2, 0, 0, 1);
          --container: 1120px;
          --prose: 720px;
          color-scheme: dark;
        }
        *, *::before, *::after { box-sizing: border-box; }
        html, body {
          margin: 0; padding: 0;
          background: var(--bg);
          color: var(--fg);
          font-family: var(--font-body);
          font-size: 16px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        body { min-height: 100vh; }
        ::selection { background: oklch(0.78 0.10 75 / 0.28); color: var(--fg); }
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
        :focus { outline: none; }
        :focus-visible {
          outline: 2px solid var(--focus);
          outline-offset: 2px;
          border-radius: 2px;
        }
        code, pre { font-family: var(--font-mono); }
        img { max-width: 100%; display: block; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            transition-duration: 0.001ms !important;
          }
        }
      `,
    },
  },
});

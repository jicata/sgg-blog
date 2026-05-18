import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface ArrowLinkProps {
  children: ReactNode;
  href: string;
  external?: boolean;
  dim?: boolean;
}

const ArrowLink = ({ children, href, external = false, dim = false }: ArrowLinkProps) => (
  <Box
    component="a"
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noreferrer' : undefined}
    sx={{
      fontFamily: 'var(--font-display)',
      fontSize: '0.9375rem',
      fontWeight: 500,
      color: dim ? 'var(--fg-muted)' : 'var(--accent)',
      textDecoration: 'none',
      textUnderlineOffset: '0.15em',
      textDecorationThickness: '1px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'color var(--duration) var(--ease)',
      '&:hover': {
        color: dim ? 'var(--fg)' : 'var(--accent-strong)',
        textDecoration: 'underline',
        textDecorationThickness: '2px',
      },
    }}
  >
    {children}
    <Box
      component="span"
      aria-hidden
      sx={{ fontFamily: 'var(--font-mono)' }}
    >
      {external ? '↗' : '→'}
    </Box>
  </Box>
);

export default ArrowLink;

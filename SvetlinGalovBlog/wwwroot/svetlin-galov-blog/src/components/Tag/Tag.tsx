import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
}

const Tag = ({ children }: TagProps) => (
  <Box
    component="span"
    sx={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.6875rem',
      fontWeight: 500,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--fg-muted)',
      background: 'var(--surface-1)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-1)',
      px: '8px',
      py: '4px',
      whiteSpace: 'nowrap',
      display: 'inline-block',
    }}
  >
    {children}
  </Box>
);

export default Tag;

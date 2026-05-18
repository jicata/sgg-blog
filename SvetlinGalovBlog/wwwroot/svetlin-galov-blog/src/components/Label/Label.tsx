import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
  color?: string;
}

const Label = ({ children, color = 'var(--fg-dim)' }: LabelProps) => (
  <Box
    component="div"
    sx={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.6875rem',
      lineHeight: '14px',
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color,
    }}
  >
    {children}
  </Box>
);

export default Label;

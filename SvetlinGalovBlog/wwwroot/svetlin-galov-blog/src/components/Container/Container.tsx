import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => (
  <Box
    sx={{
      maxWidth: 'var(--container)',
      mx: 'auto',
      px: {
        xs: 'var(--space-5)',
        sm: 'var(--space-7)',
        xl: 'var(--space-8)',
      },
    }}
  >
    {children}
  </Box>
);

export default Container;

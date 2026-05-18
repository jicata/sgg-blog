import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import Label from '../Label/Label';

interface SectionProps {
  children: ReactNode;
  label?: string;
  title?: string;
  dek?: string;
  gap?: string;
}

const Section = ({ children, label, title, dek, gap = 'var(--space-7)' }: SectionProps) => (
  <Box
    component="section"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap,
    }}
  >
    {(label || title || dek) && (
      <Box
        component="header"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
        }}
      >
        {label && <Label>{label}</Label>}
        {title && (
          <Box component="h2" sx={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '2rem', lineHeight: 1.25, m: 0 }}>
            {title}
          </Box>
        )}
        {dek && (
          <Box component="p" sx={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', lineHeight: 1.65, color: 'var(--fg-muted)', maxWidth: 640, m: 0 }}>
            {dek}
          </Box>
        )}
      </Box>
    )}
    {children}
  </Box>
);

export default Section;

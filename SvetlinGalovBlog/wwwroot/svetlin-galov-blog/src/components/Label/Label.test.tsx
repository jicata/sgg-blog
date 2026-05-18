import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import Label from './Label';

describe('Label', () => {
  it('renders its text content', () => {
    render(
      <ThemeProvider theme={theme}>
        <Label>Featured work</Label>
      </ThemeProvider>
    );
    expect(screen.getByText('Featured work')).toBeInTheDocument();
  });

  it('renders with default dim color (no error)', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Label>Get in touch</Label>
      </ThemeProvider>
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('accepts optional color override without error', () => {
    render(
      <ThemeProvider theme={theme}>
        <Label color="var(--accent)">Case study</Label>
      </ThemeProvider>
    );
    expect(screen.getByText('Case study')).toBeInTheDocument();
  });
});

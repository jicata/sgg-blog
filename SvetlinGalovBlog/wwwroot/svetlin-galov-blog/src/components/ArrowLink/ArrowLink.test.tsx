import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import ArrowLink from './ArrowLink';

const wrap = (ui: React.ReactElement) =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </MemoryRouter>
  );

describe('ArrowLink', () => {
  it('renders children text', () => {
    wrap(<ArrowLink href="https://example.com" external>Read more</ArrowLink>);
    expect(screen.getByText('Read more')).toBeInTheDocument();
  });

  it('renders external arrow glyph for external links', () => {
    wrap(<ArrowLink href="https://example.com" external>Link</ArrowLink>);
    expect(screen.getByText('↗')).toBeInTheDocument();
  });

  it('renders internal arrow glyph for internal links', () => {
    wrap(<ArrowLink href="/projects">Projects</ArrowLink>);
    expect(screen.getByText('→')).toBeInTheDocument();
  });

  it('renders as anchor with correct href', () => {
    wrap(<ArrowLink href="https://github.com/jicata" external>GitHub</ArrowLink>);
    const link = screen.getByRole('link', { name: /GitHub/ });
    expect(link).toHaveAttribute('href', 'https://github.com/jicata');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('internal link does not open in new tab', () => {
    wrap(<ArrowLink href="/about">About</ArrowLink>);
    const link = screen.getByRole('link', { name: /About/ });
    expect(link).not.toHaveAttribute('target', '_blank');
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import Footer from './footer';

const renderFooter = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    </MemoryRouter>
  );

describe('Footer', () => {
  it('renders email link', () => {
    renderFooter();
    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:svetlingalov@gmail.com');
  });

  it('renders GitHub link', () => {
    renderFooter();
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/jicata');
  });

  it('renders LinkedIn link', () => {
    renderFooter();
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/svetlin-galov');
  });

  it('does NOT render "built with Claude Code"', () => {
    renderFooter();
    expect(screen.queryByText(/built with claude code/i)).toBeNull();
  });

  it('does NOT render "Support" or "Terms of Use" legacy links', () => {
    renderFooter();
    expect(screen.queryByText(/support/i)).toBeNull();
    expect(screen.queryByText(/terms of use/i)).toBeNull();
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import HomePage from './HomePage';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

const renderHome = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </ThemeProvider>
    </MemoryRouter>
  );

describe('HomePage', () => {
  // Brief item 1: name + positioning visible in first viewport
  it('shows Svetlin Galov name in the hero', () => {
    renderHome();
    expect(screen.getByText('Svetlin Galov')).toBeInTheDocument();
  });

  it('shows positioning dek in hero', () => {
    renderHome();
    expect(screen.getByText(/backend tech lead/i)).toBeInTheDocument();
  });

  it('does NOT show the "available for senior backend roles" badge (removed per PRD)', () => {
    renderHome();
    expect(screen.queryByText(/available for senior backend roles/i)).toBeNull();
  });

  // Brief item 2 + 3: slot-4 card and job cards present and clickable
  it('shows slot-4 case study card with clickable button', () => {
    renderHome();
    const caseStudyCard = screen.getByRole('button', { name: /this site, agent-augmented/i });
    expect(caseStudyCard).toBeInTheDocument();
  });

  it('shows VSG Bulgaria card as clickable button', () => {
    renderHome();
    const vsgCard = screen.getByRole('button', { name: /VSG Bulgaria/i });
    expect(vsgCard).toBeInTheDocument();
  });

  it('shows Dow Jones card as clickable button', () => {
    renderHome();
    const djCard = screen.getByRole('button', { name: /Dow Jones/i });
    expect(djCard).toBeInTheDocument();
  });

  // Brief item 5: contact links
  it('shows email contact link', () => {
    renderHome();
    const emailLink = screen.getByRole('link', { name: /svetlingalov@gmail.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:svetlingalov@gmail.com');
  });

  it('shows GitHub link', () => {
    renderHome();
    const ghLink = screen.getByRole('link', { name: /github/i });
    expect(ghLink).toHaveAttribute('href', 'https://github.com/jicata');
    expect(ghLink).toHaveAttribute('target', '_blank');
  });

  it('shows LinkedIn link', () => {
    renderHome();
    const liLink = screen.getByRole('link', { name: /linkedin/i });
    expect(liLink).toHaveAttribute('href', 'https://www.linkedin.com/in/svetlin-galov/');
    expect(liLink).toHaveAttribute('target', '_blank');
  });

  // Writing section must be absent (no articles in this PRD)
  it('does NOT show a Writing section', () => {
    renderHome();
    expect(screen.queryByText(/^writing$/i)).toBeNull();
  });

  // Photo placeholder present
  it('shows photo placeholder with SG initials', () => {
    renderHome();
    expect(screen.getByRole('img', { name: /photo placeholder/i })).toBeInTheDocument();
    expect(screen.getByText('SG')).toBeInTheDocument();
  });

  // Featured work section label
  it('shows "Featured work" section label', () => {
    renderHome();
    expect(screen.getByText(/featured work/i)).toBeInTheDocument();
  });

  // Contact strip label
  it('shows "Get in touch" strip label', () => {
    renderHome();
    expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import AboutPage from './AboutPage';

const renderAbout = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <AboutPage />
      </ThemeProvider>
    </MemoryRouter>
  );

describe('AboutPage', () => {
  // AC: name visible
  it('shows Svetlin Galov name in the hero', () => {
    renderAbout();
    expect(screen.getByRole('heading', { level: 1, name: /svetlin galov/i })).toBeInTheDocument();
  });

  // AC: 3 story paragraphs in prose region (no h2 subheadings)
  it('renders 3 story paragraphs in the prose region', () => {
    renderAbout();
    const proseRegion = screen.getByRole('region', { name: /story/i });
    const paragraphs = within(proseRegion).getAllByRole('paragraph');
    expect(paragraphs).toHaveLength(3);
  });

  it('has no h2 elements inside the story region', () => {
    renderAbout();
    const proseRegion = screen.getByRole('region', { name: /story/i });
    const h2s = within(proseRegion).queryAllByRole('heading', { level: 2 });
    expect(h2s).toHaveLength(0);
  });

  // AC: tag-row chips render
  it('renders capability chips in the tag-row', () => {
    renderAbout();
    expect(screen.getByText('C#')).toBeInTheDocument();
    expect(screen.getByText('.NET')).toBeInTheDocument();
    expect(screen.getByText('distributed systems')).toBeInTheDocument();
    expect(screen.getByText('agentic engineering')).toBeInTheDocument();
    expect(screen.getByText('Claude Code')).toBeInTheDocument();
    expect(screen.getByText('MCP')).toBeInTheDocument();
  });

  // AC: email link has mailto: href
  it('has an email link with mailto: href', () => {
    renderAbout();
    const emailLink = screen.getByRole('link', { name: /svetlingalov@gmail.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:svetlingalov@gmail.com');
  });

  // AC: GitHub and LinkedIn links present
  it('has a GitHub link', () => {
    renderAbout();
    const ghLink = screen.getByRole('link', { name: /github/i });
    expect(ghLink).toHaveAttribute('href', 'https://github.com/jicata');
    expect(ghLink).toHaveAttribute('target', '_blank');
  });

  it('has a LinkedIn link', () => {
    renderAbout();
    const liLink = screen.getByRole('link', { name: /linkedin/i });
    expect(liLink).toHaveAttribute('href', 'https://www.linkedin.com/in/svetlin-galov/');
    expect(liLink).toHaveAttribute('target', '_blank');
  });

  // AC: photo placeholder at size 120
  it('shows a photo placeholder', () => {
    renderAbout();
    expect(screen.getByRole('img', { name: /photo placeholder/i })).toBeInTheDocument();
  });

  // AC: no h2 elements anywhere on the page (story region check covers the critical case above)
  it('shows "What I work on" section label', () => {
    renderAbout();
    expect(screen.getByText(/what i work on/i)).toBeInTheDocument();
  });

  it('shows "Get in touch" section', () => {
    renderAbout();
    expect(screen.getByRole('region', { name: /get in touch/i })).toBeInTheDocument();
  });
});

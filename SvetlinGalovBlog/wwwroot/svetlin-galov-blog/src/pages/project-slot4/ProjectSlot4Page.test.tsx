import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import ProjectSlot4Page from './ProjectSlot4Page';

const renderPage = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <ProjectSlot4Page />
      </ThemeProvider>
    </MemoryRouter>
  );

describe('ProjectSlot4Page', () => {
  it('renders the CASE STUDY eyebrow label', () => {
    renderPage();
    expect(
      screen.getByText(/case study/i)
    ).toBeInTheDocument();
  });

  it('renders the display-l title', () => {
    renderPage();
    expect(
      screen.getByRole('heading', { level: 1 })
    ).toHaveTextContent(/this site, agent-augmented/i);
  });

  it('renders at least 3 CodeBlock filenames', () => {
    renderPage();
    const strips = screen.getAllByTestId('codeblock-strip');
    expect(strips.length).toBeGreaterThanOrEqual(3);
  });

  it('renders the NextProject card linking to /projects', () => {
    renderPage();
    const nextLink = screen.getByRole('link', { name: /next project/i });
    expect(nextLink).toBeInTheDocument();
    expect(nextLink).toHaveAttribute('href', '/projects');
  });

  it('renders the "What this is not" pull-quote section', () => {
    renderPage();
    expect(screen.getByText(/what this is not/i)).toBeInTheDocument();
  });

  it('sets page title via usePageMeta', () => {
    renderPage();
    expect(document.title).toBe('This site, agent-augmented — case study — Svetlin Galov');
  });
});

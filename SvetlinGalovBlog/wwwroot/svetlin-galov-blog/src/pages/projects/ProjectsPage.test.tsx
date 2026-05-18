import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import ProjectsPage from './ProjectsPage';

vi.mock('../../services/projectsApi', () => ({
  getProjects: vi.fn().mockResolvedValue([
    {
      slug: 'vsg',
      title: 'VSG Bulgaria',
      role: 'Tech Lead',
      dates: '2024 — present',
      summary: 'Leading backend architecture and the agentic-development shift.',
      tags: ['.NET', 'DDD', 'agentic'],
      order: 1,
    },
    {
      slug: 'dowjones',
      title: 'Dow Jones',
      role: 'Senior Software Engineer',
      dates: '2020 — 2024',
      summary: 'Internal-platform work at scaled-org size.',
      tags: ['C#', 'distributed', 'scale'],
      order: 2,
    },
    {
      slug: 'softuni',
      title: 'SoftUni',
      role: 'Backend Developer + Teacher',
      dates: '2016 — 2020',
      summary: 'Half engineering, half teaching.',
      tags: ['teaching', 'C#', 'curriculum'],
      order: 3,
    },
  ]),
  projectsQueryKeys: {
    list: () => ['projects', 'list'],
    detail: (slug: string) => ['projects', 'detail', slug],
  },
}));

const makeQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

const renderProjects = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={makeQueryClient()}>
          <ProjectsPage />
        </QueryClientProvider>
      </ThemeProvider>
    </MemoryRouter>
  );

describe('ProjectsPage', () => {
  it('renders the page main element', () => {
    renderProjects();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('calls usePageMeta with the correct title', () => {
    renderProjects();
    expect(document.title).toBe('Projects — Svetlin Galov');
  });

  it('shows FEATURED tier label', () => {
    renderProjects();
    expect(screen.getByText(/featured/i)).toBeInTheDocument();
  });

  it('shows CAREER tier label', () => {
    renderProjects();
    const matches = screen.getAllByText(/career/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('shows SHIPPING NEXT tier label', () => {
    renderProjects();
    const matches = screen.getAllByText(/shipping next/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('renders slot-4 featured card linking to /projects/this-site-agent-augmented', () => {
    renderProjects();
    const slot4Link = screen.getByRole('link', { name: /this site, agent-augmented/i });
    expect(slot4Link).toBeInTheDocument();
    expect(slot4Link).toHaveAttribute('href', '/projects/this-site-agent-augmented');
  });

  it('renders all 3 career cards after data loads', async () => {
    renderProjects();
    expect(await screen.findByRole('link', { name: /VSG Bulgaria/i })).toBeInTheDocument();
    expect(await screen.findByRole('link', { name: /Dow Jones/i })).toBeInTheDocument();
    expect(await screen.findByRole('link', { name: /SoftUni/i })).toBeInTheDocument();
  });

  it('career cards are in correct order (VSG first, Dow Jones second, SoftUni third)', async () => {
    renderProjects();
    const vsgCard = await screen.findByRole('link', { name: /VSG Bulgaria/i });
    const djCard = await screen.findByRole('link', { name: /Dow Jones/i });
    const suCard = await screen.findByRole('link', { name: /SoftUni/i });

    const all = screen.getAllByRole('link');
    const vsgIdx = all.indexOf(vsgCard);
    const djIdx = all.indexOf(djCard);
    const suIdx = all.indexOf(suCard);

    expect(vsgIdx).toBeLessThan(djIdx);
    expect(djIdx).toBeLessThan(suIdx);
  });

  it('renders Shipping Next list with Claude Code skill library entry', () => {
    renderProjects();
    expect(screen.getByText(/Claude Code skill library/i)).toBeInTheDocument();
  });

  it('renders Shipping Next list with Brochures entry', () => {
    renderProjects();
    expect(screen.getByText(/Brochures/i)).toBeInTheDocument();
  });

  it('Shipping Next entries are not links (non-interactive)', () => {
    renderProjects();
    const skillLibEntry = screen.getByText(/Claude Code skill library/i);
    expect(skillLibEntry.closest('a')).toBeNull();
  });
});

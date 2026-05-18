import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../../theme/theme';
import ProjectDetails from './ProjectDetails';

// Mock the MDX content registry with simple inline content per slug
vi.mock('../../../content/projects', () => {
  const VsgContent = () => (
    <div>
      <h2>What I did</h2>
      <p>Led backend architecture at VSG Bulgaria.</p>
      <h2>What I learned</h2>
      <p>Operating inside large-scale product ecosystems.</p>
    </div>
  );
  const DowjonesContent = () => (
    <div>
      <h2>What I did</h2>
      <p>Built internal platforms at Dow Jones.</p>
      <h2>What I learned</h2>
      <p>Distributed systems at scaled-org size.</p>
    </div>
  );
  const SoftuniContent = () => (
    <div>
      <h2>What I did</h2>
      <p>Taught backend development at SoftUni.</p>
      <h2>What I learned</h2>
      <p>The discipline of explaining backend to learners.</p>
    </div>
  );

  const registry: Record<string, React.ComponentType> = {
    vsg: VsgContent,
    dowjones: DowjonesContent,
    softuni: SoftuniContent,
  };
  return { default: registry };
});

// Mock the projects API (new src/services/projectsApi.ts)
vi.mock('../../../services/projectsApi', () => ({
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
  getProjectBySlug: vi.fn().mockImplementation((slug: string) => {
    const projects: Record<string, object> = {
      vsg: { slug: 'vsg', title: 'VSG Bulgaria', role: 'Tech Lead', dates: '2024 — present', summary: 'Leading backend architecture.', tags: ['.NET'], order: 1 },
      dowjones: { slug: 'dowjones', title: 'Dow Jones', role: 'Senior Software Engineer', dates: '2020 — 2024', summary: 'Internal-platform work.', tags: ['C#'], order: 2 },
      softuni: { slug: 'softuni', title: 'SoftUni', role: 'Backend Developer + Teacher', dates: '2016 — 2020', summary: 'Half engineering, half teaching.', tags: ['teaching'], order: 3 },
    };
    return Promise.resolve(projects[slug]);
  }),
  projectsQueryKeys: {
    list: () => ['projects', 'list'],
    detail: (slug: string) => ['projects', 'detail', slug],
  },
}));

const makeQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

const renderProjectDetails = (slug: string) =>
  render(
    <MemoryRouter initialEntries={[`/projects/${slug}`]}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={makeQueryClient()}>
          <Routes>
            <Route path="/projects/:name" element={<ProjectDetails />} />
          </Routes>
        </QueryClientProvider>
      </ThemeProvider>
    </MemoryRouter>
  );

describe('ProjectDetails — VSG', () => {
  it('renders the project title', async () => {
    renderProjectDetails('vsg');
    expect(await screen.findByText('VSG Bulgaria')).toBeInTheDocument();
  });

  it('renders "What I did" section heading', async () => {
    renderProjectDetails('vsg');
    expect(await screen.findByRole('heading', { name: /what i did/i })).toBeInTheDocument();
  });

  it('renders "What I learned" section heading', async () => {
    renderProjectDetails('vsg');
    expect(await screen.findByRole('heading', { name: /what i learned/i })).toBeInTheDocument();
  });

  it('renders NextProject link pointing to Dow Jones', async () => {
    renderProjectDetails('vsg');
    const nextLink = await screen.findByRole('link', { name: /dow jones/i });
    expect(nextLink).toHaveAttribute('href', '/projects/dowjones');
  });

  it('sets page title via usePageMeta', async () => {
    renderProjectDetails('vsg');
    await screen.findByText('VSG Bulgaria');
    expect(document.title).toContain('VSG Bulgaria');
  });
});

describe('ProjectDetails — Dow Jones', () => {
  it('renders the project title', async () => {
    renderProjectDetails('dowjones');
    expect(await screen.findByText('Dow Jones')).toBeInTheDocument();
  });

  it('renders "What I did" section heading', async () => {
    renderProjectDetails('dowjones');
    expect(await screen.findByRole('heading', { name: /what i did/i })).toBeInTheDocument();
  });

  it('renders "What I learned" section heading', async () => {
    renderProjectDetails('dowjones');
    expect(await screen.findByRole('heading', { name: /what i learned/i })).toBeInTheDocument();
  });

  it('renders NextProject link pointing to SoftUni', async () => {
    renderProjectDetails('dowjones');
    const nextLink = await screen.findByRole('link', { name: /softuni/i });
    expect(nextLink).toHaveAttribute('href', '/projects/softuni');
  });
});

describe('ProjectDetails — SoftUni', () => {
  it('renders the project title', async () => {
    renderProjectDetails('softuni');
    expect(await screen.findByText('SoftUni')).toBeInTheDocument();
  });

  it('renders "What I did" section heading', async () => {
    renderProjectDetails('softuni');
    expect(await screen.findByRole('heading', { name: /what i did/i })).toBeInTheDocument();
  });

  it('renders "What I learned" section heading', async () => {
    renderProjectDetails('softuni');
    expect(await screen.findByRole('heading', { name: /what i learned/i })).toBeInTheDocument();
  });

  it('renders NextProject link pointing to VSG (loops back)', async () => {
    renderProjectDetails('softuni');
    const nextLink = await screen.findByRole('link', { name: /vsg bulgaria/i });
    expect(nextLink).toHaveAttribute('href', '/projects/vsg');
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ProjectFrontmatter } from '../types/project';

const FIXTURE_PROJECTS: ProjectFrontmatter[] = [
  {
    slug: 'vsg',
    title: 'VSG Bulgaria',
    role: 'Tech Lead',
    dates: '2024 — present',
    summary: 'Leading backend architecture.',
    tags: ['.NET', 'DDD', 'agentic'],
    order: 1,
  },
  {
    slug: 'dowjones',
    title: 'Dow Jones',
    role: 'Senior Software Engineer',
    dates: '2020 — 2024',
    summary: 'Internal platform work.',
    tags: ['C#', 'distributed'],
    order: 2,
  },
  {
    slug: 'softuni',
    title: 'SoftUni',
    role: 'Backend Developer + Teacher',
    dates: '2016 — 2020',
    summary: 'Engineering and teaching.',
    tags: ['teaching', 'C#'],
    order: 3,
  },
];

vi.mock('../content/projects/index', () => ({
  projectFrontmatterRegistry: FIXTURE_PROJECTS,
  default: {},
}));

describe('projectsQueryKeys', () => {
  it('list() returns ["projects", "list"]', async () => {
    const { projectsQueryKeys } = await import('./projectsApi');
    expect(projectsQueryKeys.list()).toEqual(['projects', 'list']);
  });

  it('detail(slug) returns ["projects", "detail", slug]', async () => {
    const { projectsQueryKeys } = await import('./projectsApi');
    expect(projectsQueryKeys.detail('vsg')).toEqual(['projects', 'detail', 'vsg']);
  });
});

describe('getProjects', () => {
  it('returns an array of project entries', async () => {
    const { getProjects } = await import('./projectsApi');
    const projects = await getProjects();
    expect(Array.isArray(projects)).toBe(true);
  });

  it('returns 3 entries (vsg, dowjones, softuni)', async () => {
    const { getProjects } = await import('./projectsApi');
    const projects = await getProjects();
    expect(projects).toHaveLength(3);
  });

  it('each entry has required frontmatter fields', async () => {
    const { getProjects } = await import('./projectsApi');
    const projects = await getProjects();
    for (const p of projects) {
      expect(p).toHaveProperty('slug');
      expect(p).toHaveProperty('title');
      expect(p).toHaveProperty('role');
      expect(p).toHaveProperty('dates');
      expect(p).toHaveProperty('summary');
      expect(p).toHaveProperty('tags');
      expect(p).toHaveProperty('order');
      expect(Array.isArray(p.tags)).toBe(true);
      expect(typeof p.order).toBe('number');
    }
  });

  it('entries are sorted by order ascending', async () => {
    const { getProjects } = await import('./projectsApi');
    const projects = await getProjects();
    const orders = projects.map((p) => p.order);
    const sorted = [...orders].sort((a, b) => a - b);
    expect(orders).toEqual(sorted);
  });

  it('vsg entry has order 1', async () => {
    const { getProjects } = await import('./projectsApi');
    const projects = await getProjects();
    const vsg = projects.find((p) => p.slug === 'vsg');
    expect(vsg).toBeDefined();
    expect(vsg!.order).toBe(1);
  });

  it('dowjones entry has order 2', async () => {
    const { getProjects } = await import('./projectsApi');
    const projects = await getProjects();
    const dj = projects.find((p) => p.slug === 'dowjones');
    expect(dj).toBeDefined();
    expect(dj!.order).toBe(2);
  });

  it('softuni entry has order 3', async () => {
    const { getProjects } = await import('./projectsApi');
    const projects = await getProjects();
    const su = projects.find((p) => p.slug === 'softuni');
    expect(su).toBeDefined();
    expect(su!.order).toBe(3);
  });
});

describe('getProjects sort behaviour', () => {
  it('sorts by order even when fixture is provided in reverse order', async () => {
    const { projectFrontmatterRegistry } = await import('../content/projects/index');
    const reversed = [...FIXTURE_PROJECTS].reverse();
    (projectFrontmatterRegistry as ProjectFrontmatter[]).splice(
      0,
      projectFrontmatterRegistry.length,
      ...reversed,
    );

    const { getProjects } = await import('./projectsApi');
    const projects = await getProjects();
    const orders = projects.map((p) => p.order);
    const sorted = [...orders].sort((a, b) => a - b);
    expect(orders).toEqual(sorted);

    (projectFrontmatterRegistry as ProjectFrontmatter[]).splice(
      0,
      projectFrontmatterRegistry.length,
      ...FIXTURE_PROJECTS,
    );
  });
});

import type { ProjectFrontmatter } from '../types/project';
import { projectFrontmatterRegistry } from '../content/projects/index';

export const projectsQueryKeys = {
  list: (): readonly ['projects', 'list'] => ['projects', 'list'],
  detail: (slug: string): readonly ['projects', 'detail', string] => [
    'projects',
    'detail',
    slug,
  ],
};

export async function getProjects(): Promise<ProjectFrontmatter[]> {
  return [...projectFrontmatterRegistry].sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<ProjectFrontmatter> {
  const found = projectFrontmatterRegistry.find((p) => p.slug === slug);
  if (!found) {
    throw new Error(`Project with slug "${slug}" not found`);
  }
  return found;
}

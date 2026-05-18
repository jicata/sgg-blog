import React, { ComponentType } from 'react';
import type { ProjectFrontmatter } from '../../types/project';

export interface MdxProjectModule {
  default: ComponentType;
  frontmatter?: ProjectFrontmatter;
}

const eagerModules = import.meta.glob<MdxProjectModule>('./*.mdx', { eager: true });

const projectContentRegistry: Record<string, React.LazyExoticComponent<ComponentType>> = {};
const projectFrontmatterRegistry: ProjectFrontmatter[] = [];

for (const [path, mod] of Object.entries(eagerModules)) {
  const slug = path.replace('./', '').replace('.mdx', '');
  projectContentRegistry[slug] = React.lazy(() => Promise.resolve(mod));
  if (mod.frontmatter) {
    projectFrontmatterRegistry.push(mod.frontmatter);
  }
}

export default projectContentRegistry;
export { projectFrontmatterRegistry };

// content/projects/index.ts
import React, { ComponentType } from 'react';

const mdxModules = import.meta.glob<{ default: ComponentType }>('./*.mdx');

const projectContentRegistry: Record<string, React.LazyExoticComponent<ComponentType>> = {};

for (const [path, loader] of Object.entries(mdxModules)) {
    const slug = path.replace('./', '').replace('.mdx', '');
    projectContentRegistry[slug] = React.lazy(loader);
}

export default projectContentRegistry;
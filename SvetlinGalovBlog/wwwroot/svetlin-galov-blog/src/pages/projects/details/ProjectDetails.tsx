import { Box } from '@mui/material';
import { MDXProvider } from "@mdx-js/react";
import { useParams } from "react-router-dom";
import React, { ComponentType, Suspense } from "react";
import StatCard from "./mdx-components/stat-card/StatCard.tsx";
import TextCard from "./mdx-components/text-card/TextCard.tsx";
import BeforeAfterCard from "./mdx-components/before-after-card/BeforeAfterCard.tsx";
import Cluster from "../shared/components/cluster/Cluster.tsx";
import UnorderedList from "./mdx-components/unordered-list/UnorderedList.tsx";
import Section from "../shared/components/section/Section.tsx";
import NextProject from "./next-project/NextProject.tsx";
import { useQuery } from "@tanstack/react-query";
import { getProjects, getProjectBySlug, projectsQueryKeys } from "../../../services/projectsApi.ts";
import { usePageMeta } from "../../../hooks/usePageMeta.ts";
import projectContentRegistry from "../../../content/projects";

const mdxComponents = {
    StatCard,
    Cluster,
    TextCard,
    BeforeAfterCard,
    UnorderedList,
    Section,
}

const ProjectDetails = () => {
    const { name } = useParams<{ name: string }>();

    const { data: projects } = useQuery({
        queryKey: projectsQueryKeys.list(),
        queryFn: getProjects,
    });

    const { data: currentProject } = useQuery({
        queryKey: projectsQueryKeys.detail(name ?? ''),
        queryFn: () => getProjectBySlug(name ?? ''),
        enabled: !!name,
    });

    usePageMeta({
        title: currentProject
            ? `${currentProject.title} — ${currentProject.role} — Svetlin Galov`
            : 'Project — Svetlin Galov',
    });

    if (!projects || !name) return null;

    const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
    const currentIndex = sortedProjects.findIndex(p => p.slug === name);

    if (currentIndex === -1) return null;

    const nextProject = sortedProjects[(currentIndex + 1) % sortedProjects.length];

    const Content = projectContentRegistry[name] as ComponentType | undefined;

    if (!Content) return null;

    return (
        <Box
            component="main"
            sx={{
                maxWidth: 'var(--prose)',
                marginInline: 'auto',
                paddingInline: { xs: 'var(--space-5)', md: 'var(--space-7)' },
                paddingBottom: 'var(--space-9)',
            }}
        >
            {currentProject && (
                <Box
                    component="header"
                    sx={{
                        paddingTop: 'var(--space-7)',
                        paddingBottom: 'var(--space-7)',
                        borderBottom: '1px solid var(--border)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-2)',
                        marginBottom: 'var(--space-7)',
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.6875rem',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            color: 'var(--fg-dim)',
                        }}
                    >
                        {currentProject.dates}
                    </Box>
                    <Box
                        component="h1"
                        sx={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600,
                            fontSize: { xs: '2rem', md: '2.75rem' },
                            lineHeight: 1.2,
                            letterSpacing: '-0.012em',
                            color: 'var(--fg)',
                            margin: 0,
                        }}
                    >
                        {currentProject.title}
                    </Box>
                    <Box
                        component="span"
                        sx={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 500,
                            fontSize: '0.9375rem',
                            color: 'var(--fg-muted)',
                        }}
                    >
                        {currentProject.role}
                    </Box>
                </Box>
            )}

            <MDXProvider components={mdxComponents}>
                <Suspense fallback={<p>Loading...</p>}>
                    <Content />
                </Suspense>
            </MDXProvider>

            <NextProject projectName={nextProject.title} projectSlug={nextProject.slug} />
        </Box>
    );
}

export default ProjectDetails;

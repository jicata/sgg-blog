import MaxWidthWrapper from "../../../components/MaxWidthWrapper/max-width-wrapper.tsx";
import './ProjectDetails.module.css';
import {MDXProvider} from "@mdx-js/react";
import {useParams} from "react-router-dom";
import React, {ComponentType, Suspense} from "react";
import StatCard from "./mdx-components/stat-card/StatCard.tsx";
import TextCard from "./mdx-components/text-card/TextCard.tsx";
import BeforeAfterCard from "./mdx-components/before-after-card/BeforeAfterCard.tsx";
import Cluster from "../shared/components/cluster/Cluster.tsx";
import UnorderedList from "./mdx-components/unordered-list/UnorderedList.tsx";
import Section from "../shared/components/section/Section.tsx";
import NextProject from "./next-project/NextProject.tsx";
import {useProjectsShort} from "../shared/hooks/useProjects.ts";
import projectContentRegistry from "../../../content/projects";


const mdxComponents  = {
    StatCard,
    Cluster,
    TextCard,
    BeforeAfterCard,
    UnorderedList,
    Section,
}

const ProjectDetails = () => {
    const {name} = useParams();

    const {data:projects, isLoading, isError} = useProjectsShort();

    if(!projects) return null;

    const currentProject = projects.find(p => p.slug === name);

    if (!currentProject) return null;

    const Content = projectContentRegistry[name ?? ''];

    if(!Content) return null;
    
    const indexOfCurrentProject = projects.indexOf(currentProject);
    const indexOfNextProject = (indexOfCurrentProject + 1) % projects.length;
    const nextProject = projects[indexOfNextProject];
    
    return (
        <MaxWidthWrapper as={"main"} className={"project-details-wrapper"}
        maxWidth={"var(--max-article-width)"}>
            <article className={"project-details"}>
                
                <MDXProvider components={mdxComponents}>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Content />
                    </Suspense>
                </MDXProvider>

                <NextProject projectName={nextProject.title} projectSlug={nextProject.slug} />
            </article>
        </MaxWidthWrapper>
    )
}

export default ProjectDetails;
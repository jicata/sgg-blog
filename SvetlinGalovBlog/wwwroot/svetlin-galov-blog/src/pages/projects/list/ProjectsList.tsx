import MaxWidthWrapper from "../../../components/MaxWidthWrapper/max-width-wrapper"
import './ProjectsList.css'
import {useProjects} from "../shared/hooks/useProjects.ts";
import ProjectCard from "./project/ProjectCard.tsx";
import {Suspense} from "react";

const Projects = () => {
    
    const { data, isLoading, isError} = useProjects();

    return (
        <MaxWidthWrapper as={"main"} className={"projects-list-wrapper"}>
            <h1 className={"projects-list__title"}>Professional Work</h1>
            <Suspense>
                <div className="projects-list">
                    {data?.map((proj, index) => <ProjectCard project={proj} key={index}/>)}
                </div>
            </Suspense>
        </MaxWidthWrapper>
)
}

export default Projects
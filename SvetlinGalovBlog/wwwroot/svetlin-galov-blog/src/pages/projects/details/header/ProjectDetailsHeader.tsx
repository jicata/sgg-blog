import {useParams} from "react-router-dom";
import ProjectInfo from "./project-info/ProjectInfo.tsx";
import {useProjectBySlug, useProjects} from "../../shared/hooks/useProjects.ts";

const ProjectDetailsHeader = () => {
    const {name} = useParams();
    
    if(!name) return null;
    
    const {data: project} = useProjectBySlug(name);
    console.log(project);

    if (!project) return null;

    return (
        <header className={"project-details-header"}>
            <img className={"project-details-header__image"} src={project?.imgSrc}/>
            <ProjectInfo {...project} />
        </header>
    )
}

export default ProjectDetailsHeader
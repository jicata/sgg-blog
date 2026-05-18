import './ProjectCard.css';
import Achievements from "./achievements/Achievements.tsx";
import Tags from "../../shared/components/tags/Tags.tsx";
import ShortInfo from "./short-info/ShortInfo.tsx";
import type {Project} from "../../shared/types/project.ts";
import {Link} from "react-router-dom";

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({project}: ProjectCardProps) => {
    const {
        name,
        position,
        country,
        impact,
        when,
        overview,
        achievements,
        tags,
        imgSrc,
        slug
    } = project;
    return (
        <Link className="project-details-url" to={`${slug}`}>
            <div className="project">
                <img className="project__img" src={imgSrc}/>
                <div className="project__details">
                    <ShortInfo country={country} impact={impact} when={when}/>
                    <h2 className="project__title"><span>{name}</span> – <span>{position}</span></h2>
                    <p className="project__overview">{overview}</p>
                    <Achievements items={achievements}/>
                    <Tags items={tags}/>
                </div>
            </div>
        </Link>
    );
}

export default ProjectCard;

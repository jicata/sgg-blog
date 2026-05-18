import {Link} from "react-router-dom";
import './NextProject.css'

interface NextProjectProps{
    projectName: string;
    projectSlug: string;
}

const NextProject = ({projectName, projectSlug} : NextProjectProps) => {
    return (
        <div className="next-project">
            <span className="next-project__next-project">Next project</span>
            <h3 className="next-project__heading">{projectName}</h3>
            <Link className="next-project__url" to={`/projects/${projectSlug}`}>View Project <span className="url-arrow">→</span></Link>
        </div>
    )
}

export default NextProject;
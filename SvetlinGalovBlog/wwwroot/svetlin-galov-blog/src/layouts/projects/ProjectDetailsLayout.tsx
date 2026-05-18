import { Outlet } from "react-router-dom";
import ProjectDetailsHeader from "../../pages/projects/details/header/ProjectDetailsHeader.tsx";

const ProjectDetailsLayout = () => {
    return (
        <div className={"project-details-layout"}>
            <ProjectDetailsHeader />
            <div className={"project-details__outlet-wrapper"}>
                <Outlet />
            </div>
        </div>
    );
};

export default ProjectDetailsLayout;
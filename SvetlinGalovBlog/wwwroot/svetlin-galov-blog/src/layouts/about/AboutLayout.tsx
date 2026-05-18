import { Outlet } from "react-router-dom";
import AboutHeader from "../../pages/about/header/AboutHeader.tsx";

const Layout = () => {
    return (
        <div className={"about-layout"}>
            <AboutHeader />
            <div className={"about__outlet-wrapper"}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
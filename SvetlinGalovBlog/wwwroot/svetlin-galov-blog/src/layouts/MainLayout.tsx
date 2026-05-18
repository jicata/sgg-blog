import MainHeader from "../components/header/MainHeader.tsx";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <MainHeader />
            <Outlet />
        </div>
    );
};

export default MainLayout;
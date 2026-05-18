import Footer from "../components/footer/footer.tsx";
import {Outlet, ScrollRestoration} from "react-router-dom";
import './BaseLayout.css';
import Navbar from "../components/navbar/Navbar.tsx";


const BaseLayout = () => {
    return (
        <div className={"base-layout"}>
            <Navbar />
            <div className={"base-layout__outlet-wrapper"}>
                <Outlet />
            </div>
            <Footer />
            <ScrollRestoration />
        </div>
    );
};

export default BaseLayout;
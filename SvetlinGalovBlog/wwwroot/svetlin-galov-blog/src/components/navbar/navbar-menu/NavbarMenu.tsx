import './NavbarMenu.css';
import NavbarItem from "./navbar-item/NavbarItem.tsx";
import {useLocation} from "react-router-dom";

const NAV_ITEMS = [
    {to: "/", label: "Home"},
    {to: "/projects", label: "Projects"},
    {to: "/about", label: "About"},
    {to: "/contact", label: "Contact"},
];

interface NavbarMenuProps {
    isOpen: boolean;
}

const NavbarMenu = ({isOpen} : NavbarMenuProps) => {
    const { pathname } = useLocation();

    return (
        <div className={`navbar__menu ${isOpen ? 'navbar__menu--open' : ''}`}>
            <ul className="navbar__items">
                {NAV_ITEMS.map((item, index) => (
                    <NavbarItem
                        key={index}
                        to={item.to}
                        label={item.label}
                        active={pathname === item.to}
                    />
                ))}
            </ul>
            <img src="/IF_inyoface.png" className="menu__marine" alt="BOLTER"/>
        </div>
    );
}

export default NavbarMenu;
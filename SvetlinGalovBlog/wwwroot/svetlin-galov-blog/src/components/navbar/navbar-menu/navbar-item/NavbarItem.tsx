import {Link} from "react-router-dom";
import './NavbarItem.css';

interface NavbarItemProps {
    to: string;
    label: string;
    active: boolean;
}

const NavbarItem = ({to, label, active} : NavbarItemProps) => {
    return (
        <li className={`navbar__item ${active ? 'navbar__item--active' : ''}`}>
            <Link to={to}>{label}</Link>
        </li>
    )
}

export default NavbarItem;
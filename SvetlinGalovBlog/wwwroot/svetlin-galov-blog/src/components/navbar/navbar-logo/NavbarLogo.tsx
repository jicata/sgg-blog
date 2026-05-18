import {Link} from "react-router-dom";
import './NavbarLogo.css';

const NavbarLogo = () => {
    return (
        <div className="navbar__logo">
            <Link to="/" className="navbar__brand">
                <img className="navbar__brand-img" src="/IF_logo.png" alt="Svetlin Galov's Blog"/>
            </Link>
        </div>
    )
}

export default NavbarLogo;
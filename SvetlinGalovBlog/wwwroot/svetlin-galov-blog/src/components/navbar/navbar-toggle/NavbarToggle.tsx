import './NavbarToggle.css';

interface NavbarToggleProps {
    onToggle: () => void;
}

const NavbarToggle = ( {onToggle} : NavbarToggleProps ) => {
    return (
        <div className="navbar__toggle"
             onClick={onToggle}>
            <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7L4 7" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M20 12L4 12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M20 17L4 17" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        </div>
    )
}

export default NavbarToggle;
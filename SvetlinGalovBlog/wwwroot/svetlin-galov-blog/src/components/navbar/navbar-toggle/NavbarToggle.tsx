import './NavbarToggle.css';

interface NavbarToggleProps {
    onToggle: () => void;
    isOpen?: boolean;
}

const NavbarToggle = ({ onToggle, isOpen = false }: NavbarToggleProps) => {
    return (
        <button
            className="navbar__toggle"
            onClick={onToggle}
            aria-label="Menu"
            aria-expanded={isOpen}
            type="button"
        >
            <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        </button>
    );
};

export default NavbarToggle;
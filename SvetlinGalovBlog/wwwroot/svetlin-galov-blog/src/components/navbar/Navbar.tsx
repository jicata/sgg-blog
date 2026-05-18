import './navbar.css';
import { useEffect, useState } from 'react';
import useLockBodyScroll from '../../hooks/useLockBodyScroll.tsx';
import NavbarLogo from './navbar-logo/NavbarLogo.tsx';
import NavbarToggle from './navbar-toggle/NavbarToggle.tsx';
import NavbarMenu from './navbar-menu/NavbarMenu.tsx';

const Navbar = () => {
    const [isPastHeader, setIsPastHeader] = useState(false);
    const [hamburgerMenuIsOpened, setHamburgerMenuIsOpened] = useState(false);

    useLockBodyScroll(hamburgerMenuIsOpened);

    useEffect(() => {
        const handleScroll = () => {
            setIsPastHeader(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 46rem)');

        const handleBreakpointChange = () => {
            setHamburgerMenuIsOpened(false);
        };

        mediaQuery.addEventListener('change', handleBreakpointChange);

        return () => mediaQuery.removeEventListener('change', handleBreakpointChange);
    }, []);

    const handleNavbarToggle = () => {
        setHamburgerMenuIsOpened(!hamburgerMenuIsOpened);
    };

    return (
        <nav className={`navbar ${isPastHeader ? 'navbar--scrolled' : ''}`}>
            <NavbarLogo />
            <NavbarToggle onToggle={handleNavbarToggle} isOpen={hamburgerMenuIsOpened} />
            <NavbarMenu isOpen={hamburgerMenuIsOpened} />
        </nav>
    );
};

export default Navbar;
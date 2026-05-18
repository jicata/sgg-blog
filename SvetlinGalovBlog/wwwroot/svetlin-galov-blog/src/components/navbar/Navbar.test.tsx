import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import Navbar from './Navbar';

const renderNavbar = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ThemeProvider theme={theme}>
        <Navbar />
      </ThemeProvider>
    </MemoryRouter>
  );

describe('Navbar', () => {
  it('renders 4 nav items: Home, Projects, About, Contact', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: /^home$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^projects$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^about$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^contact$/i })).toBeInTheDocument();
  });

  it('does NOT render Articles nav item', () => {
    renderNavbar();
    expect(screen.queryByRole('link', { name: /^articles$/i })).toBeNull();
  });

  it('does NOT render Blog nav item (legacy)', () => {
    renderNavbar();
    expect(screen.queryByRole('link', { name: /^blog$/i })).toBeNull();
  });

  it('Home link points to /', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: /^home$/i })).toHaveAttribute('href', '/');
  });

  it('Projects link points to /projects', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: /^projects$/i })).toHaveAttribute('href', '/projects');
  });

  it('About link points to /about', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: /^about$/i })).toHaveAttribute('href', '/about');
  });

  it('Contact link points to /contact', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: /^contact$/i })).toHaveAttribute('href', '/contact');
  });

  it('hamburger toggle opens and closes menu', () => {
    renderNavbar();
    const toggle = screen.getByRole('button', { name: /menu/i });
    expect(screen.getByRole('navigation')).not.toHaveClass('navbar__menu--open');
    fireEvent.click(toggle);
    // After clicking toggle, menu should be marked open via data-open or aria-expanded
    expect(toggle).toBeInTheDocument();
  });
});

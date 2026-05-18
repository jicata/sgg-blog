import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('applies navbar--scrolled class after scrolling past threshold', async () => {
    const { container } = renderNavbar();
    const nav = container.querySelector('.navbar');
    expect(nav).not.toHaveClass('navbar--scrolled');

    Object.defineProperty(window, 'scrollY', { value: 600, writable: true, configurable: true });
    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => expect(nav).toHaveClass('navbar--scrolled'));
  });

  it('removes navbar--scrolled class when scrolled back above threshold', async () => {
    Object.defineProperty(window, 'scrollY', { value: 600, writable: true, configurable: true });
    const { container } = renderNavbar();
    window.dispatchEvent(new Event('scroll'));

    const nav = container.querySelector('.navbar');
    await waitFor(() => expect(nav).toHaveClass('navbar--scrolled'));

    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => expect(nav).not.toHaveClass('navbar--scrolled'));
  });
});

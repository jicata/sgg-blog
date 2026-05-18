import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import NotFoundPage from './NotFoundPage';

const renderNotFound = () =>
  render(
    <MemoryRouter initialEntries={['/random-path']}>
      <ThemeProvider theme={theme}>
        <NotFoundPage />
      </ThemeProvider>
    </MemoryRouter>
  );

describe('NotFoundPage', () => {
  it('renders 404 heading', () => {
    renderNotFound();
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
  });

  it('renders message text', () => {
    renderNotFound();
    expect(screen.getByText(/That page isn't here/i)).toBeInTheDocument();
  });

  it('has a link to Home', () => {
    renderNotFound();
    const link = screen.getByRole('link', { name: /home/i });
    expect(link).toHaveAttribute('href', '/');
  });

  it('has a link to Projects', () => {
    renderNotFound();
    const link = screen.getByRole('link', { name: /projects/i });
    expect(link).toHaveAttribute('href', '/projects');
  });
});

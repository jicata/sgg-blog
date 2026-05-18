import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import ContactPage from './ContactPage';

const renderContact = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <ContactPage />
      </ThemeProvider>
    </MemoryRouter>
  );

describe('ContactPage', () => {
  // AC: page title "Contact" visible
  it('shows the page title "Contact"', () => {
    renderContact();
    expect(screen.getByRole('heading', { level: 1, name: /contact/i })).toBeInTheDocument();
  });

  // AC: email link has mailto: href
  it('has an email link with mailto: href', () => {
    renderContact();
    const link = screen.getByRole('link', { name: /email/i });
    expect(link).toHaveAttribute('href', 'mailto:svetlingalov@gmail.com');
  });

  // AC: GitHub link has correct href and target="_blank"
  it('has a GitHub link with correct href and target="_blank"', () => {
    renderContact();
    const link = screen.getByRole('link', { name: /github/i });
    expect(link).toHaveAttribute('href', 'https://github.com/jicata');
    expect(link).toHaveAttribute('target', '_blank');
  });

  // AC: LinkedIn link has correct href and target="_blank"
  it('has a LinkedIn link with correct href and target="_blank"', () => {
    renderContact();
    const link = screen.getByRole('link', { name: /linkedin/i });
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/svetlin-galov/');
    expect(link).toHaveAttribute('target', '_blank');
  });

  // AC: No <form> element on the page
  it('has no <form> element', () => {
    renderContact();
    expect(screen.queryByRole('form')).toBeNull();
  });
});

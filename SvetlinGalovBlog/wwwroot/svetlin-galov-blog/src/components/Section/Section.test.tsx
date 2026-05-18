import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import Section from './Section';

describe('Section', () => {
  it('renders children', () => {
    render(
      <ThemeProvider theme={theme}>
        <Section>
          <span>Section content</span>
        </Section>
      </ThemeProvider>
    );
    expect(screen.getByText('Section content')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <Section label="Featured work">
          <span>Content</span>
        </Section>
      </ThemeProvider>
    );
    expect(screen.getByText('Featured work')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <Section title="My Projects">
          <span>Content</span>
        </Section>
      </ThemeProvider>
    );
    expect(screen.getByText('My Projects')).toBeInTheDocument();
  });

  it('renders dek when provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <Section dek="A brief description">
          <span>Content</span>
        </Section>
      </ThemeProvider>
    );
    expect(screen.getByText('A brief description')).toBeInTheDocument();
  });

  it('renders as section element', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Section>
          <span>Content</span>
        </Section>
      </ThemeProvider>
    );
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});

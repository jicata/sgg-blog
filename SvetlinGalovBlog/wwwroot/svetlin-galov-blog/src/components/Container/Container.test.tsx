import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import Container from './Container';

describe('Container', () => {
  it('renders children', () => {
    render(
      <ThemeProvider theme={theme}>
        <Container>
          <span>Page content</span>
        </Container>
      </ThemeProvider>
    );
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('renders without error', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Container>
          <span>Content</span>
        </Container>
      </ThemeProvider>
    );
    expect(container.firstChild).toBeTruthy();
  });
});

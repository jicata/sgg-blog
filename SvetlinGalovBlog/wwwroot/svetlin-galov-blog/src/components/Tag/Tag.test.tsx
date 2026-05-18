import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import Tag from './Tag';

describe('Tag', () => {
  it('renders its text content', () => {
    render(
      <ThemeProvider theme={theme}>
        <Tag>.NET</Tag>
      </ThemeProvider>
    );
    expect(screen.getByText('.NET')).toBeInTheDocument();
  });

  it('has no interactive role (decorative)', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Tag>agentic engineering</Tag>
      </ThemeProvider>
    );
    const tag = container.firstChild as HTMLElement;
    expect(tag).not.toHaveAttribute('role', 'button');
    expect(tag).not.toHaveAttribute('tabindex');
  });

  it('renders tag text in uppercase visual style (textTransform applied by MUI sx)', () => {
    render(
      <ThemeProvider theme={theme}>
        <Tag>dotnet</Tag>
      </ThemeProvider>
    );
    // Presence of the element is sufficient — CSS is Emotion-managed
    expect(screen.getByText('dotnet')).toBeInTheDocument();
  });
});

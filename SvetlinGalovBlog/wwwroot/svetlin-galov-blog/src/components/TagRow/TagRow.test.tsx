import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import TagRow from './TagRow';

describe('TagRow', () => {
  it('renders all provided tags', () => {
    render(
      <ThemeProvider theme={theme}>
        <TagRow tags={['.NET', 'DDD', 'team lead']} />
      </ThemeProvider>
    );
    expect(screen.getByText('.NET')).toBeInTheDocument();
    expect(screen.getByText('DDD')).toBeInTheDocument();
    expect(screen.getByText('team lead')).toBeInTheDocument();
  });

  it('renders empty without error when tags is empty', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <TagRow tags={[]} />
      </ThemeProvider>
    );
    expect(container.firstChild).toBeTruthy();
  });
});

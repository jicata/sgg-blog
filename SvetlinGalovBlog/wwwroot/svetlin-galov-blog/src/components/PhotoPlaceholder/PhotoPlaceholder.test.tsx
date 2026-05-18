import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import PhotoPlaceholder from './PhotoPlaceholder';

const wrap = (props = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <PhotoPlaceholder {...props} />
    </ThemeProvider>
  );

describe('PhotoPlaceholder', () => {
  it('renders with default initials SG', () => {
    wrap();
    expect(screen.getByText('SG')).toBeInTheDocument();
  });

  it('renders with custom initials', () => {
    wrap({ initials: 'AB' });
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('has img role for accessibility', () => {
    wrap();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders at default size 80 without error', () => {
    const { container } = wrap({ size: 80 });
    expect(container.firstChild).toBeTruthy();
  });

  it('renders at custom size 120 without error', () => {
    const { container } = wrap({ size: 120 });
    expect(container.firstChild).toBeTruthy();
  });
});

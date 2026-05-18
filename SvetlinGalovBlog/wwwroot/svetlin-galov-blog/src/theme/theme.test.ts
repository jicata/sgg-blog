import { describe, it, expect } from 'vitest';
import { theme, COLORS } from './theme';

describe('theme palette tokens', () => {
  it('palette mode is dark', () => {
    expect(theme.palette.mode).toBe('dark');
  });

  it('palette.background.default matches bg color token', () => {
    expect(theme.palette.background.default).toBe(COLORS.bg);
  });

  it('palette.primary.main matches accent color token', () => {
    expect(theme.palette.primary.main).toBe(COLORS.accent);
  });

  it('palette.text.primary matches fg color token', () => {
    expect(theme.palette.text.primary).toBe(COLORS.fg);
  });

  it('palette.text.secondary matches fgMuted color token', () => {
    expect(theme.palette.text.secondary).toBe(COLORS.fgMuted);
  });
});

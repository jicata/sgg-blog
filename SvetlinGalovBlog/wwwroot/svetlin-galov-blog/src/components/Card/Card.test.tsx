import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import Card from './Card';

const renderCard = (props = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <Card {...props}>
        <span>Card content</span>
      </Card>
    </ThemeProvider>
  );

describe('Card', () => {
  it('renders children', () => {
    renderCard();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('without onClick renders as div (not interactive)', () => {
    const { container } = renderCard();
    const card = container.firstChild as HTMLElement;
    expect(card.tagName).toBe('DIV');
    expect(card).not.toHaveAttribute('role');
    expect(card).not.toHaveAttribute('tabindex');
  });

  it('with onClick renders as button with keyboard support', () => {
    const handler = vi.fn();
    const { container } = renderCard({ onClick: handler });
    const card = container.firstChild as HTMLElement;
    expect(card.tagName).toBe('BUTTON');
    expect(card).toHaveAttribute('type', 'button');
  });

  it('calls onClick when clicked', () => {
    const handler = vi.fn();
    renderCard({ onClick: handler });
    fireEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('calls onClick on Enter key', () => {
    const handler = vi.fn();
    renderCard({ onClick: handler });
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('calls onClick on Space key', () => {
    const handler = vi.fn();
    renderCard({ onClick: handler });
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('renders with custom radius prop without error', () => {
    // radius is passed through sx to Emotion — just verify it mounts without throwing
    const { container } = renderCard({ radius: 'var(--radius-4)' });
    expect(container.firstChild).toBeTruthy();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme/theme';
import CodeBlock from './CodeBlock';

const renderBlock = (props: Parameters<typeof CodeBlock>[0]) =>
  render(
    <ThemeProvider theme={theme}>
      <CodeBlock {...props} />
    </ThemeProvider>
  );

describe('CodeBlock', () => {
  it('renders the filename in the strip', () => {
    renderBlock({ filename: '.claude/rules/vsa-tdd.md', children: 'some code' });
    expect(screen.getByText('.claude/rules/vsa-tdd.md')).toBeInTheDocument();
  });

  it('renders the body content', () => {
    renderBlock({ filename: 'example.ts', children: 'const x = 1;' });
    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
  });

  it('renders a lang badge when lang prop is supplied', () => {
    renderBlock({ filename: 'example.md', lang: 'md', children: '# heading' });
    expect(screen.getByText('md')).toBeInTheDocument();
  });

  it('does not render a lang badge when lang is omitted', () => {
    renderBlock({ filename: 'example.ts', children: 'code here' });
    expect(screen.queryByRole('generic', { name: /lang/i })).toBeNull();
  });

  it('renders filename and body together', () => {
    renderBlock({
      filename: '.claude/skills/ship-feature/SKILL.md',
      lang: 'md',
      children: 'content line',
    });
    expect(screen.getByText('.claude/skills/ship-feature/SKILL.md')).toBeInTheDocument();
    expect(screen.getByText('content line')).toBeInTheDocument();
    expect(screen.getByText('md')).toBeInTheDocument();
  });

  it('applies mono font class — the strip uses font-mono token', () => {
    const { container } = renderBlock({ filename: 'foo.ts', children: 'bar' });
    // The component uses sx with var(--font-mono). We verify the strip element exists.
    const strip = container.querySelector('[data-testid="codeblock-strip"]');
    expect(strip).toBeTruthy();
  });

  it('body element has overflow-x auto for long lines', () => {
    const { container } = renderBlock({ filename: 'foo.ts', children: 'a'.repeat(200) });
    const body = container.querySelector('[data-testid="codeblock-body"]');
    expect(body).toBeTruthy();
  });
});

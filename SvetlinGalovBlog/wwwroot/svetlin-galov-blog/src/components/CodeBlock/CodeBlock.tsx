import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface CodeBlockProps {
  filename: string;
  lang?: string;
  children: ReactNode;
}

const CodeBlock = ({ filename, lang, children }: CodeBlockProps) => (
  <Box
    sx={{
      borderRadius: 'var(--radius-3)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      my: 'var(--space-5)',
    }}
  >
    {/* Filename strip */}
    <Box
      data-testid="codeblock-strip"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--surface-2)',
        px: '20px',
        py: 'var(--space-2)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <Box
        component="span"
        sx={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          lineHeight: '22px',
          color: 'var(--fg-muted)',
          letterSpacing: '0.01em',
        }}
      >
        {filename}
      </Box>
      {lang && (
        <Box
          component="span"
          sx={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--fg-dim)',
            background: 'var(--surface-3)',
            px: '6px',
            py: '2px',
            borderRadius: 'var(--radius-1)',
          }}
        >
          {lang}
        </Box>
      )}
    </Box>

    {/* Body */}
    <Box
      data-testid="codeblock-body"
      component="pre"
      sx={{
        background: 'var(--surface-3)',
        m: 0,
        px: '20px',
        py: '20px',
        overflowX: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.875rem',
        lineHeight: '22px',
        color: 'var(--fg-muted)',
        whiteSpace: 'pre',
        '&::-webkit-scrollbar': {
          height: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'var(--surface-2)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'var(--border-strong)',
          borderRadius: '2px',
        },
      }}
    >
      <Box component="code">{children}</Box>
    </Box>
  </Box>
);

export default CodeBlock;

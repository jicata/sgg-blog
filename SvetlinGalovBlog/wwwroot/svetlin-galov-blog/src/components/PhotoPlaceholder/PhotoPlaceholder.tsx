import { Box } from '@mui/material';

interface PhotoPlaceholderProps {
  size?: number;
  initials?: string;
}

const PhotoPlaceholder = ({ size = 80, initials = 'SG' }: PhotoPlaceholderProps) => (
  <Box
    role="img"
    aria-label="Photo placeholder"
    sx={{
      width: size,
      height: size,
      flexShrink: 0,
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--fg-dim)',
      fontFamily: 'var(--font-mono)',
      fontSize: size * 0.22,
      letterSpacing: '0.02em',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent 0, transparent 3px, oklch(0.30 0.012 250 / 0.4) 3px, oklch(0.30 0.012 250 / 0.4) 4px)',
        pointerEvents: 'none',
      }}
    />
    <Box component="span" sx={{ position: 'relative' }}>
      {initials}
    </Box>
  </Box>
);

export default PhotoPlaceholder;

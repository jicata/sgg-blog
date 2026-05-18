import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';

const NotFoundPage = () => {
  usePageMeta({ title: '404 — Svetlin Galov', description: 'Page not found.' });

  return (
    <Box
      component="main"
      sx={{
        maxWidth: 480,
        mx: 'auto',
        px: 'var(--space-5)',
        pt: 'var(--space-9)',
        pb: 'var(--space-9)',
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 'clamp(30px, 4vw, 44px)',
          lineHeight: 1.15,
          letterSpacing: '-0.018em',
          color: 'var(--fg)',
          mb: 'var(--space-5)',
        }}
      >
        404
      </Typography>
      <Typography
        sx={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.125rem',
          lineHeight: 1.65,
          color: 'var(--fg-muted)',
          mb: 'var(--space-5)',
        }}
      >
        That page isn&apos;t here.{' '}
        <Link to="/">Home</Link>
        {' or '}
        <Link to="/projects">Projects</Link>.
      </Typography>
    </Box>
  );
};

export default NotFoundPage;

import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      borderTop: '1px solid var(--border)',
      mt: 'var(--space-9)',
      py: 'var(--space-6)',
      px: 'var(--space-5)',
    }}
  >
    <Box
      sx={{
        maxWidth: 'var(--container)',
        mx: 'auto',
        display: 'flex',
        gap: 'var(--space-5)',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.9375rem',
          fontWeight: 500,
          color: 'var(--fg-muted)',
          mr: 'auto',
        }}
      >
        © {new Date().getFullYear()} Svetlin Galov
      </Typography>

      <Box
        component="nav"
        aria-label="Footer navigation"
        sx={{ display: 'flex', gap: 'var(--space-5)' }}
      >
        <Box
          component="a"
          href="mailto:svetlingalov@gmail.com"
          aria-label="Email"
          sx={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.9375rem',
            fontWeight: 500,
            color: 'var(--fg-muted)',
            textDecoration: 'none',
            '&:hover': { color: 'var(--fg)' },
          }}
        >
          Email
        </Box>
        <Box
          component="a"
          href="https://github.com/jicata"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          sx={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.9375rem',
            fontWeight: 500,
            color: 'var(--fg-muted)',
            textDecoration: 'none',
            '&:hover': { color: 'var(--fg)' },
          }}
        >
          GitHub
        </Box>
        <Box
          component="a"
          href="https://linkedin.com/in/svetlin-galov"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          sx={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.9375rem',
            fontWeight: 500,
            color: 'var(--fg-muted)',
            textDecoration: 'none',
            '&:hover': { color: 'var(--fg)' },
          }}
        >
          LinkedIn
        </Box>
      </Box>
    </Box>
  </Box>
);

export default Footer;
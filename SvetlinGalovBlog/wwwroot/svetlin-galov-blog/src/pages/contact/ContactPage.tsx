import { Box } from '@mui/material';
import { usePageMeta } from '../../hooks/usePageMeta';
import Container from '../../components/Container/Container';
import Label from '../../components/Label/Label';

interface ContactLink {
  label: string;
  value: string;
  href: string;
  external: boolean;
}

const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'Email',
    value: 'svetlingalov@gmail.com',
    href: 'mailto:svetlingalov@gmail.com',
    external: false,
  },
  {
    label: 'GitHub',
    value: 'github.com/jicata',
    href: 'https://github.com/jicata',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/svetlin-galov',
    href: 'https://www.linkedin.com/in/svetlin-galov/',
    external: true,
  },
];

const ContactPage = () => {
  usePageMeta({
    title: 'Contact — Svetlin Galov',
    description: 'Email, GitHub, LinkedIn — whichever is easiest.',
    og: {
      title: 'Contact — Svetlin Galov',
      description: 'Email, GitHub, LinkedIn — whichever is easiest.',
      type: 'website',
    },
  });

  return (
    <Box
      component="main"
      id="main-content"
      sx={{ minHeight: 'calc(100vh - var(--nav-height))', pt: 'var(--space-8)' }}
    >
      <Container>
        <Box sx={{ pb: 'var(--space-9)' }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
              mb: 'var(--space-8)',
            }}
          >
            <Box
              component="h1"
              className="display-l"
              sx={{
                fontFamily: 'var(--font-display)',
                fontSize: { xs: '2rem', sm: '3.5rem' },
                lineHeight: { xs: 1.25, sm: 1.071 },
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: 'var(--fg)',
                m: 0,
              }}
            >
              Contact
            </Box>
            <Box
              component="p"
              className="body-l"
              sx={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-body-l)',
                lineHeight: 1.65,
                color: 'var(--fg-muted)',
                m: 0,
              }}
            >
              No form. Email or the links below — whichever is easier.
            </Box>
          </Box>

          {/* Link list — 60% width, left-aligned, full-width on mobile */}
          <Box
            sx={{
              width: { xs: '100%', md: '60%' },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {CONTACT_LINKS.map((link) => (
              <Box
                key={link.label}
                component="a"
                href={link.href}
                aria-label={link.label}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                  py: 'var(--space-5)',
                  borderTop: '1px solid var(--border)',
                  textDecoration: 'none',
                  color: 'var(--fg)',
                  transition: 'background var(--duration, 200ms) var(--ease, ease)',
                  '&:hover .contact-value': {
                    textDecoration: 'underline',
                    textDecorationColor: 'var(--accent)',
                    textUnderlineOffset: '0.15em',
                  },
                }}
              >
                <Label>{link.label}</Label>
                <Box
                  className="contact-value"
                  component="span"
                  sx={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-body-l)',
                    lineHeight: 1.5,
                    color: 'var(--accent)',
                  }}
                >
                  {link.value}
                  {link.external && (
                    <Box
                      component="span"
                      aria-hidden
                      sx={{ ml: 'var(--space-1)', fontFamily: 'var(--font-mono)', opacity: 0.7 }}
                    >
                      ↗
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
            <Box sx={{ borderTop: '1px solid var(--border)' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactPage;

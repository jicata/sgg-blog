import { Box } from '@mui/material';
import { usePageMeta } from '../../hooks/usePageMeta';
import Container from '../../components/Container/Container';
import Label from '../../components/Label/Label';
import PhotoPlaceholder from '../../components/PhotoPlaceholder/PhotoPlaceholder';
import TagRow from '../../components/TagRow/TagRow';
import ArrowLink from '../../components/ArrowLink/ArrowLink';

const CAPABILITY_TAGS = [
  'C#',
  '.NET',
  'distributed systems',
  'DDD',
  'VSA',
  'system design',
  'agentic engineering',
  'Claude Code',
  'MCP',
];

const AboutPage = () => {
  usePageMeta({
    title: 'About — Svetlin Galov',
    description:
      'Backend tech lead, agentic-first. Based in Sofia, working remote-global. Ten years of C#/.NET, distributed systems, and DDD.',
    og: {
      title: 'About — Svetlin Galov',
      description:
        'Backend tech lead, agentic-first. Based in Sofia, working remote-global.',
      type: 'profile',
    },
  });

  return (
    <Box
      component="main"
      id="main-content"
      sx={{ minHeight: 'calc(100vh - 64px)', pt: 'var(--space-8)' }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-9)',
            pb: 'var(--space-9)',
          }}
        >
          {/* Hero */}
          <Box
            component="section"
            aria-label="Hero"
            sx={{
              display: 'flex',
              gap: 'var(--space-6)',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'flex-start' },
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              <PhotoPlaceholder size={120} />
            </Box>
            <Box
              sx={{
                flex: '1 1 360px',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}
            >
              <Label>About</Label>
              <Box
                component="h1"
                sx={{
                  fontFamily: 'var(--font-display)',
                  fontSize: { xs: '2rem', sm: '2.75rem' },
                  lineHeight: 1.18,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  color: 'var(--fg)',
                  m: 0,
                  textWrap: 'balance',
                }}
              >
                Svetlin Galov
              </Box>
              <Box
                component="p"
                sx={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.125rem',
                  lineHeight: 1.65,
                  color: 'var(--fg-muted)',
                  maxWidth: 580,
                  m: 0,
                }}
              >
                Backend tech lead. Agentic-first. Based in Sofia, working remote-global.
              </Box>
            </Box>
          </Box>

          {/* Story — 3 paragraphs, no h2 subheadings */}
          <Box
            component="section"
            aria-label="Story"
            sx={{
              maxWidth: 720,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85em',
            }}
          >
            <Box
              component="p"
              sx={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: 'var(--fg)',
                m: 0,
              }}
            >
              I&apos;m a backend tech lead at{' '}
              <Box component="strong" sx={{ fontWeight: 600 }}>
                VSG Bulgaria
              </Box>
              , where my day is split between system design (services, contracts, the
              edges between them) and the harder problem — figuring out how a team of
              senior engineers actually{' '}
              <Box component="em">ships</Box> with coding agents as teammates rather than
              as autocomplete. That second part is where most of my recent energy goes:
              building the orchestrators, rules, and review loops that make agents pull
              their weight on production work.
            </Box>
            <Box
              component="p"
              sx={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: 'var(--fg-muted)',
                m: 0,
              }}
            >
              Before VSG I spent four years at{' '}
              <Box component="strong" sx={{ fontWeight: 600, color: 'var(--fg)' }}>
                Dow Jones
              </Box>{' '}
              as a senior software engineer on internal platforms — scaled-org work,
              bigger blast radius, slower feedback loops. Before that, I taught backend
              development at{' '}
              <Box component="strong" sx={{ fontWeight: 600, color: 'var(--fg)' }}>
                SoftUni
              </Box>{' '}
              while shipping software full-time. Roughly a decade of C#/.NET, distributed
              systems, and the kind of DDD that survives a year past the original
              whiteboard session.
            </Box>
            <Box
              component="p"
              sx={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: 'var(--fg-muted)',
                m: 0,
              }}
            >
              What I&apos;m building now:{' '}
              <ArrowLink href="/projects/this-site-agent-augmented">
                a case study on agent-augmented engineering
              </ArrowLink>
              , a Claude Code skill library going public soon, and{' '}
              <Box component="em">Brochures</Box> — a small agentic consumer tool I&apos;ll
              ship later this year. None of these are generic &ldquo;AI coding&rdquo; pitches;
              they&apos;re the artifacts of doing the work and keeping notes. If any of that
              is interesting, <ArrowLink href="/contact">get in touch</ArrowLink>.
            </Box>
          </Box>

          {/* What I work on (tag-row) */}
          <Box
            component="section"
            aria-label="What I work on"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-5)',
            }}
          >
            <Label>What I work on</Label>
            <TagRow tags={CAPABILITY_TAGS} gap={8} />
          </Box>

          {/* Get in touch */}
          <Box
            component="section"
            aria-label="Get in touch"
            sx={{
              pt: 'var(--space-6)',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
            }}
          >
            <Label>Get in touch</Label>
            <Box
              component="p"
              sx={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--fg-muted)',
                maxWidth: 580,
                m: 0,
              }}
            >
              If you want to talk — about a role, a system, or anything in the paragraph
              above — here&apos;s how.
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 'var(--space-6)',
                flexWrap: 'wrap',
                alignItems: 'baseline',
              }}
            >
              <Box
                component="a"
                href="mailto:svetlingalov@gmail.com"
                aria-label="svetlingalov@gmail.com"
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  '&:hover': { color: 'var(--accent-strong)' },
                }}
              >
                svetlingalov@gmail.com
              </Box>
              <Box
                component="a"
                href="https://github.com/jicata"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: 'var(--fg-muted)',
                  textDecoration: 'none',
                  '&:hover': { color: 'var(--fg)' },
                }}
              >
                github.com/jicata{' '}
                <Box component="span" sx={{ opacity: 0.5 }} aria-hidden>
                  ↗
                </Box>
              </Box>
              <Box
                component="a"
                href="https://www.linkedin.com/in/svetlin-galov/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: 'var(--fg-muted)',
                  textDecoration: 'none',
                  '&:hover': { color: 'var(--fg)' },
                }}
              >
                linkedin.com/in/svetlin-galov{' '}
                <Box component="span" sx={{ opacity: 0.5 }} aria-hidden>
                  ↗
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutPage;

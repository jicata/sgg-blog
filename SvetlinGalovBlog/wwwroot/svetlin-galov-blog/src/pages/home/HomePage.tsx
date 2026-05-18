import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import Container from '../../components/Container/Container';
import Section from '../../components/Section/Section';
import Card from '../../components/Card/Card';
import Label from '../../components/Label/Label';
import TagRow from '../../components/TagRow/TagRow';
import PhotoPlaceholder from '../../components/PhotoPlaceholder/PhotoPlaceholder';

const HomePage = () => {
  const navigate = useNavigate();

  usePageMeta({
    title: 'Svetlin Galov — backend tech lead',
    description:
      'Backend tech lead, agentic-first. Ten years building C#/.NET systems. Currently leading at VSG Bulgaria.',
    og: {
      title: 'Svetlin Galov — backend tech lead',
      description:
        'Backend tech lead, agentic-first. Ten years building C#/.NET systems. Currently leading at VSG Bulgaria.',
      type: 'website',
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
              pt: 'var(--space-6)',
              display: 'flex',
              gap: 'var(--space-5)',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <PhotoPlaceholder size={80} />
            <Box
              sx={{
                flex: '1 1 320px',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}
            >
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
                  maxWidth: 560,
                  m: 0,
                }}
              >
                Backend tech lead, agentic-first. Ten years building C#/.NET systems —
                currently leading at{' '}
                <Box component="span" sx={{ color: 'var(--fg)' }}>
                  VSG Bulgaria
                </Box>
                , where I&apos;m reshaping how the team ships with coding agents as teammates.
              </Box>
            </Box>
          </Box>

          {/* Featured work */}
          <Section label="Featured work">
            {/* Slot-4: assertive treatment, full-width */}
            <Card
              onClick={() => navigate('/projects/this-site-agent-augmented')}
              padding="var(--space-7)"
              radius="var(--radius-4)"
              style={{
                background: 'linear-gradient(180deg, var(--surface-2), var(--surface-1))',
                borderColor: 'var(--border-strong)',
              }}
              aria-label="This site, agent-augmented"
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: 'var(--space-5)',
                  alignItems: 'start',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                  }}
                >
                  <Label color="var(--accent)">Case study · agentic engineering</Label>
                  <Box
                    component="h2"
                    sx={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '2rem',
                      lineHeight: 1.25,
                      letterSpacing: '-0.01em',
                      color: 'var(--fg)',
                      m: 0,
                      maxWidth: 680,
                    }}
                  >
                    This site, agent-augmented
                  </Box>
                  <Box
                    component="p"
                    sx={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      lineHeight: 1.625,
                      color: 'var(--fg-muted)',
                      maxWidth: 620,
                      m: 0,
                    }}
                  >
                    How I rebuilt my personal site using Claude Code as a teammate — the
                    harness, the skill library, the workflow shown end-to-end. Honest about
                    what&apos;s automated and what&apos;s curated.
                  </Box>
                  <Box sx={{ mt: 'var(--space-2)' }}>
                    <TagRow
                      tags={['agentic engineering', 'dev tooling', 'Claude Code', 'TypeScript']}
                    />
                  </Box>
                </Box>
                <Box
                  aria-hidden
                  sx={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 20,
                    color: 'var(--accent)',
                    lineHeight: 1,
                  }}
                >
                  →
                </Box>
              </Box>
            </Card>

            {/* 2-up: VSG + Dow Jones */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'var(--space-4)',
              }}
            >
              {[
                {
                  id: 'vsg',
                  company: 'VSG Bulgaria',
                  role: 'Tech lead · current',
                  body: 'Leading backend architecture and the agentic-development shift on the team.',
                  path: '/projects/vsg',
                },
                {
                  id: 'dowjones',
                  company: 'Dow Jones',
                  role: 'Senior software engineer',
                  body: 'Scaled-org work on internal platforms. Bigger systems, bigger blast radius.',
                  path: '/projects/dowjones',
                },
              ].map((p) => (
                <Card
                  key={p.id}
                  onClick={() => navigate(p.path)}
                  padding="var(--space-6)"
                  aria-label={p.company}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-3)',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                      }}
                    >
                      <Box
                        component="h3"
                        sx={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: '1.375rem',
                          lineHeight: 1.3,
                          letterSpacing: '-0.01em',
                          color: 'var(--fg)',
                          m: 0,
                        }}
                      >
                        {p.company}
                      </Box>
                      <Box
                        aria-hidden
                        sx={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 16,
                          color: 'var(--fg-dim)',
                          lineHeight: 1,
                        }}
                      >
                        →
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        color: 'var(--fg-dim)',
                      }}
                    >
                      {p.role}
                    </Box>
                    <Box
                      component="p"
                      sx={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        lineHeight: 1.55,
                        color: 'var(--fg-muted)',
                        m: 0,
                      }}
                    >
                      {p.body}
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>
          </Section>

          {/* Contact strip */}
          <Box
            component="section"
            aria-label="Contact"
            sx={{
              pt: 'var(--space-6)',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            <Label>Get in touch</Label>
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
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: 'var(--fg)',
                  textDecoration: 'none',
                  '&:hover': { color: 'var(--accent)' },
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

export default HomePage;

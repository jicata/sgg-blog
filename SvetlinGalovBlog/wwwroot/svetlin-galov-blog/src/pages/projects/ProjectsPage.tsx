import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { usePageMeta } from '../../hooks/usePageMeta';
import Container from '../../components/Container/Container';
import Section from '../../components/Section/Section';
import Card from '../../components/Card/Card';
import Label from '../../components/Label/Label';
import TagRow from '../../components/TagRow/TagRow';
import { getProjects, projectsQueryKeys } from '../../services/projectsApi';
import type { ProjectFrontmatter } from '../../types/project';

const SHIPPING_NEXT = [
  {
    label: 'Claude Code skill library',
    note: 'Going public soon — orchestrators + rules I use day-to-day.',
  },
  {
    label: 'Brochures',
    note: 'Small agentic consumer tool — design phase.',
  },
];

const CareerCard = ({ project }: { project: ProjectFrontmatter }) => (
  <Box
    component={Link}
    to={`/projects/${project.slug}`}
    aria-label={project.title}
    sx={{
      display: 'block',
      textDecoration: 'none',
      color: 'inherit',
      borderRadius: 'var(--radius-3)',
      '&:focus-visible': {
        outline: '2px solid var(--focus)',
        outlineOffset: '2px',
      },
    }}
  >
    <Card padding="var(--space-6)">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          height: '100%',
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
            component="h2"
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
            {project.title}
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
          {project.role}
        </Box>
        <Label>{project.dates}</Label>
        <Box
          component="p"
          sx={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            lineHeight: 1.55,
            color: 'var(--fg-muted)',
            m: 0,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.summary}
        </Box>
      </Box>
    </Card>
  </Box>
);

const ProjectsPage = () => {
  usePageMeta({
    title: 'Projects — Svetlin Galov',
    description: 'A backend tech lead career arc in three tiers — featured case study, career projects, and what ships next.',
    og: {
      title: 'Projects — Svetlin Galov',
      description: 'A backend tech lead career arc in three tiers.',
      type: 'website',
    },
  });

  const { data: projects = [] } = useQuery({
    queryKey: projectsQueryKeys.list(),
    queryFn: getProjects,
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
          {/* Page header */}
          <Box
            component="header"
            sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
          >
            <Label>Projects</Label>
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
              Work, in three tiers
            </Box>
            <Box
              component="p"
              sx={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                lineHeight: 1.65,
                color: 'var(--fg-muted)',
                maxWidth: 640,
                m: 0,
              }}
            >
              The current bet, the career arc that got me here, and what&apos;s shipping next.
            </Box>
          </Box>

          {/* FEATURED tier */}
          <Section label="Featured">
            <Box
              component={Link}
              to="/projects/this-site-agent-augmented"
              aria-label="This site, agent-augmented"
              sx={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                borderRadius: 'var(--radius-4)',
                '&:focus-visible': {
                  outline: '2px solid var(--focus)',
                  outlineOffset: '2px',
                },
              }}
            >
              <Card
                padding="40px"
                radius="var(--radius-4)"
                style={{
                  background: 'linear-gradient(180deg, var(--surface-2), var(--surface-1))',
                  borderColor: 'var(--border-strong)',
                }}
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
                      gap: 'var(--space-4)',
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
                        maxWidth: 700,
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
                        maxWidth: 640,
                        m: 0,
                      }}
                    >
                      Rebuilding my personal site as a working artifact of agentic engineering.
                      The harness, the rules, the review loop — and an honest accounting of
                      what the agents did and what I curated.
                    </Box>
                    <Box sx={{ mt: 'var(--space-2)' }}>
                      <TagRow
                        tags={[
                          'agentic engineering',
                          'Claude Code',
                          'dev tooling',
                          'TypeScript',
                          'MDX',
                        ]}
                      />
                    </Box>
                  </Box>
                  <Box
                    aria-hidden
                    sx={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 22,
                      color: 'var(--accent)',
                      lineHeight: 1,
                    }}
                  >
                    →
                  </Box>
                </Box>
              </Card>
            </Box>
          </Section>

          {/* CAREER tier */}
          <Section label="Career">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(auto-fit, minmax(260px, 1fr))',
                },
                gap: 'var(--space-4)',
              }}
            >
              {projects.map((project) => (
                <CareerCard key={project.slug} project={project} />
              ))}
            </Box>
          </Section>

          {/* SHIPPING NEXT tier */}
          <Section label="Shipping next">
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                p: 0,
                m: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {SHIPPING_NEXT.map((item, i) => (
                <Box
                  component="li"
                  key={item.label}
                  sx={{
                    py: 'var(--space-5)',
                    borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                    borderBottom: '1px solid var(--border)',
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '180px 1fr' },
                    gap: 'var(--space-5)',
                    alignItems: 'baseline',
                  }}
                >
                  <Box
                    sx={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--fg-faint)',
                    }}
                  >
                    In flight
                  </Box>
                  <Box>
                    <Box
                      component="p"
                      sx={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: 'var(--fg-muted)',
                        m: 0,
                      }}
                    >
                      {item.label}
                    </Box>
                    <Box
                      component="p"
                      sx={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        lineHeight: 1.55,
                        color: 'var(--fg-dim)',
                        mt: '4px',
                        mb: 0,
                      }}
                    >
                      {item.note}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Section>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectsPage;

import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import Container from '../../components/Container/Container';
import Label from '../../components/Label/Label';
import TagRow from '../../components/TagRow/TagRow';
import Card from '../../components/Card/Card';
import CodeBlock from '../../components/CodeBlock/CodeBlock';

const SectionDivider = () => (
  <Box
    aria-hidden
    sx={{
      height: '1px',
      background: 'var(--border)',
      opacity: 0.5,
      my: 0,
    }}
  />
);

const ProseSection = ({ children }: { children: ReactNode }) => (
  <Box
    component="section"
    sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
  >
    {children}
  </Box>
);

const ProjectSlot4Page = () => {
  usePageMeta({
    title: 'This site, agent-augmented — case study — Svetlin Galov',
    description:
      'How I rebuilt my personal site with Claude Code as a working teammate. The harness, the rules, the review loop, and an honest accounting.',
    og: {
      title: 'This site, agent-augmented — case study',
      description:
        'How I rebuilt my personal site with Claude Code as a working teammate.',
      type: 'article',
    },
  });

  return (
    <Box
      component="main"
      id="main-content"
      sx={{ minHeight: 'calc(100vh - 64px)', pt: 'var(--space-8)', pb: 'var(--space-9)' }}
    >
      <Container>
        {/* Prose-width wrapper */}
        <Box sx={{ maxWidth: 'var(--prose)', mx: 'auto' }}>
          <Box
            component="article"
            sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}
          >
            {/* Hero */}
            <Box
              component="header"
              sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
            >
              <Label color="var(--accent)">CASE STUDY · AGENTIC ENGINEERING</Label>
              <Box
                component="h1"
                sx={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: { xs: '2rem', sm: '2.75rem' },
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: 'var(--fg)',
                  m: 0,
                  textWrap: 'balance',
                }}
              >
                This site, agent-augmented
              </Box>
              <Box
                component="p"
                sx={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-body-xl)',
                  lineHeight: 1.65,
                  color: 'var(--fg-muted)',
                  m: 0,
                }}
              >
                How I rebuilt my personal site with Claude Code as a working teammate.
                The harness, the rules, the review loop — and an honest accounting of
                what the agents did, what I curated, and what didn&apos;t work the first time.
              </Box>
              <Box sx={{ mt: 'var(--space-2)' }}>
                <TagRow
                  tags={[
                    'agentic engineering',
                    'Claude Code',
                    'dev tooling',
                    'TypeScript',
                    'MDX',
                    'Vite',
                  ]}
                />
              </Box>
            </Box>

            <SectionDivider />

            {/* Section: What it is */}
            <ProseSection>
              <Box
                component="h2"
                sx={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '1.5rem',
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  color: 'var(--fg)',
                  m: 0,
                }}
              >
                What it is
              </Box>
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
                You&apos;re reading it. A static Vite + React SPA + MDX site, served behind a
                thin .NET host. The point isn&apos;t the stack — it&apos;s the workflow underneath.
                Every commit on this site went through the same harness I use at VSG for
                production work, just smaller-stakes so I could iterate on the harness itself.
              </Box>
            </ProseSection>

            <SectionDivider />

            {/* Section: The harness */}
            <ProseSection>
              <Box
                component="h2"
                sx={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '1.5rem',
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  color: 'var(--fg)',
                  m: 0,
                }}
              >
                The harness
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
                Three pieces: orchestrators that drive multi-step work, a skill library the
                agent reaches for, and a persistent memory layer so sessions don&apos;t start cold.
              </Box>

              <CodeBlock filename=".claude/skills/ship-feature/SKILL.md" lang="md">
                {`# Ship a feature

1. Read the issue. If it's ambiguous, GRILL the user before planning.
2. Skim affected files. Reach for skills: vsa-tdd, vertical-slice-discipline.
3. Draft a plan. Surface trade-offs. Wait for "go".
4. Implement in one slice. Tests first when the contract is clear.
5. Self-review against .claude/rules/review-checklist.md.
6. Hand off to /afk-reviewer for second pass.
7. Open PR only after both passes are clean.

If at any step you feel the work is bigger than the issue claimed,
STOP and surface the size delta. Do not silently scope-creep.`}
              </CodeBlock>

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
                The skill library is the surface area: each skill is a discrete capability
                the agent can compose. Skills are versioned, written in plain markdown, and
                live alongside the code they govern.
              </Box>

              <CodeBlock filename=".claude/rules/vsa-tdd.md" lang="md">
                {`# Vertical-slice TDD

When implementing a feature, structure work as a vertical slice:
endpoint → handler → domain → persistence → tests, in that order.

Write the integration test FIRST against the endpoint signature.
It should fail with a clear "not implemented" message.
Then walk the slice inward, making the test pass one layer at a time.

Refuse to write a domain method without a failing test calling it.
Refuse to add a persistence method without a domain method needing it.

If asked to "just add a quick endpoint," push back: name what the slice would be.`}
              </CodeBlock>
            </ProseSection>

            <SectionDivider />

            {/* Section: What a change looks like */}
            <ProseSection>
              <Box
                component="h2"
                sx={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '1.5rem',
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  color: 'var(--fg)',
                  m: 0,
                }}
              >
                What a change looks like
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
                Here&apos;s the rule that governs how documentation is written and maintained
                across this project:
              </Box>

              <CodeBlock filename=".claude/rules/documentation-creator.md" lang="md">
                {`## Documentation Methodology

This project follows a rigorous, multi-tiered documentation strategy.
Documentation is treated as code: it must be kept current,
linked properly, and written with clear boundaries between layers.

Every doc has one job. If you find yourself summarizing another doc,
you are in the wrong layer.

| Level          | Document             | Location                    |
|----------------|----------------------|-----------------------------|
| Macro / Domain | Ubiquitous Language  | docs/UBIQUITOUS_LANGUAGE.md |
| Macro / Map    | Architecture         | docs/architecture.md        |
| Micro          | Feature Readmes      | Features/{Name}/README.md   |`}
              </CodeBlock>
            </ProseSection>

            <SectionDivider />

            {/* Section: What it's not — pull-quote with left rule */}
            <Box
              component="section"
              sx={{
                borderLeft: '1px solid var(--border-strong)',
                pl: 'var(--space-5)',
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
                  fontStyle: 'italic',
                  m: 0,
                  mb: 'var(--space-3)',
                }}
              >
                What this is not
              </Box>
              <Box
                component="p"
                sx={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.7,
                  color: 'var(--fg-muted)',
                  fontStyle: 'italic',
                  m: 0,
                }}
              >
                Not a generic AI-coding pitch. Not a productivity-hack post. Not a claim that
                agents replace senior engineering judgment. Most of the work I do on this
                harness is figuring out where to draw the line — what an agent should never
                do unattended, what I want it to push back on, what I&apos;m willing to be wrong about.
              </Box>
            </Box>

            <SectionDivider />

            {/* Section: Where this is heading */}
            <ProseSection>
              <Box
                component="h2"
                sx={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '1.5rem',
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  color: 'var(--fg)',
                  m: 0,
                }}
              >
                Where this is heading
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
                The skill library is going public this quarter; the orchestrators will follow.{' '}
                <em>Brochures</em>, the consumer tool, is the same pattern applied to a
                non-engineering domain — different harness, same shape. See the{' '}
                <Box
                  component={Link}
                  to="/projects"
                  sx={{
                    color: 'var(--accent)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '0.15em',
                    textDecorationThickness: '1px',
                    '&:hover': {
                      color: 'var(--accent-strong)',
                      textDecorationThickness: '2px',
                    },
                  }}
                >
                  projects list
                </Box>{' '}
                for what&apos;s queued.
              </Box>
            </ProseSection>

            {/* NextProject footer */}
            <Box sx={{ mt: 'var(--space-5)' }}>
              <Box
                component={Link}
                to="/projects"
                aria-label="Next project"
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
                <Card
                  padding="var(--space-6)"
                  style={{
                    background: 'transparent',
                    borderColor: 'var(--border)',
                  }}
                >
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      gap: 'var(--space-4)',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Label>Next project</Label>
                      <Box
                        component="div"
                        sx={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: '1.375rem',
                          lineHeight: 1.3,
                          color: 'var(--fg)',
                          mt: 'var(--space-2)',
                        }}
                      >
                        All projects
                      </Box>
                    </Box>
                    <Box
                      aria-hidden
                      sx={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-body-xl)',
                        color: 'var(--fg-dim)',
                        lineHeight: 1,
                      }}
                    >
                      →
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectSlot4Page;

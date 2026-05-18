import { Box } from '@mui/material';
import { Link } from "react-router-dom";

interface NextProjectProps {
    projectName: string;
    projectSlug: string;
}

const NextProject = ({ projectName, projectSlug }: NextProjectProps) => {
    return (
        <Box
            component="div"
            sx={{
                marginTop: 'var(--space-9)',
                paddingTop: 'var(--space-6)',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-4)',
                textAlign: 'center',
            }}
        >
            <Box
                component="span"
                sx={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--fg-dim)',
                }}
            >
                Next project
            </Box>
            <Box
                component="h3"
                sx={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '1.75rem',
                    lineHeight: 1.3,
                    color: 'var(--fg)',
                    margin: 0,
                }}
            >
                {projectName}
            </Box>
            <Box
                component={Link}
                to={`/projects/${projectSlug}`}
                aria-label={projectName}
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    padding: 'var(--space-3) var(--space-6)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-3)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--fg-muted)',
                    textDecoration: 'none',
                    transition: 'border-color var(--duration) var(--ease), color var(--duration) var(--ease)',
                    '&:hover': {
                        borderColor: 'var(--border-strong)',
                        color: 'var(--fg)',
                    },
                    '&:hover .arrow-span': { transform: 'translateX(3px)' },
                }}
            >
                View project <Box component="span" className="arrow-span" sx={{ display: 'inline-block', marginLeft: 'var(--space-1)', transition: 'transform var(--duration) var(--ease)' }}>→</Box>
            </Box>
        </Box>
    );
}

export default NextProject;

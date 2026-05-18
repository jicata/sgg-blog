import { Box } from '@mui/material';

interface SectionProps {
    label: string;
    children: React.ReactNode;
}

const Section = ({ label, children }: SectionProps) => {
    return (
        <Box
            component="section"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-5)',
                paddingBottom: 'var(--space-7)',
                borderBottom: '1px solid var(--border)',
                '& + section': {
                    marginTop: 'var(--space-7)',
                },
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
                {label}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-4)',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

export default Section;

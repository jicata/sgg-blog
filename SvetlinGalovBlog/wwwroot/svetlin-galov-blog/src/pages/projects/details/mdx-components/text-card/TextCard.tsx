import { Box } from '@mui/material';

interface TextCardProps {
    bulletNumber?: string;
    heading: string;
    children: React.ReactNode;
}

const TextCard = ({ bulletNumber, heading, children = '' }: TextCardProps) => {
    return (
        <Box
            sx={{
                borderBottom: '1px solid var(--border)',
                paddingTop: 'var(--space-4)',
                paddingBottom: 'var(--space-4)',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'flex-start', md: 'flex-start' },
                gap: { xs: 'var(--space-2)', md: 'var(--space-6)' },
                '& + &': {
                    marginTop: 0,
                },
            }}
        >
            {bulletNumber && (
                <Box
                    component="span"
                    sx={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6875rem',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--fg-dim)',
                        minWidth: '2rem',
                        paddingTop: 'var(--space-1)',
                        flexShrink: 0,
                    }}
                >
                    {bulletNumber}
                </Box>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <Box
                    component="h3"
                    sx={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '1.0625rem',
                        lineHeight: 1.4,
                        color: 'var(--fg)',
                        margin: 0,
                    }}
                >
                    {heading}
                </Box>
                <Box
                    sx={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        color: 'var(--fg-muted)',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default TextCard;

import { Box } from '@mui/material';

interface BeforeAfterCardProps {
    heading: string;
    beforeText: string;
    afterText: string;
}

const BeforeAfterCard = ({ heading, beforeText, afterText }: BeforeAfterCardProps) => {
    return (
        <Box
            sx={{
                backgroundColor: 'var(--surface-1)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-3)',
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                flex: 1,
            }}
        >
            <Box
                component="h4"
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
                Before
            </Box>
            <Box
                component="p"
                sx={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    lineHeight: 1.55,
                    color: 'var(--fg-muted)',
                    margin: 0,
                }}
            >
                {beforeText}
            </Box>
            <Box sx={{ borderBottom: '1px solid var(--border)' }} />
            <Box
                component="span"
                sx={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--accent)',
                }}
            >
                After
            </Box>
            <Box
                component="p"
                sx={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    lineHeight: 1.55,
                    color: 'var(--fg-muted)',
                    margin: 0,
                }}
            >
                {afterText}
            </Box>
        </Box>
    );
}

export default BeforeAfterCard;

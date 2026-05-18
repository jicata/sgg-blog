import { Box } from '@mui/material';

interface StatCardProps {
    statNumber: string;
    statDescription: string;
}

const StatCard = ({ statNumber, statDescription }: StatCardProps) => {
    return (
        <Box
            sx={{
                backgroundColor: 'var(--surface-1)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-3)',
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                flex: 1,
            }}
        >
            <Box
                component="span"
                sx={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    fontSize: '2.25rem',
                    lineHeight: 1.1,
                    color: 'var(--accent)',
                }}
            >
                {statNumber}
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
                {statDescription}
            </Box>
        </Box>
    );
}

export default StatCard;

import { Box } from '@mui/material';

interface ClusterProps {
    className?: string;
    children: React.ReactNode;
}

const Cluster = ({ children }: ClusterProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 'var(--space-4)',
                paddingTop: 'var(--space-4)',
            }}
        >
            {children}
        </Box>
    );
}

export default Cluster;

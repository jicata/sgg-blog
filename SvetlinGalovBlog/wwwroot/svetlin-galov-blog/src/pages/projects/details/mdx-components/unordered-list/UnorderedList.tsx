import { Box } from '@mui/material';
import React from "react";

interface UnorderedListProps {
    children: React.ReactNode;
}

const UnorderedList = ({ children }: UnorderedListProps) => {
    return (
        <Box
            component="ul"
            sx={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {React.Children.map(children, (child, index) => (
                <Box
                    component="li"
                    key={index}
                    sx={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        color: 'var(--fg-muted)',
                        padding: { xs: 'var(--space-4) 0', md: 'var(--space-5) 0' },
                        borderBottom: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--space-3)',
                        '&::before': {
                            content: '"•"',
                            display: 'inline',
                            color: 'var(--accent)',
                            fontFamily: 'var(--font-mono)',
                            flexShrink: 0,
                            paddingTop: '0.1em',
                        },
                        '& p': {
                            display: 'inline',
                            margin: 0,
                        },
                    }}
                >
                    {child}
                </Box>
            ))}
        </Box>
    );
}

export default UnorderedList;

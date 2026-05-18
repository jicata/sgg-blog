import { Box } from '@mui/material';
import type { ReactNode, KeyboardEvent, MouseEvent, AriaAttributes } from 'react';

interface CardProps extends AriaAttributes {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement>) => void;
  padding?: string;
  radius?: string;
  style?: React.CSSProperties;
}

const Card = ({ children, onClick, padding = 'var(--space-6)', radius = 'var(--radius-3)', style = {}, ...ariaProps }: CardProps) => {
  const interactive = !!onClick;

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      onClick?.(e as unknown as MouseEvent<HTMLButtonElement>);
    }
  };

  const baseStyle: React.CSSProperties = {
    background: 'var(--surface-1)',
    border: '1px solid var(--border)',
    borderRadius: radius,
    padding,
    cursor: interactive ? 'pointer' : 'default',
    transition: 'background var(--duration) var(--ease), border-color var(--duration) var(--ease)',
    width: '100%',
    textAlign: 'left',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: 'inherit',
    ...style,
  };

  if (interactive) {
    return (
      <Box
        component="button"
        type="button"
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        onKeyDown={handleKeyDown}
        {...ariaProps}
        sx={{
          ...baseStyle,
          display: 'block',
          '&:hover': {
            background: 'var(--surface-2)',
            borderColor: 'var(--border-strong)',
          },
          '&:focus-visible': {
            outline: '2px solid var(--focus)',
            outlineOffset: '2px',
          },
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      component="div"
      {...ariaProps}
      sx={{
        ...baseStyle,
        display: 'block',
      }}
    >
      {children}
    </Box>
  );
};

export default Card;

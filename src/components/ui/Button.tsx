import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = {
    padding: '20px 40px',
    borderRadius: '30px',
    border: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    height: '48px',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-white)',
    },
    secondary: {
      backgroundColor: '#E6F0F2', // Light teal/gray
      color: 'var(--color-primary)',
    },
    outline: {
      backgroundColor: 'transparent',
      border: '1px solid var(--color-border)',
      color: 'var(--color-text-main)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary)',
      padding: '8px 16px',
      height: 'auto', // Ghost buttons might not need fixed height
    }
  };

  const style = {
    ...baseStyles,
    ...variants[variant],
    width: fullWidth ? '100%' : (variant === 'primary' ? '512px' : 'auto'),
    maxWidth: '100%', // Ensure it doesn't overflow on small screens
    opacity: props.disabled ? 0.6 : 1,
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    margin: variant === 'primary' ? '0 auto' : undefined, // Center primary buttons
  };

  return (
    <button style={style} className={className} {...props}>
      {children}
    </button>
  );
};

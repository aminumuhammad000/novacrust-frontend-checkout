import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    maxWidth?: string;
    height?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', maxWidth = '500px', height = '580px' }) => {
    const style: React.CSSProperties = {
        backgroundColor: 'var(--color-white)',
        borderRadius: '30px',
        padding: '28px', // Reduced padding for smaller width
        minWidth: '440px',
        width: '100%',
        maxWidth: maxWidth,
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--color-border)',
        margin: '0 auto',
        height: height,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'height 0.3s ease, max-width 0.3s ease', // Smooth transition for both
    };

    return (
        <div style={style} className={className}>
            {children}
        </div>
    );
};

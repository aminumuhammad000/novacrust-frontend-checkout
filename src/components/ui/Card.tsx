import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    const style: React.CSSProperties = {
        backgroundColor: 'var(--color-white)',
        borderRadius: '30px',
        padding: '40px 64px 56px 64px',
        width: '100%',
        maxWidth: '640px',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--color-border)',
        margin: '0 auto',
        height: '758px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    };

    return (
        <div style={style} className={className}>
            {children}
        </div>
    );
};

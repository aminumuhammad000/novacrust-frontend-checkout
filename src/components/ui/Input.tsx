import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    rightElement,
    className = '',
    style,
    ...props
}) => {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
    };

    const inputWrapperStyle: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '16px',
        paddingRight: rightElement ? '48px' : '16px',
        borderRadius: 'var(--radius-full)',
        border: `1px solid ${error ? 'var(--color-error)' : 'var(--color-border)'}`,
        backgroundColor: 'var(--color-white)',
        fontSize: '1rem',
        outline: 'none',
        color: 'var(--color-text-main)',
    };

    const labelStyle: React.CSSProperties = {
        fontWeight: 600,
        fontSize: '0.95rem',
        color: 'var(--color-text-main)',
    };

    return (
        <div style={containerStyle} className={className}>
            {label && <label style={labelStyle}>{label}</label>}
            <div style={inputWrapperStyle}>
                <input
                    style={{ ...inputStyle, ...style }}
                    {...props}
                />
                {rightElement && (
                    <div style={{ position: 'absolute', right: '16px' }}>
                        {rightElement}
                    </div>
                )}
            </div>
            {error && <span style={{ color: 'var(--color-error)', fontSize: '0.875rem' }}>{error}</span>}
        </div>
    );
};

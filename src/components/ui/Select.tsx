import React from 'react';

interface SelectOption {
    value: string;
    label: string;
    icon?: string;
}

interface SelectProps {
    label?: string;
    value?: string;
    options?: SelectOption[];
    placeholder?: string;
    onClick?: () => void;
    className?: string;
}

export const Select: React.FC<SelectProps> = ({
    label,
    value,
    placeholder = 'Select an option',
    onClick,
    className = '',
}) => {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
        cursor: 'pointer',
    };

    const selectBoxStyle: React.CSSProperties = {
        width: '100%',
        padding: '16px',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-white)',
        fontSize: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: value ? 'var(--color-text-main)' : 'var(--color-text-secondary)',
    };

    const labelStyle: React.CSSProperties = {
        fontWeight: 600,
        fontSize: '0.8rem',
        color: 'var(--color-text-main)',
    };

    return (
        <div style={containerStyle} onClick={onClick} className={className}>
            {label && <label style={labelStyle}>{label}</label>}
            <div style={selectBoxStyle}>
                <span>{value || placeholder}</span>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#013941" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
};

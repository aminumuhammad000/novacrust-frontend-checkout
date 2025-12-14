import React from 'react';
import { Button } from '../ui/Button';

interface SuccessScreenProps {
    onHome: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onHome }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'var(--color-success)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                color: 'white',
                fontSize: '40px'
            }}>
                ✓
            </div>
            <h2 className="text-xl font-bold mb-2">Your transaction is processing.</h2>
            <p className="text-secondary mb-8">The recipient will receive it shortly.</p>

            <div style={{
                backgroundColor: '#F9FAFB',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                width: '100%',
                marginBottom: '32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span className="text-secondary">Transaction ID</span>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">NC123456789</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </div>
            </div>

            <Button variant="ghost" onClick={onHome} style={{ fontWeight: 700 }}>
                Go back to home
            </Button>
        </div>
    );
};

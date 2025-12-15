import React, { useState } from 'react';
import logoImg from '../../assets/NC BlackTrans BG.png';
import checkCircleImg from '../../assets/CheckCircle.png';

interface SuccessScreenProps {
    onHome: () => void;
}

export const SuccessWidget: React.FC<SuccessScreenProps> = ({ onHome }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText('NC123456789');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="bg-white flex flex-col items-center relative mx-auto" style={{
            width: '640px',
            height: '640px',
            borderRadius: '30px',
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            padding: '40px 64px 56px 64px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden', // Ensure content stays within the fixed box
        }}>
            {/* Logo */}
            <div className="flex justify-center" style={{ marginTop: '44px', marginBottom: '66px' }}>
                <img src={logoImg} alt="Novacrust" style={{ width: '177px', height: '24px' }} />
            </div>

            {/* Success Icon */}
            <div className="flex items-center justify-center" style={{ width: '80px', height: '80px', marginBottom: '32px' }}>
                <img src={checkCircleImg} alt="Success" style={{ width: '100%', height: '100%' }} />
            </div>

            {/* Text */}
            <h2 style={{
                fontFamily: 'Outfit',
                fontWeight: 500,
                fontSize: '24px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#000E10',
                marginBottom: '12px'
            }}>
                Your transaction is processing.
            </h2>
            <p style={{
                fontFamily: 'Outfit',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#64748B',
                marginBottom: '48px'
            }}>
                The recipient will receive it shortly.
            </p>

            {/* Transaction ID */}
            <div style={{
                width: '100%', // 512px effectively (640 - 128 padding)
                height: '56px',
                borderRadius: '10px',
                padding: '16px 24px',
                gap: '24px',
                backgroundColor: '#F7F7F7',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '64px' // Assuming spacing to next element
            }}>
                <span className="text-[#64748B]">Transaction ID</span>
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#0F3D3E]">NC123456789</span>
                    <button
                        onClick={handleCopy}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        className="hover:opacity-80 transition-opacity"
                        title="Copy Transaction ID"
                    >
                        {copied ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#013941" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Home Button */}
            <button
                onClick={onHome}
                style={{
                    fontFamily: 'Instrument Sans',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#0F3D3E',
                    width: '129px',
                    height: '20px',
                    border: 'none',
                    background: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    marginTop: 'auto'
                }}
                className="hover:underline"
            >
                Go back to home
            </button>
        </div>
    );
};

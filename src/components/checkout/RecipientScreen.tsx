import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import type { TransactionData } from './CheckoutFlow';
import CaretDown from '../../assets/CaretDown.png';

interface RecipientScreenProps {
    data: TransactionData;
    onUpdate: (updates: Partial<TransactionData>) => void;
    onNext: () => void;
    onBack: () => void;
}

const BANKS = [
    { id: 'access', name: 'Access Bank' },
    { id: 'gtb', name: 'Guaranty Trust Bank' },
    { id: 'zenith', name: 'Zenith Bank' },
    { id: 'uba', name: 'United Bank for Africa' },
    { id: 'opay', name: 'OPay' },
];

export const RecipientScreen: React.FC<RecipientScreenProps> = ({
    data,
    onUpdate,
    onNext,
    onBack,
}) => {
    const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);
    const [isLoadingName, setIsLoadingName] = useState(false);

    // Simulate name lookup when account number is 10 digits
    useEffect(() => {
        // Clear "New Recipient" placeholder from previous screen
        if (data.recipientName === 'New Recipient') {
            onUpdate({ recipientName: '' });
            return;
        }

        // Only lookup if we don't already have a name (unless it's being edited)
        // If data was pre-filled from ConversionScreen, we might already have a name.
        // But if user changes account number, we should re-lookup.
        if (data.accountNumber.length === 10 && data.bankName && !data.recipientName) {
            setIsLoadingName(true);
            // Mock API call
            const timer = setTimeout(() => {
                onUpdate({ recipientName: 'ODUTUGA GBEKE' });
                setIsLoadingName(false);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (data.accountNumber.length < 10 && data.recipientName && !['Aminu Muhammad', 'Aminu Muhd'].includes(data.recipientName)) {
            // Clear name if account number is invalid, but only if it's not one of our saved mocks
        }
    }, [data.accountNumber, data.bankName, onUpdate, data.recipientName]);

    const isValid = data.bankName && data.accountNumber.length >= 10 && data.recipientName;

    const [searchQuery, setSearchQuery] = useState('');

    const filteredBanks = BANKS.filter(bank =>
        bank.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full">
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            <div className="flex items-center relative" style={{ justifyContent: 'center', marginBottom: '24px' }}>
                <button
                    onClick={onBack}
                    style={{
                        padding: 0,
                        position: 'absolute',
                        left: '40px', // Adjusted left position since container is smaller
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5" stroke="#013941" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 19L5 12L12 5" stroke="#013941" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <h2 style={{
                    fontFamily: 'Outfit',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#013941'
                }}>Recipient details</h2>
            </div>

            <div className="flex flex-col flex-1" style={{ width: '100%', height: 'auto', gap: '20px', margin: '20px auto' }}>
                {/* Bank Selection */}
                <div style={{ position: 'relative' }}>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 500, fontSize: '16px', lineHeight: '100%', color: '#013941', marginBottom: '8px' }}>Bank</div>
                    <div
                        onClick={() => setIsBankDropdownOpen(!isBankDropdownOpen)}
                        style={{
                            border: '1px solid #E5E7EB',
                            borderRadius: '30px',
                            padding: '0 24px',
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: '52px'
                        }}
                    >
                        <span style={{ color: data.bankName ? '#013941' : '#9CA3AF', fontFamily: 'Outfit', fontWeight: 400, fontSize: '16px' }}>
                            {data.bankName || 'Select an option'}
                        </span>
                        <img src={CaretDown} alt="" style={{ width: '12px', height: 'auto' }} />
                    </div>

                    {isBankDropdownOpen && (
                        <>
                            <div
                                style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                                onClick={() => {
                                    setIsBankDropdownOpen(false);
                                    setSearchQuery('');
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '60px', // Adjusted for shorter input
                                right: '0',
                                width: '280px', // Reduced width as requested
                                backgroundColor: 'white',
                                borderRadius: '24px',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                                zIndex: 50,
                                padding: '16px',
                                border: '1px solid var(--color-border)',
                                animation: 'fadeIn 0.2s ease-out'
                            }}>
                                <div style={{
                                    border: '1px solid var(--color-border)',
                                    borderRadius: 'var(--radius-full)',
                                    padding: '12px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '16px'
                                }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                        style={{
                                            border: 'none',
                                            outline: 'none',
                                            width: '100%',
                                            fontSize: '1rem',
                                            color: 'var(--color-text-main)'
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col gap-2" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    {filteredBanks.map(bank => (
                                        <div
                                            key={bank.id}
                                            onClick={() => {
                                                onUpdate({ bankName: bank.name });
                                                setIsBankDropdownOpen(false);
                                                setSearchQuery('');
                                            }}
                                            style={{
                                                padding: '12px 16px',
                                                borderRadius: 'var(--radius-md)',
                                                backgroundColor: '#F9FAFB',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                fontWeight: 600,
                                                fontFamily: 'Outfit',
                                                color: 'var(--color-text-main)'
                                            }}
                                        >
                                            {bank.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Account Number Input */}
                <div>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 500, fontSize: '16px', lineHeight: '100%', color: '#013941', marginBottom: '8px' }}>Account number</div>
                    <input
                        type="text"
                        placeholder="Enter your account number"
                        value={data.accountNumber}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            if (val !== data.accountNumber) {
                                onUpdate({ accountNumber: val, recipientName: '' });
                            }
                        }}
                        style={{
                            width: '100%',
                            height: '52px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '30px',
                            padding: '0 24px',
                            fontFamily: 'Outfit',
                            fontSize: '16px',
                            outline: 'none',
                            color: '#013941'
                        }}
                    />
                </div>

                {/* Account Name Display */}
                <div>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 500, fontSize: '16px', lineHeight: '100%', color: '#013941', marginBottom: '8px' }}>Account number</div>
                    <div style={{
                        width: '100%',
                        height: '52px',
                        backgroundColor: '#F3F4F6',
                        borderRadius: '30px',
                        padding: '0 24px',
                        display: 'flex',
                        alignItems: 'center',
                        fontFamily: 'Outfit',
                        fontSize: '16px',
                        color: '#013941',
                        fontWeight: 500
                    }}>
                        {isLoadingName ? (
                            <span className="text-gray-400">Verifying...</span>
                        ) : (
                            data.recipientName || ''
                        )}
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '24px' }}>
                <Button
                    fullWidth
                    onClick={onNext}
                    disabled={!isValid}
                    style={{
                        backgroundColor: '#013941',
                        borderRadius: '30px',
                        height: '48px',
                        width: '100%',
                        padding: '0 40px',
                        fontSize: '16px',
                        fontWeight: 700,
                        fontFamily: 'Instrument Sans',
                        color: '#E6FBF2',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        border: 'none'
                    }}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};


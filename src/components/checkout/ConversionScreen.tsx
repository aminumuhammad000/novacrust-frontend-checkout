import React, { useState } from 'react';
import { Button } from '../ui/Button';
import type { TransactionData } from './CheckoutFlow';
import CaretDown from '../../assets/CaretDown.png';

interface ConversionScreenProps {
    data: TransactionData;
    onUpdate: (updates: Partial<TransactionData>) => void;
    onNext: () => void;
}

interface CryptoOption {
    value: string;
    label: string;
    icon: string;
    displayLabel: string;
}

interface FiatOption {
    value: string;
    label: string;
    icon: string;
    displayLabel: string;
}

interface WalletOption {
    id: string;
    name: string;
    icon: string;
}

interface RecipientOption {
    id: string;
    name: string;
    icon: string;
    bankName?: string;
    accountNumber?: string;
}

const CRYPTO_OPTIONS: CryptoOption[] = [
    { value: 'ETH', label: 'ETH', icon: '/src/assets/eth.png', displayLabel: 'ETH' },
    { value: 'USDT-CELO', label: 'USDT - CELO', icon: '/src/assets/USDT-CELO.png', displayLabel: 'CELO' },
    { value: 'USDT-TON', label: 'USDT - TON', icon: '/src/assets/USDT-TON.png', displayLabel: 'TON' },
    { value: 'USDT-BNB', label: 'USDT - BNB', icon: '/src/assets/USDT-BNB.png', displayLabel: 'BNB' },
];

// const FIAT_OPTIONS = [
//     { value: 'NGN', label: 'NGN' },
//     { value: 'KES', label: 'KES' },
//     { value: 'GHS', label: 'GHS' },
const FIAT_OPTIONS: FiatOption[] = [
    { value: 'NGN', label: 'NGN', icon: '/src/assets/nigeria.png', displayLabel: 'NGN' },
    { value: 'KES', label: 'KES', icon: '/src/assets/kenya.png', displayLabel: 'KES' },
    { value: 'GHS', label: 'GHS', icon: '/src/assets/ghana.png', displayLabel: 'GHS' },
];

const WALLET_OPTIONS: WalletOption[] = [
    { id: 'metamask', name: 'Metamask', icon: '🦊' },
    { id: 'rainbow', name: 'Rainbow', icon: '🌈' },
    { id: 'walletconnect', name: 'WalletConnect', icon: '/src/assets/WalletConnect.png' },
    { id: 'other', name: 'Other Crypto Wallets', icon: '/src/assets/Wallet.png' },
];

const RECIPIENT_OPTIONS: RecipientOption[] = [
    { id: 'new', name: 'New Recipient', icon: '/src/assets/add_recipient.png' },
    { id: 'saved_1', name: 'Aminu Muhammad', icon: '🏦', bankName: 'Guaranty Trust Bank', accountNumber: '0123456789' },
    { id: 'saved_2', name: 'Aminu Muhd', icon: '🏦', bankName: 'Access Bank', accountNumber: '9876543210' },
];

export const ConversionScreen: React.FC<ConversionScreenProps> = ({
    data,
    onUpdate,
    onNext,
}) => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        onUpdate({ payAmount: val, receiveAmount: val });
    };

    const isValid = Number(data.payAmount) > 0 && data.wallet;

    const selectedCrypto = CRYPTO_OPTIONS.find(c => c.value === data.payCurrency) || CRYPTO_OPTIONS[0];
    const selectedFiat = FIAT_OPTIONS.find(f => f.value === data.receiveCurrency) || FIAT_OPTIONS[0];

    const filteredOptions = (options: any[], type: 'crypto' | 'fiat' | 'wallet' | 'recipient') => {
        if (!searchQuery) return options;
        const lowerQuery = searchQuery.toLowerCase();
        return options.filter(opt => {
            if (type === 'wallet' || type === 'recipient') {
                return (opt as WalletOption | RecipientOption).name.toLowerCase().includes(lowerQuery);
            } else {
                return (opt as CryptoOption | FiatOption).label.toLowerCase().includes(lowerQuery) ||
                    (opt as CryptoOption | FiatOption).value.toLowerCase().includes(lowerQuery);
            }
        });
    };

    const renderDropdown = (
        options: any[],
        onSelect: (val: any) => void,
        type: 'crypto' | 'fiat' | 'wallet' | 'recipient'
    ) => (
        <>
            <div
                style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                onClick={() => {
                    setActiveDropdown(null);
                    setSearchQuery('');
                }}
            />
            <div style={{
                position: 'absolute',
                top: '70px', // Adjusted for taller input
                right: '0',
                width: '100%', // Match container width
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
                            fontSize: '0.6rem',
                            color: 'var(--color-text-main)'
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {filteredOptions(options, type).map((option: any) => (
                        <div
                            key={option.value || option.id}
                            onClick={() => {
                                onSelect(option.value || option.id);
                                setActiveDropdown(null);
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
                            {option.icon.startsWith('/') ? (
                                <img src={option.icon} alt={option.label || option.name} style={{ width: '24px', height: '24px' }} />
                            ) : (
                                <span style={{ fontSize: '1.5rem' }}>{option.icon}</span>
                            )}
                            {option.label || option.name}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

    return (
        <div className="flex flex-col h-full">
            <style>{`
                input[type=number]::-webkit-inner-spin-button, 
                input[type=number]::-webkit-outer-spin-button { 
                    -webkit-appearance: none; 
                    margin: 0; 
                }
                input[type=number] {
                    -moz-appearance: textfield;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Header Tabs */}
            <div className="flex justify-center" style={{ marginBottom: '24px' }}>
                <div style={{
                    backgroundColor: '#F3F4F6',
                    padding: '4px',
                    borderRadius: '34px',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center'
                }}>
                    <Button
                        variant="primary"
                        style={{
                            width: '110px',
                            height: '34px',
                            borderRadius: '25px',
                            padding: '6px 12px',
                            fontSize: '14px',
                            fontWeight: 500,
                            fontFamily: 'Outfit',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            color: '#F8FEFB',
                            whiteSpace: 'nowrap',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#013941',
                            border: '1px solid #E0E0E0'
                        }}
                    >
                        Crypto to cash
                    </Button>
                    <Button
                        variant="ghost"
                        style={{
                            width: '110px',
                            border: 'none',
                            height: '34px',
                            borderRadius: '25px',
                            padding: '6px 12px',
                            fontSize: '14px',
                            color: '#828282',
                            fontWeight: 500,
                            fontFamily: 'Outfit',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            whiteSpace: 'nowrap',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        Cash to crypto
                    </Button>
                    <Button
                        variant="ghost"
                        style={{
                            width: '140px',
                            height: '34px',
                            border: 'none',
                            borderRadius: '25px',
                            padding: '6px 12px',
                            fontSize: '14px',
                            color: '#828282',
                            fontWeight: 500,
                            fontFamily: 'Outfit',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            whiteSpace: 'nowrap',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        Crypto to fiat loan
                    </Button>
                </div>
            </div>

            <div className="flex flex-col flex-1" style={{ width: '100%', height: 'auto', gap: '16px', margin: '0 auto' }}>
                {/* Pay Section */}
                <div style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '12px',
                    position: 'relative',
                    zIndex: activeDropdown === 'pay' ? 50 : 1
                }}>
                    <div className="text-secondary text-sm mb-2">You pay</div>
                    <div className="flex justify-between items-center">
                        <input
                            type="number"
                            value={data.payAmount}
                            onChange={handleAmountChange}
                            style={{
                                fontFamily: 'Outfit',
                                fontSize: '18px',
                                fontWeight: 600,
                                lineHeight: '100%',
                                letterSpacing: '0%',
                                border: 'none',
                                outline: 'none',
                                width: '100%',
                                color: 'var(--color-text-main)'
                            }}
                        />
                        <div
                            onClick={() => setActiveDropdown('pay')}
                            style={{
                                backgroundColor: '#F3F4F6',
                                padding: '8px 12px',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontWeight: 500,
                                width: '100px',
                                height: '36px',
                                justifyContent: 'center'
                            }}
                        >
                            <img src={selectedCrypto.icon} alt={selectedCrypto.displayLabel} style={{ width: '20px', height: '20px' }} />
                            {selectedCrypto.displayLabel}
                            <img src={CaretDown} alt="" style={{ width: '12px', height: 'auto' }} />
                        </div>
                    </div>
                    {activeDropdown === 'pay' && renderDropdown(CRYPTO_OPTIONS, (val) => onUpdate({ payCurrency: val }), 'crypto')}
                </div>

                {/* Receive Section */}
                <div style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '12px',
                    position: 'relative',
                    zIndex: activeDropdown === 'receive' ? 50 : 1
                }}>
                    <div className="text-secondary text-sm mb-2">You receive</div>
                    <div className="flex justify-between items-center">
                        <div style={{ fontFamily: 'Outfit', fontSize: '18px', fontWeight: 600, lineHeight: '100%', letterSpacing: '0%' }}>{data.receiveAmount}</div>
                        <div
                            onClick={() => setActiveDropdown('receive')}
                            style={{
                                backgroundColor: '#F3F4F6',
                                padding: '8px 12px',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontWeight: 500,
                                width: '100px',
                                height: '36px',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}>
                            <img src={selectedFiat.icon} alt={selectedFiat.displayLabel} style={{ width: '20px', height: '20px' }} />
                            {selectedFiat.displayLabel}
                            <img src={CaretDown} alt="" style={{ width: '12px', height: 'auto' }} />
                        </div>
                    </div>
                    {activeDropdown === 'receive' && renderDropdown(FIAT_OPTIONS, (val) => onUpdate({ receiveCurrency: val }), 'fiat')}
                </div>

                {/* Pay From Section */}
                <div style={{ position: 'relative', zIndex: activeDropdown === 'wallet' ? 50 : 1 }}>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 500, fontSize: '12px', lineHeight: '100%', letterSpacing: '0%', marginBottom: '8px' }}>Pay from</div>
                    <div
                        onClick={() => setActiveDropdown('wallet')}
                        style={{
                            border: '1px solid var(--color-border)',
                            borderRadius: '30px',
                            padding: '0 24px',
                            height: '52px',
                            cursor: 'pointer',
                            backgroundColor: '#F9FAFB',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        {data.wallet ? (
                            <span className="flex items-center gap-2" style={{ fontWeight: 400, fontFamily: 'Outfit' }}>
                                {(() => {
                                    const w = WALLET_OPTIONS.find(w => w.id === data.wallet);
                                    if (!w) return 'Select an option';
                                    return (
                                        <>
                                            {w.icon.startsWith('/') ? (
                                                <img src={w.icon} alt={w.name} style={{ width: '24px', height: '24px' }} />
                                            ) : (
                                                <span style={{ fontSize: '1.5rem' }}>{w.icon}</span>
                                            )}
                                            {w.name}
                                        </>
                                    );
                                })()}
                            </span>
                        ) : (
                            <span className="text-gray-400">Select an option</span>
                        )}
                        <img src={CaretDown} alt="" style={{ width: '12px', height: 'auto' }} />
                    </div>
                    {activeDropdown === 'wallet' && renderDropdown(WALLET_OPTIONS, (val) => onUpdate({ wallet: val }), 'wallet')}
                </div>

                {/* Pay To Section */}
                <div style={{ position: 'relative', zIndex: activeDropdown === 'recipient' ? 50 : 1 }}>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 500, fontSize: '12px', lineHeight: '100%', letterSpacing: '0%', marginBottom: '8px' }}>Pay to</div>
                    <div
                        onClick={() => setActiveDropdown('recipient')}
                        style={{
                            border: '1px solid var(--color-border)',
                            borderRadius: '30px',
                            padding: '0 24px',
                            height: '48px',
                            cursor: 'pointer',
                            backgroundColor: '#F9FAFB',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        {data.recipientName ? (
                            <span className="flex items-center gap-2" style={{ fontWeight: 400, fontFamily: 'Outfit' }}>
                                {(() => {
                                    // Find by name since we store the name in data.recipientName
                                    const r = RECIPIENT_OPTIONS.find(r => r.name === data.recipientName) || { name: data.recipientName, icon: '👤', id: 'custom' };
                                    return (
                                        <>
                                            {r.icon.startsWith('/') ? (
                                                <img src={r.icon} alt={r.name} style={{ width: '24px', height: '24px' }} />
                                            ) : (
                                                <span style={{ fontSize: '1.5rem' }}>{r.icon}</span>
                                            )}
                                            {r.name}
                                        </>
                                    );
                                })()}
                            </span>
                        ) : (
                            <span className="text-gray-400">Select an option</span>
                        )}
                        <img src={CaretDown} alt="" style={{ width: '12px', height: 'auto' }} />
                    </div>
                    {activeDropdown === 'recipient' && renderDropdown(RECIPIENT_OPTIONS, (val) => {
                        const selected = RECIPIENT_OPTIONS.find(r => r.id === val);
                        if (selected) {
                            if (selected.id === 'new') {
                                onUpdate({ recipientName: 'New Recipient', bankName: '', accountNumber: '' });
                            } else {
                                onUpdate({
                                    recipientName: selected.name,
                                    bankName: selected.bankName,
                                    accountNumber: selected.accountNumber
                                });
                            }
                        }
                    }, 'recipient')}
                </div>
            </div>

            <div style={{ marginTop: '24px' }}>
                <Button
                    fullWidth
                    onClick={onNext}
                    disabled={!isValid}
                >
                    Convert now
                </Button>
            </div>
        </div>
    );
};

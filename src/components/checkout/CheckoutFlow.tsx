import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { ConversionScreen } from './ConversionScreen';
import { RecipientScreen } from './RecipientScreen';
import { SuccessScreen } from './SuccessScreen';

export type CheckoutStep = 'conversion' | 'recipient';

export interface TransactionData {
    payAmount: string;
    receiveAmount: string;
    payCurrency: string;
    receiveCurrency: string;
    wallet: string;
    bankName: string;
    accountNumber: string;
    recipientName: string;
}

export const CheckoutFlow: React.FC = () => {
    const [step, setStep] = useState<CheckoutStep>('conversion');
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [data, setData] = useState<TransactionData>({
        payAmount: '1.00',
        receiveAmount: '1.00', // Mocked 1:1 rate for simplicity
        payCurrency: 'ETH',
        receiveCurrency: 'NGN',
        wallet: '',
        bankName: '',
        accountNumber: '',
        recipientName: '',
    });

    const handleNext = () => {
        if (step === 'conversion') setStep('recipient');
        else if (step === 'recipient') setIsSuccessOpen(true);
    };

    const handleBack = () => {
        if (step === 'recipient') setStep('conversion');
    };

    const updateData = (updates: Partial<TransactionData>) => {
        setData(prev => ({ ...prev, ...updates }));
    };

    const handleReset = () => {
        setIsSuccessOpen(false);
        setStep('conversion');
        setData({
            payAmount: '1.00',
            receiveAmount: '1.00',
            payCurrency: 'ETH',
            receiveCurrency: 'NGN',
            wallet: '',
            bankName: '',
            accountNumber: '',
            recipientName: '',
        });
    };

    return (
        <div style={{ width: '100%', padding: '20px' }}>
            <Card>
                {step === 'conversion' && (
                    <ConversionScreen
                        data={data}
                        onUpdate={updateData}
                        onNext={handleNext}
                    />
                )}
                {step === 'recipient' && (
                    <RecipientScreen
                        data={data}
                        onUpdate={updateData}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
            </Card>

            <Modal
                isOpen={isSuccessOpen}
                onClose={() => { }} // Prevent closing by clicking outside if desired, or handleReset
            >
                <SuccessScreen onHome={handleReset} />
            </Modal>
        </div>
    );
};

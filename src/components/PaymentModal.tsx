import React, { useState } from 'react';
import {
  IconX, IconCheck, IconShieldCheck, IconArrowRight, IconLock, IconCopy, IconChecklist
} from '@tabler/icons-react';
import { PaymentMethod, PaymentDetails } from '../types';
import { ETHIOPIAN_PAYMENT_GATEWAYS, processMockPayment } from '../services/paymentService';

interface PaymentModalProps {
  orderNumber: string;
  totalAmount: number;
  onClose: () => void;
  onPaymentSuccess: (details: PaymentDetails) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  orderNumber, totalAmount, onClose, onPaymentSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('telebirr');
  const [phoneOrAccount, setPhoneOrAccount] = useState('0911223344');
  const [txRefInput, setTxRefInput] = useState('');
  const [processing, setProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeGateway = ETHIOPIAN_PAYMENT_GATEWAYS.find((g) => g.id === selectedMethod)!;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      const details = await processMockPayment(selectedMethod, totalAmount, txRefInput);
      setProcessing(false);
      onPaymentSuccess(details);
    } catch {
      setProcessing(false);
      setError('Payment verification failed. Please check your transaction details.');
    }
  };

  const copyAccount = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
    }}>
      <div style={{
        width: '100%', maxWidth: 540, background: 'white', borderRadius: 24,
        boxShadow: '0 25px 60px rgba(0,0,0,0.25)', overflow: 'hidden',
        animation: 'fadeInUp 0.25s ease'
      }}>
        {/* Modal Top Bar */}
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
              Ethiopian Secure Payment Gateway
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: 2 }}>
              Pay Order {orderNumber}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white',
              width: 32, height: 32, borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 24px 28px' }}>
          {/* Order Total Display */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: 'var(--surface-2)', padding: '14px 18px', borderRadius: 'var(--radius-md)',
            marginBottom: 20, border: '1px solid var(--border)'
          }}>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Amount Due</span>
            <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
              {totalAmount.toLocaleString()} ETB (ብር)
            </span>
          </div>

          <form onSubmit={handlePay}>
            {/* Select Gateway */}
            <div style={{ marginBottom: 18 }}>
              <label className="form-label">Select Payment Method</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {ETHIOPIAN_PAYMENT_GATEWAYS.map((g) => {
                  const isSelected = selectedMethod === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setSelectedMethod(g.id)}
                      style={{
                        padding: '12px 14px', borderRadius: 'var(--radius-md)',
                        border: `2px solid ${isSelected ? g.logoColor : 'var(--border)'}`,
                        background: isSelected ? g.bgColor : 'white',
                        cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                        display: 'flex', flexDirection: 'column', gap: 4
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isSelected ? g.logoColor : 'var(--text-primary)' }}>
                          {g.shortName}
                        </span>
                        {isSelected && <IconCheck size={16} color={g.logoColor} strokeWidth={2.5} />}
                      </div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                        {g.id === 'telebirr' ? 'Ethio Telecom Mobile Money' : g.id === 'cbe_birr' ? 'Commercial Bank App' : g.id === 'chapa' ? 'Card & LuckyPay Checkout' : 'Procurement Voucher'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gateway Instructions / Account details */}
            <div style={{
              padding: '14px 16px', background: activeGateway.bgColor,
              borderRadius: 'var(--radius-md)', border: `1px solid ${activeGateway.logoColor}40`,
              marginBottom: 20
            }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: activeGateway.logoColor, marginBottom: 4 }}>
                {activeGateway.name} Instructions
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: 8 }}>
                {activeGateway.instructions}
              </div>

              {activeGateway.accountNumber && (
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'white', padding: '8px 12px', borderRadius: 8,
                  border: '1px solid var(--border)', fontSize: '0.8rem'
                }}>
                  <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{activeGateway.accountNumber}</span>
                  <button
                    type="button"
                    onClick={() => copyAccount(activeGateway.accountNumber)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeGateway.logoColor, display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700, fontSize: '0.75rem' }}
                  >
                    <IconCopy size={13} /> {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              )}
            </div>

            {/* Input Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 22 }}>
              {selectedMethod === 'telebirr' || selectedMethod === 'cbe_birr' ? (
                <div>
                  <label className="form-label" htmlFor="pay-phone">Payer Mobile / Account Number</label>
                  <input
                    id="pay-phone"
                    className="form-input"
                    placeholder="e.g. 0911 22 33 44"
                    value={phoneOrAccount}
                    onChange={(e) => setPhoneOrAccount(e.target.value)}
                    required
                  />
                </div>
              ) : null}

              <div>
                <label className="form-label" htmlFor="pay-ref">
                  {selectedMethod === 'lc_voucher' ? 'Voucher Reference No.' : 'Transaction Reference / Receipt ID (Optional)'}
                </label>
                <input
                  id="pay-ref"
                  className="form-input"
                  placeholder={selectedMethod === 'telebirr' ? 'e.g. TLB-2024-998811' : selectedMethod === 'cbe_birr' ? 'e.g. FT242200199' : 'Auto-generated if empty'}
                  value={txRefInput}
                  onChange={(e) => setTxRefInput(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: 14, fontWeight: 600 }}>
                {error}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button type="button" className="btn-secondary" onClick={onClose} disabled={processing}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '11px 24px', fontSize: '0.9rem' }}
                disabled={processing}
              >
                {processing ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                    Verifying Payment…
                  </span>
                ) : (
                  <>Confirm & Pay {totalAmount.toLocaleString()} ETB <IconArrowRight size={16} /></>
                )}
              </button>
            </div>
          </form>

          {/* Compliance notice */}
          <div style={{
            marginTop: 18, display: 'flex', alignItems: 'center', gap: 6,
            justifyContent: 'center', fontSize: '0.72rem', color: 'var(--text-muted)'
          }}>
            <IconShieldCheck size={14} color="#16a34a" /> Encrypted & FMHACA Financial Settlement Compliant
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default PaymentModal;

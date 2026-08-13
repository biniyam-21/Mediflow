import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconX,
  IconTrash,
  IconPlus,
  IconMinus,
  IconShoppingCart,
  IconCreditCard,
  IconSnowflake,
  IconCheck,
  IconArrowRight,
  IconTag,
} from '@tabler/icons-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import PaymentModal from './PaymentModal';
import { PaymentDetails } from '../types';

export const CartModal: React.FC = () => {
  const navigate = useNavigate();
  const { cart, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalAmount, itemCount } = useCart();
  const { showToast } = useToast();

  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    if (promoCode.trim().toUpperCase() === 'EFMHACA10' || promoCode.trim().toUpperCase() === 'MEDIFLOW') {
      const discount = Math.round(totalAmount * 0.1);
      setDiscountAmount(discount);
      setAppliedPromo(promoCode.toUpperCase());
      showToast(`Promo code "${promoCode.toUpperCase()}" applied! 10% discount subtracted.`, 'success');
    } else {
      showToast('Invalid promo code. Use "EFMHACA10" for 10% discount.', 'error');
    }
  };

  const finalTotal = Math.max(0, totalAmount - discountAmount);

  const handlePaymentSuccess = (details: PaymentDetails) => {
    setShowPaymentModal(false);
    clearCart();
    closeCart();
    showToast(`Order placed successfully! Transaction Ref: ${details.transactionRef}`, 'success');
    setTimeout(() => navigate('/orders'), 1000);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(5px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      padding: 20, animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Centered Modal Panel */}
      <div style={{
        width: '100%', maxWidth: 600, background: 'white', maxHeight: '88vh',
        borderRadius: 16, border: '1px solid #e2e8f0',
        display: 'flex', flexDirection: 'column', boxShadow: '0 25px 60px -12px rgba(0,0,0,0.35)',
        overflow: 'hidden', animation: 'scaleUp 0.2s ease-out'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 22px', borderBottom: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'var(--surface-2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%', background: '#dcfce7',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <IconShoppingCart size={18} color="#16a34a" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>Order Cart</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{itemCount} item(s) selected</div>
            </div>
          </div>

          <button
            onClick={closeCart}
            style={{
              background: 'white', border: '1px solid var(--border)', width: 32, height: 32,
              borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <IconX size={16} color="var(--text-secondary)" />
          </button>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <IconShoppingCart size={48} color="#cbd5e1" style={{ marginBottom: 14 }} />
              <div style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>Your cart is empty</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
                Add essential medicines from the catalog to place your hospital order.
              </div>
              <button
                className="btn-primary"
                style={{ marginTop: 20, fontSize: '0.82rem' }}
                onClick={() => { closeCart(); navigate('/product'); }}
              >
                Browse Medicines
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {cart.map((item) => (
                <div key={item.medicineId} style={{
                  display: 'flex', gap: 12, padding: 12, border: '1px solid var(--border)',
                  borderRadius: 10, background: 'white', alignItems: 'center'
                }}>
                  <img
                    src={item.imageUrl}
                    alt={item.medicineName}
                    style={{ width: 54, height: 54, borderRadius: 8, objectFit: 'cover', border: '1px solid var(--border)', flexShrink: 0 }}
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100'; }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.medicineName}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 1 }}>{item.vendorName}</div>
                    {item.isColdChain && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: '#e0f2fe', color: '#0284c7', padding: '1px 5px', borderRadius: 4, fontSize: '0.65rem', marginTop: 3 }}>
                        <IconSnowflake size={10} /> 2°C–8°C
                      </span>
                    )}
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--primary-dark)', marginTop: 4 }}>
                      {(item.unitPrice * item.quantity).toLocaleString()} ETB
                    </div>
                  </div>

                  {/* Qty controls */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                    <button
                      onClick={() => removeItem(item.medicineId)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', opacity: 0.7 }}
                      title="Remove item"
                    >
                      <IconTrash size={15} />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden', background: 'var(--surface-2)' }}>
                      <button
                        onClick={() => updateQuantity(item.medicineId, -1)}
                        style={{ width: 24, height: 24, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <IconMinus size={12} />
                      </button>
                      <span style={{ padding: '0 8px', fontSize: '0.78rem', fontWeight: 800 }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.medicineId, 1)}
                        style={{ width: 24, height: 24, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <IconPlus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear cart option */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                <button
                  onClick={() => { clearCart(); showToast('Cart cleared', 'info'); }}
                  style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Clear All Items
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div style={{ padding: 20, borderTop: '1px solid var(--border)', background: 'var(--surface-2)' }}>
            {/* Promo Code Slot */}
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <IconTag size={14} color="#94a3b8" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  className="form-input"
                  style={{ paddingLeft: 30, fontSize: '0.78rem', paddingTop: 6, paddingBottom: 6 }}
                  placeholder='Promo code (e.g. EFMHACA10)'
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-secondary" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>
                Apply
              </button>
            </form>

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.82rem', marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal:</span>
                <span style={{ fontWeight: 600 }}>{totalAmount.toLocaleString()} ETB</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a', fontWeight: 600 }}>
                  <span>Discount ({appliedPromo}):</span>
                  <span>-{discountAmount.toLocaleString()} ETB</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>VAT (0% EFMHACA Exempt):</span>
                <span style={{ fontWeight: 600 }}>0.00 ETB</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 8, fontSize: '1rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                <span>Total Amount:</span>
                <span style={{ color: 'var(--primary-dark)' }}>{finalTotal.toLocaleString()} ETB</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '11px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 8 }}
                onClick={() => setShowPaymentModal(true)}
              >
                <IconCreditCard size={18} /> Checkout & Pay ({finalTotal.toLocaleString()} ETB)
              </button>

              <button
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', padding: '9px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}
                onClick={() => { closeCart(); navigate('/cart'); }}
              >
                View Detailed Cart Page <IconArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          orderNumber={`ORD-2024-${Math.floor(100 + Math.random() * 900)}`}
          totalAmount={finalTotal}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

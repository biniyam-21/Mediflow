import React from 'react';
import { IconPrinter, IconX, IconShieldCheck, IconQrcode } from '@tabler/icons-react';
import { Order } from '../types';

interface InvoiceModalProps {
  order: Order;
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const subtotal = order.totalAmount;
  const isEssentialExempt = true; // WHO Essential medicines exempt under EFMHACA regulations
  const vatAmount = isEssentialExempt ? 0 : subtotal * 0.15;
  const grandTotal = subtotal + vatAmount;

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-ET', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(6px)',
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      padding: '30px 16px', overflowY: 'auto'
    }}>
      <div style={{
        width: '100%', maxWidth: 740, background: 'white', borderRadius: 16,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)', overflow: 'hidden',
        margin: 'auto 0', border: '1px solid #e2e8f0'
      }}>
        {/* Modal Toolbar (Non-printable, sticky top) */}
        <div className="no-print" style={{
          padding: '14px 20px', background: '#0f172a', color: 'white',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, zIndex: 20
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconShieldCheck color="#22c55e" size={18} />
            FMHACA / EFDA Delivery Waybill (መሸኛ) & Invoice
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              onClick={handlePrint}
              className="btn-primary"
              style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <IconPrinter size={15} /> Print / Export PDF
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white',
                width: 30, height: 30, borderRadius: '50%', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <IconX size={16} />
            </button>
          </div>
        </div>

        {/* Printable Standard Waybill Document */}
        <div id="printable-invoice" style={{ padding: '32px 36px', background: 'white' }}>

          {/* Header & QR Section */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            borderBottom: '2px solid #1e293b', paddingBottom: 16, marginBottom: 20
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#16a34a', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Federal Democratic Republic of Ethiopia · EFMHACA (EFDA)
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: 2 }}>
                Pharmaceutical Delivery Waybill & Tax Invoice
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b', marginTop: 2 }}>
                የሕክምና መድኃኒት መሸኛና የግብር ደረሰኝ
              </div>
            </div>

            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 60, height: 60, border: '1.5px solid #0f172a', borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc'
              }}>
                <IconQrcode size={46} color="#0f172a" />
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 800, marginTop: 4, color: '#0f172a' }}>
                {order.orderNumber}
              </div>
            </div>
          </div>

          {/* Metadata Grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
            marginBottom: 20, padding: '14px 16px', background: '#f8fafc',
            borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.8rem'
          }}>
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Consignor / Vendor</div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginTop: 2 }}>{order.vendorName}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>FMHACA License: FMHACA-VN-2020-0012</div>
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Consignee / Facility</div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginTop: 2 }}>{order.pharmacistName}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>Destination: {order.deliveryAddress}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 1 }}>Date: {formattedDate}</div>
            </div>
          </div>

          {/* Payment Status Bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: 6, marginBottom: 18, fontSize: '0.78rem'
          }}>
            <span style={{ color: '#166534', fontWeight: 600 }}>
              Payment Reference: <strong>{order.paymentDetails?.transactionRef || 'TLB-2024-88912'}</strong> ({order.paymentDetails?.method ? order.paymentDetails.method.toUpperCase() : 'TELEBIRR / CBE BIRR'})
            </span>
            <span style={{ background: '#15803d', color: 'white', fontWeight: 800, padding: '2px 8px', borderRadius: 999, fontSize: '0.68rem' }}>
              PAID (ከፍያ ተፈጽሟል)
            </span>
          </div>

          {/* Line Items Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20, fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: 'white', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.04em' }}>
                <th style={{ padding: '8px 10px', textAlign: 'left', width: 30 }}>#</th>
                <th style={{ padding: '8px 10px', textAlign: 'left' }}>Item Description</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', width: 70 }}>Unit</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', width: 50 }}>Qty</th>
                <th style={{ padding: '8px 10px', textAlign: 'right', width: 90 }}>Price (ETB)</th>
                <th style={{ padding: '8px 10px', textAlign: 'right', width: 100 }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '9px 10px', fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                  <td style={{ padding: '9px 10px', fontWeight: 700, color: '#0f172a' }}>
                    {item.medicineName}
                    {item.isColdChain && (
                      <span style={{ marginLeft: 6, fontSize: '0.65rem', color: '#0284c7', background: '#e0f2fe', padding: '1px 5px', borderRadius: 4 }}>
                        ❄ Cold Chain (2°C–8°C)
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '9px 10px', textAlign: 'center', color: '#64748b' }}>{item.unit}</td>
                  <td style={{ padding: '9px 10px', textAlign: 'center', fontWeight: 800 }}>{item.quantity}</td>
                  <td style={{ padding: '9px 10px', textAlign: 'right' }}>{item.unitPrice.toLocaleString()}</td>
                  <td style={{ padding: '9px 10px', textAlign: 'right', fontWeight: 800 }}>
                    {(item.quantity * item.unitPrice).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals & Tax Notice */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 16 }}>
            <div style={{ flex: 1, background: '#f8fafc', padding: '10px 12px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: '0.72rem', color: '#64748b', lineHeight: 1.5 }}>
              <strong>FMHACA Tax Notice:</strong> Essential pharmaceuticals are exempt from 15% VAT per Ethiopian MoH Procurement Guidelines.
            </div>

            <div style={{ width: 220, display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Subtotal:</span>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>{subtotal.toLocaleString()} ETB</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>VAT (0% Exempt):</span>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>0.00 ETB</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #0f172a', paddingTop: 6, fontSize: '0.95rem' }}>
                <span style={{ fontWeight: 900, color: '#0f172a' }}>Grand Total:</span>
                <span style={{ fontWeight: 900, color: '#16a34a' }}>{grandTotal.toLocaleString()} ETB</span>
              </div>
            </div>
          </div>

          {/* Official Signature Lines */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, borderTop: '1px dashed #cbd5e1', paddingTop: 18, fontSize: '0.75rem' }}>
            <div>
              <div style={{ color: '#64748b', fontWeight: 700, marginBottom: 32 }}>Supplier Dispatch Signature & Stamp:</div>
              <div style={{ borderTop: '1px solid #0f172a', width: '85%', paddingTop: 4, fontWeight: 700, color: '#0f172a' }}>
                Authorized Dispatch Officer
              </div>
            </div>
            <div>
              <div style={{ color: '#64748b', fontWeight: 700, marginBottom: 32 }}>Facility Receiver Signature:</div>
              <div style={{ borderTop: '1px solid #0f172a', width: '85%', paddingTop: 4, fontWeight: 700, color: '#0f172a' }}>
                Pharmacist in Charge
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #printable-invoice, #printable-invoice * { visibility: visible; }
          #printable-invoice { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default InvoiceModal;

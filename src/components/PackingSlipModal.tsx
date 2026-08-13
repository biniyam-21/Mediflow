import React from 'react';
import { IconPrinter, IconX, IconTruck, IconBox, IconQrcode } from '@tabler/icons-react';
import { Order } from '../types';

interface PackingSlipModalProps {
  order: Order;
  onClose: () => void;
}

const PackingSlipModal: React.FC<PackingSlipModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date().toLocaleDateString('en-ET', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const totalBoxes = order.items.reduce((s, i) => s + Math.ceil(i.quantity / 10), 0);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)',
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      padding: '30px 16px', overflowY: 'auto'
    }}>
      <div style={{
        width: '100%', maxWidth: 720, background: 'white', borderRadius: 16,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)', overflow: 'hidden',
        border: '1px solid #e2e8f0'
      }}>
        {/* Modal Toolbar (Non-printable) */}
        <div className="no-print" style={{
          padding: '14px 20px', background: '#0f172a', color: 'white',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconTruck color="#0284c7" size={18} />
            Warehouse Dispatch & Packing Slip (የመጫኛ ዝርዝር)
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              onClick={handlePrint}
              className="btn-primary"
              style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <IconPrinter size={15} /> Print Packing Slip
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

        {/* Printable Packing Manifest Area */}
        <div id="printable-invoice" style={{ padding: '32px 36px', background: 'white' }}>
          {/* Document Header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            borderBottom: '2px solid #0f172a', paddingBottom: 16, marginBottom: 20
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0284c7', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {order.vendorName.toUpperCase()} · WAREHOUSE DISPATCH
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: 2 }}>
                Carrier Packing Slip & Loading Manifest
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b', marginTop: 2 }}>
                የመጫኛና የጭነት ዝርዝር ሰነድ
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

          {/* Logistics Metadata Grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14,
            marginBottom: 20, padding: '14px 16px', background: '#f8fafc',
            borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.8rem'
          }}>
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Ship To Facility</div>
              <div style={{ fontWeight: 800, color: '#0f172a', marginTop: 2 }}>{order.pharmacistName}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>{order.deliveryAddress}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Dispatch Carrier</div>
              <div style={{ fontWeight: 800, color: '#0f172a', marginTop: 2 }}>MediFlow Logistics Fleet</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>Driver: Solomon K. (Ethio-Truck #3812)</div>
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Package Summary</div>
              <div style={{ fontWeight: 800, color: '#0284c7', marginTop: 2 }}>{totalBoxes} Sealed Box(es)</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>Date: {formattedDate}</div>
            </div>
          </div>

          {/* Package Line Items */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: 'white', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.04em' }}>
                <th style={{ padding: '8px 10px', textAlign: 'left', width: 30 }}>#</th>
                <th style={{ padding: '8px 10px', textAlign: 'left' }}>Item & Batch Code</th>
                <th style={{ padding: '8px 10px', textAlign: 'center' }}>Unit</th>
                <th style={{ padding: '8px 10px', textAlign: 'center' }}>Packed Qty</th>
                <th style={{ padding: '8px 10px', textAlign: 'center' }}>Box Count</th>
                <th style={{ padding: '8px 10px', textAlign: 'center' }}>Check Status</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#0f172a' }}>
                    {item.medicineName}
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 400 }}>
                      Batch: BATCH-2024-{idx + 101} · Exp: 2027-08
                    </div>
                  </td>
                  <td style={{ padding: '10px', textAlign: 'center', color: '#64748b' }}>{item.unit}</td>
                  <td style={{ padding: '10px', textAlign: 'center', fontWeight: 800, color: '#0f172a' }}>{item.quantity}</td>
                  <td style={{ padding: '10px', textAlign: 'center', fontWeight: 600 }}>{Math.ceil(item.quantity / 10)} Box(es)</td>
                  <td style={{ padding: '10px', textAlign: 'center', color: '#16a34a', fontWeight: 700 }}>
                    [ ✓ ] Verified
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Verification Blocks */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, borderTop: '1px dashed #cbd5e1', paddingTop: 20, fontSize: '0.75rem' }}>
            <div>
              <div style={{ color: '#64748b', fontWeight: 700, marginBottom: 36 }}>Warehouse Packing Inspection:</div>
              <div style={{ borderTop: '1px solid #0f172a', width: '85%', paddingTop: 4, fontWeight: 700, color: '#0f172a' }}>
                Warehouse Manager Signature
              </div>
            </div>
            <div>
              <div style={{ color: '#64748b', fontWeight: 700, marginBottom: 36 }}>Driver Loading Receipt Sign-off:</div>
              <div style={{ borderTop: '1px solid #0f172a', width: '85%', paddingTop: 4, fontWeight: 700, color: '#0f172a' }}>
                Delivery Driver Signature
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

export default PackingSlipModal;

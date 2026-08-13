import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { DataTable, Column, DropdownFilter } from '../components/DataTable';
import { IconAlertTriangle, IconClock, IconCircleCheck, IconSnowflake, IconDownload } from '@tabler/icons-react';
import { getAllMedicines } from '../services/medicineService';
import { useToast } from '../context/ToastContext';

export interface ExpiryBatch {
  _id: string;
  batchNumber: string;
  medicineName: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'critical' | 'warning' | 'safe';
  isColdChain: boolean;
}

const mockBatches: ExpiryBatch[] = [
  {
    _id: 'b-001',
    batchNumber: 'BATCH-2024-881',
    medicineName: 'Artemether-Lumefantrine 80/480mg',
    category: 'Antimalarial',
    quantity: 120,
    unit: 'Courses',
    expiryDate: '2026-09-05',
    daysRemaining: 23,
    status: 'critical',
    isColdChain: false,
  },
  {
    _id: 'b-002',
    batchNumber: 'BATCH-2024-419',
    medicineName: 'Insulin Human NPH 100 IU/ml',
    category: 'Endocrinology',
    quantity: 45,
    unit: 'Vials',
    expiryDate: '2026-09-20',
    daysRemaining: 38,
    status: 'warning',
    isColdChain: true,
  },
  {
    _id: 'b-003',
    batchNumber: 'BATCH-2024-102',
    medicineName: 'Amoxicillin 500mg Capsules',
    category: 'Antibiotic',
    quantity: 500,
    unit: 'Boxes',
    expiryDate: '2026-10-15',
    daysRemaining: 63,
    status: 'warning',
    isColdChain: false,
  },
  {
    _id: 'b-004',
    batchNumber: 'BATCH-2024-904',
    medicineName: 'Oxytocin Injection 10 IU/ml',
    category: 'Maternal Health',
    quantity: 200,
    unit: 'Ampoules',
    expiryDate: '2026-09-10',
    daysRemaining: 28,
    status: 'critical',
    isColdChain: true,
  },
  {
    _id: 'b-005',
    batchNumber: 'BATCH-2024-550',
    medicineName: 'Paracetamol 500mg (20s)',
    category: 'Analgesics',
    quantity: 1000,
    unit: 'Packs',
    expiryDate: '2027-12-31',
    daysRemaining: 505,
    status: 'safe',
    isColdChain: false,
  },
  {
    _id: 'b-006',
    batchNumber: 'BATCH-2024-772',
    medicineName: 'Rabies Vaccine BP 2.5 IU',
    category: 'Vaccines',
    quantity: 80,
    unit: 'Vials',
    expiryDate: '2027-06-30',
    daysRemaining: 320,
    status: 'safe',
    isColdChain: true,
  },
];

const ExpiryTracker: React.FC = () => {
  const { showToast } = useToast();
  const [batches, setBatches] = useState<ExpiryBatch[]>(mockBatches);

  const criticalCount = batches.filter((b) => b.status === 'critical').length;
  const warningCount = batches.filter((b) => b.status === 'warning').length;

  const handleApplyDiscount = (batch: ExpiryBatch) => {
    showToast(`Flagged ${batch.batchNumber} (${batch.medicineName}) for 20% FEFO Liquidation Discount!`, 'success');
  };

  const columns: Column<ExpiryBatch>[] = [
    {
      header: 'Batch #',
      accessor: (b) => <span style={{ fontWeight: 700, fontFamily: 'monospace', color: 'var(--primary-dark)' }}>{b.batchNumber}</span>,
    },
    {
      header: 'Medicine Name',
      accessor: (b) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.85rem' }}>
            {b.medicineName}
            {b.isColdChain && (
              <span style={{ marginLeft: 6, display: 'inline-flex', alignItems: 'center', gap: 3, background: '#e0f2fe', color: '#0284c7', padding: '1px 6px', borderRadius: 4, fontSize: '0.68rem' }}>
                <IconSnowflake size={11} /> 2°C–8°C
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{b.category}</div>
        </div>
      ),
    },
    {
      header: 'Stock Qty',
      accessor: (b) => <span style={{ fontWeight: 800 }}>{b.quantity} {b.unit}</span>,
    },
    {
      header: 'Expiry Date',
      accessor: (b) => <span style={{ fontWeight: 600 }}>{b.expiryDate}</span>,
    },
    {
      header: 'Days Left',
      accessor: (b) => {
        const bg = b.status === 'critical' ? '#fee2e2' : b.status === 'warning' ? '#fef3c7' : '#dcfce7';
        const color = b.status === 'critical' ? '#b91c1c' : b.status === 'warning' ? '#b45309' : '#15803d';
        return (
          <span className="badge" style={{ background: bg, color, padding: '4px 10px', fontSize: '0.78rem' }}>
            {b.daysRemaining} days left
          </span>
        );
      },
    },
    {
      header: 'FEFO Action',
      accessor: (b) => {
        if (b.status === 'critical') {
          return (
            <button
              className="btn-primary"
              style={{ padding: '4px 10px', fontSize: '0.75rem', background: '#ef4444', borderColor: '#dc2626' }}
              onClick={() => handleApplyDiscount(b)}
            >
              Liquidate / Discount
            </button>
          );
        }
        return <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Normal FEFO</span>;
      },
    },
  ];

  const filters: DropdownFilter<ExpiryBatch>[] = [
    {
      key: 'status',
      label: 'Urgency Status',
      options: [
        { label: 'Critical (< 30 Days)', value: 'critical' },
        { label: 'Warning (30-90 Days)', value: 'warning' },
        { label: 'Safe (> 90 Days)', value: 'safe' },
      ],
      filterFn: (batch, val) => batch.status === val,
    },
  ];

  return (
    <DashboardLayout title="Pharmaceutical Expiry & FEFO Tracker" subtitle="FMHACA Good Distribution Practice batch monitoring and liquidation">
      {/* Expiry Alert Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ borderLeft: '4px solid #ef4444', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <IconAlertTriangle size={22} color="#b91c1c" />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Critical (&lt; 30 Days)</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#b91c1c' }}>{criticalCount} Batches</div>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #f59e0b', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <IconClock size={22} color="#b45309" />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Warning (30 - 90 Days)</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#b45309' }}>{warningCount} Batches</div>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #16a34a', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <IconCircleCheck size={22} color="#15803d" />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Safe Stock (&gt; 90 Days)</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#15803d' }}>{batches.length - criticalCount - warningCount} Batches</div>
          </div>
        </div>
      </div>

      {/* Main Expiry DataTable */}
      <DataTable<ExpiryBatch>
        columns={columns}
        data={batches}
        searchPlaceholder="Search batch number or medicine..."
        searchFields={['batchNumber', 'medicineName', 'category']}
        filters={filters}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
        exportable={true}
        exportFilename="fefo_expiry_batches"
      />
    </DashboardLayout>
  );
};

export default ExpiryTracker;

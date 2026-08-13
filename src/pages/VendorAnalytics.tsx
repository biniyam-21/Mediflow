import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import {
  IconCurrencyDollar,
  IconShoppingCart,
  IconBuildingHospital,
  IconTrendingUp,
  IconDownload,
  IconChartBar,
  IconPill,
  IconCheck,
} from '@tabler/icons-react';
import { exportToCSV } from '../utils/exportUtils';
import { useToast } from '../context/ToastContext';

interface RevenueMonth {
  month: string;
  revenue: number;
  orders: number;
}

const monthlyData: RevenueMonth[] = [
  { month: 'Jan', revenue: 145000, orders: 38 },
  { month: 'Feb', revenue: 182000, orders: 44 },
  { month: 'Mar', revenue: 210000, orders: 52 },
  { month: 'Apr', revenue: 195000, orders: 48 },
  { month: 'May', revenue: 240000, orders: 61 },
  { month: 'Jun', revenue: 268000, orders: 70 },
  { month: 'Jul', revenue: 250000, orders: 65 },
  { month: 'Aug', revenue: 284500, orders: 84 },
];

const topProducts = [
  { name: 'Artemether-Lumefantrine 80/480mg', revenue: 94000, units: 188, share: 33 },
  { name: 'Insulin Human NPH 100 IU/ml', revenue: 67500, units: 135, share: 24 },
  { name: 'Amoxicillin 500mg Capsules', revenue: 52000, units: 260, share: 18 },
  { name: 'Paracetamol 500mg (Packs)', revenue: 41000, units: 820, share: 14 },
  { name: 'Oxytocin Injection 10 IU/ml', revenue: 30000, units: 120, share: 11 },
];

const topHospitals = [
  { name: 'Tikur Anbessa Specialized Hospital', location: 'Addis Ababa', totalOrders: 28, totalSpent: 112000 },
  { name: 'St. Paul’s Hospital Millennium Medical College', location: 'Addis Ababa', totalOrders: 22, totalSpent: 84000 },
  { name: 'Zewditu Memorial Hospital', location: 'Addis Ababa', totalOrders: 18, totalSpent: 56500 },
  { name: 'Hawassa Comprehensive Specialized Hospital', location: 'Sidama', totalOrders: 16, totalSpent: 32000 },
];

const VendorAnalytics: React.FC = () => {
  const { showToast } = useToast();
  const [timeframe, setTimeframe] = useState<'month' | 'quarter' | 'year'>('month');

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  const handleExportCSV = () => {
    exportToCSV(
      'vendor_sales_analytics',
      topProducts.map((p) => ({
        'Product Name': p.name,
        'Revenue (ETB)': p.revenue,
        'Units Sold': p.units,
        'Market Share': `${p.share}%`,
      }))
    );
    showToast('Exported vendor sales analytics CSV report', 'success');
  };

  return (
    <DashboardLayout title="Vendor Sales & Revenue Analytics" subtitle="Comprehensive performance metrics, revenue growth, and product demand insights">
      {/* Top Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8, background: 'var(--surface-2)', padding: 4, borderRadius: 8, border: '1px solid var(--border)' }}>
          {(['month', 'quarter', 'year'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              style={{
                padding: '6px 14px', borderRadius: 6, border: 'none',
                background: timeframe === t ? 'white' : 'transparent',
                fontWeight: timeframe === t ? 700 : 500,
                color: timeframe === t ? 'var(--primary-dark)' : 'var(--text-secondary)',
                cursor: 'pointer', fontSize: '0.78rem', boxShadow: timeframe === t ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          onClick={handleExportCSV}
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}
        >
          <IconDownload size={15} /> Export Sales Report CSV
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Total Revenue (August)</span>
            <IconCurrencyDollar size={18} color="#16a34a" />
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-primary)' }}>284,500 ETB</div>
          <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700, marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
            <IconTrendingUp size={13} /> +13.8% vs last month
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0284c7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Orders Fulfilled</span>
            <IconShoppingCart size={18} color="#0284c7" />
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-primary)' }}>84 Orders</div>
          <div style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 700, marginTop: 4 }}>
            96.4% Fulfillment Rate
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #7c3aed' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Active Buying Facilities</span>
            <IconBuildingHospital size={18} color="#7c3aed" />
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-primary)' }}>18 Facilities</div>
          <div style={{ fontSize: '0.72rem', color: '#7c3aed', fontWeight: 700, marginTop: 4 }}>
            Across 4 Ethiopian Regions
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Avg Order Value</span>
            <IconChartBar size={18} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-primary)' }}>3,386 ETB</div>
          <div style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 700, marginTop: 4 }}>
            +4.2% Basket Size Growth
          </div>
        </div>
      </div>

      {/* Monthly Revenue Chart Panel */}
      <div className="card" style={{ marginBottom: 24, padding: 22 }}>
        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <IconChartBar size={18} color="var(--primary)" /> 2026 Monthly Revenue Trend (ETB)
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 180, paddingTop: 20, borderBottom: '1px solid var(--border)' }}>
          {monthlyData.map((d) => {
            const heightPercent = Math.round((d.revenue / maxRevenue) * 100);
            return (
              <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  {(d.revenue / 1000).toFixed(0)}k
                </div>
                <div
                  style={{
                    width: '100%', maxWidth: 36, height: `${heightPercent}%`,
                    background: 'linear-gradient(180deg, var(--primary) 0%, var(--primary-dark) 100%)',
                    borderRadius: '6px 6px 0 0', transition: 'height 0.3s ease'
                  }}
                  title={`${d.month}: ${d.revenue.toLocaleString()} ETB (${d.orders} orders)`}
                />
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 8 }}>{d.month}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Grid: Top Selling Products & Top Buying Hospitals */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Top Selling Products */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            <IconPill size={17} color="var(--primary)" /> Top Revenue Medicines
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {topProducts.map((prod, i) => (
              <div key={i} style={{ borderBottom: i < topProducts.length - 1 ? '1px solid #f1f5f9' : 'none', paddingBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  <span>{prod.name}</span>
                  <span style={{ color: 'var(--primary-dark)' }}>{prod.revenue.toLocaleString()} ETB</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  <span>{prod.units} units sold</span>
                  <span>{prod.share}% catalog share</span>
                </div>
                {/* Progress bar */}
                <div style={{ width: '100%', height: 5, background: '#f1f5f9', borderRadius: 3, marginTop: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${prod.share * 2.5}%`, height: '100%', background: 'var(--primary)', borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Purchasing Hospitals */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            <IconBuildingHospital size={17} color="#7c3aed" /> Top Purchasing Health Centers
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {topHospitals.map((hosp, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--surface-2)', borderRadius: 8, border: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.83rem', color: 'var(--text-primary)' }}>{hosp.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{hosp.location} · {hosp.totalOrders} Orders</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#15803d' }}>
                  {hosp.totalSpent.toLocaleString()} ETB
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorAnalytics;

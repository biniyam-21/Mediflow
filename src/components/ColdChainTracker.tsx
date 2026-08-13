import React from 'react';
import { IconSnowflake, IconAlertTriangle, IconCheck, IconMapPin, IconClock } from '@tabler/icons-react';
import { MOCK_COLD_CHAIN_LOGS } from '../data/mockColdChain';
import { ColdChainLog } from '../types';

interface ColdChainTrackerProps {
  medicineId: string;
  medicineName?: string;
  compact?: boolean;
}

const ColdChainTracker: React.FC<ColdChainTrackerProps> = ({ medicineId, medicineName, compact = false }) => {
  const log: ColdChainLog = MOCK_COLD_CHAIN_LOGS[medicineId] || {
    medicineId,
    medicineName: medicineName || 'Temperature Sensitive Medicine',
    batchNumber: 'ETH-COLD-2024-B01',
    minTemp: 2.0,
    maxTemp: 8.0,
    targetTemp: '2.0°C – 8.0°C (Cold Storage Compliant)',
    overallStatus: 'safe',
    lastChecked: new Date().toISOString(),
    points: [
      { time: '08:00 EAT', temperature: 4.0, status: 'safe', location: 'Warehouse Cold Vault' },
      { time: '11:00 EAT', temperature: 4.5, status: 'safe', location: 'Refrigerated Vehicle' },
      { time: '14:00 EAT', temperature: 5.2, status: 'safe', location: 'Destination Pharmacy Depot' },
    ],
  };

  const statusBadge = {
    safe: { color: '#15803d', bg: '#dcfce7', icon: IconCheck, label: 'Optimal Cold Chain (2°C–8°C)' },
    warning: { color: '#b45309', bg: '#fef3c7', icon: IconAlertTriangle, label: 'Near Upper Threshold' },
    breach: { color: '#b91c1c', bg: '#fee2e2', icon: IconAlertTriangle, label: 'Temperature Excursion Alert' },
  }[log.overallStatus];

  const StatusIcon = statusBadge.icon;
  const latestPoint = log.points[log.points.length - 1];

  if (compact) {
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 10px', borderRadius: 999,
        background: statusBadge.bg, color: statusBadge.color,
        fontSize: '0.72rem', fontWeight: 700
      }}>
        <IconSnowflake size={13} />
        <span>Cold Chain: {latestPoint.temperature}°C</span>
        <StatusIcon size={12} />
      </div>
    );
  }

  return (
    <div className="card" style={{ background: '#f8fafc', border: '1px solid #cbd5e1' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: '#dbeafe', color: '#0284c7',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <IconSnowflake size={20} strokeWidth={2} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              Cold Chain & Telemetry Monitoring
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Target: {log.targetTemp} · Batch #{log.batchNumber}
            </div>
          </div>
        </div>

        <span className="badge" style={{ background: statusBadge.bg, color: statusBadge.color, padding: '5px 12px', fontSize: '0.75rem' }}>
          <StatusIcon size={13} style={{ marginRight: 4 }} />
          {statusBadge.label}
        </span>
      </div>

      {/* Temperature Gauge Summary */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
        marginBottom: 18, background: 'white', padding: '12px 16px',
        borderRadius: 'var(--radius-md)', border: '1px solid var(--border)'
      }}>
        <div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Current Temp</div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: statusBadge.color, marginTop: 2 }}>
            {latestPoint.temperature}°C
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Allowed Range</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>
            {log.minTemp}°C – {log.maxTemp}°C
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Last Sensor Check</div>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: 4 }}>
            {latestPoint.time}
          </div>
        </div>
      </div>

      {/* Sensor telemetry points timeline */}
      <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: 10 }}>
        Sensor Checkpoint History
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {log.points.map((pt, idx) => (
          <div key={idx} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 14px', background: 'white', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)', fontSize: '0.8rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <IconMapPin size={14} color="#0284c7" />
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{pt.location}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <IconClock size={11} /> {pt.time}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontFamily: 'monospace', fontWeight: 800, fontSize: '0.9rem',
                color: pt.status === 'safe' ? '#15803d' : pt.status === 'warning' ? '#b45309' : '#b91c1c'
              }}>
                {pt.temperature}°C
              </span>
              <span className="badge" style={{
                fontSize: '0.65rem',
                background: pt.status === 'safe' ? '#dcfce7' : pt.status === 'warning' ? '#fef3c7' : '#fee2e2',
                color: pt.status === 'safe' ? '#15803d' : pt.status === 'warning' ? '#b45309' : '#b91c1c'
              }}>
                {pt.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColdChainTracker;

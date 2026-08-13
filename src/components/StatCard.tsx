import React from 'react';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg?: string;
  trend?: number; // positive = up, negative = down, 0/undefined = neutral
  trendLabel?: string;
  accentColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label, value, icon, iconBg = '#f0fdf4', trend, trendLabel, accentColor
}) => {
  const isUp = trend !== undefined && trend > 0;
  const isDown = trend !== undefined && trend < 0;

  return (
    <div className="stat-card" style={accentColor ? { '--accent-color': accentColor } as React.CSSProperties : {}}>
      {accentColor && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`,
          borderRadius: '16px 16px 0 0'
        }} />
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div className="stat-label">{label}</div>
          <div className="stat-value">{value}</div>
          {(trend !== undefined || trendLabel) && (
            <div className="stat-trend" style={{
              color: isUp ? '#16a34a' : isDown ? '#ef4444' : '#64748b'
            }}>
              {isUp && <IconTrendingUp size={13} strokeWidth={2.5} />}
              {isDown && <IconTrendingDown size={13} strokeWidth={2.5} />}
              {trendLabel || (trend !== undefined ? `${Math.abs(trend)}% vs last month` : '')}
            </div>
          )}
        </div>
        <div className="stat-icon" style={{ background: iconBg }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

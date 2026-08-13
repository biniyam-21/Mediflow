import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconLayoutDashboard,
  IconUser,
  IconHeart,
  IconClipboardList,
  IconBell,
  IconLogout,
  IconChevronDown,
  IconBuildingHospital,
} from '@tabler/icons-react';
import { getSession, clearSession } from '../services/authService';

export const NavProfileDropdown: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const session = getSession();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearSession();
    setOpen(false);
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (session.role === 'admin') return '/admin';
    if (session.role === 'vendor') return '/vendor/dashboard';
    return '/dashboard';
  };

  const roleLabels: Record<string, string> = {
    admin: 'System Administrator',
    vendor: 'Pharmaceutical Vendor',
    pharmacist: 'Hospital Pharmacist',
  };

  const roleColors: Record<string, string> = {
    admin: '#7c3aed',
    vendor: '#0284c7',
    pharmacist: '#16a34a',
  };

  const userName = session.name || session.email.split('@')[0] || 'User';
  const roleColor = roleColors[session.role] || '#16a34a';

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Trigger Button (Shadcn style trigger pill) */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 10px 4px 5px',
          background: 'white',
          border: '1px solid var(--border)',
          borderRadius: 999,
          cursor: 'pointer',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = roleColor; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: roleColor,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 800,
          }}
        >
          {userName[0].toUpperCase()}
        </div>
        <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {userName}
          </div>
          <div style={{ fontSize: '0.66rem', color: roleColor, fontWeight: 700, textTransform: 'capitalize' }}>
            {session.role}
          </div>
        </div>
        <IconChevronDown size={14} color="#94a3b8" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>

      {/* Dropdown Menu (Shadcn UI style) */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            zIndex: 1000,
            width: 240,
            background: 'white',
            border: '1px solid var(--border)',
            borderRadius: 12,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            padding: 6,
            animation: 'fadeInScale 0.15s ease-out',
          }}
        >
          {/* Header Info */}
          <div style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{userName}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{session.email}</div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6,
              background: `${roleColor}15`, color: roleColor, padding: '2px 8px',
              borderRadius: 999, fontSize: '0.68rem', fontWeight: 800
            }}>
              <IconBuildingHospital size={12} /> {roleLabels[session.role] || session.role}
            </div>
          </div>

          {/* Menu Items */}
          <div style={{ padding: '4px 0' }}>
            <button
              onClick={() => { setOpen(false); navigate(getDashboardPath()); }}
              className="dropdown-item"
              style={itemStyle}
            >
              <IconLayoutDashboard size={16} color="var(--primary)" /> Dashboard
            </button>

            <button
              onClick={() => { setOpen(false); navigate('/profile'); }}
              className="dropdown-item"
              style={itemStyle}
            >
              <IconUser size={16} color="#0284c7" /> Facility Profile & Settings
            </button>

            {session.role === 'pharmacist' && (
              <>
                <button
                  onClick={() => { setOpen(false); navigate('/favorites'); }}
                  className="dropdown-item"
                  style={itemStyle}
                >
                  <IconHeart size={16} color="#ef4444" /> Fast Reorder & Favorites
                </button>

                <button
                  onClick={() => { setOpen(false); navigate('/orders'); }}
                  className="dropdown-item"
                  style={itemStyle}
                >
                  <IconClipboardList size={16} color="#7c3aed" /> My Orders
                </button>

                <button
                  onClick={() => { setOpen(false); navigate('/notifications'); }}
                  className="dropdown-item"
                  style={itemStyle}
                >
                  <IconBell size={16} color="#f59e0b" /> Notifications
                </button>
              </>
            )}
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 4, marginTop: 2 }}>
            <button
              onClick={handleLogout}
              className="dropdown-item"
              style={{ ...itemStyle, color: '#ef4444', fontWeight: 600 }}
            >
              <IconLogout size={16} /> Log Out
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95) translateY(-4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border: none;
          background: transparent;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-primary);
          cursor: pointer;
          transition: background 0.15s ease;
          text-align: left;
        }
        .dropdown-item:hover {
          background: #f8fafc;
        }
      `}</style>
    </div>
  );
};

const itemStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '8px 12px',
  border: 'none',
  background: 'transparent',
  borderRadius: 6,
  fontSize: '0.82rem',
  fontWeight: 500,
  color: 'var(--text-primary)',
  cursor: 'pointer',
  textAlign: 'left',
};

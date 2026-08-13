import React, { createContext, useContext, useState } from 'react';
import { IconCheck, IconAlertTriangle, IconInfoCircle, IconX } from '@tabler/icons-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const typeStyles = {
    success: { bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d', icon: IconCheck },
    error: { bg: '#fef2f2', border: '#fecaca', color: '#b91c1c', icon: IconAlertTriangle },
    info: { bg: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8', icon: IconInfoCircle },
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container floating at bottom right */}
      <div style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        maxWidth: 360,
        width: '100%',
        pointerEvents: 'none',
      }}>
        {toasts.map((toast) => {
          const style = typeStyles[toast.type];
          const Icon = style.icon;
          return (
            <div
              key={toast.id}
              style={{
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                background: style.bg,
                border: `1px solid ${style.border}`,
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
                color: style.color,
                fontSize: '0.85rem',
                fontWeight: 600,
                animation: 'slideInRight 0.3s ease',
              }}
            >
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                background: `${style.color}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={14} color={style.color} strokeWidth={2.5} />
              </div>
              <div style={{ flex: 1 }}>{toast.message}</div>
              <button
                onClick={() => removeToast(toast.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: style.color, opacity: 0.7, padding: 2, display: 'flex'
                }}
              >
                <IconX size={14} />
              </button>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

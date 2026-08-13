import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { IconBell, IconPackage, IconRefresh, IconAlertTriangle, IconShield, IconSnowflake } from "@tabler/icons-react";
import { MOCK_NOTIFICATIONS } from "../data/mockUsers";
import { Notification } from "../types";

const typeConfig: Record<Notification["type"], { icon: React.ElementType; color: string; bg: string; label: string }> = {
  order_update: { icon: IconPackage, color: "#0284c7", bg: "#dbeafe", label: "Order Update" },
  restock_alert: { icon: IconRefresh, color: "#16a34a", bg: "#dcfce7", label: "Restock Alert" },
  expiry_warning: { icon: IconAlertTriangle, color: "#b45309", bg: "#fef3c7", label: "Expiry Warning" },
  temperature_alert: { icon: IconSnowflake, color: "#0284c7", bg: "#e0f2fe", label: "Cold Chain Alert" },
  system: { icon: IconShield, color: "#7c3aed", bg: "#f5f3ff", label: "System" },
};

const formatTime = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today " + d.toLocaleTimeString("en-ET", { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 1) return "Yesterday";
  return d.toLocaleDateString("en-ET", { day: "numeric", month: "short", year: "numeric" });
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n._id === id ? { ...n, read: true } : n));
  };

  return (
    <DashboardLayout title="Notifications" subtitle={`${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`}>
      <div style={{ maxWidth: 680 }}>
        {/* Header actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 8 }}>
            {["All", "Unread"].map((tab) => (
              <button
                key={tab}
                style={{
                  padding: "6px 16px",
                  borderRadius: 999,
                  border: tab === "All" ? "1px solid var(--primary)" : "1px solid var(--border)",
                  background: tab === "All" ? "var(--primary)" : "white",
                  color: tab === "All" ? "white" : "var(--text-secondary)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          {notifications.length === 0 ? (
            <div style={{ padding: "60px 24px", textAlign: "center" }}>
              <IconBell size={40} color="#e2e8f0" style={{ marginBottom: 12 }} />
              <div style={{ fontWeight: 600, color: "var(--text-secondary)" }}>No notifications</div>
            </div>
          ) : (
            notifications.map((notif, idx) => {
              const cfg = typeConfig[notif.type];
              const Icon = cfg.icon;
              return (
                <div
                  key={notif._id}
                  className={`notif-item ${!notif.read ? "unread" : ""}`}
                  onClick={() => markRead(notif._id)}
                  style={{ borderBottom: idx < notifications.length - 1 ? "1px solid var(--border)" : "none" }}
                >
                  <div className="notif-icon-wrap" style={{ background: cfg.bg }}>
                    <Icon size={16} color={cfg.color} strokeWidth={2} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div>
                        <div style={{ fontWeight: notif.read ? 500 : 700, fontSize: "0.86rem", color: "var(--text-primary)", marginBottom: 3 }}>
                          {notif.title}
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                          {notif.message}
                        </div>
                      </div>
                      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                          {formatTime(notif.createdAt)}
                        </span>
                        {!notif.read && (
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)", display: "block" }} />
                        )}
                      </div>
                    </div>
                    <div style={{ marginTop: 6 }}>
                      <span className="badge" style={{ background: cfg.bg, color: cfg.color, fontSize: "0.67rem" }}>
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;

import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import {
  IconPackage,
  IconTruckDelivery,
  IconCurrencyDollar,
  IconStar,
  IconChevronRight,
  IconPlus,
  IconClock,
  IconCircleCheck,
} from "@tabler/icons-react";
import { MOCK_ORDERS } from "../data/mockOrders";
import { getAllMedicines } from "../services/medicineService";

const VendorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const medicines = getAllMedicines();
  const vendorOrders = MOCK_ORDERS.filter((o) => o.vendorId === "usr-003" || o.vendorId === "usr-004");
  const pendingOrders = vendorOrders.filter((o) => o.status === "requested");
  const totalRevenue = vendorOrders.filter((o) => o.status === "delivered").reduce((s, o) => s + o.totalAmount, 0);

  return (
    <DashboardLayout title="Vendor Dashboard" subtitle="Manage your products and incoming orders">
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }} className="animate-stagger">
        <StatCard
          label="Active Listings"
          value={medicines.length}
          icon={<IconPackage size={20} color="#16a34a" strokeWidth={1.8} />}
          iconBg="#f0fdf4"
          trend={5}
          trendLabel="5 new this month"
          accentColor="#16a34a"
        />
        <StatCard
          label="Pending Orders"
          value={pendingOrders.length}
          icon={<IconClock size={20} color="#b45309" strokeWidth={1.8} />}
          iconBg="#fef3c7"
          trendLabel="Awaiting your response"
          accentColor="#f59e0b"
        />
        <StatCard
          label="Total Revenue (ETB)"
          value={`${(totalRevenue / 1000).toFixed(1)}K`}
          icon={<IconCurrencyDollar size={20} color="#0284c7" strokeWidth={1.8} />}
          iconBg="#dbeafe"
          trend={18}
          trendLabel="18% this month"
          accentColor="#0284c7"
        />
        <StatCard
          label="Fulfillment Rate"
          value="94%"
          icon={<IconStar size={20} color="#7c3aed" strokeWidth={1.8} />}
          iconBg="#f5f3ff"
          trend={2}
          trendLabel="Above average"
          accentColor="#7c3aed"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }}>
        {/* Incoming Orders */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Incoming Orders</div>
            <button className="btn-secondary" style={{ fontSize: "0.78rem", padding: "6px 12px" }} onClick={() => navigate("/vendor/orders")}>
              View All
            </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>From</th>
                <th>Items</th>
                <th>Amount (ETB)</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.slice(0, 4).map((order) => {
                const isPending = order.status === "requested";
                return (
                  <tr key={order._id} style={{ cursor: "pointer" }} onClick={() => navigate("/vendor/orders")}>
                    <td style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "0.82rem", color: "var(--primary-dark)" }}>{order.orderNumber}</td>
                    <td style={{ fontSize: "0.83rem", color: "var(--text-secondary)" }}>{order.pharmacistName}</td>
                    <td>{order.items.length}</td>
                    <td style={{ fontWeight: 700 }}>{order.totalAmount.toLocaleString()}</td>
                    <td>
                      <span className="badge" style={{
                        background: isPending ? "#fef3c7" : order.status === "delivered" ? "#dcfce7" : "#dbeafe",
                        color: isPending ? "#b45309" : order.status === "delivered" ? "#15803d" : "#1d4ed8"
                      }}>
                        {isPending ? "Pending" : order.status === "delivered" ? "Delivered" : order.status}
                      </span>
                    </td>
                    <td><IconChevronRight size={14} color="#94a3b8" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Quick actions */}
          <div className="card">
            <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 14 }}>Quick Actions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Add New Product", icon: IconPlus, path: "/vendor/products/add", color: "#16a34a", bg: "#f0fdf4" },
                { label: "Manage Products", icon: IconPackage, path: "/vendor/products", color: "#0284c7", bg: "#eff6ff" },
                { label: "Fulfil Orders", icon: IconTruckDelivery, path: "/vendor/orders", color: "#7c3aed", bg: "#f5f3ff" },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    onClick={() => navigate(action.path)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
                      border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                      background: "var(--surface-2)", cursor: "pointer", transition: "all 0.2s", textAlign: "left"
                    }}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 7, background: action.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={16} color={action.color} strokeWidth={1.8} />
                    </div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{action.label}</span>
                    <IconChevronRight size={14} color="#94a3b8" style={{ marginLeft: "auto" }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Performance */}
          <div className="card" style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)", borderColor: "#bbf7d0" }}>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 12, color: "#15803d" }}>
              <IconCircleCheck size={16} style={{ verticalAlign: "middle", marginRight: 6 }} />
              Performance Summary
            </div>
            {[
              ["Orders fulfilled", "94%"],
              ["Avg. delivery time", "4.2 days"],
              ["Customer rating", "4.7 / 5 ⭐"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", padding: "6px 0", borderBottom: "1px solid #bbf7d0" }}>
                <span style={{ color: "#166534" }}>{k}</span>
                <span style={{ fontWeight: 700, color: "#15803d" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorDashboard;

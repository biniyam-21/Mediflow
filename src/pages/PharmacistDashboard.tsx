import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import { DataTable, Column, DropdownFilter } from "../components/DataTable";
import {
  IconShoppingCart,
  IconClipboardList,
  IconAlertTriangle,
  IconCurrencyDollar,
  IconPackage,
  IconChevronRight,
  IconClock,
  IconCircleCheck,
  IconTruck,
} from "@tabler/icons-react";
import { MOCK_ORDERS } from "../data/mockOrders";
import { Order, OrderStatus } from "../types";

const statusMeta: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  requested: { label: "Requested", color: "#b45309", bg: "#fef3c7", icon: IconClock },
  approved: { label: "Approved", color: "#0284c7", bg: "#dbeafe", icon: IconClipboardList },
  in_transit: { label: "In Transit", color: "#7c3aed", bg: "#f5f3ff", icon: IconTruck },
  delivered: { label: "Delivered", color: "#16a34a", bg: "#dcfce7", icon: IconCircleCheck },
  cancelled: { label: "Cancelled", color: "#b91c1c", bg: "#fee2e2", icon: IconAlertTriangle },
};

const PharmacistDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Pharmacist");

  useEffect(() => {
    const email = localStorage.getItem("userEmail") || "";
    if (email) setUserName(email.split("@")[0]);
  }, []);

  const pendingOrders = MOCK_ORDERS.filter((o) => o.status === "requested" || o.status === "approved");
  const totalSpent = MOCK_ORDERS.filter((o) => o.status === "delivered").reduce((s, o) => s + o.totalAmount, 0);
  const lowStockCount = 3;

  const columns: Column<Order>[] = [
    {
      header: "Order #",
      accessor: (row) => <span style={{ fontWeight: 700, fontSize: "0.82rem", fontFamily: "monospace", color: "var(--primary-dark)" }}>{row.orderNumber}</span>,
    },
    {
      header: "Vendor",
      accessor: (row) => <span style={{ color: "var(--text-secondary)", fontSize: "0.83rem", fontWeight: 600 }}>{row.vendorName}</span>,
    },
    {
      header: "Amount (ETB)",
      accessor: (row) => <span style={{ fontWeight: 800 }}>{row.totalAmount.toLocaleString()} ETB</span>,
    },
    {
      header: "Status",
      accessor: (row) => {
        const meta = statusMeta[row.status];
        const Icon = meta.icon;
        return (
          <span className="badge" style={{ background: meta.bg, color: meta.color }}>
            <Icon size={11} strokeWidth={2.5} />
            {meta.label}
          </span>
        );
      },
    },
    {
      header: "",
      accessor: () => <IconChevronRight size={14} color="#94a3b8" />,
      align: "right",
    },
  ];

  const filters: DropdownFilter<Order>[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Requested", value: "requested" },
        { label: "Approved", value: "approved" },
        { label: "In Transit", value: "in_transit" },
        { label: "Delivered", value: "delivered" },
      ],
      filterFn: (order, val) => order.status === val,
    },
  ];

  return (
    <DashboardLayout title="Dashboard" subtitle={`Welcome back, ${userName}`}>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}
        className="animate-stagger">
        <StatCard
          label="Total Orders"
          value={MOCK_ORDERS.length}
          icon={<IconClipboardList size={20} color="#16a34a" strokeWidth={1.8} />}
          iconBg="#f0fdf4"
          trend={12}
          trendLabel="12% this month"
          accentColor="#16a34a"
        />
        <StatCard
          label="Pending Orders"
          value={pendingOrders.length}
          icon={<IconClock size={20} color="#b45309" strokeWidth={1.8} />}
          iconBg="#fef3c7"
          trendLabel="Awaiting fulfillment"
          accentColor="#f59e0b"
        />
        <StatCard
          label="Low Stock Alerts"
          value={lowStockCount}
          icon={<IconAlertTriangle size={20} color="#b91c1c" strokeWidth={1.8} />}
          iconBg="#fee2e2"
          trendLabel="Needs reorder soon"
          accentColor="#ef4444"
        />
        <StatCard
          label="Total Spent (ETB)"
          value={`${(totalSpent / 1000).toFixed(1)}K`}
          icon={<IconCurrencyDollar size={20} color="#0284c7" strokeWidth={1.8} />}
          iconBg="#dbeafe"
          trend={8}
          trendLabel="8% vs last month"
          accentColor="#0284c7"
        />
      </div>

      {/* Content grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20 }}>
        {/* Recent orders with DataTable */}
        <div>
          <DataTable<Order>
            columns={columns}
            data={MOCK_ORDERS}
            searchPlaceholder="Search recent order # or vendor…"
            searchFields={["orderNumber", "vendorName"]}
            filters={filters}
            pageSize={10}
            pageSizeOptions={[10, 20]}
            onRowClick={(order) => navigate(`/orders/${order._id}`, { state: { order } })}
            headerAction={
              <button className="btn-secondary" style={{ fontSize: "0.78rem", padding: "6px 12px" }} onClick={() => navigate("/orders")}>
                View All
              </button>
            }
          />
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Quick actions */}
          <div className="card">
            <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 14, color: "var(--text-primary)" }}>Quick Actions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Browse Medicines", icon: IconPackage, path: "/product", color: "#16a34a", bg: "#f0fdf4" },
                { label: "Place New Order", icon: IconShoppingCart, path: "/cart", color: "#0284c7", bg: "#eff6ff" },
                { label: "View All Orders", icon: IconClipboardList, path: "/orders", color: "#7c3aed", bg: "#f5f3ff" },
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
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = action.bg; (e.currentTarget as HTMLElement).style.borderColor = action.color; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
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

          {/* Low stock alert */}
          <div className="card" style={{ borderColor: "#fecaca", background: "linear-gradient(135deg, #fff 0%, #fff5f5 100%)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <IconAlertTriangle size={16} color="#ef4444" />
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#b91c1c" }}>Low Stock Alerts</div>
            </div>
            {[
              { name: "Artemether-Lumefantrine 80/480mg", qty: 12, unit: "courses" },
              { name: "ORS Oral Rehydration Salts", qty: 20, unit: "boxes" },
              { name: "Paracetamol 500mg (20s)", qty: 15, unit: "packs" },
            ].map((item) => (
              <div key={item.name} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 0", borderBottom: "1px solid #fecaca"
              }}>
                <span style={{ fontSize: "0.78rem", color: "var(--text-primary)", fontWeight: 500 }}>{item.name}</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#ef4444", background: "#fee2e2", padding: "2px 8px", borderRadius: 999 }}>
                  {item.qty} {item.unit}
                </span>
              </div>
            ))}
            <button
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 14, padding: "9px", fontSize: "0.8rem" }}
              onClick={() => navigate("/product")}
            >
              Reorder Now
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PharmacistDashboard;

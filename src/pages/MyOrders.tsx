import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { DataTable, Column, DropdownFilter } from "../components/DataTable";
import {
  IconChevronRight,
  IconClock,
  IconClipboardList,
  IconTruck,
  IconCircleCheck,
  IconX,
} from "@tabler/icons-react";
import { MOCK_ORDERS } from "../data/mockOrders";
import { Order, OrderStatus } from "../types";

const statusMeta: Record<OrderStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  requested: { label: "Requested", color: "#b45309", bg: "#fef3c7", icon: IconClock },
  approved: { label: "Approved", color: "#0284c7", bg: "#dbeafe", icon: IconClipboardList },
  in_transit: { label: "In Transit", color: "#7c3aed", bg: "#f5f3ff", icon: IconTruck },
  delivered: { label: "Delivered", color: "#16a34a", bg: "#dcfce7", icon: IconCircleCheck },
  cancelled: { label: "Cancelled", color: "#b91c1c", bg: "#fee2e2", icon: IconX },
};

const MyOrders: React.FC = () => {
  const navigate = useNavigate();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-ET", { day: "numeric", month: "short", year: "numeric" });

  const columns: Column<Order>[] = [
    {
      header: "Order Number",
      accessor: (row) => (
        <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "0.82rem", color: "var(--primary-dark)" }}>
          {row.orderNumber}
        </span>
      ),
    },
    {
      header: "Vendor",
      accessor: (row) => (
        <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.85rem" }}>
          {row.vendorName}
        </div>
      ),
    },
    {
      header: "Items",
      accessor: (row) => (
        <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
          {row.items.length} item{row.items.length > 1 ? "s" : ""}
        </span>
      ),
    },
    {
      header: "Total (ETB)",
      accessor: (row) => (
        <span style={{ fontWeight: 800, fontSize: "0.9rem" }}>
          {row.totalAmount.toLocaleString()} ETB
        </span>
      ),
    },
    {
      header: "Date",
      accessor: (row) => (
        <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
          {formatDate(row.createdAt)}
        </span>
      ),
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
      accessor: () => <IconChevronRight size={15} color="#94a3b8" />,
      align: "right",
    },
  ];

  const filters: DropdownFilter<Order>[] = [
    {
      key: "status",
      label: "Order Status",
      options: [
        { label: "Requested", value: "requested" },
        { label: "Approved", value: "approved" },
        { label: "In Transit", value: "in_transit" },
        { label: "Delivered", value: "delivered" },
        { label: "Cancelled", value: "cancelled" },
      ],
      filterFn: (order, value) => order.status === value,
    },
  ];

  return (
    <DashboardLayout title="My Orders" subtitle="Track and manage all your medicine orders">
      <DataTable<Order>
        columns={columns}
        data={MOCK_ORDERS}
        searchPlaceholder="Search order # or vendor…"
        searchFields={["orderNumber", "vendorName"]}
        filters={filters}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
        onRowClick={(order) => navigate(`/orders/${order._id}`, { state: { order } })}
        emptyMessage="No orders found matching your search or dropdown filter"
      />
    </DashboardLayout>
  );
};

export default MyOrders;

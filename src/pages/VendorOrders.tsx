import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import InvoiceModal from "../components/InvoiceModal";
import PackingSlipModal from "../components/PackingSlipModal";
import { DataTable, Column, DropdownFilter } from "../components/DataTable";
import { IconCheck, IconX, IconTruck, IconPrinter, IconBox } from "@tabler/icons-react";
import { MOCK_ORDERS } from "../data/mockOrders";
import { Order, OrderStatus } from "../types";

const statusMeta: Partial<Record<OrderStatus, { label: string; color: string; bg: string }>> = {
  requested: { label: "Pending", color: "#b45309", bg: "#fef3c7" },
  approved: { label: "Approved", color: "#0284c7", bg: "#dbeafe" },
  in_transit: { label: "In Transit", color: "#7c3aed", bg: "#f5f3ff" },
  delivered: { label: "Delivered", color: "#16a34a", bg: "#dcfce7" },
  cancelled: { label: "Cancelled", color: "#b91c1c", bg: "#fee2e2" },
};

const VendorOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [selectedPackingOrder, setSelectedPackingOrder] = useState<Order | null>(null);

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => o._id === id ? { ...o, status } : o));
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-ET", { day: "numeric", month: "short" });

  const columns: Column<Order>[] = [
    {
      header: "Order #",
      accessor: (row) => (
        <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "0.82rem", color: "var(--primary-dark)" }}>
          {row.orderNumber}
        </span>
      ),
    },
    {
      header: "From (Facility)",
      accessor: (row) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.84rem" }}>{row.pharmacistName}</div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{row.deliveryAddress.split(",")[0]}</div>
        </div>
      ),
    },
    {
      header: "Medicines",
      accessor: (row) => (
        <div style={{ fontSize: "0.82rem" }}>
          {row.items.map((i) => (
            <div key={i.medicineId} style={{ color: "var(--text-secondary)", marginBottom: 2 }}>
              {i.medicineName.split(" ").slice(0, 3).join(" ")}… ×{i.quantity}
            </div>
          ))}
        </div>
      ),
    },
    {
      header: "Total (ETB)",
      accessor: (row) => <span style={{ fontWeight: 800 }}>{row.totalAmount.toLocaleString()} ETB</span>,
    },
    {
      header: "Requested",
      accessor: (row) => <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{formatDate(row.createdAt)}</span>,
    },
    {
      header: "Status",
      accessor: (row) => {
        const meta = statusMeta[row.status];
        return meta ? (
          <span className="badge" style={{ background: meta.bg, color: meta.color }}>
            {meta.label}
          </span>
        ) : null;
      },
    },
    {
      header: "Prints & Documents",
      accessor: (row) => (
        <div style={{ display: "flex", gap: 4 }} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setSelectedInvoiceOrder(row)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 3,
              padding: "4px 7px", borderRadius: 6, border: "1px solid var(--border)",
              background: "white", cursor: "pointer", fontSize: "0.72rem", fontWeight: 600, color: "var(--text-secondary)"
            }}
            title="FMHACA Tax Invoice & Delivery Waybill"
          >
            <IconPrinter size={13} color="var(--primary)" /> Invoice
          </button>
          <button
            onClick={() => setSelectedPackingOrder(row)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 3,
              padding: "4px 7px", borderRadius: 6, border: "1px solid #bfdbfe",
              background: "#eff6ff", cursor: "pointer", fontSize: "0.72rem", fontWeight: 600, color: "#1d4ed8"
            }}
            title="Warehouse Driver Loading Packing Slip"
          >
            <IconBox size={13} color="#1d4ed8" /> Slip
          </button>
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: (row) => {
        const isPending = row.status === "requested";
        const isApproved = row.status === "approved";
        return (
          <div style={{ display: "flex", gap: 6 }} onClick={(e) => e.stopPropagation()}>
            {isPending && (
              <>
                <button
                  onClick={() => updateStatus(row._id, "approved")}
                  style={{
                    display: "flex", alignItems: "center", gap: 4, padding: "5px 10px",
                    background: "#dcfce7", border: "1px solid #bbf7d0", borderRadius: 6,
                    color: "#15803d", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer"
                  }}
                >
                  <IconCheck size={12} strokeWidth={2.5} /> Accept
                </button>
                <button
                  onClick={() => updateStatus(row._id, "cancelled")}
                  style={{
                    display: "flex", alignItems: "center", gap: 4, padding: "5px 10px",
                    background: "#fee2e2", border: "1px solid #fecaca", borderRadius: 6,
                    color: "#b91c1c", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer"
                  }}
                >
                  <IconX size={12} strokeWidth={2.5} /> Decline
                </button>
              </>
            )}
            {isApproved && (
              <button
                onClick={() => updateStatus(row._id, "in_transit")}
                style={{
                  display: "flex", alignItems: "center", gap: 4, padding: "5px 12px",
                  background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 6,
                  color: "#7c3aed", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer"
                }}
              >
                <IconTruck size={12} /> Dispatch
              </button>
            )}
            {row.status === "in_transit" && (
              <button
                onClick={() => updateStatus(row._id, "delivered")}
                style={{
                  display: "flex", alignItems: "center", gap: 4, padding: "5px 12px",
                  background: "#dcfce7", border: "1px solid #bbf7d0", borderRadius: 6,
                  color: "#15803d", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer"
                }}
              >
                <IconCheck size={12} /> Mark Delivered
              </button>
            )}
          </div>
        );
      },
    },
  ];

  const filters: DropdownFilter<Order>[] = [
    {
      key: "status",
      label: "Order Status",
      options: [
        { label: "Pending Requested", value: "requested" },
        { label: "Approved", value: "approved" },
        { label: "In Transit", value: "in_transit" },
        { label: "Delivered", value: "delivered" },
        { label: "Cancelled", value: "cancelled" },
      ],
      filterFn: (item, val) => item.status === val,
    },
  ];

  return (
    <DashboardLayout title="Incoming Orders" subtitle="Accept or decline orders and print delivery waybills or packing slips">
      <DataTable<Order>
        columns={columns}
        data={orders}
        searchPlaceholder="Search order # or health facility…"
        searchFields={["orderNumber", "pharmacistName", "deliveryAddress"]}
        filters={filters}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
        emptyMessage="No incoming orders found"
        exportable={true}
        exportFilename="vendor_incoming_orders"
      />

      {/* Invoice / Waybill Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}

      {/* Warehouse Packing Slip Modal */}
      {selectedPackingOrder && (
        <PackingSlipModal
          order={selectedPackingOrder}
          onClose={() => setSelectedPackingOrder(null)}
        />
      )}
    </DashboardLayout>
  );
};

export default VendorOrders;

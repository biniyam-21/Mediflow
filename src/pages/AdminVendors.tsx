import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { DataTable, Column, DropdownFilter } from "../components/DataTable";
import { IconCheck, IconX, IconClock, IconShieldCheck } from "@tabler/icons-react";
import { MOCK_USERS } from "../data/mockUsers";
import { User } from "../types";

const AdminVendors: React.FC = () => {
  const [vendors, setVendors] = useState<User[]>(
    MOCK_USERS.filter((u) => u.role === "vendor")
  );

  const updateStatus = (id: string, status: User["status"]) => {
    setVendors((prev) => prev.map((v) => v._id === id ? { ...v, status } : v));
  };

  const pending = vendors.filter((v) => v.status === "pending");

  const columns: Column<User>[] = [
    {
      header: "Vendor",
      accessor: (vendor) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.88rem", color: "#0284c7", flexShrink: 0 }}>
            {vendor.name[0]}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{vendor.name}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{vendor.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Organization",
      accessor: (vendor) => <span style={{ fontSize: "0.83rem" }}>{vendor.organization}</span>,
    },
    {
      header: "Location",
      accessor: (vendor) => (
        <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
          {vendor.city}, {vendor.region.split(" Region")[0]}
        </span>
      ),
    },
    {
      header: "FMHACA License",
      accessor: (vendor) => vendor.licenseNumber ? (
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <IconShieldCheck size={13} color="#16a34a" />
          <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#15803d", fontWeight: 600 }}>
            {vendor.licenseNumber}
          </span>
        </div>
      ) : (
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Not provided</span>
      ),
    },
    {
      header: "Registered",
      accessor: (vendor) => (
        <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
          {new Date(vendor.joinedAt).toLocaleDateString("en-ET", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (vendor) => (
        <span className="badge" style={{
          background: vendor.status === "active" ? "#dcfce7" : vendor.status === "pending" ? "#fef3c7" : "#fee2e2",
          color: vendor.status === "active" ? "#15803d" : vendor.status === "pending" ? "#b45309" : "#b91c1c"
        }}>
          {vendor.status}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (vendor) => (
        <div style={{ display: "flex", gap: 5 }}>
          {vendor.status === "pending" && (
            <>
              <button onClick={() => updateStatus(vendor._id, "active")} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", background: "#dcfce7", border: "1px solid #bbf7d0", borderRadius: 6, color: "#15803d", fontWeight: 700, fontSize: "0.73rem", cursor: "pointer" }}>
                <IconCheck size={11} /> Approve
              </button>
              <button onClick={() => updateStatus(vendor._id, "suspended")} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", background: "#fee2e2", border: "1px solid #fecaca", borderRadius: 6, color: "#b91c1c", fontWeight: 700, fontSize: "0.73rem", cursor: "pointer" }}>
                <IconX size={11} /> Reject
              </button>
            </>
          )}
          {vendor.status === "active" && (
            <button onClick={() => updateStatus(vendor._id, "suspended")} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", background: "#fee2e2", border: "1px solid #fecaca", borderRadius: 6, color: "#b91c1c", fontWeight: 700, fontSize: "0.73rem", cursor: "pointer" }}>
              Suspend
            </button>
          )}
          {vendor.status === "suspended" && (
            <button onClick={() => updateStatus(vendor._id, "active")} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", background: "#dcfce7", border: "1px solid #bbf7d0", borderRadius: 6, color: "#15803d", fontWeight: 700, fontSize: "0.73rem", cursor: "pointer" }}>
              <IconCheck size={11} /> Reinstate
            </button>
          )}
        </div>
      ),
    },
  ];

  const filters: DropdownFilter<User>[] = [
    {
      key: "status",
      label: "Vendor Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Pending Approval", value: "pending" },
        { label: "Suspended", value: "suspended" },
      ],
      filterFn: (v, val) => v.status === val,
    },
  ];

  return (
    <DashboardLayout title="Vendor Management" subtitle="Approve, review and manage supplier accounts">
      {/* Pending alert */}
      {pending.length > 0 && (
        <div style={{ background: "#fef3c7", border: "1px solid #fde68a", borderRadius: "var(--radius-md)", padding: "12px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <IconClock size={18} color="#b45309" />
          <div style={{ fontWeight: 700, color: "#92400e", fontSize: "0.88rem" }}>
            {pending.length} vendor{pending.length > 1 ? "s" : ""} awaiting FMHACA approval
          </div>
        </div>
      )}

      <DataTable<User>
        columns={columns}
        data={vendors}
        searchPlaceholder="Search vendor by name, organization, or license…"
        searchFields={["name", "organization", "licenseNumber", "city"]}
        filters={filters}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
        emptyMessage="No vendor accounts found"
      />
    </DashboardLayout>
  );
};

export default AdminVendors;

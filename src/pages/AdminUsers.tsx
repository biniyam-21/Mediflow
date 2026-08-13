import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { DataTable, Column, DropdownFilter } from "../components/DataTable";
import { IconUserCheck, IconUserX, IconShieldCheck } from "@tabler/icons-react";
import { MOCK_USERS } from "../data/mockUsers";
import { User } from "../types";

const roleColor: Record<string, { color: string; bg: string }> = {
  admin: { color: "#7c3aed", bg: "#f5f3ff" },
  pharmacist: { color: "#16a34a", bg: "#f0fdf4" },
  vendor: { color: "#0284c7", bg: "#eff6ff" },
};

const statusColor: Record<string, { color: string; bg: string }> = {
  active: { color: "#15803d", bg: "#dcfce7" },
  pending: { color: "#b45309", bg: "#fef3c7" },
  suspended: { color: "#b91c1c", bg: "#fee2e2" },
};

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  const updateStatus = (id: string, status: User["status"]) => {
    setUsers((prev) => prev.map((u) => u._id === id ? { ...u, status } : u));
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-ET", { day: "numeric", month: "short", year: "numeric" });

  const columns: Column<User>[] = [
    {
      header: "User",
      accessor: (user) => {
        const rc = roleColor[user.role];
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: rc?.bg || "#f0fdf4",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: "0.85rem", color: rc?.color || "#16a34a", flexShrink: 0
            }}>
              {user.name[0]}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{user.name}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{user.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Role",
      accessor: (user) => {
        const rc = roleColor[user.role];
        return (
          <span className="badge" style={{ background: rc?.bg, color: rc?.color }}>
            {user.role}
          </span>
        );
      },
    },
    {
      header: "Organization",
      accessor: (user) => <span style={{ fontSize: "0.82rem" }}>{user.organization}</span>,
    },
    {
      header: "City / Region",
      accessor: (user) => (
        <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
          <div>{user.city}</div>
          <div style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>{user.region.split(" Region")[0]}</div>
        </div>
      ),
    },
    {
      header: "FMHACA License",
      accessor: (user) => (
        <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: user.licenseNumber ? "var(--text-primary)" : "var(--text-muted)" }}>
          {user.licenseNumber || "—"}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (user) => {
        const sc = statusColor[user.status];
        return (
          <span className="badge" style={{ background: sc?.bg, color: sc?.color }}>
            {user.status}
          </span>
        );
      },
    },
    {
      header: "Joined",
      accessor: (user) => <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{formatDate(user.joinedAt)}</span>,
    },
    {
      header: "Actions",
      accessor: (user) => (
        <div style={{ display: "flex", gap: 5 }}>
          {user.status === "pending" && (
            <button onClick={() => updateStatus(user._id, "active")} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 9px", background: "#dcfce7", border: "1px solid #bbf7d0", borderRadius: 6, color: "#15803d", fontWeight: 600, fontSize: "0.72rem", cursor: "pointer" }}>
              <IconUserCheck size={11} /> Approve
            </button>
          )}
          {user.status === "active" && user.role !== "admin" && (
            <button onClick={() => updateStatus(user._id, "suspended")} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 9px", background: "#fee2e2", border: "1px solid #fecaca", borderRadius: 6, color: "#b91c1c", fontWeight: 600, fontSize: "0.72rem", cursor: "pointer" }}>
              <IconUserX size={11} /> Suspend
            </button>
          )}
          {user.status === "suspended" && (
            <button onClick={() => updateStatus(user._id, "active")} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 9px", background: "#dcfce7", border: "1px solid #bbf7d0", borderRadius: 6, color: "#15803d", fontWeight: 600, fontSize: "0.72rem", cursor: "pointer" }}>
              <IconShieldCheck size={11} /> Reinstate
            </button>
          )}
        </div>
      ),
    },
  ];

  const filters: DropdownFilter<User>[] = [
    {
      key: "role",
      label: "User Role",
      options: [
        { label: "Pharmacist", value: "pharmacist" },
        { label: "Vendor", value: "vendor" },
        { label: "Administrator", value: "admin" },
      ],
      filterFn: (u, val) => u.role === val,
    },
    {
      key: "status",
      label: "Account Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Pending", value: "pending" },
        { label: "Suspended", value: "suspended" },
      ],
      filterFn: (u, val) => u.status === val,
    },
  ];

  return (
    <DashboardLayout title="User Management" subtitle="Manage all registered users and their access">
      <DataTable<User>
        columns={columns}
        data={users}
        searchPlaceholder="Search by user name, email, or organization…"
        searchFields={["name", "email", "organization", "city"]}
        filters={filters}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
        emptyMessage="No registered users found matching filter criteria"
      />
    </DashboardLayout>
  );
};

export default AdminUsers;

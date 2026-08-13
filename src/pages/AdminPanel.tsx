import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import { DataTable, Column, DropdownFilter } from "../components/DataTable";
import {
  IconUsers,
  IconBuildingStore,
  IconPill,
  IconChartBar,
  IconAlertTriangle,
  IconChevronRight,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { getAllMedicines, addMedicine, deleteMedicine } from "../services/medicineService";
import { Medicine } from "../types";
import { MOCK_USERS } from "../data/mockUsers";
import { MOCK_ORDERS } from "../data/mockOrders";

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState<Medicine[]>(getAllMedicines());
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({
    title: "", price: "", city: "", pharmacyName: "", unit: "", description: "", category: ""
  });

  const totalUsers = MOCK_USERS.length;
  const pendingUsers = MOCK_USERS.filter((u) => u.status === "pending").length;
  const totalRevenue = MOCK_ORDERS.filter((o) => o.status === "delivered").reduce((s, o) => s + o.totalAmount, 0);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    addMedicine({
      Title: form.title,
      City: form.city || "Addis Ababa",
      PharmacyName: form.pharmacyName || "MediFlow Store",
      Price: `${form.price} ETB`,
      Unit: form.unit,
      ImageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
      Description: form.description || "Medicine listed via admin portal.",
      Uses: "As prescribed.",
      InStock: true,
      Category: form.category,
    });
    setMedicines([...getAllMedicines()]);
    setForm({ title: "", price: "", city: "", pharmacyName: "", unit: "", description: "", category: "" });
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    setMedicines(deleteMedicine(id));
  };

  const columns: Column<Medicine>[] = [
    {
      header: "Medicine",
      accessor: (med) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={med.ImageUrl} alt={med.Title} style={{ width: 32, height: 32, borderRadius: 6, objectFit: "cover" }}
            onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=60"; }} />
          <div style={{ fontWeight: 600, fontSize: "0.84rem" }}>{med.Title}</div>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: (med) => <span className="badge badge-gray" style={{ fontSize: "0.68rem" }}>{med.Category || "General"}</span>,
    },
    {
      header: "Vendor / City",
      accessor: (med) => <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{med.PharmacyName || med.City}</span>,
    },
    {
      header: "Price (ETB)",
      accessor: (med) => <span style={{ fontWeight: 700 }}>{med.Price}</span>,
    },
    {
      header: "Stock Status",
      accessor: (med) => (
        <span className="badge" style={{ background: med.InStock ? "#dcfce7" : "#fee2e2", color: med.InStock ? "#15803d" : "#b91c1c" }}>
          {med.InStock ? "In Stock" : "Out of Stock"}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: (med) => (
        <button className="btn-danger" style={{ padding: "5px 10px" }} onClick={() => handleDelete(med._id)}>
          <IconTrash size={13} /> Remove
        </button>
      ),
    },
  ];

  const categories = Array.from(new Set(medicines.map((m) => m.Category || "General")));

  const filters: DropdownFilter<Medicine>[] = [
    {
      key: "category",
      label: "Category",
      options: categories.map((c) => ({ label: c, value: c })),
      filterFn: (med, val) => (med.Category || "General") === val,
    },
    {
      key: "stock",
      label: "Stock",
      options: [
        { label: "In Stock", value: "instock" },
        { label: "Out of Stock", value: "outofstock" },
      ],
      filterFn: (med, val) => (val === "instock" ? !!med.InStock : !med.InStock),
    },
  ];

  return (
    <DashboardLayout title="Admin Dashboard" subtitle="System-wide overview and management">
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }} className="animate-stagger">
        <StatCard label="Total Medicines" value={medicines.length} icon={<IconPill size={20} color="#16a34a" strokeWidth={1.8} />} iconBg="#f0fdf4" trend={8} trendLabel="8% this month" accentColor="#16a34a" />
        <StatCard label="Registered Users" value={totalUsers} icon={<IconUsers size={20} color="#0284c7" strokeWidth={1.8} />} iconBg="#dbeafe" trend={15} accentColor="#0284c7" />
        <StatCard label="Pending Approvals" value={pendingUsers} icon={<IconAlertTriangle size={20} color="#b45309" strokeWidth={1.8} />} iconBg="#fef3c7" trendLabel="Needs review" accentColor="#f59e0b" />
        <StatCard label="Platform Revenue (ETB)" value={`${(totalRevenue / 1000).toFixed(0)}K`} icon={<IconChartBar size={20} color="#7c3aed" strokeWidth={1.8} />} iconBg="#f5f3ff" trend={22} accentColor="#7c3aed" />
      </div>

      {/* Quick nav cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { label: "User Management", icon: IconUsers, path: "/admin/users", count: totalUsers, color: "#0284c7", bg: "#eff6ff" },
          { label: "Vendor Management", icon: IconBuildingStore, path: "/admin/vendors", count: `${pendingUsers} pending`, color: "#b45309", bg: "#fef3c7" },
          { label: "Reports & Analytics", icon: IconChartBar, path: "/admin/reports", count: "View insights", color: "#7c3aed", bg: "#f5f3ff" },
          { label: "System Settings", icon: IconAlertTriangle, path: "/admin/settings", count: "Configure", color: "#16a34a", bg: "#f0fdf4" },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="card"
              style={{ cursor: "pointer", transition: "all 0.2s", background: card.bg, borderColor: card.bg }}
              onClick={() => navigate(card.path)}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Icon size={22} color={card.color} strokeWidth={1.8} />
                <IconChevronRight size={14} color={card.color} />
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--text-primary)", marginTop: 14 }}>{card.label}</div>
              <div style={{ fontSize: "0.75rem", color: card.color, fontWeight: 600, marginTop: 4 }}>{card.count}</div>
            </div>
          );
        })}
      </div>

      {/* Inline Add Form */}
      {showAddForm && (
        <form onSubmit={handleAdd} style={{ padding: "20px", borderRadius: "var(--radius-md)", marginBottom: 20, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
          <div style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: 14, color: "var(--primary-dark)" }}>→ Add New Medicine</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 12 }}>
            {[
              { label: "Medicine Name *", field: "title", placeholder: "Amoxicillin 500mg (10s)" },
              { label: "Price (ETB) *", field: "price", placeholder: "420" },
              { label: "Packaging Unit *", field: "unit", placeholder: "10 Capsules in Strip" },
              { label: "City", field: "city", placeholder: "Addis Ababa" },
              { label: "Vendor / Pharmacy", field: "pharmacyName", placeholder: "PFSA Central Store" },
              { label: "Category", field: "category", placeholder: "Antibiotics" },
            ].map(({ label, field, placeholder }) => (
              <div key={field}>
                <label className="form-label">{label}</label>
                <input
                  className="form-input"
                  placeholder={placeholder}
                  value={(form as Record<string, string>)[field]}
                  onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                  required={label.includes("*")}
                />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 12 }}>
            <label className="form-label">Description</label>
            <textarea className="form-input" style={{ minHeight: 60, resize: "vertical" }} placeholder="Brief product description…" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
          </div>
          <button type="submit" className="btn-primary" style={{ fontSize: "0.85rem" }}>
            <IconPlus size={14} /> Add to Inventory
          </button>
        </form>
      )}

      {/* Inventory Table */}
      <DataTable<Medicine>
        columns={columns}
        data={medicines}
        searchPlaceholder="Search medicine name or vendor…"
        searchFields={["Title", "PharmacyName", "City", "Category"]}
        filters={filters}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
        headerAction={
          <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem" }} onClick={() => setShowAddForm(!showAddForm)}>
            <IconPlus size={15} /> {showAddForm ? "Cancel Form" : "Add Medicine"}
          </button>
        }
      />
    </DashboardLayout>
  );
};

export default AdminPanel;

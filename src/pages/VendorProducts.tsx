import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { DataTable, Column, DropdownFilter } from "../components/DataTable";
import { IconPlus, IconEdit, IconTrash, IconToggleRight, IconBox, IconCheck, IconTag } from "@tabler/icons-react";
import { getAllMedicines } from "../services/medicineService";
import { useToast } from "../context/ToastContext";
import { Medicine } from "../types";

const VendorProducts: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [medicines, setMedicines] = useState<Medicine[]>(getAllMedicines());

  const [editingMed, setEditingMed] = useState<Medicine | null>(null);
  const [newStockQty, setNewStockQty] = useState<number>(250);

  const toggleStock = (id: string) => {
    setMedicines((prev) => prev.map((m) => m._id === id ? { ...m, InStock: !m.InStock } : m));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Remove this product from your listings?")) {
      setMedicines((prev) => prev.filter((m) => m._id !== id));
      showToast("Product removed from listings", "info");
    }
  };

  const handleUpdateStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMed) return;
    showToast(`Updated stock for "${editingMed.Title}" to ${newStockQty} units!`, "success");
    setEditingMed(null);
  };

  const columns: Column<Medicine>[] = [
    {
      header: "Product",
      accessor: (med) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src={med.ImageUrl}
            alt={med.Title}
            style={{ width: 36, height: 36, borderRadius: 6, objectFit: "cover", border: "1px solid var(--border)" }}
            onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&auto=format"; }}
          />
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.84rem", color: "var(--text-primary)" }}>{med.Title}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{med.Unit}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: (med) => <span className="badge badge-gray" style={{ fontSize: "0.7rem" }}>{med.Category || "General"}</span>,
    },
    {
      header: "Price (ETB)",
      accessor: (med) => <span style={{ fontWeight: 700 }}>{med.Price}</span>,
    },
    {
      header: "Stock Status",
      accessor: (med) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => toggleStock(med._id)}
            style={{
              display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer",
              fontSize: "0.78rem", fontWeight: 600,
              color: med.InStock ? "#16a34a" : "#94a3b8"
            }}
          >
            <IconToggleRight size={18} style={{ color: med.InStock ? "#16a34a" : "#94a3b8" }} />
            {med.InStock ? "In Stock" : "Out of Stock"}
          </button>

          <button
            onClick={() => { setEditingMed(med); setNewStockQty(250); }}
            style={{
              fontSize: "0.72rem", fontWeight: 600, color: "var(--primary-dark)",
              background: "var(--surface-2)", border: "1px solid var(--border)",
              padding: "2px 7px", borderRadius: 4, cursor: "pointer"
            }}
          >
            Adjust Qty
          </button>
        </div>
      ),
    },
    {
      header: "Expiry Date",
      accessor: (med) => {
        const expiryDate = med.ExpiryDate ? new Date(med.ExpiryDate) : null;
        const today = new Date();
        const daysUntilExpiry = expiryDate ? Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : null;
        const expiryColor = daysUntilExpiry === null ? "#94a3b8" : daysUntilExpiry < 60 ? "#b91c1c" : daysUntilExpiry < 180 ? "#b45309" : "#16a34a";

        return (
          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: expiryColor }}>
            {expiryDate ? expiryDate.toLocaleDateString("en-ET", { day: "numeric", month: "short", year: "numeric" }) : "N/A"}
            {daysUntilExpiry !== null && daysUntilExpiry < 180 && (
              <div style={{ fontSize: "0.68rem", fontWeight: 700 }}>{daysUntilExpiry < 0 ? "EXPIRED" : `${daysUntilExpiry}d left`}</div>
            )}
          </span>
        );
      },
    },
    {
      header: "Actions",
      accessor: (med) => (
        <div style={{ display: "flex", gap: 6 }}>
          <button
            style={{ padding: "5px 10px", border: "1px solid var(--border)", borderRadius: 6, background: "var(--surface-2)", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: "0.75rem", color: "var(--text-secondary)" }}
            onClick={() => navigate("/vendor/products/add")}
          >
            <IconEdit size={12} /> Edit
          </button>
          <button className="btn-danger" style={{ padding: "5px 10px" }} onClick={() => handleDelete(med._id)}>
            <IconTrash size={12} />
          </button>
        </div>
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
      label: "Stock Status",
      options: [
        { label: "In Stock", value: "instock" },
        { label: "Out of Stock", value: "outofstock" },
      ],
      filterFn: (med, val) => (val === "instock" ? !!med.InStock : !med.InStock),
    },
  ];

  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedDiscountPercent, setSelectedDiscountPercent] = useState<number>(10);

  const handleApplyBulkDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    setMedicines((prev) =>
      prev.map((m) => ({
        ...m,
        Discount: `${selectedDiscountPercent}% OFF`,
      }))
    );
    setShowBulkModal(false);
    showToast(`Applied ${selectedDiscountPercent}% promotional discount across all listed medicines!`, "success");
  };

  const handleResetDiscounts = () => {
    setMedicines((prev) =>
      prev.map((m) => ({
        ...m,
        Discount: undefined,
      }))
    );
    setShowBulkModal(false);
    showToast("Reset all promotional discounts", "info");
  };

  return (
    <DashboardLayout title="My Products" subtitle="Manage your medicine listings and warehouse inventory stock">
      <DataTable<Medicine>
        columns={columns}
        data={medicines}
        searchPlaceholder="Search products by name or category…"
        searchFields={["Title", "Category", "City", "PharmacyName"]}
        filters={filters}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
        emptyMessage="No medicine products found"
        exportable={true}
        exportFilename="vendor_product_inventory"
        headerAction={
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="btn-secondary"
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.83rem" }}
              onClick={() => setShowBulkModal(true)}
            >
              <IconTag size={16} color="var(--primary)" /> Bulk Discount
            </button>

            <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.83rem" }} onClick={() => navigate("/vendor/products/add")}>
              <IconPlus size={16} /> Add Product
            </button>
          </div>
        }
      />

      {/* Bulk Discount Updater Modal */}
      {showBulkModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <form onSubmit={handleApplyBulkDiscount} className="card" style={{ width: "100%", maxWidth: 440, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <IconTag size={22} color="var(--primary)" />
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>Bulk Discount & Price Updater</h3>
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: 18 }}>
              Apply a promotional percentage discount across all your catalog medicine listings.
            </p>

            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Promotional Discount Percentage</label>
              <select
                className="form-input"
                value={selectedDiscountPercent}
                onChange={(e) => setSelectedDiscountPercent(Number(e.target.value))}
              >
                <option value={5}>5% OFF Promotional Sale</option>
                <option value={10}>10% OFF Special Ethiopian MoH Rate</option>
                <option value={15}>15% OFF Bulk Procurement Rate</option>
                <option value={20}>20% OFF Liquidation Sale</option>
              </select>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                type="button"
                className="btn-secondary"
                style={{ color: "#ef4444", fontSize: "0.78rem" }}
                onClick={handleResetDiscounts}
              >
                Reset Discounts
              </button>

              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" className="btn-secondary" onClick={() => setShowBulkModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Apply Bulk Discount</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Quick Stock Editor Modal */}
      {editingMed && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <form onSubmit={handleUpdateStockSubmit} className="card" style={{ width: "100%", maxWidth: 420, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <IconBox size={22} color="var(--primary)" />
              <h3 style={{ fontSize: "1rem", fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>Quick Stock Adjustment</h3>
            </div>
            <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "var(--primary-dark)", marginBottom: 16 }}>
              {editingMed.Title}
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Available Stock Quantity ({editingMed.Unit || "Units"})</label>
              <input
                type="number"
                className="form-input"
                value={newStockQty}
                onChange={(e) => setNewStockQty(parseInt(e.target.value) || 0)}
                min={0}
                required
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button type="button" className="btn-secondary" onClick={() => setEditingMed(null)}>Cancel</button>
              <button type="submit" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <IconCheck size={16} /> Save Stock Qty
              </button>
            </div>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
};

export default VendorProducts;

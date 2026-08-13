import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { IconArrowLeft, IconPhoto, IconCheck } from "@tabler/icons-react";

const CATEGORIES = [
  "Antibiotics", "Analgesics", "Antimalarials", "Antihistamines", "Cardiovascular",
  "Diabetes", "Gastrointestinal", "Essential Medicines", "Vaccines", "Vitamins & Supplements", "Other"
];

const ETHIOPIAN_CITIES = [
  "Addis Ababa", "Hawassa", "Bahir Dar", "Mekelle", "Gondar",
  "Jimma", "Dire Dawa", "Adama", "Dessie", "Jijiga",
];

const VendorAddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "", price: "", unit: "", city: "", category: "", description: "", uses: "",
    expiryDate: "", imageUrl: "", batchNumber: "", inStock: true,
  });

  const update = (field: string, value: string | boolean) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate("/vendor/products"), 1800);
  };

  if (submitted) {
    return (
      <DashboardLayout title="Add Product">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, gap: 14 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconCheck size={36} color="#16a34a" strokeWidth={2.5} />
          </div>
          <div style={{ fontWeight: 800, fontSize: "1.2rem" }}>Product Added!</div>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>Redirecting to your products…</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Add New Product" subtitle="List a medicine in the MediFlow marketplace">
      <button className="btn-secondary" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 22, fontSize: "0.82rem" }} onClick={() => navigate("/vendor/products")}>
        <IconArrowLeft size={15} /> Back to Products
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20, alignItems: "start" }}>
        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div className="card" style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 20, color: "var(--text-primary)" }}>Basic Information</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label className="form-label" htmlFor="p-title">Medicine Name *</label>
                <input id="p-title" className="form-input" placeholder="e.g. Amoxicillin 500mg Capsules (10s)" value={form.title} onChange={(e) => update("title", e.target.value)} required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="form-label" htmlFor="p-price">Price (ETB) *</label>
                  <input id="p-price" className="form-input" placeholder="e.g. 420" value={form.price} onChange={(e) => update("price", e.target.value)} required />
                </div>
                <div>
                  <label className="form-label" htmlFor="p-unit">Packaging Unit *</label>
                  <input id="p-unit" className="form-input" placeholder="e.g. 10 Capsules in Strip" value={form.unit} onChange={(e) => update("unit", e.target.value)} required />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="form-label" htmlFor="p-category">Category *</label>
                  <select id="p-category" className="form-input" style={{ appearance: "none" }} value={form.category} onChange={(e) => update("category", e.target.value)} required>
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="p-city">Location / City *</label>
                  <select id="p-city" className="form-input" style={{ appearance: "none" }} value={form.city} onChange={(e) => update("city", e.target.value)} required>
                    <option value="">Select city</option>
                    {ETHIOPIAN_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="form-label" htmlFor="p-expiry">Expiry Date *</label>
                  <input id="p-expiry" type="date" className="form-input" value={form.expiryDate} onChange={(e) => update("expiryDate", e.target.value)} required />
                </div>
                <div>
                  <label className="form-label" htmlFor="p-batch">Batch Number</label>
                  <input id="p-batch" className="form-input" placeholder="e.g. ETH-2024-A001" value={form.batchNumber} onChange={(e) => update("batchNumber", e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 20 }}>Description & Usage</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label className="form-label" htmlFor="p-desc">Description</label>
                <textarea id="p-desc" className="form-input" style={{ resize: "vertical", minHeight: 80 }} placeholder="Describe the medicine and its purpose…" value={form.description} onChange={(e) => update("description", e.target.value)} />
              </div>
              <div>
                <label className="form-label" htmlFor="p-uses">Indications / Uses</label>
                <textarea id="p-uses" className="form-input" style={{ resize: "vertical", minHeight: 60 }} placeholder="What conditions does this treat?" value={form.uses} onChange={(e) => update("uses", e.target.value)} />
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 16 }}>Product Image</div>
            <label className="form-label" htmlFor="p-img">Image URL</label>
            <input id="p-img" type="url" className="form-input" placeholder="https://…" value={form.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} />
            {!form.imageUrl && (
              <div style={{
                marginTop: 12, border: "2px dashed var(--border)", borderRadius: "var(--radius-md)",
                padding: "28px 16px", textAlign: "center", color: "var(--text-muted)"
              }}>
                <IconPhoto size={28} style={{ marginBottom: 8, color: "#e2e8f0" }} />
                <div style={{ fontSize: "0.8rem" }}>Paste an image URL above or drag & drop here</div>
              </div>
            )}
            {form.imageUrl && (
              <img src={form.imageUrl} alt="Preview" style={{ marginTop: 12, width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            )}
          </div>

          <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start", padding: "12px 28px", fontSize: "0.9rem" }}>
            <IconCheck size={16} /> Publish Product
          </button>
        </form>

        {/* Preview card */}
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: 12, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Live Preview</div>
          <div className="card" style={{ overflow: "hidden", padding: 0 }}>
            <div style={{ height: 140, background: "var(--surface-2)", overflow: "hidden" }}>
              {form.imageUrl ? (
                <img src={form.imageUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IconPhoto size={40} color="#e2e8f0" />
                </div>
              )}
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: 4 }}>
                {form.title || "Medicine Name"}
              </div>
              {form.category && <span className="badge badge-gray" style={{ fontSize: "0.68rem", marginBottom: 8, display: "inline-block" }}>{form.category}</span>}
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: 10 }}>{form.unit || "Packaging unit"}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 800, fontSize: "1rem", color: "var(--primary-dark)" }}>
                  {form.price ? `${parseInt(form.price).toLocaleString()} ETB` : "-- ETB"}
                </span>
                <span className="badge badge-green" style={{ fontSize: "0.68rem" }}>In Stock</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="card" style={{ marginTop: 16, background: "#eff6ff", borderColor: "#bfdbfe" }}>
            <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#1d4ed8", marginBottom: 10 }}>💡 Listing Tips</div>
            {[
              "Include batch number for traceability",
              "Set an accurate expiry date for FMHACA compliance",
              "Use clear Ethiopian city & region for better matching",
              "Add detailed description for faster approval",
            ].map((tip) => (
              <div key={tip} style={{ fontSize: "0.75rem", color: "#1e40af", marginBottom: 6, display: "flex", gap: 6 }}>
                <span>•</span> {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorAddProduct;

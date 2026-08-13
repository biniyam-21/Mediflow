import React, { useState, FormEvent } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { IconDeviceFloppy, IconCheck } from "@tabler/icons-react";

const ETHIOPIAN_CITIES = [
  "Addis Ababa", "Hawassa", "Bahir Dar", "Mekelle", "Gondar",
  "Jimma", "Dire Dawa", "Adama", "Dessie", "Jijiga",
];

const AdminSettings: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    currency: "ETB", currencySymbol: "ብር", platform: "MediFlow Ethiopia",
    lowStockThreshold: "20", expiryWarningDays: "180",
    autoApproveVendors: false, requireFMHACA: true,
    defaultCity: "Addis Ababa", supportEmail: "support@mediflow.et",
    pfsa_compliance: true, amharicEnabled: false,
  });

  const update = (field: string, value: string | boolean) =>
    setSettings((p) => ({ ...p, [field]: value }));

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout title="System Settings" subtitle="Configure platform-wide preferences and compliance settings">
      <form onSubmit={handleSave}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Platform Settings */}
          <div className="card">
            <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 20, color: "var(--text-primary)" }}>Platform Settings</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label className="form-label" htmlFor="s-platform">Platform Name</label>
                <input id="s-platform" className="form-input" value={settings.platform} onChange={(e) => update("platform", e.target.value)} />
              </div>
              <div>
                <label className="form-label" htmlFor="s-support">Support Email</label>
                <input id="s-support" type="email" className="form-input" value={settings.supportEmail} onChange={(e) => update("supportEmail", e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="form-label" htmlFor="s-currency">Currency Code</label>
                  <input id="s-currency" className="form-input" value={settings.currency} onChange={(e) => update("currency", e.target.value)} />
                </div>
                <div>
                  <label className="form-label" htmlFor="s-symbol">Currency Symbol</label>
                  <input id="s-symbol" className="form-input" value={settings.currencySymbol} onChange={(e) => update("currencySymbol", e.target.value)} />
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="s-city">Default City</label>
                <select id="s-city" className="form-input" style={{ appearance: "none" }} value={settings.defaultCity} onChange={(e) => update("defaultCity", e.target.value)}>
                  {ETHIOPIAN_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Inventory Settings */}
          <div className="card">
            <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 20 }}>Inventory Thresholds</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label className="form-label" htmlFor="s-stock">Low Stock Alert Threshold (units)</label>
                <input id="s-stock" type="number" className="form-input" value={settings.lowStockThreshold} onChange={(e) => update("lowStockThreshold", e.target.value)} min={1} />
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 5 }}>Alert when stock falls below this quantity</div>
              </div>
              <div>
                <label className="form-label" htmlFor="s-expiry">Expiry Warning (days before)</label>
                <input id="s-expiry" type="number" className="form-input" value={settings.expiryWarningDays} onChange={(e) => update("expiryWarningDays", e.target.value)} min={30} />
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 5 }}>Alert when a medicine expires within this many days</div>
              </div>
            </div>
          </div>

          {/* Compliance Settings */}
          <div className="card">
            <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 20 }}>FMHACA Compliance</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { field: "requireFMHACA", label: "Require FMHACA License for Vendor Registration", desc: "Vendors must provide a valid FMHACA license number to register" },
                { field: "autoApproveVendors", label: "Auto-approve Vendor Accounts", desc: "Skip manual review and approve vendors automatically (not recommended)" },
                { field: "pfsa_compliance", label: "Enable PFSA Compliance Mode", desc: "Generate PFSA-compatible reports and enforce PFSA procurement rules" },
              ].map(({ field, label, desc }) => (
                <div key={field} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{label}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: 3 }}>{desc}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => update(field, !(settings as Record<string, unknown>)[field])}
                    style={{
                      width: 44, height: 24, borderRadius: 12,
                      background: (settings as Record<string, unknown>)[field] ? "var(--primary)" : "#e2e8f0",
                      border: "none", cursor: "pointer", position: "relative",
                      flexShrink: 0, transition: "background 0.2s"
                    }}
                  >
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%", background: "white",
                      position: "absolute", top: 3,
                      left: (settings as Record<string, unknown>)[field] ? 23 : 3,
                      transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                    }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Language / Localization */}
          <div className="card">
            <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 20 }}>Localization</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>Amharic Language Support (አማርኛ)</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: 3 }}>Enable Amharic as a second language option</div>
                </div>
                <button
                  type="button"
                  onClick={() => update("amharicEnabled", !settings.amharicEnabled)}
                  style={{
                    width: 44, height: 24, borderRadius: 12,
                    background: settings.amharicEnabled ? "var(--primary)" : "#e2e8f0",
                    border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s"
                  }}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%", background: "white",
                    position: "absolute", top: 3,
                    left: settings.amharicEnabled ? 23 : 3,
                    transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                  }} />
                </button>
              </div>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: "0.8rem", color: "#15803d", fontWeight: 600, marginBottom: 6 }}>🇪🇹 Ethiopian Context</div>
                <div style={{ fontSize: "0.75rem", color: "#166534", lineHeight: 1.7 }}>
                  Calendar: Gregorian (EC display optional)<br />
                  Time Zone: East Africa Time (EAT) UTC+3<br />
                  Number format: 1,000,000.00 ETB
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
          <button type="submit" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 28px", fontSize: "0.9rem" }}>
            {saved ? <><IconCheck size={16} /> Saved!</> : <><IconDeviceFloppy size={16} /> Save Settings</>}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default AdminSettings;

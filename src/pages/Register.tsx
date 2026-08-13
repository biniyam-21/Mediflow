import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MediFlow } from "../assets";
import {
  IconUser,
  IconMail,
  IconLock,
  IconBuilding,
  IconMapPin,
  IconId,
  IconStethoscope,
  IconBuildingStore,
  IconChevronRight,
  IconChevronLeft,
  IconCheck,
  IconAlertCircle,
  IconClock,
} from "@tabler/icons-react";
import { mockRegister } from "../services/authService";

const ETHIOPIAN_REGIONS = [
  "Addis Ababa City Administration",
  "Dire Dawa City Administration",
  "Oromia Region",
  "Amhara Region",
  "Tigray Region",
  "Sidama Region",
  "SNNPR Region",
  "Somali Region",
  "Afar Region",
  "Benishangul-Gumuz Region",
  "Gambela Region",
  "Harari Region",
];

const ETHIOPIAN_CITIES = [
  "Addis Ababa", "Dire Dawa", "Hawassa", "Bahir Dar", "Mekelle",
  "Gondar", "Jimma", "Adama", "Dessie", "Debre Berhan", "Jijiga",
];

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"pharmacist" | "vendor">("pharmacist");
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    organization: "", city: "", region: "", licenseNumber: "", tin: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);

  const update = (field: string, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step < 4) { setStep(step + 1); return; }
    setLoading(true);
    setSubmitError(null);

    setTimeout(() => {
      const result = mockRegister({
        name: form.name,
        email: form.email,
        password: form.password,
        role,
        organization: form.organization,
        city: form.city,
        region: form.region,
        licenseNumber: form.licenseNumber,
        tin: form.tin,
      });

      setLoading(false);
      if (!result.success) {
        if (result.error === 'email_taken') {
          setSubmitError('An account with this email already exists. Please sign in instead.');
        } else {
          setSubmitError('Registration failed. Please try again.');
        }
        return;
      }
      setRegistered(true);
    }, 1000);
  };

  const steps = ["Role", "Account", "Organization", "Confirm"];

  // ── Registration Success Screen ──────────────────────────────────────────
  if (registered) {
    return (
      <div style={{ minHeight: "100vh", position: "relative" }}>
        <div className="main" style={{ pointerEvents: "none" }}><div className="gradient" /></div>
        <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 16px" }}>
          <img src={MediFlow} alt="MediFlow" style={{ width: 110, marginBottom: 28 }} />
          <div style={{ width: "100%", maxWidth: 460, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.8)", borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.10)", padding: "40px 36px", textAlign: "center" }}>
            <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
              <IconClock size={34} color="#f59e0b" strokeWidth={1.8} />
            </div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 10 }}>Registration Submitted!</h2>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 24 }}>
              Your account is <strong>pending admin approval</strong>. You'll be notified once your FMHACA license and details are verified.<br /><br />
              This typically takes <strong>1–3 business days</strong>.
            </p>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "12px 16px", marginBottom: 24, textAlign: "left" }}>
              <div style={{ fontSize: "0.78rem", color: "#15803d", fontWeight: 700, marginBottom: 6 }}>Your Registered Details</div>
              {[["Name", form.name], ["Email", form.email], ["Organization", form.organization], ["Role", role === "pharmacist" ? "Pharmacist" : "Vendor / Supplier"], ["FMHACA License", form.licenseNumber]].map(([k, v]) => v ? (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", padding: "4px 0", borderBottom: "1px solid #dcfce7" }}>
                  <span style={{ color: "#166534", fontWeight: 600 }}>{k}</span>
                  <span style={{ color: "#15803d" }}>{v}</span>
                </div>
              ) : null)}
            </div>
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => navigate("/login")}>
              Go to Sign In →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="main" style={{ pointerEvents: "none" }}>
        <div className="gradient" />
      </div>

      {/* Center container */}
      <div style={{
        position: "relative", zIndex: 10,
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "40px 16px"
      }}>
        {/* Logo */}
        <img src={MediFlow} alt="MediFlow" style={{ width: 110, marginBottom: 28, cursor: "pointer" }} onClick={() => navigate("/")} />

        {/* Card */}
        <div style={{
          width: "100%", maxWidth: 520,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.8)",
          borderRadius: 20,
          boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
          overflow: "hidden"
        }}>
          {/* Progress bar */}
          <div style={{ height: 4, background: "#e2e8f0" }}>
            <div style={{
              height: "100%",
              width: `${(step / steps.length) * 100}%`,
              background: "linear-gradient(90deg, #22c55e, #16a34a)",
              transition: "width 0.4s ease"
            }} />
          </div>

          <div style={{ padding: "32px 36px" }}>
            {/* Step indicator */}
            <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
              {steps.map((s, i) => {
                const done = i + 1 < step;
                const active = i + 1 === step;
                return (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%",
                      background: done ? "#16a34a" : active ? "#16a34a" : "#e2e8f0",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.3s"
                    }}>
                      {done
                        ? <IconCheck size={13} color="white" strokeWidth={3} />
                        : <span style={{ fontSize: "0.7rem", fontWeight: 700, color: active ? "white" : "#94a3b8" }}>{i + 1}</span>
                      }
                    </div>
                    <span style={{ fontSize: "0.72rem", fontWeight: active ? 700 : 500, color: active ? "#0f172a" : "#94a3b8" }}>{s}</span>
                    {i < steps.length - 1 && (
                      <div style={{ width: 20, height: 1, background: "#e2e8f0", margin: "0 2px" }} />
                    )}
                  </div>
                );
              })}
            </div>

            <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); setStep(step + 1); }}>
              {/* Step 1 — Role */}
              {step === 1 && (
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>Choose your role</h2>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", marginBottom: 24 }}>
                    Select how you'll use MediFlow Ethiopia
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { value: "pharmacist" as const, icon: IconStethoscope, label: "Pharmacist / Health Center", desc: "Order medicines from verified suppliers", color: "#16a34a", bg: "#f0fdf4" },
                      { value: "vendor" as const, icon: IconBuildingStore, label: "Vendor / Supplier", desc: "List products and fulfill orders from hospitals", color: "#0284c7", bg: "#eff6ff" },
                    ].map((r) => {
                      const Icon = r.icon;
                      const isSelected = role === r.value;
                      return (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => setRole(r.value)}
                          style={{
                            display: "flex", alignItems: "center", gap: 14,
                            padding: "16px 18px",
                            border: `2px solid ${isSelected ? r.color : "var(--border)"}`,
                            borderRadius: "var(--radius-md)",
                            background: isSelected ? r.bg : "white",
                            cursor: "pointer", textAlign: "left", transition: "all 0.2s"
                          }}
                        >
                          <div style={{
                            width: 44, height: 44, borderRadius: 10, background: r.bg,
                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                          }}>
                            <Icon size={22} color={r.color} strokeWidth={1.8} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: isSelected ? r.color : "var(--text-primary)" }}>{r.label}</div>
                            <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: 2 }}>{r.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2 — Account */}
              {step === 2 && (
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>Account details</h2>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", marginBottom: 24 }}>Your login credentials</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <label className="form-label" htmlFor="reg-name">Full Name</label>
                      <div style={{ position: "relative" }}>
                        <IconUser size={15} color="#94a3b8" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
                        <input id="reg-name" className="form-input" style={{ paddingLeft: 34 }} placeholder="Dr. Tigist Alemu" value={form.name} onChange={(e) => update("name", e.target.value)} required />
                      </div>
                    </div>
                    <div>
                      <label className="form-label" htmlFor="reg-email">Email Address</label>
                      <div style={{ position: "relative" }}>
                        <IconMail size={15} color="#94a3b8" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
                        <input id="reg-email" type="email" className="form-input" style={{ paddingLeft: 34 }} placeholder="you@hospital.et" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                      </div>
                    </div>
                    <div>
                      <label className="form-label" htmlFor="reg-password">Password</label>
                      <div style={{ position: "relative" }}>
                        <IconLock size={15} color="#94a3b8" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
                        <input id="reg-password" type="password" className="form-input" style={{ paddingLeft: 34 }} placeholder="Min. 8 characters" value={form.password} onChange={(e) => update("password", e.target.value)} required minLength={8} />
                      </div>
                    </div>
                    <div>
                      <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
                      <div style={{ position: "relative" }}>
                        <IconLock size={15} color="#94a3b8" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
                        <input id="reg-confirm" type="password" className="form-input" style={{ paddingLeft: 34 }} placeholder="Repeat password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} required />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 — Organization */}
              {step === 3 && (
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>Organization details</h2>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", marginBottom: 24 }}>
                    {role === "pharmacist" ? "Your hospital or health center info" : "Your business & compliance details"}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <label className="form-label" htmlFor="reg-org">
                        {role === "pharmacist" ? "Hospital / Health Center Name" : "Business / Company Name"}
                      </label>
                      <div style={{ position: "relative" }}>
                        <IconBuilding size={15} color="#94a3b8" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
                        <input id="reg-org" className="form-input" style={{ paddingLeft: 34 }} placeholder={role === "pharmacist" ? "Tikur Anbessa Specialized Hospital" : "Global Med Store PLC"} value={form.organization} onChange={(e) => update("organization", e.target.value)} required />
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div>
                        <label className="form-label" htmlFor="reg-city">City</label>
                        <div style={{ position: "relative" }}>
                          <IconMapPin size={14} color="#94a3b8" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
                          <select id="reg-city" className="form-input" style={{ paddingLeft: 30, appearance: "none" }} value={form.city} onChange={(e) => update("city", e.target.value)} required>
                            <option value="">Select city</option>
                            {ETHIOPIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="form-label" htmlFor="reg-region">Region</label>
                        <select id="reg-region" className="form-input" style={{ appearance: "none" }} value={form.region} onChange={(e) => update("region", e.target.value)} required>
                          <option value="">Select region</option>
                          {ETHIOPIAN_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="form-label" htmlFor="reg-license">FMHACA License Number *</label>
                      <div style={{ position: "relative" }}>
                        <IconId size={15} color="#94a3b8" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
                        <input id="reg-license" className="form-input" style={{ paddingLeft: 34 }} placeholder="FMHACA-PH-2024-0001" value={form.licenseNumber} onChange={(e) => update("licenseNumber", e.target.value)} required />
                      </div>
                    </div>
                    {role === "vendor" && (
                      <div>
                        <label className="form-label" htmlFor="reg-tin">TIN Number</label>
                        <input id="reg-tin" className="form-input" placeholder="Tax Identification Number" value={form.tin} onChange={(e) => update("tin", e.target.value)} />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4 — Confirm */}
              {step === 4 && (
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>Review & Submit</h2>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", marginBottom: 24 }}>
                    Your account will be reviewed by an admin before activation.
                  </p>
                  <div style={{
                    background: "var(--surface-2)", borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border)", padding: "16px 18px",
                    display: "flex", flexDirection: "column", gap: 10
                  }}>
                    {[
                      ["Role", role === "pharmacist" ? "Pharmacist" : "Vendor / Supplier"],
                      ["Name", form.name],
                      ["Email", form.email],
                      ["Organization", form.organization],
                      ["City", form.city],
                      ["FMHACA License", form.licenseNumber],
                    ].map(([k, v]) => v ? (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem" }}>
                        <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>{k}</span>
                        <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{v}</span>
                      </div>
                    ) : null)}
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 16, lineHeight: 1.6 }}>
                    By submitting, you agree that all information is accurate and subject to FMHACA verification. Approval may take 1-3 business days.
                  </p>
                </div>
              )}

              {/* Error banner (step 4) */}
              {submitError && step === 4 && (
                <div style={{
                  display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 14px",
                  background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-sm)",
                  marginTop: 16,
                }}>
                  <IconAlertCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: "0.82rem", color: "#b91c1c", fontWeight: 500 }}>{submitError}</span>
                </div>
              )}

              {/* Navigation buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, gap: 12 }}>
                {step > 1 ? (
                  <button type="button" onClick={() => setStep(step - 1)} className="btn-secondary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <IconChevronLeft size={16} /> Back
                  </button>
                ) : <div />}
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                  disabled={loading}
                >
                  {loading ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                      Submitting…
                    </span>
                  ) : step === 4 ? (
                    <><IconCheck size={16} /> Submit Registration</>
                  ) : (
                    <>Next <IconChevronRight size={16} /></>
                  )}
                </button>
              </div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </form>

            <p style={{ textAlign: "center", marginTop: 20, fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: 700, cursor: "pointer" }}>
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MediFlow } from "../assets";
import {
  IconLock,
  IconMail,
  IconEye,
  IconEyeOff,
  IconStethoscope,
  IconBuildingStore,
  IconShieldCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import { mockLogin, saveSession, DEMO_ACCOUNTS } from "../services/authService";

type Role = "pharmacist" | "vendor" | "admin";

interface RoleOption {
  value: Role;
  label: string;
  icon: React.ElementType;
  description: string;
  color: string;
  bg: string;
}

const roles: RoleOption[] = [
  { value: "pharmacist", label: "Pharmacist", icon: IconStethoscope, description: "Browse and order medicines", color: "#16a34a", bg: "#f0fdf4" },
  { value: "vendor",     label: "Vendor / Supplier", icon: IconBuildingStore, description: "Manage products & fulfill orders", color: "#0284c7", bg: "#eff6ff" },
  { value: "admin",      label: "Administrator", icon: IconShieldCheck, description: "Manage the entire system", color: "#7c3aed", bg: "#f5f3ff" },
];

const roleRoute: Record<Role, string> = {
  pharmacist: "/dashboard",
  vendor:     "/vendor/dashboard",
  admin:      "/admin",
};

const errorMessages: Record<string, string> = {
  not_found:            "No account found with that email address.",
  invalid_credentials:  "Incorrect password. Please try again.",
  account_pending:      "Your account is awaiting admin approval. Please try again later.",
  account_suspended:    "Your account has been suspended. Contact support.",
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole]           = useState<Role>("pharmacist");

  // Pre-fill email and password corresponding to default 'pharmacist' role demo account
  const defaultDemo = DEMO_ACCOUNTS.find((d) => d.role === "pharmacist")!;
  const [email, setEmail]         = useState(defaultDemo.email);
  const [password, setPassword]   = useState(defaultDemo.password);

  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  // Switch role and automatically populate demo credentials for seamless testing
  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setError(null);
    const demo = DEMO_ACCOUNTS.find((d) => d.role === selectedRole);
    if (demo) {
      setEmail(demo.email);
      setPassword(demo.password);
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulate a brief network delay for realism
    setTimeout(() => {
      const result = mockLogin(email.trim(), password);

      if (!result.success) {
        setError(errorMessages[result.error!] || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // Save session and redirect
      saveSession(result.user!);
      navigate(roleRoute[result.user!.role as Role] || "/");
    }, 750);
  };

  const selectedRole = roles.find((r) => r.value === role)!;

  return (
    <div style={{ minHeight: "100vh", display: "flex", position: "relative" }}>
      {/* Background */}
      <div className="main" style={{ pointerEvents: "none" }}>
        <div className="gradient" />
      </div>

      {/* ── Left Brand Panel ── */}
      <div
        style={{
          width: "42%", minHeight: "100vh",
          background: "linear-gradient(155deg, #0f172a 0%, #1a2e1a 50%, #052e16 100%)",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "60px 52px", position: "relative", overflow: "hidden", flexShrink: 0,
        }}
        className="max-md:hidden"
      >
        {/* Decorative blobs */}
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(22,163,74,0.18) 0%, transparent 70%)", top: -100, left: -100, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(132,204,22,0.12) 0%, transparent 70%)", bottom: 50, right: -60, pointerEvents: "none" }} />

        <img src={MediFlow} alt="MediFlow" style={{ width: 130, marginBottom: 48, position: "relative", zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 800, color: "white", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Ethiopia's Pharmacy <br />
            <span style={{ background: "linear-gradient(90deg, #22c55e, #84cc16)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Supply Chain
            </span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 340, marginBottom: 40 }}>
            Connecting hospitals, health centers, and pharmacies with verified medical suppliers across Ethiopia.
          </p>

          <div style={{ display: "flex", gap: 28 }}>
            {[{ n: "120+", label: "Hospitals" }, { n: "340+", label: "Suppliers" }, { n: "5,000+", label: "Medicines" }].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#22c55e" }}>{s.n}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FMHACA badge */}
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.1)", position: "relative", zIndex: 1 }}>
          <IconShieldCheck size={20} color="#22c55e" />
          <div>
            <div style={{ color: "white", fontSize: "0.8rem", fontWeight: 600 }}>FMHACA Regulated</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem" }}>All vendors are FMHACA license-verified</div>
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 32px", position: "relative", zIndex: 10 }}>
        <div style={{ width: "100%", maxWidth: 440 }}>

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: selectedRole.bg, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
                <selectedRole.icon size={20} color={selectedRole.color} strokeWidth={2} />
              </div>
              <div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Sign In</h2>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>MediFlow Ethiopia Platform</p>
              </div>
            </div>
          </div>

          {/* Role selector tabs */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Sign in as</label>
              <span style={{ fontSize: "0.68rem", color: "var(--primary-dark)", fontWeight: 700, background: "var(--primary-faint)", padding: "2px 8px", borderRadius: 999 }}>
                Demo Credentials Auto-Filled
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {roles.map((r) => {
                const Icon = r.icon;
                const isSelected = role === r.value;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => handleRoleSelect(r.value)}
                    style={{
                      padding: "10px 8px",
                      border: `2px solid ${isSelected ? r.color : "var(--border)"}`,
                      borderRadius: "var(--radius-md)",
                      background: isSelected ? r.bg : "white",
                      cursor: "pointer", transition: "all 0.2s",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                    }}
                  >
                    <Icon size={18} color={isSelected ? r.color : "#94a3b8"} strokeWidth={2} />
                    <span style={{ fontSize: "0.72rem", fontWeight: isSelected ? 700 : 500, color: isSelected ? r.color : "#64748b" }}>
                      {r.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error banner */}
          {error && (
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 14px",
              background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-sm)",
              marginBottom: 18,
            }}>
              <IconAlertCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: "0.82rem", color: "#b91c1c", fontWeight: 500 }}>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Email */}
            <div>
              <label className="form-label" htmlFor="login-email">Email Address</label>
              <div style={{ position: "relative" }}>
                <IconMail size={15} color="#94a3b8" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  id="login-email"
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: 34 }}
                  placeholder="you@hospital.et"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <label className="form-label" htmlFor="login-password" style={{ marginBottom: 0 }}>Password</label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  style={{ background: "none", border: "none", color: "var(--primary-dark)", fontSize: "0.76rem", fontWeight: 600, cursor: "pointer" }}
                >
                  Forgot Password?
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <IconLock size={15} color="#94a3b8" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  id="login-password"
                  type={showPass ? "text" : "password"}
                  className="form-input"
                  style={{ paddingLeft: 34, paddingRight: 38 }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null); }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 2 }}
                >
                  {showPass ? <IconEyeOff size={15} /> : <IconEye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "12px", fontSize: "0.9rem", marginTop: 4 }}
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                  Signing in…
                </span>
              ) : "Sign In →"}
            </button>
          </form>

          {/* Register link */}
          <p style={{ textAlign: "center", marginTop: 22, fontSize: "0.83rem", color: "var(--text-secondary)" }}>
            New to MediFlow?{" "}
            <button onClick={() => navigate("/register")} style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: 700, cursor: "pointer" }}>
              Create an account
            </button>
          </p>

          <p style={{ textAlign: "center", marginTop: 16, fontSize: "0.72rem", color: "var(--text-muted)" }}>
            © 2024 MediFlow Ethiopia · FMHACA Compliant Supply Chain Platform
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Login;

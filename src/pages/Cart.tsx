import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import PaymentModal from "../components/PaymentModal";
import { IconTrash, IconMinus, IconPlus, IconShoppingCart, IconArrowLeft, IconCreditCard } from "@tabler/icons-react";
import { getAllMedicines } from "../services/medicineService";
import { CartItem, PaymentDetails } from "../types";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const medicines = getAllMedicines();

  const [cart, setCart] = useState<CartItem[]>(
    medicines.slice(0, 3).map((m) => ({
      medicineId: m._id,
      medicineName: m.Title,
      vendorName: m.PharmacyName || m.City,
      unitPrice: parseInt((m.Price || "500 ETB").replace(/[^0-9]/g, "")) || 500,
      quantity: Math.floor(Math.random() * 4) + 1,
      unit: m.Unit || "Strip",
      imageUrl: m.ImageUrl,
      isColdChain: m.isColdChain,
    }))
  );

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paidDetails, setPaidDetails] = useState<PaymentDetails | null>(null);

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => item.medicineId === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.medicineId !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tempOrderNo = `ORD-2024-${Math.floor(100 + Math.random() * 900)}`;

  const handlePaymentSuccess = (details: PaymentDetails) => {
    setPaidDetails(details);
    setShowPaymentModal(false);
    setOrderPlaced(true);
    setTimeout(() => navigate("/orders"), 2500);
  };

  if (orderPlaced) {
    return (
      <DashboardLayout title="Order Cart">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 420, gap: 16 }}>
          <div style={{
            width: 76, height: 76, borderRadius: "50%",
            background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div style={{ fontWeight: 800, fontSize: "1.35rem", color: "var(--text-primary)" }}>Order Placed & Paid!</div>
          <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", textAlign: "center", maxWidth: 400, lineHeight: 1.6 }}>
            Payment Ref: <strong style={{ color: "var(--primary-dark)" }}>{paidDetails?.transactionRef}</strong><br />
            Method: <span style={{ textTransform: "uppercase" }}>{paidDetails?.method}</span><br />
            Redirecting to your orders dashboard…
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Order Cart" subtitle="Review items and choose payment option">
      <button className="btn-secondary" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, fontSize: "0.82rem" }} onClick={() => navigate("/product")}>
        <IconArrowLeft size={15} /> Browse More Medicines
      </button>

      {cart.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "60px 24px" }}>
          <IconShoppingCart size={48} color="#e2e8f0" style={{ marginBottom: 14 }} />
          <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-secondary)" }}>Your cart is empty</div>
          <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => navigate("/product")}>
            Browse Medicines
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 22, alignItems: "start" }}>
          {/* Cart items */}
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", fontWeight: 700, fontSize: "0.9rem" }}>
              Cart Items ({cart.length})
            </div>
            {cart.map((item, idx) => (
              <div key={item.medicineId} style={{
                display: "flex", gap: 14, padding: "16px 20px",
                borderBottom: idx < cart.length - 1 ? "1px solid var(--border)" : "none",
                alignItems: "center"
              }}>
                <img
                  src={item.imageUrl}
                  alt={item.medicineName}
                  style={{ width: 52, height: 52, borderRadius: 8, objectFit: "cover", border: "1px solid var(--border)", flexShrink: 0 }}
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&auto=format&fit=crop&q=60"; }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--text-primary)", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.medicineName}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{item.vendorName} · {item.unit}</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--primary-dark)", marginTop: 4 }}>
                    {item.unitPrice.toLocaleString()} ETB / unit
                  </div>
                </div>
                {/* Qty controls */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    onClick={() => updateQty(item.medicineId, -1)}
                    style={{ width: 28, height: 28, border: "1px solid var(--border)", borderRadius: 6, background: "var(--surface-2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <IconMinus size={12} />
                  </button>
                  <span style={{ fontWeight: 700, fontSize: "0.9rem", minWidth: 24, textAlign: "center" }}>{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.medicineId, 1)}
                    style={{ width: 28, height: 28, border: "1px solid var(--primary)", borderRadius: 6, background: "#f0fdf4", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <IconPlus size={12} color="var(--primary)" />
                  </button>
                </div>
                <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--text-primary)", minWidth: 90, textAlign: "right" }}>
                  {(item.unitPrice * item.quantity).toLocaleString()} ETB
                </div>
                <button
                  onClick={() => removeItem(item.medicineId)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#ef4444" }}
                >
                  <IconTrash size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="card">
              <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 16, color: "var(--text-primary)" }}>Order Summary</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {cart.map((item) => (
                  <div key={item.medicineId} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                    <span style={{ color: "var(--text-secondary)" }}>{item.medicineName.split(" ").slice(0, 3).join(" ")}… ×{item.quantity}</span>
                    <span style={{ fontWeight: 600 }}>{(item.unitPrice * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 4, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Grand Total</span>
                  <span style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--primary-dark)" }}>{total.toLocaleString()} ETB</span>
                </div>
              </div>
            </div>

            <div className="card" style={{ background: "var(--primary-faint)", borderColor: "#bbf7d0" }}>
              <div style={{ fontSize: "0.78rem", color: "var(--primary-dark)", fontWeight: 600, marginBottom: 8 }}>
                💳 Supported Payment Gateways
              </div>
              <div style={{ fontSize: "0.78rem", color: "#166534", lineHeight: 1.6 }}>
                Telebirr · CBE Birr · Chapa / LuckyPay · LC Voucher<br />
                Instant confirmation & FMHACA compliant delivery waybill
              </div>
            </div>

            <button
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: "0.95rem" }}
              onClick={() => setShowPaymentModal(true)}
            >
              <IconCreditCard size={18} /> Proceed to Pay {total.toLocaleString()} ETB
            </button>
            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.6 }}>
              By placing this order you confirm compliance with FMHACA procurement regulations.
            </p>
          </div>
        </div>
      )}

      {/* Payment Gateway Modal */}
      {showPaymentModal && (
        <PaymentModal
          orderNumber={tempOrderNo}
          totalAmount={total}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </DashboardLayout>
  );
};

export default Cart;

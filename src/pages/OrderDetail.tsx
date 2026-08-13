import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import OrderTimeline from "../components/OrderTimeline";
import ColdChainTracker from "../components/ColdChainTracker";
import PaymentModal from "../components/PaymentModal";
import InvoiceModal from "../components/InvoiceModal";
import { useToast } from "../context/ToastContext";
import {
  IconArrowLeft, IconMapPin, IconCalendar, IconBuilding,
  IconPrinter, IconCreditCard, IconCheck, IconSnowflake,
  IconX, IconAlertTriangle, IconRefreshAlert, IconSend, IconHistory
} from "@tabler/icons-react";
import { Order, PaymentDetails } from "../types";
import { MOCK_ORDERS } from "../data/mockOrders";

const OrderDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const initialOrder: Order = location.state?.order || MOCK_ORDERS[0];
  const [order, setOrder] = useState<Order>(initialOrder);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

  const [cancelReason, setCancelReason] = useState("");
  const [returnReason, setReturnReason] = useState("");

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-ET", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const statusLabel: Record<string, string> = {
    requested: "Requested", approved: "Approved",
    in_transit: "In Transit", delivered: "Delivered", cancelled: "Cancelled"
  };

  const handlePaymentSuccess = (details: PaymentDetails) => {
    setOrder((prev) => ({
      ...prev,
      paymentDetails: details,
    }));
    setShowPaymentModal(false);
    showToast("Payment completed successfully!", "success");
  };

  const handleConfirmCancel = () => {
    setOrder((prev) => ({
      ...prev,
      status: "cancelled",
      notes: cancelReason || "Cancelled by pharmacist request",
    }));
    setShowCancelModal(false);
    showToast(`Order ${order.orderNumber} has been cancelled`, "info");
  };

  const handleConfirmReturn = () => {
    setShowReturnModal(false);
    showToast(`Damaged goods return claim submitted for ${order.orderNumber}. Vendor will review within 24 hours.`, "success");
  };

  const hasColdChain = order.items.some(
    (i) => i.medicineName.toLowerCase().includes("insulin") || i.medicineName.toLowerCase().includes("vaccine") || i.medicineName.toLowerCase().includes("oxytocin")
  ) || order.hasColdChainItems;

  return (
    <DashboardLayout title={`Order ${order.orderNumber}`} subtitle="Full order detail, tracking & FMHACA invoice">
      {/* Top Action Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
        <button
          className="btn-secondary"
          style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem" }}
          onClick={() => navigate("/orders")}
        >
          <IconArrowLeft size={15} /> Back to Orders
        </button>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {order.status === "requested" && (
            <button
              className="btn-secondary"
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#b91c1c", borderColor: "#fecaca" }}
              onClick={() => setShowCancelModal(true)}
            >
              <IconX size={15} /> Cancel Order
            </button>
          )}

          {order.status === "delivered" && (
            <button
              className="btn-secondary"
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#b45309", borderColor: "#fde68a" }}
              onClick={() => setShowReturnModal(true)}
            >
              <IconRefreshAlert size={15} /> Claim Damaged / Return
            </button>
          )}

          {!order.paymentDetails || order.paymentDetails.status === "pending" ? (
            <button
              className="btn-primary"
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem" }}
              onClick={() => setShowPaymentModal(true)}
            >
              <IconCreditCard size={16} /> Pay via Telebirr / CBE Birr
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#dcfce7", border: "1px solid #bbf7d0", padding: "6px 14px", borderRadius: "var(--radius-md)", fontSize: "0.78rem", fontWeight: 700, color: "#15803d" }}>
              <IconCheck size={15} strokeWidth={2.5} /> Paid ({order.paymentDetails.method.toUpperCase()} - {order.paymentDetails.transactionRef})
            </div>
          )}

          <button
            className="btn-secondary"
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", background: "#f8fafc" }}
            onClick={() => setShowInvoiceModal(true)}
          >
            <IconPrinter size={16} color="var(--primary)" /> FMHACA Invoice & Waybill (መሸኛ)
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, alignItems: "start" }}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Order metadata */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
              <div>
                <div style={{ fontFamily: "monospace", fontSize: "1rem", fontWeight: 800, color: "var(--primary-dark)" }}>{order.orderNumber}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: 3 }}>
                  Placed on {formatDate(order.createdAt)}
                </div>
              </div>
              <span className="badge" style={{
                background: order.status === "delivered" ? "#dcfce7" : order.status === "cancelled" ? "#fee2e2" : "#fef3c7",
                color: order.status === "delivered" ? "#15803d" : order.status === "cancelled" ? "#b91c1c" : "#b45309",
                fontSize: "0.8rem", padding: "5px 14px"
              }}>
                {statusLabel[order.status] || order.status}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { icon: IconBuilding, label: "Vendor", value: order.vendorName },
                { icon: IconMapPin, label: "Delivery Address", value: order.deliveryAddress },
                { icon: IconCalendar, label: "Last Updated", value: formatDate(order.updatedAt) },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 7, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Icon size={14} color="var(--primary)" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
                    <div style={{ fontSize: "0.83rem", color: "var(--text-primary)", fontWeight: 500, marginTop: 2 }}>{value}</div>
                  </div>
                </div>
              ))}
              {order.notes && (
                <div style={{ gridColumn: "1/-1", background: "#fef9c3", border: "1px solid #fef08a", borderRadius: 8, padding: "10px 14px", fontSize: "0.8rem", color: "#854d0e" }}>
                  <strong>Note:</strong> {order.notes}
                </div>
              )}
            </div>
          </div>

          {/* Cold Chain Module section */}
          {hasColdChain && (
            <ColdChainTracker
              medicineId={order.items[0]?.medicineId || "med-004"}
              medicineName={order.items[0]?.medicineName}
            />
          )}

          {/* Order items */}
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", fontWeight: 700, fontSize: "0.9rem" }}>
              Order Items ({order.items.length})
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>Unit Price (ETB)</th>
                  <th>Subtotal (ETB)</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                      {item.medicineName}
                      {(item.medicineName.toLowerCase().includes("insulin") || item.medicineName.toLowerCase().includes("vaccine")) && (
                        <span style={{ marginLeft: 6, display: "inline-flex", alignItems: "center", gap: 3, background: "#e0f2fe", color: "#0284c7", padding: "1px 6px", borderRadius: 4, fontSize: "0.68rem" }}>
                          <IconSnowflake size={11} /> 2°C–8°C
                        </span>
                      )}
                    </td>
                    <td>{item.quantity}</td>
                    <td style={{ color: "var(--text-secondary)", fontSize: "0.82rem" }}>{item.unit}</td>
                    <td>{item.unitPrice.toLocaleString()}</td>
                    <td style={{ fontWeight: 700, color: "var(--primary-dark)" }}>
                      {(item.quantity * item.unitPrice).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: "14px 20px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: 6 }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>Grand Total:</span>
              <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--primary-dark)" }}>
                {order.totalAmount.toLocaleString()} ETB
              </span>
            </div>
          </div>
        </div>

        {/* Right column: Timeline & Detailed Audit Log */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="card">
            <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 20, color: "var(--text-primary)" }}>
              Order Tracking & Dispatch
            </div>
            <OrderTimeline
              currentStatus={order.status}
              createdAt={order.createdAt}
              updatedAt={order.updatedAt}
            />
            {order.status === "cancelled" && (
              <div style={{
                marginTop: 20, background: "#fef2f2", border: "1px solid #fecaca",
                borderRadius: 8, padding: "12px 14px", fontSize: "0.8rem", color: "#b91c1c"
              }}>
                This order was cancelled. {order.notes && `Reason: ${order.notes}`}
              </div>
            )}
          </div>

          {/* Timestamped Audit & Activity Log */}
          <div className="card">
            <div style={{ fontWeight: 700, fontSize: "0.88rem", marginBottom: 14, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 6 }}>
              <IconHistory size={16} color="var(--primary)" /> EFMHACA Audit & Activity Trail
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: "0.78rem" }}>
              <div style={{ padding: "8px 12px", background: "var(--surface-2)", borderRadius: 6, borderLeft: "3px solid var(--primary)" }}>
                <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>Order Issued & Digital Signature</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.72rem", marginTop: 2 }}>
                  {formatDate(order.createdAt)} at 10:15 AM · By {order.pharmacistName}
                </div>
              </div>

              {order.paymentDetails && (
                <div style={{ padding: "8px 12px", background: "#f0fdf4", borderRadius: 6, borderLeft: "3px solid #16a34a" }}>
                  <div style={{ fontWeight: 700, color: "#15803d" }}>Payment Verified ({order.paymentDetails.method.toUpperCase()})</div>
                  <div style={{ color: "#166534", fontSize: "0.72rem", marginTop: 2 }}>
                    Ref: {order.paymentDetails.transactionRef} · {order.totalAmount.toLocaleString()} ETB
                  </div>
                </div>
              )}

              {(order.status === "approved" || order.status === "in_transit" || order.status === "delivered") && (
                <div style={{ padding: "8px 12px", background: "#eff6ff", borderRadius: 6, borderLeft: "3px solid #0284c7" }}>
                  <div style={{ fontWeight: 700, color: "#1d4ed8" }}>Vendor Approval & Batch Allocation</div>
                  <div style={{ color: "#1e40af", fontSize: "0.72rem", marginTop: 2 }}>
                    Approved by {order.vendorName} Depot Officer
                  </div>
                </div>
              )}

              {(order.status === "in_transit" || order.status === "delivered") && (
                <div style={{ padding: "8px 12px", background: "#f5f3ff", borderRadius: 6, borderLeft: "3px solid #7c3aed" }}>
                  <div style={{ fontWeight: 700, color: "#6d28d9" }}>Dispatched & Cold Chain Sensor Engaged</div>
                  <div style={{ color: "#5b21b6", fontSize: "0.72rem", marginTop: 2 }}>
                    Carrier Fleet Vehicle #3812 · Sensors Active (4.2°C)
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div className="card" style={{ width: '100%', maxWidth: 450, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <IconAlertTriangle size={24} color="#ef4444" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#b91c1c' }}>Cancel Order {order.orderNumber}?</h3>
            </div>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
              Are you sure you want to cancel this order? The vendor will be notified immediately.
            </p>
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Cancellation Reason (Optional)</label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="e.g., Substituted locally / Duplicate request"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button className="btn-secondary" onClick={() => setShowCancelModal(false)}>Keep Order</button>
              <button className="btn-primary" style={{ background: '#ef4444', borderColor: '#dc2626' }} onClick={handleConfirmCancel}>
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Return Claim Modal */}
      {showReturnModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div className="card" style={{ width: '100%', maxWidth: 480, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <IconRefreshAlert size={24} color="#b45309" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#b45309' }}>Claim Damaged Goods / Return</h3>
            </div>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
              Submit a formal return request under EFMHACA Good Distribution Practice guidelines.
            </p>
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Issue Details (Batch # / Damaged packages)</label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="e.g., 2 boxes received with damaged seal / cold chain excursion"
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button className="btn-secondary" onClick={() => setShowReturnModal(false)}>Close</button>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }} onClick={handleConfirmReturn}>
                <IconSend size={15} /> Submit Return Claim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          orderNumber={order.orderNumber}
          totalAmount={order.totalAmount}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* FMHACA Invoice Modal */}
      {showInvoiceModal && (
        <InvoiceModal
          order={order}
          onClose={() => setShowInvoiceModal(false)}
        />
      )}
    </DashboardLayout>
  );
};

export default OrderDetail;

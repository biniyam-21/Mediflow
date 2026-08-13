import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import { MOCK_ORDERS } from "../data/mockOrders";
import { getAllMedicines } from "../services/medicineService";

const monthlyOrders = [
  { month: "Mar", orders: 12, revenue: 148000 },
  { month: "Apr", orders: 19, revenue: 213000 },
  { month: "May", orders: 15, revenue: 178000 },
  { month: "Jun", orders: 28, revenue: 342000 },
  { month: "Jul", orders: 22, revenue: 287000 },
  { month: "Aug", orders: 31, revenue: 398000 },
];

const categoryData = [
  { name: "Antibiotics", value: 35 },
  { name: "Analgesics", value: 22 },
  { name: "Antimalarials", value: 18 },
  { name: "Diabetes", value: 12 },
  { name: "Other", value: 13 },
];

const COLORS = ["#16a34a", "#0284c7", "#f59e0b", "#7c3aed", "#94a3b8"];

const regionData = [
  { region: "Addis Ababa", orders: 42 },
  { region: "Hawassa", orders: 18 },
  { region: "Bahir Dar", orders: 14 },
  { region: "Mekelle", orders: 11 },
  { region: "Dire Dawa", orders: 9 },
  { region: "Gondar", orders: 6 },
];

const AdminReports: React.FC = () => {
  const medicines = getAllMedicines();
  const totalRevenue = MOCK_ORDERS.filter((o) => o.status === "delivered").reduce((s, o) => s + o.totalAmount, 0);

  return (
    <DashboardLayout title="Reports & Analytics" subtitle="Platform-wide insights and supply chain metrics">
      {/* Summary row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Total Orders (All Time)", value: MOCK_ORDERS.length, color: "#16a34a" },
          { label: "Platform Revenue (ETB)", value: `${(totalRevenue / 1000).toFixed(0)}K`, color: "#0284c7" },
          { label: "Active Medicines", value: medicines.length, color: "#7c3aed" },
          { label: "Avg Order Value (ETB)", value: Math.round(totalRevenue / (MOCK_ORDERS.filter(o => o.status === "delivered").length || 1)).toLocaleString(), color: "#f59e0b" },
        ].map((s) => (
          <div key={s.label} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: s.color, letterSpacing: "-0.04em" }}>{s.value}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: 4, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Monthly revenue line chart */}
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 4 }}>Monthly Revenue (ETB)</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: 18 }}>Revenue trend over the past 6 months</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyOrders}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "0.78rem" }}
                formatter={(v: number) => [`${v.toLocaleString()} ETB`, "Revenue"]}
              />
              <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4, fill: "#16a34a" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category pie chart */}
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 4 }}>Orders by Category</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: 14 }}>Medicine category distribution</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`, ""]} contentStyle={{ borderRadius: 8, fontSize: "0.78rem" }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "0.72rem" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Orders per month bar */}
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 4 }}>Monthly Orders</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: 18 }}>Number of orders placed per month</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyOrders}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: "0.78rem" }} />
              <Bar dataKey="orders" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Regional demand */}
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 4 }}>Regional Demand</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: 16 }}>Orders by Ethiopian region</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={regionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="region" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: "0.78rem" }} />
              <Bar dataKey="orders" fill="#0284c7" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;

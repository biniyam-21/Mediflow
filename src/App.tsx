import React, { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProductDetails from "./pages/ProductDetails";
import SearchResults from "./pages/SearchResults";
import AllMeds from "./pages/viewall";

// Shared Protected pages
import Profile from "./pages/Profile";
import ExpiryTracker from "./pages/ExpiryTracker";

// Pharmacist pages
import PharmacistDashboard from "./pages/PharmacistDashboard";
import MyOrders from "./pages/MyOrders";
import OrderDetail from "./pages/OrderDetail";
import Cart from "./pages/Cart";
import Notifications from "./pages/Notifications";
import Favorites from "./pages/Favorites";

// Vendor pages
import VendorDashboard from "./pages/VendorDashboard";
import VendorProducts from "./pages/VendorProducts";
import VendorAddProduct from "./pages/VendorAddProduct";
import VendorOrders from "./pages/VendorOrders";
import VendorAnalytics from "./pages/VendorAnalytics";

// Admin pages
import AdminPanel from "./pages/AdminPanel";
import AdminUsers from "./pages/AdminUsers";
import AdminVendors from "./pages/AdminVendors";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";

import "./App.css";
import medContext, { MedContextType } from "./components/context";
import { ToastProvider } from "./context/ToastContext";
import { CartProvider } from "./context/CartContext";
import { CartModal } from "./components/CartModal";
import { Medicine } from "./types";
import { getAllMedicines } from "./services/medicineService";
import { getSession } from "./services/authService";

// Simple route guard
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({
  children,
  allowedRoles,
}) => {
  const session = getSession();
  if (!session.isLoggedIn) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(session.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  const [searchedMed, setSearchedMed] = useState<Medicine[]>(getAllMedicines());
  const [searchQuery, setSearchQuery] = useState<string>("");

  const contextValue: MedContextType = [
    searchedMed,
    setSearchedMed,
    searchQuery,
    setSearchQuery,
  ];

  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <CartModal />
          <medContext.Provider value={contextValue}>
            <Routes>
            {/* ── Public ── */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/productdetails" element={<ProductDetails />} />
            <Route path="/searchresults" element={<SearchResults />} />
            <Route path="/product" element={<AllMeds />} />

            {/* ── Shared Protected ── */}
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/expiry-tracker" element={<ProtectedRoute><ExpiryTracker /></ProtectedRoute>} />

            {/* ── Pharmacist ── */}
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["pharmacist"]}><PharmacistDashboard /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute allowedRoles={["pharmacist"]}><MyOrders /></ProtectedRoute>} />
            <Route path="/orders/:id" element={<ProtectedRoute allowedRoles={["pharmacist"]}><OrderDetail /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute allowedRoles={["pharmacist"]}><Cart /></ProtectedRoute>} />
            <Route path="/favorites" element={<ProtectedRoute allowedRoles={["pharmacist"]}><Favorites /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute allowedRoles={["pharmacist"]}><Notifications /></ProtectedRoute>} />

            {/* ── Vendor ── */}
            <Route path="/vendor/dashboard" element={<ProtectedRoute allowedRoles={["vendor"]}><VendorDashboard /></ProtectedRoute>} />
            <Route path="/vendor/analytics" element={<ProtectedRoute allowedRoles={["vendor"]}><VendorAnalytics /></ProtectedRoute>} />
            <Route path="/vendor/products" element={<ProtectedRoute allowedRoles={["vendor"]}><VendorProducts /></ProtectedRoute>} />
            <Route path="/vendor/products/add" element={<ProtectedRoute allowedRoles={["vendor"]}><VendorAddProduct /></ProtectedRoute>} />
            <Route path="/vendor/orders" element={<ProtectedRoute allowedRoles={["vendor"]}><VendorOrders /></ProtectedRoute>} />

            {/* ── Admin ── */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminPanel /></ProtectedRoute>} />
            <Route path="/admin/medicines" element={<ProtectedRoute allowedRoles={["admin"]}><AdminPanel /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["admin"]}><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/vendors" element={<ProtectedRoute allowedRoles={["admin"]}><AdminVendors /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={["admin"]}><AdminReports /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={["admin"]}><AdminSettings /></ProtectedRoute>} />

            {/* Legacy redirect */}
            <Route path="/vendordashboard" element={<Navigate to="/vendor/dashboard" replace />} />

            {/* 404 fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </medContext.Provider>
      </CartProvider>
    </ToastProvider>
    </BrowserRouter>
  );
};

export default App;

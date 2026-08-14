# MediFlow — Digital Pharmacy & Medical Supply Chain Platform

> EFMHACA & MoH Regulated B2B Pharmaceutical Logistics System  
> Connecting Hospitals, Health Centers, and Retail Pharmacies with Accredited Pharmaceutical Importers & Distributors.

---

## Executive Summary

MediFlow is a B2B digital supply chain platform engineered specifically for the healthcare sector. It streamlines the end-to-end procurement of WHO Essential Medicines, IV Fluids, Vaccines, and Medical Equipment while adhering to Ethiopian Food and Drug Authority (EFMHACA) Good Distribution Practice (GDP) standards.

---

## Key Platform Features

### 1. Hospital Pharmacist Portal
- **Essential Medicines Catalog:** Search across categories, cities, and licensed vendors.
- **Quick Cart Modal:** Interactive centered modal with quantity controls, essential drug promo discounts, and cold-chain indicators.
- **Multi-Channel Payments:** Integration for Telebirr, CBE Birr, Chapa, and LC Vouchers.
- **Fast Reorder & Favorites:** Bulk reorder functionality for high-demand emergency pharmaceuticals.
- **Hospital Ratings & Reviews:** Verified reviews and ratings from hospital procurement officers.

### 2. Pharmaceutical Vendor & Depot Manager Portal
- **Sales & Revenue Analytics Dashboard (`/vendor/analytics`):** Real-time monthly revenue trends, top-selling drugs ranking, top purchasing hospital clients, and sales volume metrics.
- **Bulk Price & Discount Updater:** Apply promotional discounts (5%, 10%, 15%, 20% OFF) or update catalog pricing in one click.
- **Warehouse Driver Packing Slip (`PackingSlipModal`):** Printable loading sheets with box counts, batch numbers, carrier driver details, and signature sign-off blocks.
- **Quick Stock Qty Adjuster:** In-table stock inventory updates with instant feedback.

### 3. Cold-Chain & FEFO Expiry Management
- **IoT Temperature Monitoring (2°C – 8°C):** Real-time cold-chain sensor logging for insulin, vaccines, and biologics with breach alerts.
- **FEFO Batch Expiry Tracker (`/expiry-tracker`):** Color-coded urgency levels:
  - **Critical (< 30 Days):** Automated liquidation discount trigger
  - **Warning (30 – 90 Days):** Priority dispatch alert
  - **Safe Stock (> 90 Days):** Standard FEFO dispatch
- **Timestamped Audit Log:** Complete event trail on orders (Digital Signatures, Payment Verification, Depot Allocation, Cold-Chain Transit).

### 4. Regulatory Compliance & Invoicing
- **FMHACA Delivery Waybill & Tax Invoice:** Printable standard delivery waybills with TIN, EFMHACA accreditation numbers, and VAT exemption notes (0% VAT for WHO essential drugs).
- **3-Step Password Recovery (`/forgot-password`):** Secure 6-digit OTP verification flow for hospital accounts.

---

## Technology Stack

- **Frontend Core:** React 18 (TypeScript), Vite 4
- **UI & Styling:** Custom CSS Tokens, Tabler Icons (`@tabler/icons-react`), Material UI (`@mui/material`), TailwindCSS
- **State & Notification:** React Context (`CartContext`, `ToastContext`), Custom LocalStorage Persistence
- **Visualization & Export:** Recharts, Custom CSV Exporter (`exportUtils`)

---

## Project Architecture

```
Client/
├── src/
│   ├── assets/             # Brand logos, SVGs, and graphics
│   ├── components/         # Reusable UI Components
│   │   ├── CartModal.tsx          # Centered Quick Cart Modal Drawer
│   │   ├── DashboardLayout.tsx    # Responsive Sidebar & Topbar Instant Search
│   │   ├── DataTable.tsx          # Pagination, Indexing, Filters, CSV Export
│   │   ├── InvoiceModal.tsx       # FMHACA Waybill & Tax Receipt
│   │   ├── NavProfileDropdown.tsx # Shadcn UI Profile Dropdown Menu
│   │   ├── PackingSlipModal.tsx   # Vendor Driver Loading Manifest
│   │   ├── PaymentModal.tsx       # Telebirr & CBE Birr Payment Gateways
│   │   └── ...
│   ├── context/            # React Context State Providers
│   │   ├── CartContext.tsx        # Reactive Global Cart State
│   │   └── ToastContext.tsx       # Floating Notification System
│   ├── data/               # Mock Datasets (Orders, Medicines, Cold Chain)
│   ├── pages/              # Application View Pages
│   │   ├── ExpiryTracker.tsx      # FEFO Drug Expiry Monitoring
│   │   ├── ForgotPassword.tsx     # 3-Step OTP Password Reset
│   │   ├── VendorAnalytics.tsx    # Monthly Sales Revenue Dashboard
│   │   ├── Profile.tsx            # Facility Settings & TIN Management
│   │   ├── OrderDetail.tsx        # Order Tracking & Audit Trail Log
│   │   └── ...
│   ├── services/           # Business Logic & Auth Services
│   ├── types/              # TypeScript Interfaces & Schemas
│   └── utils/              # Export CSV & Helper Utilities
├── index.html              # HTML Entry Point
├── package.json            # Project Dependencies
└── tsconfig.json           # TypeScript Compiler Configuration
```

---

## Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone repository:**
   ```bash
   git clone https://github.com/biniyam-21/Mediflow.git
   cd Client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   *The application will launch at `http://localhost:5173`.*

4. **Run TypeScript type validation:**
   ```bash
   npx tsc --noEmit
   ```

---

## User Roles for Demo Testing

Simulate different user permissions via the platform login page (`/login`):

| Role | Default Access Route | Key Capabilities |
| :--- | :--- | :--- |
| **Hospital Pharmacist** | `/dashboard` | Order medicines, view cart modal, pay via Telebirr, track cold chain |
| **Pharmaceutical Vendor** | `/vendor/dashboard` | Manage products, view sales analytics, print packing slips, adjust stock |
| **System Administrator** | `/admin` | Verify EFMHACA licenses, manage users, audit system reports |

---

## License & Compliance

Developed for the Ministry of Health (MoH) & EFMHACA digital pharmaceutical supply chain initiative. All rights reserved.

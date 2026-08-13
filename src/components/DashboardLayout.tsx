import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MediFlow } from '../assets';
import {
  IconHome2,
  IconPill,
  IconShoppingCart,
  IconClipboardList,
  IconBell,
  IconPackage,
  IconPlus,
  IconTruckDelivery,
  IconUsers,
  IconBuildingStore,
  IconChartBar,
  IconSettings,
  IconLogout,
  IconChevronRight,
  IconHeart,
  IconUser,
  IconClock,
  IconSearch,
} from '@tabler/icons-react';
import { clearSession, getSession } from '../services/authService';
import { getAllMedicines } from '../services/medicineService';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const pharmacistNav: NavItem[] = [
  { label: 'Dashboard', icon: IconHome2, path: '/dashboard' },
  { label: 'Medicines', icon: IconPill, path: '/product' },
  { label: 'Fast Reorder', icon: IconHeart, path: '/favorites' },
  { label: 'Expiry Tracker', icon: IconClock, path: '/expiry-tracker' },
  { label: 'My Orders', icon: IconClipboardList, path: '/orders' },
  { label: 'Cart', icon: IconShoppingCart, path: '/cart' },
  { label: 'Notifications', icon: IconBell, path: '/notifications' },
  { label: 'Facility Profile', icon: IconUser, path: '/profile' },
];

const vendorNav: NavItem[] = [
  { label: 'Dashboard', icon: IconHome2, path: '/vendor/dashboard' },
  { label: 'Sales Analytics', icon: IconChartBar, path: '/vendor/analytics' },
  { label: 'My Products', icon: IconPackage, path: '/vendor/products' },
  { label: 'Add Product', icon: IconPlus, path: '/vendor/products/add' },
  { label: 'FEFO Expiry Tracker', icon: IconClock, path: '/expiry-tracker' },
  { label: 'Incoming Orders', icon: IconTruckDelivery, path: '/vendor/orders' },
  { label: 'Vendor Profile', icon: IconUser, path: '/profile' },
];

const adminNav: NavItem[] = [
  { label: 'Dashboard', icon: IconHome2, path: '/admin' },
  { label: 'Medicines', icon: IconPill, path: '/admin/medicines' },
  { label: 'Expiry Tracker', icon: IconClock, path: '/expiry-tracker' },
  { label: 'Users', icon: IconUsers, path: '/admin/users' },
  { label: 'Vendors', icon: IconBuildingStore, path: '/admin/vendors' },
  { label: 'Reports', icon: IconChartBar, path: '/admin/reports' },
  { label: 'Settings', icon: IconSettings, path: '/admin/settings' },
  { label: 'Profile', icon: IconUser, path: '/profile' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

interface Breadcrumb {
  label: string;
  path: string;
  isLast: boolean;
}

const getBreadcrumbs = (pathname: string, role: string, pageTitle?: string): Breadcrumb[] => {
  const parts = pathname.split('/').filter(Boolean);
  const homePath = role === 'admin' ? '/admin' : role === 'vendor' ? '/vendor/dashboard' : '/dashboard';
  const crumbs: Breadcrumb[] = [{ label: 'Home', path: homePath, isLast: parts.length === 0 }];

  if (parts.length === 0) return crumbs;

  let currentPath = '';
  parts.forEach((part, index) => {
    currentPath += `/${part}`;
    const isLast = index === parts.length - 1;

    let label = part.charAt(0).toUpperCase() + part.slice(1);

    if (part === 'vendor') label = 'Vendor';
    else if (part === 'admin') label = 'Admin';
    else if (part === 'dashboard') label = 'Dashboard';
    else if (part === 'product' || part === 'products') label = 'Medicines';
    else if (part === 'orders') label = 'Orders';
    else if (part === 'cart') label = 'Cart';
    else if (part === 'notifications') label = 'Notifications';
    else if (part === 'users') label = 'Users';
    else if (part === 'vendors') label = 'Vendors';
    else if (part === 'reports') label = 'Reports';
    else if (part === 'settings') label = 'Settings';
    else if (part === 'add') label = 'Add Product';
    else if (part.startsWith('usr-') || part.startsWith('med-') || part.startsWith('ORD-') || part.length > 8) {
      label = pageTitle || 'Details';
    }

    let navigatePath = currentPath;
    if (part === 'vendor') navigatePath = '/vendor/dashboard';
    if (part === 'product') navigatePath = '/product';

    if (index === 0 && (navigatePath === homePath || navigatePath === '/')) {
      crumbs[0].isLast = isLast;
      if (isLast) crumbs[0].label = pageTitle || 'Dashboard';
      return;
    }

    crumbs.push({
      label,
      path: navigatePath,
      isLast,
    });
  });

  return crumbs;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title, subtitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState<string>('pharmacist');
  const [userEmail, setUserEmail] = useState<string>('');
  const [topSearch, setTopSearch] = useState<string>('');

  useEffect(() => {
    const session = getSession();
    setRole(session.role || 'pharmacist');
    setUserEmail(session.email);
  }, []);

  const allMeds = getAllMedicines();
  const searchResults = topSearch.trim()
    ? allMeds.filter((m) =>
        m.Title.toLowerCase().includes(topSearch.toLowerCase()) ||
        (m.Category && m.Category.toLowerCase().includes(topSearch.toLowerCase()))
      ).slice(0, 5)
    : [];

  const navItems = role === 'admin' ? adminNav : role === 'vendor' ? vendorNav : pharmacistNav;

  const handleLogout = () => {
    clearSession();
    navigate('/login');
  };

  const roleLabel: Record<string, string> = {
    admin: 'System Administrator',
    vendor: 'Vendor / Supplier',
    pharmacist: 'Pharmacist',
  };

  const roleColor: Record<string, string> = {
    admin: '#7c3aed',
    vendor: '#0284c7',
    pharmacist: '#16a34a',
  };

  const breadcrumbs = getBreadcrumbs(location.pathname, role, title);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background blobs */}
      <div className="main" style={{ pointerEvents: 'none' }}>
        <div className="gradient" />
      </div>

      <div className="dashboard-layout">
        {/* ── Sidebar ── */}
        <aside className="dashboard-sidebar">
          {/* Logo */}
          <div className="sidebar-logo-area">
            <img
              src={MediFlow}
              alt="MediFlow"
              style={{ width: 110, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            />
          </div>

          {/* User chip */}
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div
              onClick={() => navigate('/profile')}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px',
                background: 'var(--surface-2)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              title="View & edit account settings"
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: roleColor[role] || '#16a34a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0
              }}>
                {userEmail ? userEmail[0].toUpperCase() : 'U'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {userEmail || 'user@mediflow.et'}
                </div>
                <div style={{ fontSize: '0.68rem', color: roleColor[role] || '#16a34a', fontWeight: 600, marginTop: 1 }}>
                  {roleLabel[role] || 'User'}
                </div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="sidebar-nav-section" style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
            <div className="sidebar-section-label" style={{ marginTop: 12, marginBottom: 8 }}>Navigation</div>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <a
                  key={item.path}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  href={item.path}
                  onClick={(e) => { e.preventDefault(); navigate(item.path); }}
                >
                  <item.icon size={17} className="nav-icon" strokeWidth={isActive ? 2.2 : 1.8} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {isActive && <IconChevronRight size={14} strokeWidth={2.5} style={{ color: 'var(--primary)' }} />}
                </a>
              );
            })}
          </nav>

          {/* Footer */}
          <div style={{ padding: '12px 12px', borderTop: '1px solid var(--border)' }}>
            <button
              onClick={handleLogout}
              className="sidebar-nav-item"
              style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', fontWeight: 600 }}
            >
              <IconLogout size={17} strokeWidth={1.8} />
              Logout
            </button>
          </div>
        </aside>

        {/* ── Main area ── */}
        <div className="dashboard-main">
          {/* Top bar */}
          <div className="dashboard-topbar">
            <div style={{ flex: 1 }}>
              {title && <div className="page-title">{title}</div>}
              {subtitle && <div className="page-subtitle">{subtitle}</div>}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Instant Search Bar */}
              <div style={{ position: 'relative', width: 220 }}>
                <IconSearch size={15} color="#94a3b8" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  className="form-input"
                  style={{ paddingLeft: 34, paddingTop: 6, paddingBottom: 6, fontSize: '0.8rem', background: 'white' }}
                  placeholder="Instant Search..."
                  value={topSearch}
                  onChange={(e) => setTopSearch(e.target.value)}
                />
                {/* Instant search popover */}
                {topSearch.trim().length > 0 && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 1000,
                    background: 'white', border: '1px solid var(--border)', borderRadius: 8,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)', overflow: 'hidden'
                  }}>
                    {searchResults.length === 0 ? (
                      <div style={{ padding: '10px 14px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>No matching items</div>
                    ) : (
                      searchResults.map((med) => (
                        <div
                          key={med._id}
                          onClick={() => {
                            setTopSearch('');
                            navigate('/productdetails', { state: { id: med._id } });
                          }}
                          style={{
                            padding: '8px 12px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem'
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f8fafc'; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
                        >
                          <IconPill size={14} color="var(--primary)" />
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{med.Title}</div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate(role === 'pharmacist' ? '/notifications' : '#')}
                style={{
                  width: 36, height: 36, border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', background: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', position: 'relative', transition: 'all 0.2s'
                }}
              >
                <IconBell size={17} color="var(--text-secondary)" strokeWidth={1.8} />
                <span style={{
                  position: 'absolute', top: 5, right: 5,
                  width: 7, height: 7, borderRadius: '50%',
                  background: '#ef4444', border: '1.5px solid white'
                }} />
              </button>
              <button
                onClick={() => navigate('/')}
                style={{
                  padding: '7px 14px', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', background: 'white',
                  fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                  color: 'var(--text-secondary)', transition: 'all 0.2s'
                }}
              >
                Go to Store
              </button>
            </div>
          </div>

          {/* Page Content */}
          <div className="dashboard-content animate-fadein">
            {/* Standard Breadcrumb Navigation (Located directly above tables/content) */}
            {breadcrumbs.length > 0 && (
              <nav aria-label="Breadcrumb" style={{ marginBottom: 16 }}>
                <ol style={{ display: 'flex', alignItems: 'center', gap: 6, listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem' }}>
                  {breadcrumbs.map((crumb, i) => (
                    <li key={crumb.path + i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {i > 0 && <span style={{ color: '#cbd5e1', fontWeight: 500 }}>/</span>}
                      {crumb.isLast ? (
                        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                          {crumb.label}
                        </span>
                      ) : (
                        <button
                          onClick={() => navigate(crumb.path)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            color: 'var(--text-secondary)',
                            fontWeight: 500,
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            transition: 'color 0.15s ease',
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--primary-dark)'; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                        >
                          {crumb.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

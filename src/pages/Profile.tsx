import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import {
  IconUser,
  IconBuildingHospital,
  IconShieldCheck,
  IconLock,
  IconDeviceFloppy,
  IconCheck,
  IconCertificate,
  IconMail,
  IconPhone,
  IconMapPin,
} from '@tabler/icons-react';
import { getSession } from '../services/authService';
import { useToast } from '../context/ToastContext';

const Profile: React.FC = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+251 911 234 567',
    organization: '',
    role: '',
    city: 'Addis Ababa',
    region: 'Addis Ababa Admin',
    licenseNumber: 'FMHACA-ETH-2024-PLT01',
    tinNumber: '0098274199',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'license' | 'security'>('profile');

  useEffect(() => {
    const session = getSession();
    setFormData((prev) => ({
      ...prev,
      name: session.name || session.email.split('@')[0] || 'User',
      email: session.email || 'pharmacist@tikuranbessa.et',
      organization: session.org || 'Tikur Anbessa Specialized Hospital',
      role: session.role || 'pharmacist',
    }));
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userOrg', formData.organization);
    showToast('Profile and facility settings saved successfully!', 'success');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      showToast('New passwords do not match!', 'error');
      return;
    }
    if (!formData.newPassword) {
      showToast('Please enter a new password', 'error');
      return;
    }
    showToast('Password changed successfully!', 'success');
    setFormData((prev) => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
  };

  const roleLabel: Record<string, string> = {
    admin: 'System Administrator',
    vendor: 'Pharmaceutical Vendor',
    pharmacist: 'Hospital Pharmacist',
  };

  return (
    <DashboardLayout title="Account & Facility Settings" subtitle="Manage your organization profile, FMHACA licensing, and security settings">
      {/* Profile Summary Header */}
      <div className="card" style={{ marginBottom: 24, padding: 24, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.8rem', fontWeight: 800, flexShrink: 0, boxShadow: '0 4px 12px rgba(22,163,74,0.25)'
        }}>
          {formData.name ? formData.name[0].toUpperCase() : 'U'}
        </div>

        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{formData.name}</h2>
            <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <IconShieldCheck size={13} /> Verified FMHACA License
            </span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 4, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <span><IconBuildingHospital size={14} style={{ verticalAlign: -2 }} /> {formData.organization}</span>
            <span><IconMail size={14} style={{ verticalAlign: -2 }} /> {formData.email}</span>
            <span><IconMapPin size={14} style={{ verticalAlign: -2 }} /> {formData.city}, Ethiopia</span>
          </div>
        </div>

        <div style={{ background: 'var(--surface-2)', padding: '10px 16px', borderRadius: 10, border: '1px solid var(--border)', fontSize: '0.78rem' }}>
          <div style={{ color: 'var(--text-muted)' }}>Role Access:</div>
          <div style={{ fontWeight: 700, color: 'var(--primary-dark)', fontSize: '0.88rem' }}>{roleLabel[formData.role] || 'Pharmacist'}</div>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>
        {[
          { id: 'profile', label: 'Facility Profile', icon: IconBuildingHospital },
          { id: 'license', label: 'FMHACA Licensing & Tax', icon: IconCertificate },
          { id: 'security', label: 'Security & Password', icon: IconLock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'profile' | 'license' | 'security')}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
                borderRadius: 'var(--radius-sm)', border: 'none',
                background: isActive ? 'var(--primary)' : 'transparent',
                color: isActive ? 'white' : 'var(--text-secondary)',
                fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Facility Profile Form */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 18, color: 'var(--text-primary)' }}>Facility & Contact Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label className="form-label">Pharmacist / Contact Name</label>
              <input
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                value={formData.email}
                disabled
                style={{ background: 'var(--surface-2)', cursor: 'not-allowed' }}
              />
            </div>
            <div>
              <label className="form-label">Facility / Organization Name</label>
              <input
                className="form-input"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="form-label">Phone Number</label>
              <input
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="form-label">City</label>
              <input
                className="form-input"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Region / Sub-city</label>
              <input
                className="form-input"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px' }}>
              <IconDeviceFloppy size={16} /> Save Profile Settings
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: FMHACA Licensing */}
      {activeTab === 'license' && (
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 18, color: 'var(--text-primary)' }}>FMHACA (EFDA) Compliance & TIN Verification</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label className="form-label">FMHACA License Number</label>
              <input className="form-input" value={formData.licenseNumber} onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })} />
            </div>
            <div>
              <label className="form-label">Taxpayer Identification Number (TIN)</label>
              <input className="form-input" value={formData.tinNumber} onChange={(e) => setFormData({ ...formData, tinNumber: e.target.value })} />
            </div>
          </div>

          <div style={{ padding: 16, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <IconShieldCheck size={24} color="#16a34a" />
            <div>
              <div style={{ fontWeight: 700, color: '#15803d', fontSize: '0.88rem' }}>FMHACA Institutional Accreditation Verified</div>
              <div style={{ fontSize: '0.78rem', color: '#166534' }}>Your facility is authorized to order Class-A WHO Essential Pharmaceuticals in Ethiopia.</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={() => showToast('FMHACA details updated!', 'success')} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <IconDeviceFloppy size={16} /> Update License Records
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Security */}
      {activeTab === 'security' && (
        <form onSubmit={handleChangePassword} className="card" style={{ padding: 24, maxWidth: 500 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 18, color: 'var(--text-primary)' }}>Change Account Password</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
            <div>
              <label className="form-label">Current Password</label>
              <input
                type="password"
                className="form-input"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-input"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-input"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px' }}>
            <IconLock size={16} /> Update Password
          </button>
        </form>
      )}
    </DashboardLayout>
  );
};

export default Profile;

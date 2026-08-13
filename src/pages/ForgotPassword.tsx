import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarOne from '../components/NavbarOne';
import Footer from '../components/Footer';
import { IconMail, IconKey, IconLock, IconCheck, IconArrowLeft, IconShieldCheck } from '@tabler/icons-react';
import { useToast } from '../context/ToastContext';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStep(2);
    showToast(`Verification OTP sent to ${email}`, 'success');
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      showToast('Please enter the full 6-digit OTP code', 'error');
      return;
    }
    setStep(3);
    showToast('OTP verified successfully! Set your new password.', 'success');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match!', 'error');
      return;
    }
    if (!newPassword) {
      showToast('Please enter a new password', 'error');
      return;
    }
    showToast('Password reset successfully! Please log in.', 'success');
    setTimeout(() => navigate('/login'), 1200);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const nextOtp = [...otp];
    nextOtp[index] = val.slice(-1);
    setOtp(nextOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>

      <div className="app">
        <NavbarOne />
      </div>

      <div style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div className="card" style={{ width: '100%', maxWidth: 460, padding: 32, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%', background: '#f0fdf4',
              border: '1px solid #bbf7d0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 12
            }}>
              <IconShieldCheck size={28} color="#16a34a" />
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {step === 1 && 'Reset Your Password'}
              {step === 2 && 'Enter Verification Code'}
              {step === 3 && 'Create New Password'}
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.5 }}>
              {step === 1 && 'Enter your registered facility email address to receive a secure 6-digit OTP reset code.'}
              {step === 2 && `We sent a 6-digit OTP code to ${email}. Check your inbox.`}
              {step === 3 && 'Choose a strong password with at least 6 characters for your MediFlow account.'}
            </p>
          </div>

          {/* Step Indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                style={{
                  height: 4, width: 32, borderRadius: 2,
                  background: s <= step ? 'var(--primary)' : '#e2e8f0',
                  transition: 'background 0.2s'
                }}
              />
            ))}
          </div>

          {/* Step 1: Email Form */}
          {step === 1 && (
            <form onSubmit={handleSendOTP}>
              <div style={{ marginBottom: 20 }}>
                <label className="form-label">Hospital / Vendor Email</label>
                <div style={{ position: 'relative' }}>
                  <IconMail size={16} color="#94a3b8" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    className="form-input"
                    style={{ paddingLeft: 38 }}
                    placeholder="e.g. tigist@tikuranbessa.et"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px' }}>
                Send Reset Code
              </button>

              <div style={{ textAlign: 'center', marginTop: 18 }}>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.82rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                >
                  <IconArrowLeft size={14} /> Back to Login
                </button>
              </div>
            </form>
          )}

          {/* Step 2: OTP Verification Form */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP}>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    style={{
                      width: 44, height: 48, textAlign: 'center', fontSize: '1.2rem', fontWeight: 800,
                      borderRadius: 8, border: '1px solid var(--border)', background: 'white'
                    }}
                  />
                ))}
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px' }}>
                Verify & Continue
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18, fontSize: '0.8rem' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                >
                  Change Email
                </button>
                <button
                  type="button"
                  onClick={() => showToast('New OTP code sent!', 'info')}
                  style={{ background: 'none', border: 'none', color: 'var(--primary-dark)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Resend OTP Code
                </button>
              </div>
            </form>
          )}

          {/* Step 3: New Password Form */}
          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                <div>
                  <label className="form-label">New Password</label>
                  <div style={{ position: 'relative' }}>
                    <IconLock size={16} color="#94a3b8" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="password"
                      className="form-input"
                      style={{ paddingLeft: 38 }}
                      placeholder="At least 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Confirm New Password</label>
                  <div style={{ position: 'relative' }}>
                    <IconLock size={16} color="#94a3b8" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="password"
                      className="form-input"
                      style={{ paddingLeft: 38 }}
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <IconCheck size={16} /> Save New Password
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ForgotPassword;

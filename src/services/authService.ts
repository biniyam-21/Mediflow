import { User } from '../types';
import { MOCK_USERS } from '../data/mockUsers';

// ── Mock credentials store (email → password) ──────────────────────────────
// These map 1-to-1 with MOCK_USERS above.
// In production this would be replaced by a real JWT API call.
const MOCK_CREDENTIALS: Record<string, string> = {
  'admin@mediflow.et':       'admin123',
  'tigist@tikuranbessa.et':  'pharma123',
  'solomon@pfsa.et':         'vendor123',
  'mekdes@hawassauni.et':    'vendor123',
  'dawit@hawassaref.et':     'pharma123',
};

// In-memory registry of newly registered users (survives page navigation)
let registeredUsers: Array<User & { password: string }> = [];

// ── Auth result types ──────────────────────────────────────────────────────
export type AuthError =
  | 'invalid_credentials'
  | 'account_pending'
  | 'account_suspended'
  | 'not_found';

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: AuthError;
}

// ── Login ──────────────────────────────────────────────────────────────────
export function mockLogin(email: string, password: string): AuthResult {
  const normalizedEmail = email.trim().toLowerCase();

  // 1. Check registered-in-session users first
  const newUser = registeredUsers.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );
  if (newUser) {
    if (newUser.status === 'pending') return { success: false, error: 'account_pending' };
    if (newUser.status === 'suspended') return { success: false, error: 'account_suspended' };
    const { password: _pw, ...user } = newUser;
    return { success: true, user };
  }

  // 2. Check seeded mock users
  const mockUser = MOCK_USERS.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (!mockUser) return { success: false, error: 'not_found' };

  const expectedPassword = MOCK_CREDENTIALS[normalizedEmail];
  if (!expectedPassword || password !== expectedPassword) {
    return { success: false, error: 'invalid_credentials' };
  }

  if (mockUser.status === 'pending') return { success: false, error: 'account_pending' };
  if (mockUser.status === 'suspended') return { success: false, error: 'account_suspended' };

  return { success: true, user: mockUser };
}

// ── Register ───────────────────────────────────────────────────────────────
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'pharmacist' | 'vendor';
  organization: string;
  city: string;
  region: string;
  licenseNumber: string;
  tin?: string;
}

export function mockRegister(payload: RegisterPayload): { success: boolean; error?: string } {
  const emailLower = payload.email.trim().toLowerCase();

  // Check for duplicate in seeded data
  const existsInSeed = MOCK_USERS.some((u) => u.email.toLowerCase() === emailLower);
  // Check for duplicate in session-registered
  const existsInSession = registeredUsers.some((u) => u.email.toLowerCase() === emailLower);

  if (existsInSeed || existsInSession) {
    return { success: false, error: 'email_taken' };
  }

  const newUser: User & { password: string } = {
    _id: `usr-${Date.now()}`,
    name: payload.name,
    email: payload.email.trim(),
    role: payload.role,
    organization: payload.organization,
    city: payload.city,
    region: payload.region,
    licenseNumber: payload.licenseNumber,
    status: 'pending', // all new registrations start as pending
    joinedAt: new Date().toISOString(),
    password: payload.password,
  };

  registeredUsers.push(newUser);
  return { success: true };
}

// ── Session helpers ────────────────────────────────────────────────────────
export function saveSession(user: User): void {
  localStorage.setItem('userLoggedIn', 'true');
  localStorage.setItem('userEmail', user.email);
  localStorage.setItem('userRole', user.role);
  localStorage.setItem('userName', user.name);
  localStorage.setItem('userOrg', user.organization);
  localStorage.setItem('userId', user._id);
}

export function clearSession(): void {
  ['userLoggedIn', 'userEmail', 'userRole', 'userName', 'userOrg', 'userId'].forEach(
    (k) => localStorage.removeItem(k)
  );
}

export function getSession(): { isLoggedIn: boolean; email: string; role: string; name: string; org: string } {
  return {
    isLoggedIn: localStorage.getItem('userLoggedIn') === 'true',
    email: localStorage.getItem('userEmail') || '',
    role: localStorage.getItem('userRole') || '',
    name: localStorage.getItem('userName') || '',
    org: localStorage.getItem('userOrg') || '',
  };
}

// ── Mock credential hints for the login page UI ───────────────────────────
export const DEMO_ACCOUNTS = [
  { role: 'admin',        email: 'admin@mediflow.et',      password: 'admin123',   label: 'Administrator' },
  { role: 'pharmacist',   email: 'tigist@tikuranbessa.et', password: 'pharma123',  label: 'Pharmacist' },
  { role: 'vendor',       email: 'solomon@pfsa.et',        password: 'vendor123',  label: 'Vendor / Supplier' },
];

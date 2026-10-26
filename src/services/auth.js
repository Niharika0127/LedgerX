// LedgerX demo authentication/data layer.
// This intentionally uses browser storage for a classroom/demo build only.
// Never store real passwords or sensitive financial information this way in production.
const USERS_KEY = 'ledgerXUsers';
const CURRENT_USER_KEY = 'ledgerXUser';
const SESSION_KEY = 'ledgerXLoggedIn';
const SESSION_EMAIL_KEY = 'ledgerXSessionEmail';
const PROFILE_KEY = 'ledgerXFinancialProfile';
const ONBOARDING_KEY = 'ledgerXOnboardingData';

function readJson(key, fallback) {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
}
export function getUsers() {
  const users = readJson(USERS_KEY, []);
  const legacy = readJson(CURRENT_USER_KEY, null);
  if (Array.isArray(users) && users.length) {
    return legacy?.email && !users.some(user => user.email?.toLowerCase() === legacy.email.toLowerCase()) ? [...users, legacy] : users;
  }
  return legacy?.email ? [legacy] : [];
}
export function getCurrentUser() {
  if (localStorage.getItem(SESSION_KEY) !== 'true') return null;
  const email = (localStorage.getItem(SESSION_EMAIL_KEY) || readJson(CURRENT_USER_KEY, {})?.email || '').toLowerCase();
  return getUsers().find(user => user.email?.toLowerCase() === email) || readJson(CURRENT_USER_KEY, null);
}
export function registerUser({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getUsers();
  if (users.some(user => user.email?.toLowerCase() === normalizedEmail)) {
    return { ok: false, message: 'An account with this email already exists. Please sign in instead.' };
  }
  const user = { id: (globalThis.crypto?.randomUUID?.() || `user-${Date.now()}`), name: name.trim(), email: normalizedEmail, password, phone: '', currency: 'INR', createdAt: new Date().toISOString(), onboardingComplete: false };
  const updated = [...users, user];
  localStorage.setItem(USERS_KEY, JSON.stringify(updated));
  // Keep the legacy prototype's single-user key in sync for pages that still read it.
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { ok: true, user };
}
export function loginUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getUsers().find(item => item.email?.toLowerCase() === normalizedEmail && item.password === password);
  if (!user) return { ok: false, message: 'Email or password is incorrect. Check your details or create an account.' };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  localStorage.setItem(SESSION_KEY, 'true');
  localStorage.setItem(SESSION_EMAIL_KEY, user.email);
  const scopedProfile = readJson(`${PROFILE_KEY}:${user.email}`, null);
  const scopedOnboarding = readJson(`${ONBOARDING_KEY}:${user.email}`, null);
  if (scopedProfile) localStorage.setItem(PROFILE_KEY, JSON.stringify(scopedProfile)); else localStorage.removeItem(PROFILE_KEY);
  if (scopedOnboarding) localStorage.setItem(ONBOARDING_KEY, JSON.stringify(scopedOnboarding)); else localStorage.removeItem(ONBOARDING_KEY);
  return { ok: true, user: { ...user, onboardingComplete: Boolean(user.onboardingComplete || scopedOnboarding) } };
}
export function startSession(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  localStorage.setItem(SESSION_KEY, 'true');
  localStorage.setItem(SESSION_EMAIL_KEY, user.email);
  const scopedProfile = readJson(`${PROFILE_KEY}:${user.email}`, null);
  const scopedOnboarding = readJson(`${ONBOARDING_KEY}:${user.email}`, null);
  if (scopedProfile) localStorage.setItem(PROFILE_KEY, JSON.stringify(scopedProfile)); else localStorage.removeItem(PROFILE_KEY);
  if (scopedOnboarding) localStorage.setItem(ONBOARDING_KEY, JSON.stringify(scopedOnboarding)); else localStorage.removeItem(ONBOARDING_KEY);
}
export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_EMAIL_KEY);
}
export function saveOnboarding(profile) {
  const user = getCurrentUser();
  const saved = { ...profile, userId: user?.id || null, email: user?.email || null, completedAt: new Date().toISOString() };
  localStorage.setItem(ONBOARDING_KEY, JSON.stringify(saved));
  if (user?.email) localStorage.setItem(`${ONBOARDING_KEY}:${user.email}`, JSON.stringify(saved));
  // Legacy pages (dashboard/finance tools) read this shared profile key.
  const normalizedProfile = {
    age: Number(saved.age) || 0,
    occupation: saved.occupation || '',
    monthlyIncome: Number(saved.monthlyIncome) || 0,
    livingExpenses: Number(saved.livingExpenses) || 0,
    otherExpenses: Number(saved.otherExpenses) || 0,
    monthlyExpenses: (Number(saved.livingExpenses) || 0) + (Number(saved.otherExpenses) || 0),
    savings: Number(saved.savings) || 0,
    investments: Number(saved.investments) || 0,
    outstandingLoans: Number(saved.outstandingLoans) || 0,
    loans: Number(saved.outstandingLoans) || 0,
    monthlyEMI: Number(saved.monthlyEMI) || 0,
    emi: Number(saved.monthlyEMI) || 0,
    financialGoals: saved.financialGoals || [],
    savingsRate: Number(saved.monthlyIncome) > 0 ? Math.max(0, (((Number(saved.monthlyIncome) || 0) - (Number(saved.livingExpenses) || 0) - (Number(saved.otherExpenses) || 0)) / Number(saved.monthlyIncome)) * 100) : 0,
    onboardingComplete: true,
    updatedAt: saved.completedAt
  };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(normalizedProfile));
  if (user?.email) localStorage.setItem(`${PROFILE_KEY}:${user.email}`, JSON.stringify(normalizedProfile));
  if (user) {
    const updatedUser = { ...user, onboardingComplete: true };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    const users = getUsers().map(item => item.email?.toLowerCase() === user.email?.toLowerCase() ? updatedUser : item);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  return saved;
}
export function getSavedOnboarding() { const user = getCurrentUser(); if (user?.email) return readJson(`${ONBOARDING_KEY}:${user.email}`, readJson(ONBOARDING_KEY, {})); return readJson(ONBOARDING_KEY, {}); }

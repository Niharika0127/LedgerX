import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { getCurrentUser, registerUser } from '../../services/auth.js';

function Page() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', terms: false });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  if (getCurrentUser()) return <Navigate to="/dashboard" replace />;
  const update = e => setForm(current => ({ ...current, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const submit = e => {
    e.preventDefault(); setError('');
    if (form.name.trim().length < 2) return setError('Enter your full name (at least 2 characters).');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setError('Enter a valid email address, such as name@example.com.');
    if (form.password.length < 8) return setError('Use a password with at least 8 characters.');
    if (!/[A-Za-z]/.test(form.password) || !/[0-9]/.test(form.password)) return setError('For this demo, your password must include at least one letter and one number.');
    if (form.password !== form.confirmPassword) return setError('Your passwords do not match.');
    if (!form.terms) return setError('Please agree to the Terms of Service and Privacy Policy.');
    const result = registerUser(form);
    if (!result.ok) return setError(result.message);
    navigate('/login', { replace: true, state: { registered: true } });
  };
  return <><Navbar variant="register" /><main className="register-container"><section className="register-info"><div className="register-badge">✨ Start Your Financial Journey</div><h1>Build your <span>Financial Twin.</span></h1><p>Create your LedgerX account and start building a complete digital representation of your financial life.</p><div className="register-features"><div className="register-feature"><div className="register-feature-icon">💰</div><div><h3>Track Everything</h3><p>Income, expenses, assets, investments and debts.</p></div></div><div className="register-feature"><div className="register-feature-icon">🧪</div><div><h3>Simulate Decisions</h3><p>See how major financial decisions could affect you.</p></div></div><div className="register-feature"><div className="register-feature-icon">🔮</div><div><h3>Plan Your Future</h3><p>Project your financial position and goals.</p></div></div></div></section><section className="register-card"><div className="register-heading"><h2>Create account</h2><p>Start building your financial twin.</p></div><form onSubmit={submit} noValidate><div className="register-form-group"><label htmlFor="register-name">Full Name</label><input id="register-name" name="name" value={form.name} onChange={update} autoComplete="name" placeholder="Enter your full name" required /></div><div className="register-form-group"><label htmlFor="register-email">Email Address</label><input id="register-email" name="email" type="email" value={form.email} onChange={update} autoComplete="email" placeholder="Enter your email" required /></div><div className="register-form-row"><div className="register-form-group"><label htmlFor="register-password">Password</label><input id="register-password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={update} autoComplete="new-password" minLength={8} placeholder="At least 8 characters" required /></div><div className="register-form-group"><label htmlFor="register-confirm">Confirm Password</label><input id="register-confirm" name="confirmPassword" type={showPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={update} autoComplete="new-password" minLength={8} placeholder="Repeat password" required /></div></div><label className="remember-me"><input type="checkbox" checked={showPassword} onChange={e => setShowPassword(e.target.checked)} /><span>Show passwords</span></label><label className="terms-check"><input name="terms" checked={form.terms} onChange={update} type="checkbox" required /><span>I agree to the Terms of Service and Privacy Policy for this demo.</span></label><button className="register-submit" type="submit">Create My Account <span>→</span></button>{error && <p className="form-feedback error-feedback" role="alert">{error}</p>}</form><div className="register-divider"><span>DEMO MODE</span></div><p className="auth-demo-note">Use a unique email. Demo accounts are stored only in this browser.</p><p className="register-login">Already have an account? <Link to="/login">Sign in</Link></p></section></main></>;
}
export default Page;

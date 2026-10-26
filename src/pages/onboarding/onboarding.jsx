import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { getCurrentUser, getSavedOnboarding, saveOnboarding } from '../../services/auth.js';

const steps = [
  { title: 'Basic Information', subtitle: 'A little context helps us personalize your financial twin.' },
  { title: 'Income & Expenses', subtitle: 'Add a typical month. Estimates are absolutely fine.' },
  { title: 'Assets & Liabilities', subtitle: 'Build a simple snapshot of what you own and owe.' },
  { title: 'Financial Goals', subtitle: 'Choose the goals you want LedgerX to help you plan for.' }
];
const emptyProfile = { age: '', occupation: '', monthlyIncome: '', livingExpenses: '', otherExpenses: '', savings: '', investments: '', outstandingLoans: '', monthlyEMI: '', financialGoals: [] };
const moneyFields = ['monthlyIncome', 'livingExpenses', 'otherExpenses', 'savings', 'investments', 'outstandingLoans', 'monthlyEMI'];
const goalOptions = ['Emergency Fund', 'Buy a Car', 'Buy a House', 'Education', 'Retirement', 'Wealth Creation'];

function Page() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const stored = getSavedOnboarding();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(() => stored?.email && stored.email === user?.email ? { ...emptyProfile, ...stored, financialGoals: stored.financialGoals || [] } : emptyProfile);
  const [error, setError] = useState('');
  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);
  const update = e => setForm(current => ({ ...current, [e.target.name]: e.target.value }));
  const toggleGoal = goal => setForm(current => ({ ...current, financialGoals: current.financialGoals.includes(goal) ? current.financialGoals.filter(item => item !== goal) : [...current.financialGoals, goal] }));
  const validateStep = () => {
    if (step === 0) {
      if (form.age && (Number(form.age) < 13 || Number(form.age) > 120)) return 'Enter an age between 13 and 120, or leave it blank.';
      if (!form.occupation) return 'Please choose an occupation to continue.';
    }
    if (step === 1) {
      if (form.monthlyIncome === '' || Number(form.monthlyIncome) < 0) return 'Enter your monthly income (use 0 if you currently have none).';
      if (form.livingExpenses === '' || Number(form.livingExpenses) < 0) return 'Enter your living expenses (use 0 if none).';
      if (form.otherExpenses === '' || Number(form.otherExpenses) < 0) return 'Enter your other expenses (use 0 if none).';
    }
    if (step === 2 && moneyFields.slice(3).some(field => form[field] === '' || Number(form[field]) < 0)) return 'Complete each assets and liabilities amount. Use 0 if not applicable.';
    return '';
  };
  const next = () => { const message = validateStep(); if (message) return setError(message); setError(''); setStep(current => Math.min(steps.length - 1, current + 1)); };
  const submit = e => {
    e.preventDefault();
    const message = validateStep(); if (message) return setError(message);
    const saved = saveOnboarding(form);
    if (!saved) return setError('We could not save your profile. Please try again.');
    navigate('/dashboard', { replace: true });
  };
  const numberInput = (name, label, placeholder = '0') => <div className="onboarding-group"><label htmlFor={name}>{label}</label><div className="input-prefix"><span>₹</span><input id={name} name={name} type="number" min="0" step="any" value={form[name]} onChange={update} placeholder={placeholder} required /></div></div>;
  return <><Navbar variant="onboarding" /><main className="onboarding-container"><div className="onboarding-progress"><div className="progress-info"><span>Financial Profile Setup · Step {step + 1} of {steps.length}</span><strong>{Math.round(progress)}%</strong></div><div className="onboarding-progress-bar"><div style={{ width: `${progress}%` }} /></div></div><div className="onboarding-heading"><div className="onboarding-badge">🧬 Build Your Financial Twin</div><h1>Let's understand your <span>financial world.</span></h1><p>Your profile is saved to this demo account and shared with LedgerX's existing finance tools.</p></div><section className="onboarding-card"><form onSubmit={submit} noValidate><div className="onboarding-section"><div className="onboarding-section-title"><span className="section-number">0{step + 1}</span><div><h2>{steps[step].title}</h2><p>{steps[step].subtitle}</p></div></div>
    {step === 0 && <div className="onboarding-grid"><div className="onboarding-group"><label htmlFor="age">Age (optional)</label><input id="age" name="age" type="number" min="13" max="120" value={form.age} onChange={update} placeholder="e.g. 25" /></div><div className="onboarding-group"><label htmlFor="occupation">Occupation</label><select id="occupation" name="occupation" value={form.occupation} onChange={update} required><option value="">Select occupation</option><option>Student</option><option>Salaried Employee</option><option>Business Owner</option><option>Freelancer</option><option>Other</option></select></div></div>}
    {step === 1 && <div className="onboarding-grid">{numberInput('monthlyIncome', 'Monthly Income', '50000')}{numberInput('livingExpenses', 'Living Expenses', '20000')}{numberInput('otherExpenses', 'Other Expenses', '5000')}</div>}
    {step === 2 && <div className="onboarding-grid">{numberInput('savings', 'Savings', '100000')}{numberInput('investments', 'Investments', '200000')}{numberInput('outstandingLoans', 'Outstanding Loans', '0')}{numberInput('monthlyEMI', 'Monthly EMI', '0')}</div>}
    {step === 3 && <><p className="onboarding-goal-intro">Select all that apply. You can change these later.</p><div className="goal-options">{goalOptions.map((goal, index) => <label className="goal-option" key={goal}><input type="checkbox" checked={form.financialGoals.includes(goal)} onChange={() => toggleGoal(goal)} /><span>{['🚨','🚗','🏠','🎓','🌴','📈'][index]} {goal}</span></label>)}</div></>}
  </div>{error && <p className="form-feedback error-feedback" role="alert">{error}</p>}<div className="onboarding-bottom"><p>🔒 Demo data stays in this browser.</p><div className="onboarding-actions">{step > 0 && <button type="button" className="onboarding-back" onClick={() => { setError(''); setStep(current => current - 1); }}>Back</button>}{step < steps.length - 1 ? <button type="button" className="onboarding-submit" onClick={next}>Continue <span>→</span></button> : <button className="onboarding-submit" type="submit">Save Financial Profile <span>→</span></button>}</div></div></form></section></main></>;
}
export default Page;

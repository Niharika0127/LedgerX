import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/index/index.jsx';
import Login from './pages/login/login.jsx';
import Register from './pages/register/register.jsx';
import Onboarding from './pages/onboarding/onboarding.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx';
import Finances from './pages/finances/finances.jsx';
import DigitalTwin from './pages/digital-twin/digital-twin.jsx';
import Simulation from './pages/simulation/simulation.jsx';
import Projection from './pages/projection/projection.jsx';
import Goals from './pages/goals/goals.jsx';
import Investments from './pages/investments/investments.jsx';
import Loans from './pages/loans/loans.jsx';
import Risk from './pages/risk/risk.jsx';
import Advisor from './pages/advisor/advisor.jsx';
import Timeline from './pages/timeline/timeline.jsx';
import Reports from './pages/reports/reports.jsx';
import Settings from './pages/settings/settings.jsx';
import Admin from './pages/admin/admin.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import NotFound from './pages/not-found.jsx';
import { getCurrentUser, logoutUser } from './services/auth.js';

function Logout() {
  const [done, setDone] = useState(false);
  useEffect(() => { logoutUser(); setDone(true); }, []);
  return done ? <Navigate to="/login" replace /> : <main className="not-found-page"><p>Signing you out…</p></main>;
}
function Private({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/onboarding" element={<Private><Onboarding /></Private>} />
    <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
    <Route path="/finances" element={<Private><Finances /></Private>} />
    <Route path="/digital-twin" element={<Private><DigitalTwin /></Private>} />
    <Route path="/simulation" element={<Private><Simulation /></Private>} />
    <Route path="/projection" element={<Private><Projection /></Private>} />
    <Route path="/goals" element={<Private><Goals /></Private>} />
    <Route path="/investments" element={<Private><Investments /></Private>} />
    <Route path="/loans" element={<Private><Loans /></Private>} />
    <Route path="/risk" element={<Private><Risk /></Private>} />
    <Route path="/advisor" element={<Private><Advisor /></Private>} />
    <Route path="/timeline" element={<Private><Timeline /></Private>} />
    <Route path="/reports" element={<Private><Reports /></Private>} />
    <Route path="/settings" element={<Private><Settings /></Private>} />
    <Route path="/admin" element={<Private><Admin /></Private>} />
    <Route path="*" element={<NotFound />} />
  </Routes></BrowserRouter>;
}
export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/index/index.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Onboarding from "./pages/onboarding/onboarding.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Finances from "./pages/finances/finances.jsx";
import DigitalTwin from "./pages/digital-twin/digital-twin.jsx";
import Simulation from "./pages/simulation/simulation.jsx";
import Projection from "./pages/projection/projection.jsx";
import Goals from "./pages/goals/goals.jsx";
import Investments from "./pages/investments/investments.jsx";
import Loans from "./pages/loans/loans.jsx";
import Risk from "./pages/risk/risk.jsx";
import Advisor from "./pages/advisor/advisor.jsx";
import Timeline from "./pages/timeline/timeline.jsx";
import Reports from "./pages/reports/reports.jsx";
import Settings from "./pages/settings/settings.jsx";
import Admin from "./pages/admin/admin.jsx";

function App(){return <BrowserRouter><Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/onboarding" element={<Onboarding />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/finances" element={<Finances />} />
<Route path="/digital-twin" element={<DigitalTwin />} />
<Route path="/simulation" element={<Simulation />} />
<Route path="/projection" element={<Projection />} />
<Route path="/goals" element={<Goals />} />
<Route path="/investments" element={<Investments />} />
<Route path="/loans" element={<Loans />} />
<Route path="/risk" element={<Risk />} />
<Route path="/advisor" element={<Advisor />} />
<Route path="/timeline" element={<Timeline />} />
<Route path="/reports" element={<Reports />} />
<Route path="/settings" element={<Settings />} />
<Route path="/admin" element={<Admin />} />
</Routes></BrowserRouter>}
export default App;

import { useEffect } from "react";
import { initLegacyApp } from "../../services/legacyApp.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

function Page() {
  useEffect(() => {
    document.body.className = "dashboard-page";
    const timer = window.setTimeout(() => initLegacyApp(), 0);
    return () => {
        window.clearTimeout(timer);
        document.body.className = "";
    };
  }, []);
  return (
    <div className="dashboard-page"><Sidebar activePage="digital-twin" />
      <main className="dashboard-main">
  <header className="dashboard-header">
    <div>
      <p className="dashboard-date">AI PROFILE & BEHAVIORAL MODEL</p>
      <h1>
        Digital
        <span>Twin</span>
        🧬
      </h1>
    </div>
    <div className="dashboard-profile"><div className="notification">🔔</div></div>
  </header>
  {/* Twin Health & Status Cards */}
  <section className="dashboard-summary">
    <div className="summary-card">
      <div className="summary-card-top">
        <span>MODEL ACCURACY</span>
        <span className="summary-icon">🎯</span>
      </div>
      <h2>94.8%</h2>
      <p className="positive">Calibrated via 12 months data</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>RISK TOLERANCE</span>
        <span className="summary-icon">⚖️</span>
      </div>
      <h2>Moderate</h2>
      <p className="positive">Balanced Growth Archetype</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>SAVINGS RATE</span>
        <span className="summary-icon">🛡️</span>
      </div>
      <h2>50.1%</h2>
      <p className="positive">+4.2% higher than average</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>STRESS SCORE</span>
        <span className="summary-icon">🟢</span>
      </div>
      <h2>Low (22/100)</h2>
      <p className="positive">Healthy reserve buffer</p>
    </div>
  </section>
  {/* Digital Twin Profile & Persona */}
  <section className="dashboard-grid">
    {/* Archetype Details */}
    <div className="dashboard-panel">
      <div className="panel-header">
        <div>
          <span className="panel-label">BEHAVIORAL MODEL</span>
          <h3>Financial Archetype</h3>
        </div>
        <span className="positive">Active Sync</span>
      </div>
      <div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px"}}>
        <div className="simulation-result-preview"><div>
            <span>Primary Behavior</span>
            <strong>Disciplined Saver / Strategic Investor</strong>
          </div></div>
        <div className="simulation-result-preview"><div>
            <span>Spending Temperament</span>
            <strong>Low Impulse, Utility-Focused</strong>
          </div></div>
        <div className="simulation-result-preview"><div>
            <span>Emergency Cushion</span>
            <strong>6.2 Months of Expenses Maintained</strong>
          </div></div>
      </div>
    </div>
    {/* Trait Breakdown */}
    <div className="dashboard-panel">
      <div className="panel-header"><div>
          <span className="panel-label">PARAMETER WEIGHTS</span>
          <h3>Behavioral Breakdown</h3>
        </div></div>
      <div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px"}}>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>Investment Consistency</span>
            <strong>88%</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "88%"}}></div>
          </div>
        </div>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>Debt Aversion</span>
            <strong>92%</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "92%"}}></div>
          </div>
        </div>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>Budget Discipline</span>
            <strong>76%</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "76%"}}></div>
          </div>
        </div>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>Impulse Resistance</span>
            <strong>81%</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "81%"}}></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
    </div>
  );
}

export default Page;

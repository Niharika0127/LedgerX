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
    <div className="dashboard-page"><Sidebar activePage="simulation" />
      <main className="dashboard-main">
  <header className="dashboard-header">
    <div>
      <p className="dashboard-date">MONTE CARLO & SCENARIO TESTING</p>
      <h1>
        Simulation
        <span>Lab</span>
        🧪
      </h1>
    </div>
    <div className="dashboard-profile"><div className="notification">🔔</div></div>
  </header>
  {/* Active Scenario Metrics */}
  <section className="dashboard-summary">
    <div className="summary-card">
      <div className="summary-card-top">
        <span>SIMULATED NET WORTH (5 YR)</span>
        <span className="summary-icon">📈</span>
      </div>
      <h2>₹38,20,000</h2>
      <p className="positive">+163% base growth projected</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>SUCCESS PROBABILITY</span>
        <span className="summary-icon">🎲</span>
      </div>
      <h2>87.4%</h2>
      <p className="positive">Based on 1,000 runs</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>MAX DRAWDOWN RISK</span>
        <span className="summary-icon">📉</span>
      </div>
      <h2>-18.2%</h2>
      <p className="expense-text">Under severe crash mode</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>RECOVERY TIME</span>
        <span className="summary-icon">⏱️</span>
      </div>
      <h2>11 Months</h2>
      <p className="positive">Estimated liquidity cushion</p>
    </div>
  </section>
  {/* Interactive Simulation Controls */}
  <section className="dashboard-grid">
    {/* Scenario Controls */}
    <div className="dashboard-panel">
      <div className="panel-header"><div>
          <span className="panel-label">PARAMETERS</span>
          <h3>Run Custom Stress Test</h3>
        </div></div>
      <div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "18px"}}>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px"}}>
            <span>Market Correction Drop (%)</span>
            <strong>-20%</strong>
          </div>
          <input max="50" min="0" style={{width: "100%", accentColor: "#00f2fe"}} type="range" value="20" />
        </div>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px"}}>
            <span>Inflation Rate Spurt (%)</span>
            <strong>7.5%</strong>
          </div>
          <input max="15" min="2" style={{width: "100%", accentColor: "#00f2fe"}} type="range" value="7" />
        </div>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px"}}>
            <span>Monthly Savings Adjustment</span>
            <strong>+₹15,000</strong>
          </div>
          <input max="50000" min="-20000" style={{width: "100%", accentColor: "#00f2fe"}} type="range" value="15000" />
        </div>
      </div>
    </div>
    {/* Simulation Output Breakdown */}
    <div className="dashboard-panel">
      <div className="panel-header"><div>
          <span className="panel-label">STRESS OUTCOMES</span>
          <h3>Scenario Outcomes</h3>
        </div></div>
      <div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px"}}>
        <div className="simulation-result-preview">
          <div>
            <span>Best Case (95th Percentile)</span>
            <strong style={{color: "#00f2fe"}}>₹49,50,000</strong>
          </div>
          <span className="positive">High Growth</span>
        </div>
        <div className="simulation-result-preview">
          <div>
            <span>Expected Case (50th Percentile)</span>
            <strong style={{color: "#ffffff"}}>₹38,20,000</strong>
          </div>
          <span className="positive">Baseline</span>
        </div>
        <div className="simulation-result-preview">
          <div>
            <span>Worst Case (5th Percentile)</span>
            <strong style={{color: "#ff4b4b"}}>₹24,10,000</strong>
          </div>
          <span className="expense-text">Stressed</span>
        </div>
      </div>
    </div>
  </section>
</main>
    </div>
  );
}

export default Page;

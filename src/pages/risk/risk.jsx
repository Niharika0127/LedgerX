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
    <div className="dashboard-page"><Sidebar activePage="risk" />
      <main className="dashboard-main">
  <header className="dashboard-header">
    <div>
      <p className="dashboard-date">STRESS TESTING & EXPOSURE ANALYSIS</p>
      <h1>
        Risk
        <span>Center</span>
        🚨
      </h1>
    </div>
    <div className="dashboard-profile"><div className="notification">🔔</div></div>
  </header>
  {/* Risk Summary Metrics */}
  <section className="dashboard-summary">
    <div className="summary-card">
      <div className="summary-card-top">
        <span>OVERALL RISK SCORE</span>
        <span className="summary-icon">🛡️</span>
      </div>
      <h2>Low (22/100)</h2>
      <p className="positive">Well-hedged portfolio</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>LIQUIDITY BUFFER</span>
        <span className="summary-icon">💧</span>
      </div>
      <h2>6.2 Months</h2>
      <p className="positive">Safe emergency reserve</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>VOLATILITY EXPOSURE</span>
        <span className="summary-icon">📊</span>
      </div>
      <h2>Moderate</h2>
      <p className="positive">Beta relative to Nifty: 0.85</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>CONCENTRATION RISK</span>
        <span className="summary-icon">⚠️</span>
      </div>
      <h2>15.2% Max</h2>
      <p className="positive">Balanced equity distribution</p>
    </div>
  </section>
  {/* Threat Breakdown & Mitigations */}
  <section className="dashboard-grid">
    <div className="dashboard-panel">
      <div className="panel-header"><div>
          <span className="panel-label">EXPOSURE AUDIT</span>
          <h3>Vulnerability Assessment</h3>
        </div></div>
      <div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px"}}>
        <div className="simulation-result-preview">
          <div>
            <span>Inflation Rate Spike (+3%)</span>
            <strong>Impact: Minor erosion on fixed deposits</strong>
          </div>
          <span className="positive">Low Vulnerability</span>
        </div>
        <div className="simulation-result-preview">
          <div>
            <span>Market Correction (-25%)</span>
            <strong>Impact: Temporary drop in net unrealized gains</strong>
          </div>
          <span className="positive">Managed</span>
        </div>
        <div className="simulation-result-preview">
          <div>
            <span>Income Disruption Event</span>
            <strong>Impact: Emergency reserve covers 6+ months</strong>
          </div>
          <span className="positive">Secured</span>
        </div>
      </div>
    </div>
    {/* Risk Allocation Breakdown */}
    <div className="dashboard-panel">
      <div className="panel-header"><div>
          <span className="panel-label">TOLERANCE BUCKETS</span>
          <h3>Asset Risk Profile</h3>
        </div></div>
      <div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px"}}>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>Low Risk / Capital Preservation</span>
            <strong>40%</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "40%"}}></div>
          </div>
        </div>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>Moderate Risk / Growth Funds</span>
            <strong>45%</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "45%"}}></div>
          </div>
        </div>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>High Risk / Aggressive Tactical</span>
            <strong>15%</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "15%"}}></div>
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

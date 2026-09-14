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
    <div className="dashboard-page"><Sidebar activePage="projection" />
      <main className="dashboard-main">
  <header className="dashboard-header">
    <div>
      <p className="dashboard-date">LONG-TERM WEALTH ACCUMULATION</p>
      <h1>
        Future
        <span>Projection</span>
        🔮
      </h1>
    </div>
    <div className="dashboard-profile"><div className="notification">🔔</div></div>
  </header>
  {/* Projection Metrics Summary */}
  <section className="dashboard-summary">
    <div className="summary-card">
      <div className="summary-card-top">
        <span>10-YEAR ESTIMATED VALUATION</span>
        <span className="summary-icon">💎</span>
      </div>
      <h2>₹82,40,000</h2>
      <p className="positive">Assumes 11.5% CAGR growth</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>FIRE HORIZON</span>
        <span className="summary-icon">🔥</span>
      </div>
      <h2>Age 42</h2>
      <p className="positive">Financial Independence Target</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>COMPOUND INTEREST SHARE</span>
        <span className="summary-icon">⚡</span>
      </div>
      <h2>44.2%</h2>
      <p className="positive">Earnings from reinvestments</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>INFLATION ADJUSTED</span>
        <span className="summary-icon">🛡️</span>
      </div>
      <h2>₹58,10,000</h2>
      <p className="positive">Real purchasing power</p>
    </div>
  </section>
  {/* Projection Milestones */}
  <section className="dashboard-grid">
    <div className="dashboard-panel">
      <div className="panel-header"><div>
          <span className="panel-label">TIMELINE TRACKING</span>
          <h3>Key Projected Milestones</h3>
        </div></div>
      <div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px"}}>
        <div className="simulation-result-preview">
          <div>
            <span>2028 (2 Years)</span>
            <strong>₹25,000,00 Liquid Reserve</strong>
          </div>
          <span className="positive">On Track</span>
        </div>
        <div className="simulation-result-preview">
          <div>
            <span>2031 (5 Years)</span>
            <strong>₹50,000,00 First Major Portfolio Target</strong>
          </div>
          <span className="positive">On Track</span>
        </div>
        <div className="simulation-result-preview">
          <div>
            <span>2036 (10 Years)</span>
            <strong>₹1,00,00,000 Net Worth Threshold</strong>
          </div>
          <span className="positive">Projected</span>
        </div>
      </div>
    </div>
    {/* Asset Growth Breakdown */}
    <div className="dashboard-panel">
      <div className="panel-header"><div>
          <span className="panel-label">PORTFOLIO MIX (10 YR)</span>
          <h3>Asset Class Weight Distribution</h3>
        </div></div>
      <div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px"}}>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>Equity & Index Funds</span>
            <strong>60%</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "60%"}}></div>
          </div>
        </div>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>Fixed Income & Bonds</span>
            <strong>20%</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "20%"}}></div>
          </div>
        </div>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>Real Estate / Debt Assets</span>
            <strong>15%</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "15%"}}></div>
          </div>
        </div>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>Liquid Cash Reserves</span>
            <strong>5%</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "5%"}}></div>
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

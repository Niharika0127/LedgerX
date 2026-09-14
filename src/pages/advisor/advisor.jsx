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
    <div className="dashboard-page"><Sidebar activePage="advisor" />
      <main className="dashboard-main">
  <header className="dashboard-header">
    <div>
      <p className="dashboard-date">PERSONALIZED STRATEGY & COPILOT</p>
      <h1>
        AI
        <span>Advisor</span>
        🤖
      </h1>
    </div>
    <div className="dashboard-profile"><div className="notification">🔔</div></div>
  </header>
  {/* Insights Summary Cards */}
  <section className="dashboard-summary">
    <div className="summary-card">
      <div className="summary-card-top">
        <span>AI ADVISOR STATUS</span>
        <span className="summary-icon">⚡</span>
      </div>
      <h2>Active Sync</h2>
      <p className="positive">Monitoring cash flows</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>OPTIMIZATION POTENTIAL</span>
        <span className="summary-icon">💡</span>
      </div>
      <h2>+₹4,200 / mo</h2>
      <p className="positive">Identified via subscription audit</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>PORTFOLIO ALIGNMENT</span>
        <span className="summary-icon">🎯</span>
      </div>
      <h2>92%</h2>
      <p className="positive">Matches moderate risk profile</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>ACTION ITEMS</span>
        <span className="summary-icon">📋</span>
      </div>
      <h2>2 Pending</h2>
      <p className="positive">Rebalancing recommended</p>
    </div>
  </section>
  {/* Interactive AI Chat / Recommendations Panel */}
  <section className="dashboard-grid">
    <div className="dashboard-panel">
      <div className="panel-header"><div>
          <span className="panel-label">COPILOT INTERACTION</span>
          <h3>Ask Your Financial Twin</h3>
        </div></div>
      <div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px"}}>
        <div className="simulation-result-preview" style={{background: "rgba(255, 255, 255, 0.03)", borderRadius: "8px", padding: "12px"}}><div>
            <span style={{color: "#00f2fe", fontWeight: "600"}}>🤖 AI Assistant:</span>
            <p style={{marginTop: "5px", fontSize: "13px", color: "#ccc"}}>"I've analyzed your recent transactions. You're saving 50.1% of monthly income. Reallocating ₹5,000 to your Tech Infrastructure goal will accelerate its completion by 2 months."</p>
          </div></div>
        <div style={{display: "flex", gap: "10px", marginTop: "10px"}}>
          <input placeholder="Type a prompt or query..." style={{flex: "1", padding: "12px", background: "#121824", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff"}} type="text" />
          <button style={{padding: "12px 20px", background: "linear-gradient(135deg, #00f2fe, #4facfe)", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer"}}>Send</button>
        </div>
      </div>
    </div>
    {/* Smart Strategy Recommendations */}
    <div className="dashboard-panel">
      <div className="panel-header"><div>
          <span className="panel-label">AUTOMATED SUGGESTIONS</span>
          <h3>Top Recommendations</h3>
        </div></div>
      <div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px"}}>
        <div className="simulation-result-preview">
          <div>
            <span>High-Yield Cash Sweep</span>
            <strong>Move excess liquid buffer to 7.2% liquid fund</strong>
          </div>
          <span className="positive">Low Risk</span>
        </div>
        <div className="simulation-result-preview">
          <div>
            <span>Debt Snowball Repayment</span>
            <strong>Prioritize 13.5% Credit Card balance</strong>
          </div>
          <span className="expense-text">High Priority</span>
        </div>
      </div>
    </div>
  </section>
</main>
    </div>
  );
}

export default Page;

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
    <div className="dashboard-page"><Sidebar activePage="finances" />
      <main className="dashboard-main">
  <header className="dashboard-header">
    <div>
      <p className="dashboard-date">FINANCIAL OVERVIEW & BREAKDOWN</p>
      <h1>
        My
        <span>Finances</span>
        💳
      </h1>
    </div>
    <div className="dashboard-profile"><div className="notification">🔔</div></div>
  </header>
  {/* Financial Overview Cards */}
  <section className="dashboard-summary">
    <div className="summary-card">
      <div className="summary-card-top">
        <span>TOTAL LIQUID CASH</span>
        <span className="summary-icon">💵</span>
      </div>
      <h2>₹2,45,000</h2>
      <p className="positive">Available across 3 accounts</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>TOTAL ASSETS</span>
        <span className="summary-icon">🏦</span>
      </div>
      <h2>₹14,50,000</h2>
      <p className="positive">Investments + Savings</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>TOTAL LIABILITIES</span>
        <span className="summary-icon">📉</span>
      </div>
      <h2>₹1,65,500</h2>
      <p className="expense-text">Active loans & card debt</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>NET LIQUIDITY</span>
        <span className="summary-icon">⚡</span>
      </div>
      <h2>₹79,500</h2>
      <p className="positive">Monthly net cash inflow</p>
    </div>
  </section>
  {/* Income & Expense Breakdown Panels */}
  <section className="dashboard-grid">
    {/* Income Sources Panel */}
    <div className="dashboard-panel">
      <div className="panel-header">
        <div>
          <span className="panel-label">INFLOW</span>
          <h3>Income Sources</h3>
        </div>
        <span className="positive">+₹85,000 / mo</span>
      </div>
      <div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px"}}>
        <div className="simulation-result-preview">
          <div>
            <span>Primary Salary</span>
            <strong>Tech Industry Corp</strong>
          </div>
          <strong>₹75,000</strong>
        </div>
        <div className="simulation-result-preview">
          <div>
            <span>Freelance / Side Projects</span>
            <strong>Consulting & Web Work</strong>
          </div>
          <strong>₹10,000</strong>
        </div>
      </div>
    </div>
    {/* Expense Categories Panel */}
    <div className="dashboard-panel">
      <div className="panel-header">
        <div>
          <span className="panel-label">OUTFLOW</span>
          <h3>Monthly Expenses</h3>
        </div>
        <span className="expense-text">₹42,350 / mo</span>
      </div>
      <div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px"}}>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>Housing & Utilities</span>
            <strong>₹18,000 (42%)</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "42%"}}></div>
          </div>
        </div>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>Food & Groceries</span>
            <strong>₹12,000 (28%)</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "28%"}}></div>
          </div>
        </div>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>Transport & Fuel</span>
            <strong>₹5,500 (13%)</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "13%"}}></div>
          </div>
        </div>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>Entertainment & Subscriptions</span>
            <strong>₹6,850 (17%)</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "17%"}}></div>
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

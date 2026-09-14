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
    <div className="dashboard-page"><Sidebar activePage="loans" />
      <main className="dashboard-main">
  <header className="dashboard-header">
    <div>
      <p className="dashboard-date">LIABILITIES & PAYOFF STRATEGY</p>
      <h1>
        Loans &
        <span>Debt</span>
        🏦
      </h1>
    </div>
    <div className="dashboard-profile"><div className="notification">🔔</div></div>
  </header>
  {/* Debt Overview Summary Cards */}
  <section className="dashboard-summary">
    <div className="summary-card">
      <div className="summary-card-top">
        <span>TOTAL OUTSTANDING DEBT</span>
        <span className="summary-icon">📉</span>
      </div>
      <h2>₹1,65,500</h2>
      <p className="expense-text">Active balance across 2 accounts</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>MONTHLY EMI OBLIGATION</span>
        <span className="summary-icon">🗓️</span>
      </div>
      <h2>₹12,400 / mo</h2>
      <p className="positive">14.5% of total income</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>WEIGHTED AVG INTEREST</span>
        <span className="summary-icon">⚡</span>
      </div>
      <h2>8.5% p.a.</h2>
      <p className="positive">Low-interest structured debt</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>DEBT-FREE HORIZON</span>
        <span className="summary-icon">🎯</span>
      </div>
      <h2>14 Months</h2>
      <p className="positive">At current payoff pace</p>
    </div>
  </section>
  {/* Active Liabilities & Repayment Progress */}
  <section className="dashboard-grid">
    <div className="dashboard-panel">
      <div className="panel-header"><div>
          <span className="panel-label">ACTIVE ACCOUNTS</span>
          <h3>Liability Breakdown</h3>
        </div></div>
      <div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px"}}>
        <div className="simulation-result-preview">
          <div>
            <span>Education / Tech Loan</span>
            <strong>8.5% Interest • ₹9,400/mo EMI</strong>
          </div>
          <strong>₹1,40,000 Remaining</strong>
        </div>
        <div className="simulation-result-preview">
          <div>
            <span>Credit Card Balance</span>
            <strong>13.5% Interest • ₹3,000/mo EMI</strong>
          </div>
          <strong>₹25,500 Remaining</strong>
        </div>
      </div>
    </div>
    {/* Payoff Progress */}
    <div className="dashboard-panel">
      <div className="panel-header"><div>
          <span className="panel-label">REPAYMENT STATUS</span>
          <h3>Principal Paid Down</h3>
        </div></div>
      <div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px"}}>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>Education / Tech Loan (Paid ₹1,60,000 of ₹3,00,000)</span>
            <strong>53%</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "53%"}}></div>
          </div>
        </div>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "5px"}}>
            <span>Credit Card Balance (Paid ₹74,500 of ₹1,00,000)</span>
            <strong>74%</strong>
          </div>
          <div className="dashboard-progress">
            <div style={{width: "74%"}}></div>
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

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
    <div className="dashboard-page"><Sidebar activePage="reports" />
      <main className="dashboard-main">
  <header className="dashboard-header">
    <div>
      <p className="dashboard-date">EXPORTABLE STATEMENTS & AUDITS</p>
      <h1>
        Financial
        <span>Reports</span>
        📄
      </h1>
    </div>
    <div className="dashboard-profile"><div className="notification">🔔</div></div>
  </header>
  {/* Reports Summary */}
  <section className="dashboard-summary">
    <div className="summary-card">
      <div className="summary-card-top">
        <span>GENERATED REPORTS</span>
        <span className="summary-icon">📑</span>
      </div>
      <h2>8 Ready</h2>
      <p className="positive">Updated monthly</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>TAX COMPLIANCE</span>
        <span className="summary-icon">⚖️</span>
      </div>
      <h2>Ready</h2>
      <p className="positive">80C & Capital Gains prepped</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>AUDIT SCORE</span>
        <span className="summary-icon">🔍</span>
      </div>
      <h2>100% Verified</h2>
      <p className="positive">No discrepancies found</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>EXPORT FORMATS</span>
        <span className="summary-icon">⬇️</span>
      </div>
      <h2>PDF / CSV</h2>
      <p className="positive">Instant download available</p>
    </div>
  </section>
  {/* Available Downloads Grid */}
  <section className="dashboard-grid"><div className="dashboard-panel" style={{gridColumn: "span 2"}}>
      <div className="panel-header"><div>
          <span className="panel-label">DOWNLOAD CENTER</span>
          <h3>Statements & Summary Exports</h3>
        </div></div>
      <div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px"}}>
        <div className="simulation-result-preview">
          <div>
            <strong>Annual Tax Statement (FY 2025-26)</strong>
            <p style={{fontSize: "11px", color: "#888", marginTop: "2px"}}>Includes capital gains, SIP ledger, and 80C deductions</p>
          </div>
          <button style={{padding: "8px 16px", background: "rgba(0, 242, 254, 0.1)", border: "1px solid #00f2fe", color: "#00f2fe", borderRadius: "6px", fontWeight: "600", cursor: "pointer"}}>Download PDF</button>
        </div>
        <div className="simulation-result-preview">
          <div>
            <strong>Monthly Cash Flow Audit (August 2026)</strong>
            <p style={{fontSize: "11px", color: "#888", marginTop: "2px"}}>Detailed itemized breakdown of income vs. outflow</p>
          </div>
          <button style={{padding: "8px 16px", background: "rgba(0, 242, 254, 0.1)", border: "1px solid #00f2fe", color: "#00f2fe", borderRadius: "6px", fontWeight: "600", cursor: "pointer"}}>Download CSV</button>
        </div>
        <div className="simulation-result-preview">
          <div>
            <strong>Monte Carlo Risk Assessment Summary</strong>
            <p style={{fontSize: "11px", color: "#888", marginTop: "2px"}}>Exported simulation metrics and stress-test results</p>
          </div>
          <button style={{padding: "8px 16px", background: "rgba(0, 242, 254, 0.1)", border: "1px solid #00f2fe", color: "#00f2fe", borderRadius: "6px", fontWeight: "600", cursor: "pointer"}}>Download PDF</button>
        </div>
      </div>
    </div></section>
</main>
    </div>
  );
}

export default Page;

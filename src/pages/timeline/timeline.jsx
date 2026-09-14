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
    <div className="dashboard-page"><Sidebar activePage="timeline" />
      <main className="dashboard-main">
  <header className="dashboard-header">
    <div>
      <p className="dashboard-date">CHRONOLOGICAL EVENT STREAM</p>
      <h1>
        Financial
        <span>Timeline</span>
        🗓️
      </h1>
    </div>
    <div className="dashboard-profile"><div className="notification">🔔</div></div>
  </header>
  {/* Timeline Overview Summary Cards */}
  <section className="dashboard-summary">
    <div className="summary-card">
      <div className="summary-card-top">
        <span>UPCOMING EVENTS</span>
        <span className="summary-icon">⏰</span>
      </div>
      <h2>3 Scheduled</h2>
      <p className="positive">Next auto-debit in 3 days</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>RECORDED MILESTONES</span>
        <span className="summary-icon">🏁</span>
      </div>
      <h2>12 Completed</h2>
      <p className="positive">Last completed 2 weeks ago</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>PLANNED INFLOW</span>
        <span className="summary-icon">📥</span>
      </div>
      <h2>₹85,000</h2>
      <p className="positive">Scheduled for 1st of month</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>PLANNED OUTFLOW</span>
        <span className="summary-icon">📤</span>
      </div>
      <h2>₹27,400</h2>
      <p className="positive">Includes SIP & Debt EMIs</p>
    </div>
  </section>
  {/* Timeline Stream */}
  <section className="dashboard-grid"><div className="dashboard-panel" style={{gridColumn: "span 2"}}>
      <div className="panel-header"><div>
          <span className="panel-label">ACTIVITY & SCHEDULE</span>
          <h3>Historical & Upcoming Stream</h3>
        </div></div>
      <div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px"}}>
        {/* Future Scheduled */}
        <div className="simulation-result-preview" style={{borderLeft: "4px solid #00f2fe"}}>
          <div>
            <span style={{color: "#00f2fe", fontSize: "11px"}}>UPCOMING • SEP 5, 2026</span>
            <strong>Monthly Mutual Fund SIP Auto-Debit</strong>
          </div>
          <strong style={{color: "#00f2fe"}}>-₹15,000</strong>
        </div>
        <div className="simulation-result-preview" style={{borderLeft: "4px solid #00f2fe"}}>
          <div>
            <span style={{color: "#00f2fe", fontSize: "11px"}}>UPCOMING • SEP 10, 2026</span>
            <strong>Tech Education Loan EMI Payment</strong>
          </div>
          <strong style={{color: "#00f2fe"}}>-₹9,400</strong>
        </div>
        {/* Past Recorded */}
        <div className="simulation-result-preview" style={{borderLeft: "4px solid #4facfe"}}>
          <div>
            <span style={{color: "#888", fontSize: "11px"}}>COMPLETED • AUG 15, 2026</span>
            <strong>Emergency Cushion Allocation Met (90%)</strong>
          </div>
          <span className="positive">Milestone Hit</span>
        </div>
        <div className="simulation-result-preview" style={{borderLeft: "4px solid #4facfe"}}>
          <div>
            <span style={{color: "#888", fontSize: "11px"}}>COMPLETED • AUG 1, 2026</span>
            <strong>Monthly Stipend / Salary Credit</strong>
          </div>
          <strong className="positive">+₹85,000</strong>
        </div>
      </div>
    </div></section>
</main>
    </div>
  );
}

export default Page;

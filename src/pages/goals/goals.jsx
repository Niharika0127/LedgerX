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
    <div className="dashboard-page">
      <Sidebar activePage="goals" />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-date">
              MILESTONES & TARGET TRACKING
            </p>
            <h1>
              Financial
              <span>Goals</span>
              🎯
            </h1>
          </div>

          <div className="dashboard-profile">
            <div className="notification">🔔</div>
          </div>
        </header>

        <section className="dashboard-summary">
          <div className="summary-card">
            <div className="summary-card-top">
              <span>ACTIVE GOALS</span>
              <span className="summary-icon">📌</span>
            </div>
            <h2>4 Active</h2>
            <p className="positive">2 Near Completion</p>
          </div>

          <div className="summary-card">
            <div className="summary-card-top">
              <span>TOTAL SAVED FOR GOALS</span>
              <span className="summary-icon">🏦</span>
            </div>
            <h2>₹3,85,000</h2>
            <p className="positive">64.1% of combined targets</p>
          </div>

          <div className="summary-card">
            <div className="summary-card-top">
              <span>MONTHLY ALLOCATION</span>
              <span className="summary-icon">🔄</span>
            </div>
            <h2>₹22,000 / mo</h2>
            <p className="positive">Auto-allocated from inflow</p>
          </div>

          <div className="summary-card">
            <div className="summary-card-top">
              <span>NEXT MILESTONE</span>
              <span className="summary-icon">⏳</span>
            </div>
            <h2>3 Months</h2>
            <p className="positive">Emergency Fund Completion</p>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <span className="panel-label">SHORT & MID TERM</span>
                <h3>Active Milestones</h3>
              </div>
              <span className="positive">3 Active Goals</span>
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "15px"
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "12px",
                    marginBottom: "6px"
                  }}
                >
                  <span>6-Month Emergency Cushion</span>
                  <strong>90%</strong>
                </div>

                <div className="dashboard-progress">
                  <div style={{ width: "90%" }}></div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    marginTop: "6px"
                  }}
                >
                  <span>₹1,80,000 saved</span>
                  <span>Target: ₹2,00,000</span>
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "12px",
                    marginBottom: "6px"
                  }}
                >
                  <span>Tech Infrastructure & Upgrades</span>
                  <strong>70%</strong>
                </div>

                <div className="dashboard-progress">
                  <div style={{ width: "70%" }}></div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    marginTop: "6px"
                  }}
                >
                  <span>₹85,000 saved</span>
                  <span>Target: ₹1,20,000</span>
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "12px",
                    marginBottom: "6px"
                  }}
                >
                  <span>Startup Capital Reserve</span>
                  <strong>42%</strong>
                </div>

                <div className="dashboard-progress">
                  <div style={{ width: "42%" }}></div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    marginTop: "6px"
                  }}
                >
                  <span>₹1,20,000 saved</span>
                  <span>Target: ₹2,80,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <span className="panel-label">AUTOMATION RULES</span>
                <h3>Funding Allocation</h3>
              </div>
              <span className="positive">₹22,000 / mo</span>
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <div className="simulation-result-preview">
                <div>
                  <span>Emergency Cushion</span>
                  <strong>₹10,000 / month</strong>
                </div>
                <span className="positive">Auto-Debit</span>
              </div>

              <div className="simulation-result-preview">
                <div>
                  <span>Tech Upgrades</span>
                  <strong>₹7,000 / month</strong>
                </div>
                <span className="positive">Auto-Debit</span>
              </div>

              <div className="simulation-result-preview">
                <div>
                  <span>Startup Capital</span>
                  <strong>₹5,000 / month</strong>
                </div>
                <span className="positive">Auto-Debit</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Page;
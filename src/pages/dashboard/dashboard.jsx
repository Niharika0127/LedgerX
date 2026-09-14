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
    <div className="dashboard-page"><Sidebar activePage="dashboard" />
      <main className="dashboard-main">
  <header className="dashboard-header">
    <div>
      <p className="dashboard-date">SUNDAY, AUGUST 30, 2026</p>
      <h1>
        Good morning,
        <span>there.</span>
        👋
      </h1>
    </div>
    <div className="dashboard-profile">
      <div className="notification">🔔</div>
      {/* <div class="profile-avatar">
                    U
                </div> */}
    </div>
  </header>
  <section className="dashboard-summary">
    <div className="summary-card net-worth-card">
      <div className="summary-card-top">
        <span>NET WORTH</span>
        <span className="summary-icon">💎</span>
      </div>
      <h2>₹12,84,500</h2>
      <p className="positive">↑ 8.4% this year</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>MONTHLY INCOME</span>
        <span className="summary-icon">💵</span>
      </div>
      <h2>₹85,000</h2>
      <p className="positive">↑ 5.2% from last month</p>
    </div>
    <div className="summary-card">
      <div className="summary-card-top">
        <span>MONTHLY EXPENSES</span>
        <span className="summary-icon">💳</span>
      </div>
      <h2>₹42,350</h2>
      <p className="expense-text">49.8% of income</p>
    </div>
    <div className="summary-card health-card">
      <div className="summary-card-top">
        <span>FINANCIAL HEALTH</span>
        <span className="summary-icon">❤️</span>
      </div>
      <div className="health-number">
        82
        <small>/100</small>
      </div>
      <div className="dashboard-progress"><div></div></div>
      <p className="positive">Excellent health</p>
    </div>
  </section>
  <section className="dashboard-grid">
    <div className="dashboard-panel chart-panel">
      <div className="panel-header">
        <div>
          <span className="panel-label">NET WORTH</span>
          <h2>₹12.84L</h2>
        </div>
        <select label="Net worth period" title="Net worth period">
          <option>Last 12 months</option>
          <option>Last 6 months</option>
          <option>This year</option>
        </select>
      </div>
      <div className="dashboard-chart">
        <div className="chart-grid-line line-a"></div>
        <div className="chart-grid-line line-b"></div>
        <div className="chart-grid-line line-c"></div>
        <svg preserveAspectRatio="none" viewBox="0 0 700 220">
          <defs><linearGradient id="dashboardGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopOpacity=".25"></stop>
              <stop offset="100%" stopOpacity="0"></stop>
            </linearGradient></defs>
          <path d="M0 180
                               C70 170, 100 155, 145 160
                               S210 130, 260 140
                               S320 105, 370 120
                               S430 80, 475 100
                               S535 65, 580 75
                               S650 35, 700 45
                               L700 220
                               L0 220 Z" fill="url(#dashboardGradient)"></path>
          <path d="M0 180
                               C70 170, 100 155, 145 160
                               S210 130, 260 140
                               S320 105, 370 120
                               S430 80, 475 100
                               S535 65, 580 75
                               S650 35, 700 45" fill="none" stroke="#7454d9" strokeWidth="3"></path>
        </svg>
        <div className="chart-months">
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
        </div>
      </div>
    </div>
    <div className="dashboard-panel cashflow-panel">
      <div className="panel-header">
        <div>
          <span className="panel-label">CASH FLOW</span>
          <h3>This Month</h3>
        </div>
        <span className="cashflow-positive">+₹42,650</span>
      </div>
      <div className="cashflow-bars">
        <div className="cash-bar">
          <div className="bar income-bar" style={{height: "90%"}}></div>
          <span>Income</span>
        </div>
        <div className="cash-bar">
          <div className="bar expense-bar" style={{height: "48%"}}></div>
          <span>Expenses</span>
        </div>
        <div className="cash-bar">
          <div className="bar saving-bar" style={{height: "68%"}}></div>
          <span>Savings</span>
        </div>
      </div>
    </div>
  </section>
  <section className="dashboard-bottom-grid">
    <div className="dashboard-panel goals-dashboard">
      <div className="panel-header">
        <div>
          <span className="panel-label">YOUR GOALS</span>
          <h3>Financial Goals</h3>
        </div>
        <a href="/goals">View all →</a>
      </div>
      <div className="goal-row">
        <div className="goal-left">
          <div className="goal-small-icon">🚨</div>
          <div>
            <strong>Emergency Fund</strong>
            <span>₹3.2L / ₹5L</span>
          </div>
        </div>
        <div className="goal-progress"><div style={{width: "64%"}}></div></div>
        <strong className="goal-percent">64%</strong>
      </div>
      <div className="goal-row">
        <div className="goal-left">
          <div className="goal-small-icon">🚗</div>
          <div>
            <strong>New Car</strong>
            <span>₹4.5L / ₹8L</span>
          </div>
        </div>
        <div className="goal-progress"><div style={{width: "56%"}}></div></div>
        <strong className="goal-percent">56%</strong>
      </div>
      <div className="goal-row">
        <div className="goal-left">
          <div className="goal-small-icon">🌴</div>
          <div>
            <strong>Retirement</strong>
            <span>₹18L / ₹50L</span>
          </div>
        </div>
        <div className="goal-progress"><div style={{width: "36%"}}></div></div>
        <strong className="goal-percent">36%</strong>
      </div>
    </div>
    <div className="dashboard-panel ai-insight">
      <div className="ai-icon">🤖</div>
      <span className="panel-label">AI FINANCIAL INSIGHT</span>
      <h3>You're on a good track.</h3>
      <p>
        Your savings rate is currently
        <strong>50.2%</strong>
        .
                    Increasing your monthly investments
                    by ₹5,000 could significantly improve
                    your long-term projection.
      </p>
      <a className="insight-button" href="/advisor">Ask AI Advisor →</a>
    </div>
    <div className="dashboard-panel simulation-dashboard">
      <div className="simulation-dashboard-top">
        <div>
          <span className="panel-label">SIMULATION LAB</span>
          <h3>What if you buy a car?</h3>
        </div>
        <span className="simulation-icon">🧪</span>
      </div>
      <div className="simulation-result-preview">
        <div>
          <span>Current Net Worth</span>
          <strong>₹12.84L</strong>
        </div>
        <span className="simulation-arrow">→</span>
        <div>
          <span>After 3 Years</span>
          <strong>₹15.21L</strong>
        </div>
      </div>
      <a className="simulation-button" href="/simulation">Run New Simulation</a>
    </div>
  </section>
</main>
    </div>
  );
}

export default Page;

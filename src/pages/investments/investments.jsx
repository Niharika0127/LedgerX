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
    <div className="dashboard-page"><Sidebar activePage="investments" />
      <main className="dashboard-main">
  <header className="dashboard-header">
    <div>
      <p className="dashboard-date">WEALTH MANAGEMENT</p>
      <h1>
        My
        <span>Investments</span>
      </h1>
    </div>
    <div className="dashboard-profile">
      <div className="notification">🔔</div>
      <div className="profile-avatar">U</div>
    </div>
  </header>
  <section className="investment-stats">
    <div className="dashboard-panel investment-stat">
      <span>Total Invested</span>
      <h2>₹4,85,000</h2>
      <p>Across 6 investments</p>
    </div>
    <div className="dashboard-panel investment-stat">
      <span>Current Value</span>
      <h2>₹5,72,450</h2>
      <p className="investment-positive">↑ ₹87,450 returns</p>
    </div>
    <div className="dashboard-panel investment-stat">
      <span>Total Returns</span>
      <h2>18.03%</h2>
      <p className="investment-positive">Portfolio growth</p>
    </div>
    <div className="dashboard-panel investment-stat">
      <span>Monthly SIP</span>
      <h2>₹12,000</h2>
      <p>Next investment in 8 days</p>
    </div>
  </section>
  <section className="investment-layout">
    <div className="dashboard-panel portfolio-panel">
      <div className="investment-header">
        <div>
          <span className="panel-label">PORTFOLIO</span>
          <h3>Investment Overview</h3>
        </div>
        <button className="investment-btn">+ Add Investment</button>
      </div>
      <div className="portfolio-chart">
        <div className="chart-lines">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <svg preserveAspectRatio="none" viewBox="0 0 700 230">
          <polyline fill="none" points="0,190 90,170 180,180 270,125 360,140 450,90 540,105 620,55 700,35" stroke="#7454d9" strokeWidth="4"></polyline>
          <polyline fill="rgba(116,84,217,.08)" points="0,190 90,170 180,180 270,125 360,140 450,90 540,105 620,55 700,35 700,230 0,230" stroke="none"></polyline>
        </svg>
        <div className="portfolio-labels">
          <span>Jan</span>
          <span>Mar</span>
          <span>May</span>
          <span>Jul</span>
          <span>Aug</span>
        </div>
      </div>
    </div>
    <div className="dashboard-panel allocation-panel">
      <div className="investment-header"><div>
          <span className="panel-label">ALLOCATION</span>
          <h3>Asset Mix</h3>
        </div></div>
      <div className="allocation-circle"><div className="allocation-inner">
          <strong>₹5.72L</strong>
          <span>Portfolio</span>
        </div></div>
      <div className="allocation-list">
        <div>
          <span>
            <i></i>
            Mutual Funds
          </span>
          <strong>42%</strong>
        </div>
        <div>
          <span>
            <i></i>
            Stocks
          </span>
          <strong>28%</strong>
        </div>
        <div>
          <span>
            <i></i>
            FD & Bonds
          </span>
          <strong>20%</strong>
        </div>
        <div>
          <span>
            <i></i>
            Gold
          </span>
          <strong>10%</strong>
        </div>
      </div>
    </div>
  </section>
  <section className="dashboard-panel holdings-panel">
    <div className="investment-header">
      <div>
        <span className="panel-label">YOUR HOLDINGS</span>
        <h3>Current Investments</h3>
      </div>
      <button className="settings-outline">View All</button>
    </div>
    <div className="holdings-table">
      <div className="holding-row holding-heading">
        <span>Investment</span>
        <span>Invested</span>
        <span>Current Value</span>
        <span>Returns</span>
      </div>
      <div className="holding-row">
        <span className="holding-name">
          <b>MF</b>
          Mutual Funds
        </span>
        <span>₹2,00,000</span>
        <span>₹2,36,800</span>
        <strong className="investment-positive">+18.40%</strong>
      </div>
      <div className="holding-row">
        <span className="holding-name">
          <b>EQ</b>
          Stocks
        </span>
        <span>₹1,35,000</span>
        <span>₹1,58,850</span>
        <strong className="investment-positive">+17.67%</strong>
      </div>
      <div className="holding-row">
        <span className="holding-name">
          <b>FD</b>
          Fixed Deposits
        </span>
        <span>₹1,00,000</span>
        <span>₹1,07,500</span>
        <strong className="investment-positive">+7.50%</strong>
      </div>
      <div className="holding-row">
        <span className="holding-name">
          <b>GL</b>
          Digital Gold
        </span>
        <span>₹50,000</span>
        <span>₹69,300</span>
        <strong className="investment-positive">+38.60%</strong>
      </div>
    </div>
  </section>
  <section className="dashboard-panel investment-goal">
    <div>
      <span className="panel-label">INVESTMENT GOAL</span>
      <h3>Build ₹10 Lakh Portfolio</h3>
      <p>You're making good progress toward your target.</p>
    </div>
    <div className="goal-progress">
      <strong>57%</strong>
      <div>
        <span></span>
      </div>
      <small>₹5.72L of ₹10L</small>
    </div>
  </section>
</main>
    </div>
  );
}

export default Page;

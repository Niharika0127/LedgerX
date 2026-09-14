import { useEffect } from "react";
import { initLegacyApp } from "../../services/legacyApp.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";

function Page() {
  useEffect(() => {
    document.body.className = "";
    const timer = window.setTimeout(() => initLegacyApp(), 0);
    return () => {
        window.clearTimeout(timer);
        document.body.className = "";
    };
  }, []);
  return (
    <>
      <Navbar variant="home" />
      <header className="navbar">
  <div className="logo">
    <div className="logo-icon">L</div>
    <span>
      Ledger
      <span>X</span>
    </span>
  </div>
  <nav>
    <a href="#home">Home</a>
    <a href="#how">How It Works</a>
    <a href="#features">Features</a>
    <a href="#simulation">Simulation</a>
  </nav>
  <div className="nav-buttons">
    <a className="login-btn" href="/login">Log in</a>
    <a className="signup-btn" href="/register">Get Started</a>
  </div>
</header>
<section className="hero" id="home">
  <div className="hero-content">
    <div className="badge">
      <span className="dot"></span>
      Your Financial Future, Simulated
    </div>
    <h1>
      Meet Your
      <span>Financial Twin.</span>
    </h1>
    <p>LedgerX creates a digital version of your financial life
                and lets you explore how today's decisions could shape
                your financial future.</p>
    <div className="hero-buttons">
      <a className="primary-btn" href="/register">
        Build Your Financial Twin
        <span>→</span>
      </a>
      <a className="secondary-btn" href="#how">Explore LedgerX</a>
    </div>
    <div className="trust">
      <div className="avatars">
        <div>R</div>
        <div>A</div>
        <div>S</div>
        <div>+</div>
      </div>
      <p>Designed for smarter financial decisions</p>
    </div>
  </div>
  <div className="hero-dashboard">
    <div className="dashboard-top"><div>
        <span className="small-text">Financial Overview</span>
        <h3>Your Financial Twin</h3>
      </div></div>
    <div className="dashboard-cards">
      <div className="mini-card">
        <span>Net Worth</span>
        <h2>₹12.48L</h2>
        <small className="positive">↑ 8.42% this year</small>
      </div>
      <div className="mini-card">
        <span>Financial Health</span>
        <div className="health-score">
          <strong>82</strong>
          <span>/100</span>
        </div>
        <div className="progress"><div></div></div>
      </div>
    </div>
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <span>Net Worth Growth</span>
          <h3>₹12,48,000</h3>
        </div>
        <span className="year">1Y ▾</span>
      </div>
      <div className="chart">
        <div className="line line1"></div>
        <div className="line line2"></div>
        <div className="line line3"></div>
        <svg preserveAspectRatio="none" viewBox="0 0 500 180">
          <defs><linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#8b5cf6" stopOpacity=".35"></stop>
              <stop offset="100%" stop-color="#8b5cf6" stopOpacity="0"></stop>
            </linearGradient></defs>
          <path d="M0 150
                               C50 145 65 125 105 130
                               C145 135 160 100 205 108
                               C250 115 265 75 310 85
                               C350 95 365 55 405 65
                               C440 72 460 30 500 20
                               L500 180
                               L0 180 Z" fill="url(#chartGradient)"></path>
          <path d="M0 150
                               C50 145 65 125 105 130
                               C145 135 160 100 205 108
                               C250 115 265 75 310 85
                               C350 95 365 55 405 65
                               C440 72 460 30 500 20" fill="none" stroke="#9b7cff" strokeWidth="3"></path>
        </svg>
        <div className="chart-labels">
          <span>Jan</span>
          <span>Mar</span>
          <span>May</span>
          <span>Jul</span>
          <span>Sep</span>
          <span>Nov</span>
        </div>
      </div>
    </div>
    <div className="simulation-preview">
      <div>
        <span>Quick Simulation</span>
        <h3>What if I buy a car?</h3>
      </div>
      <button>Simulate →</button>
    </div>
  </div>
</section>
<section className="features-section" id="features">
  <div className="section-heading">
    <span className="section-tag">POWERFUL FEATURES</span>
    <h2>
      Understand your money.
      <span>Shape your future.</span>
    </h2>
    <p>LedgerX goes beyond tracking expenses.
                It helps you understand your entire financial ecosystem.</p>
  </div>
  <div className="features-grid">
    <div className="feature-card large">
      <div className="feature-icon">🧬</div>
      <h3>Financial Digital Twin</h3>
      <p>Build a living digital representation of your
                    income, expenses, assets, liabilities and goals.</p>
      <a href="#">Explore Digital Twin →</a>
    </div>
    <div className="feature-card">
      <div className="feature-icon">🧪</div>
      <h3>Simulation Lab</h3>
      <p>Test major financial decisions before making them.</p>
    </div>
    <div className="feature-card">
      <div className="feature-icon">🔮</div>
      <h3>Future Projection</h3>
      <p>See where your finances could be 1, 5 or 10 years
                    from now.</p>
    </div>
    <div className="feature-card">
      <div className="feature-icon">🤖</div>
      <h3>AI Financial Advisor</h3>
      <p>Get personalized insights based on your financial twin.</p>
    </div>
  </div>
</section>
<section className="simulation-section" id="simulation">
  <div className="simulation-text">
    <span className="section-tag">SIMULATION LAB</span>
    <h2>
      What happens if
      <span>everything changes?</span>
    </h2>
    <p>Life doesn't follow a fixed plan. LedgerX lets you
                experiment with different financial scenarios and
                understand their possible impact.</p>
    <a className="primary-btn" href="/register">Start Simulating →</a>
  </div>
  <div className="scenario-box">
    <div className="scenario-header">
      <span>SCENARIO</span>
      <span className="scenario-status">SIMULATING</span>
    </div>
    <h3>What if I buy a ₹12L car?</h3>
    <div className="scenario-values">
      <div>
        <span>Current Net Worth</span>
        <strong>₹12.48L</strong>
      </div>
      <div className="arrow">→</div>
      <div>
        <span>Projected Net Worth</span>
        <strong>₹9.84L</strong>
      </div>
    </div>
    <div className="impact">
      <span>Financial Health</span>
      <div className="impact-bar"><div></div></div>
      <strong>82 → 71</strong>
    </div>
  </div>
</section>
<section className="cta"><div className="cta-content">
    <span className="section-tag">YOUR FUTURE STARTS TODAY</span>
    <h2>
      Don't just manage money.
      <span>Understand it.</span>
    </h2>
    <p>Create your Financial Digital Twin and start exploring
                the decisions that shape your future.</p>
    <a className="primary-btn" href="/register">Create Your Financial Twin →</a>
  </div></section>
<footer>
  <div className="logo">
    <div className="logo-icon">L</div>
    <span>
      Ledger
      <span>X</span>
    </span>
  </div>
  <p>© 2026 LedgerX. Financial decisions, simulated smarter.</p>
  <div className="footer-links">
    <a href="#">Privacy</a>
    <a href="#">Terms</a>
    <a href="#">Contact</a>
  </div>
</footer>
    </>
  );
}

export default Page;

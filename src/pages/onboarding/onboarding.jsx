import { useEffect } from "react";
import { initLegacyApp } from "../../services/legacyApp.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";

function Page() {
  useEffect(() => {
    document.body.className = "onboarding-page";
    const timer = window.setTimeout(() => initLegacyApp(), 0);
    return () => {
        window.clearTimeout(timer);
        document.body.className = "";
    };
  }, []);
  return (
    <>
      <Navbar variant="onboarding" />
      <main className="onboarding-container">
  <div className="onboarding-progress">
    <div className="progress-info">
      <span>Financial Profile Setup</span>
      <strong>25%</strong>
    </div>
    <div className="onboarding-progress-bar"><div></div></div>
  </div>
  <div className="onboarding-heading">
    <div className="onboarding-badge">🧬 Build Your Financial Twin</div>
    <h1>
      Let's understand your
      <span>financial world.</span>
    </h1>
    <p>Tell us a little about your current finances.
                This information will help LedgerX create your
                personalized Financial Digital Twin.</p>
  </div>
  <section className="onboarding-card"><form>
      <div className="onboarding-section">
        <div className="onboarding-section-title">
          <span className="section-number">01</span>
          <div>
            <h2>Basic Information</h2>
            <p>Start with a few basic details.</p>
          </div>
        </div>
        <div className="onboarding-grid">
          <div className="onboarding-group">
            <label htmlFor="age">Age</label>
            <input id="age" placeholder="e.g. 25" type="number" />
          </div>
          <div className="onboarding-group">
            <label htmlFor="occupation">Occupation</label>
            <select id="occupation">
              <option value="">Select occupation</option>
              <option>Student</option>
              <option>Salaried Employee</option>
              <option>Business Owner</option>
              <option>Freelancer</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>
      <div className="onboarding-section">
        <div className="onboarding-section-title">
          <span className="section-number">02</span>
          <div>
            <h2>Monthly Income</h2>
            <p>Enter your approximate monthly income.</p>
          </div>
        </div>
        <div className="onboarding-group">
          <label htmlFor="income">Monthly Income</label>
          <div className="input-prefix">
            <span>₹</span>
            <input id="income" placeholder="50,000" type="number" />
          </div>
        </div>
      </div>
      <div className="onboarding-section">
        <div className="onboarding-section-title">
          <span className="section-number">03</span>
          <div>
            <h2>Monthly Expenses</h2>
            <p>How much do you usually spend every month?</p>
          </div>
        </div>
        <div className="onboarding-grid">
          <div className="onboarding-group">
            <label htmlFor="living">Living Expenses</label>
            <div className="input-prefix">
              <span>₹</span>
              <input id="living" placeholder="20,000" type="number" />
            </div>
          </div>
          <div className="onboarding-group">
            <label htmlFor="other-expenses">Other Expenses</label>
            <div className="input-prefix">
              <span>₹</span>
              <input id="other-expenses" placeholder="5,000" type="number" />
            </div>
          </div>
        </div>
      </div>
      <div className="onboarding-section">
        <div className="onboarding-section-title">
          <span className="section-number">04</span>
          <div>
            <h2>Assets & Savings</h2>
            <p>Give us an estimate of what you currently own.</p>
          </div>
        </div>
        <div className="onboarding-grid">
          <div className="onboarding-group">
            <label htmlFor="savings">Savings</label>
            <div className="input-prefix">
              <span>₹</span>
              <input id="savings" placeholder="1,00,000" type="number" />
            </div>
          </div>
          <div className="onboarding-group">
            <label htmlFor="investments">Investments</label>
            <div className="input-prefix">
              <span>₹</span>
              <input id="investments" placeholder="2,00,000" type="number" />
            </div>
          </div>
        </div>
      </div>
      <div className="onboarding-section">
        <div className="onboarding-section-title">
          <span className="section-number">05</span>
          <div>
            <h2>Liabilities & Debt</h2>
            <p>Add your current loans or outstanding debt.</p>
          </div>
        </div>
        <div className="onboarding-grid">
          <div className="onboarding-group">
            <label htmlFor="loans">Outstanding Loans</label>
            <div className="input-prefix">
              <span>₹</span>
              <input id="loans" placeholder="0" type="number" />
            </div>
          </div>
          <div className="onboarding-group">
            <label htmlFor="emi">Monthly EMI</label>
            <div className="input-prefix">
              <span>₹</span>
              <input id="emi" placeholder="0" type="number" />
            </div>
          </div>
        </div>
      </div>
      <div className="onboarding-section">
        <div className="onboarding-section-title">
          <span className="section-number">06</span>
          <div>
            <h2>Financial Goals</h2>
            <p>What are you currently planning for?</p>
          </div>
        </div>
        <div className="goal-options">
          <label className="goal-option">
            <input name="goal" type="checkbox" />
            <span>🚨 Emergency Fund</span>
          </label>
          <label className="goal-option">
            <input name="goal" type="checkbox" />
            <span>🚗 Buy a Car</span>
          </label>
          <label className="goal-option">
            <input name="goal" type="checkbox" />
            <span>🏠 Buy a House</span>
          </label>
          <label className="goal-option">
            <input name="goal" type="checkbox" />
            <span>🎓 Education</span>
          </label>
          <label className="goal-option">
            <input name="goal" type="checkbox" />
            <span>🌴 Retirement</span>
          </label>
          <label className="goal-option">
            <input name="goal" type="checkbox" />
            <span>📈 Wealth Creation</span>
          </label>
        </div>
      </div>
      <div className="onboarding-bottom">
        <p>🔒 Your financial information stays private.</p>
        <button className="onboarding-submit" type="submit">
          Create My Financial Twin
          <span>→</span>
        </button>
      </div>
    </form></section>
</main>
    </>
  );
}

export default Page;

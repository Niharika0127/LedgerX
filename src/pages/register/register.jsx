import { useEffect } from "react";
import { initLegacyApp } from "../../services/legacyApp.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";

function Page() {
  useEffect(() => {
    document.body.className = "register-page";
    const timer = window.setTimeout(() => initLegacyApp(), 0);
    return () => {
        window.clearTimeout(timer);
        document.body.className = "";
    };
  }, []);
  return (
    <>
      <Navbar variant="register" />
      <main className="register-container">
  <section className="register-info">
    <div className="register-badge">✨ Start Your Financial Journey</div>
    <h1>
      Build your
      <span>Financial Twin.</span>
    </h1>
    <p>Create your LedgerX account and start building
                a complete digital representation of your financial life.</p>
    <div className="register-features">
      <div className="register-feature">
        <div className="register-feature-icon">💰</div>
        <div>
          <h3>Track Everything</h3>
          <p>Income, expenses, assets, investments and debts.</p>
        </div>
      </div>
      <div className="register-feature">
        <div className="register-feature-icon">🧪</div>
        <div>
          <h3>Simulate Decisions</h3>
          <p>See how major financial decisions could affect you.</p>
        </div>
      </div>
      <div className="register-feature">
        <div className="register-feature-icon">🔮</div>
        <div>
          <h3>Plan Your Future</h3>
          <p>Project your financial position and goals.</p>
        </div>
      </div>
    </div>
  </section>
  <section className="register-card">
    <div className="register-heading">
      <h2>Create account</h2>
      <p>Start building your financial twin.</p>
    </div>
    <form>
      <div className="register-form-group">
        <label htmlFor="name">Full Name</label>
        <input id="name" placeholder="Enter your full name" required type="text" />
      </div>
      <div className="register-form-group">
        <label htmlFor="email">Email Address</label>
        <input id="email" placeholder="Enter your email" required type="email" />
      </div>
      <div className="register-form-row">
        <div className="register-form-group">
          <label htmlFor="password">Password</label>
          <input id="password" placeholder="Create password" required type="password" />
        </div>
        <div className="register-form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input id="confirm-password" placeholder="Confirm password" required type="password" />
        </div>
      </div>
      <label className="terms-check">
        <input required type="checkbox" />
        <span>
          I agree to the
          <a href="#">Terms of Service</a>
          and
          <a href="#">Privacy Policy</a>
        </span>
      </label>
      <button className="register-submit" type="submit">
        Create My Account
        <span>→</span>
      </button>
    </form>
    <div className="register-divider"><span>OR</span></div>
    <button className="google-register" type="button">
      <strong>G</strong>
      Continue with Google
    </button>
    <p className="register-login">
      Already have an account?
      <a href="/login">Sign in</a>
    </p>
  </section>
</main>
    </>
  );
}

export default Page;

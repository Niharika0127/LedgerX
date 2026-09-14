import { useEffect } from "react";
import { initLegacyApp } from "../../services/legacyApp.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";

function Page() {
  useEffect(() => {
    document.body.className = "login-page";
    const timer = window.setTimeout(() => initLegacyApp(), 0);
    return () => {
        window.clearTimeout(timer);
        document.body.className = "";
    };
  }, []);
  return (
    <>
      <Navbar variant="login" />
      <main className="login-container">
  <section className="login-content">
    <div className="login-badge">🔐 Secure Financial Access</div>
    <h1>
      Welcome back to
      <span>LedgerX.</span>
    </h1>
    <p>Sign in to access your Financial Digital Twin,
                track your finances and explore your financial future.</p>
    <div className="login-highlights">
      <div className="highlight-card">
        <div className="highlight-icon">🧬</div>
        <div>
          <h3>Financial Digital Twin</h3>
          <p>Your complete financial picture in one place.</p>
        </div>
      </div>
      <div className="highlight-card">
        <div className="highlight-icon">🧪</div>
        <div>
          <h3>Smart Simulations</h3>
          <p>Explore the impact of your financial decisions.</p>
        </div>
      </div>
      <div className="highlight-card">
        <div className="highlight-icon">🔮</div>
        <div>
          <h3>Future Projection</h3>
          <p>See where your current financial path can lead.</p>
        </div>
      </div>
    </div>
  </section>
  <section className="login-card">
    <div className="login-card-heading">
      <h2>Sign in</h2>
      <p>Enter your credentials to continue.</p>
    </div>
    <form>
      <div className="login-form-group">
        <label htmlFor="email">Email Address</label>
        <input id="email" placeholder="Enter your email" required type="email" />
      </div>
      <div className="login-form-group">
        <div className="password-label">
          <label htmlFor="password">Password</label>
          <a href="#">Forgot password?</a>
        </div>
        <input id="password" placeholder="Enter your password" required type="password" />
      </div>
      <label className="remember-me">
        <input type="checkbox" />
        <span>Remember me</span>
      </label>
      <button className="login-submit" type="submit">
        Sign In
        <span>→</span>
      </button>
    </form>
    <div className="login-divider"><span>OR</span></div>
    <button className="google-login" type="button">
      <strong>G</strong>
      Continue with Google
    </button>
    <p className="login-register">
      Don't have an account?
      <a href="/register">Create one</a>
    </p>
  </section>
</main>
    </>
  );
}

export default Page;

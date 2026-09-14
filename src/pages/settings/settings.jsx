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
    <div className="dashboard-page"><Sidebar activePage="settings" />
      <main className="dashboard-main">
  <header className="dashboard-header">
    <div>
      <p className="dashboard-date">ACCOUNT SETTINGS</p>
      <h1>
        Settings
        <span>& Preferences</span>
      </h1>
    </div>
    <div className="dashboard-profile">
      <div className="notification">🔔</div>
      <div className="profile-avatar">U</div>
    </div>
  </header>
  <section className="settings-layout">
    <div className="settings-nav dashboard-panel">
      <h3>Settings</h3>
      <a className="settings-nav-link active" href="#profile">👤 Profile</a>
      <a className="settings-nav-link" href="#security">🔐 Security</a>
      <a className="settings-nav-link" href="#preferences">🎨 Preferences</a>
      <a className="settings-nav-link" href="#notifications">🔔 Notifications</a>
    </div>
    <div className="settings-content">
      <div className="dashboard-panel settings-section" id="profile">
        <div className="settings-heading">
          <div>
            <span className="panel-label">PROFILE</span>
            <h3>Personal Information</h3>
          </div>
          <button className="settings-edit">Edit</button>
        </div>
        <div className="profile-settings">
          <div className="settings-avatar">U</div>
          <div>
            <strong>Your Name</strong>
            <span>yourname@email.com</span>
          </div>
        </div>
        <div className="settings-fields">
          <div>
            <label>Full Name</label>
            <input type="text" value="Your Name" />
          </div>
          <div>
            <label>Email Address</label>
            <input type="email" value="yourname@email.com" />
          </div>
          <div>
            <label>Phone Number</label>
            <input type="text" value="+91 XXXXX XXXXX" />
          </div>
          <div>
            <label>Currency</label>
            <select>
              <option>Indian Rupee (₹)</option>
              <option>US Dollar ($)</option>
              <option>Euro (€)</option>
            </select>
          </div>
        </div>
        <button className="settings-save">Save Changes</button>
      </div>
      <div className="dashboard-panel settings-section" id="security">
        <div className="settings-heading"><div>
            <span className="panel-label">SECURITY</span>
            <h3>Password & Security</h3>
          </div></div>
        <div className="setting-row">
          <div>
            <strong>Change Password</strong>
            <span>Update your account password regularly.</span>
          </div>
          <button className="settings-outline">Change</button>
        </div>
        <div className="setting-row">
          <div>
            <strong>Two-Factor Authentication</strong>
            <span>Add an extra layer of protection.</span>
          </div>
          <label className="switch">
            <input type="checkbox" />
            <span></span>
          </label>
        </div>
      </div>
      <div className="dashboard-panel settings-section" id="preferences">
        <div className="settings-heading"><div>
            <span className="panel-label">PREFERENCES</span>
            <h3>App Preferences</h3>
          </div></div>
        <div className="setting-row">
          <div>
            <strong>Dark Mode</strong>
            <span>Change the appearance of LedgerX.</span>
          </div>
          <label className="switch">
            <input type="checkbox" />
            <span></span>
          </label>
        </div>
        <div className="setting-row">
          <div>
            <strong>Compact Dashboard</strong>
            <span>Show more information in less space.</span>
          </div>
          <label className="switch">
            <input checked type="checkbox" />
            <span></span>
          </label>
        </div>
      </div>
      <div className="dashboard-panel settings-section" id="notifications">
        <div className="settings-heading"><div>
            <span className="panel-label">NOTIFICATIONS</span>
            <h3>Notification Preferences</h3>
          </div></div>
        <div className="setting-row">
          <div>
            <strong>Financial Alerts</strong>
            <span>Get alerts about unusual spending and risks.</span>
          </div>
          <label className="switch">
            <input checked type="checkbox" />
            <span></span>
          </label>
        </div>
        <div className="setting-row">
          <div>
            <strong>Goal Reminders</strong>
            <span>Receive reminders about your financial goals.</span>
          </div>
          <label className="switch">
            <input checked type="checkbox" />
            <span></span>
          </label>
        </div>
      </div>
    </div>
  </section>
</main>
    </div>
  );
}

export default Page;

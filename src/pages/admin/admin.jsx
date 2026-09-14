import { useEffect } from "react";
import { initLegacyApp } from "../../services/legacyApp.jsx";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";

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
    <div className="dashboard-page"><AdminSidebar />
      <main className="dashboard-main">
  <header className="dashboard-header">
    <div>
      <p className="dashboard-date">ADMIN CONTROL CENTER</p>
      <h1>
        System
        <span>Overview</span>
      </h1>
    </div>
    <div className="dashboard-profile">
      <div className="notification">🔔</div>
      <div className="profile-avatar">A</div>
    </div>
  </header>
  <section className="admin-stats">
    <div className="dashboard-panel admin-stat-card">
      <span>Total Users</span>
      <h2>2,481</h2>
      <p className="admin-positive">↑ 12.4% this month</p>
    </div>
    <div className="dashboard-panel admin-stat-card">
      <span>Active Users</span>
      <h2>1,842</h2>
      <p className="admin-positive">↑ 8.7% this month</p>
    </div>
    <div className="dashboard-panel admin-stat-card">
      <span>Simulations</span>
      <h2>8,936</h2>
      <p className="admin-positive">↑ 18.2% this month</p>
    </div>
    <div className="dashboard-panel admin-stat-card">
      <span>System Health</span>
      <h2>99.8%</h2>
      <p className="admin-positive">All systems operational</p>
    </div>
  </section>
  <section className="admin-grid">
    <div className="dashboard-panel admin-chart" id="activity">
      <div className="admin-panel-header">
        <div>
          <span className="panel-label">USER ACTIVITY</span>
          <h3>Platform Usage</h3>
        </div>
        <span className="admin-period">Last 30 Days</span>
      </div>
      <div className="admin-bars">
        <div className="admin-bar">
          <span style={{height: "45%"}}></span>
          <small>1</small>
        </div>
        <div className="admin-bar">
          <span style={{height: "60%"}}></span>
          <small>5</small>
        </div>
        <div className="admin-bar">
          <span style={{height: "50%"}}></span>
          <small>10</small>
        </div>
        <div className="admin-bar">
          <span style={{height: "78%"}}></span>
          <small>15</small>
        </div>
        <div className="admin-bar">
          <span style={{height: "65%"}}></span>
          <small>20</small>
        </div>
        <div className="admin-bar">
          <span style={{height: "88%"}}></span>
          <small>25</small>
        </div>
        <div className="admin-bar">
          <span style={{height: "95%"}}></span>
          <small>30</small>
        </div>
      </div>
    </div>
    <div className="dashboard-panel admin-actions">
      <div className="admin-panel-header"><div>
          <span className="panel-label">QUICK ACTIONS</span>
          <h3>Manage Platform</h3>
        </div></div>
      <button className="admin-action-btn">
        👥 Manage Users
        <span>→</span>
      </button>
      <button className="admin-action-btn">
        📊 View Analytics
        <span>→</span>
      </button>
      <button className="admin-action-btn">
        📄 Generate Report
        <span>→</span>
      </button>
      <button className="admin-action-btn">
        ⚙️ System Settings
        <span>→</span>
      </button>
    </div>
  </section>
  <section className="dashboard-panel users-panel" id="users">
    <div className="admin-panel-header">
      <div>
        <span className="panel-label">USER MANAGEMENT</span>
        <h3>Recent Users</h3>
      </div>
      <button className="settings-outline">View All Users</button>
    </div>
    <div className="users-table">
      <div className="user-row user-heading">
        <span>User</span>
        <span>Email</span>
        <span>Status</span>
        <span>Joined</span>
      </div>
      <div className="user-row">
        <span className="user-name">
          <b>RK</b>
          Rahul Kumar
        </span>
        <span>rahul@example.com</span>
        <span className="status active-status">Active</span>
        <span>Aug 29, 2026</span>
      </div>
      <div className="user-row">
        <span className="user-name">
          <b>AS</b>
          Ananya Sharma
        </span>
        <span>ananya@example.com</span>
        <span className="status active-status">Active</span>
        <span>Aug 28, 2026</span>
      </div>
      <div className="user-row">
        <span className="user-name">
          <b>VS</b>
          Vikram Singh
        </span>
        <span>vikram@example.com</span>
        <span className="status pending-status">Pending</span>
        <span>Aug 27, 2026</span>
      </div>
      <div className="user-row">
        <span className="user-name">
          <b>PM</b>
          Priya Mehta
        </span>
        <span>priya@example.com</span>
        <span className="status active-status">Active</span>
        <span>Aug 26, 2026</span>
      </div>
    </div>
  </section>
  <section className="dashboard-panel system-panel" id="system">
    <div className="admin-panel-header"><div>
        <span className="panel-label">SYSTEM STATUS</span>
        <h3>Platform Services</h3>
      </div></div>
    <div className="system-services">
      <div>
        <span className="service-dot"></span>
        <strong>Database</strong>
        <small>Operational</small>
      </div>
      <div>
        <span className="service-dot"></span>
        <strong>Authentication</strong>
        <small>Operational</small>
      </div>
      <div>
        <span className="service-dot"></span>
        <strong>Simulation Engine</strong>
        <small>Operational</small>
      </div>
      <div>
        <span className="service-dot"></span>
        <strong>AI Advisor</strong>
        <small>Operational</small>
      </div>
    </div>
  </section>
</main>
    </div>
  );
}

export default Page;

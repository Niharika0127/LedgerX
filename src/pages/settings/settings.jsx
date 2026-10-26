
import React, { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';

export default function Settings() {
  const { profile, preferences, updateProfile, updatePreferences } = useFinance();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currency: 'INR',
    theme: 'dark',
    motion: 'system',
    notifications: true
  });

  const [feedback, setFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    if (profile && preferences) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        currency: profile.currency || 'INR',
        theme: preferences.theme || 'dark',
        motion: preferences.motion || 'system',
        notifications: preferences.notifications ?? true
      });
    }
  }, [profile, preferences]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });

    if (!formData.name.trim()) {
      setFeedback({
        type: 'error',
        message: 'Name cannot be empty.'
      });
      return;
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      setFeedback({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    updateProfile({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      currency: formData.currency
    });

    updatePreferences({
      theme: formData.theme,
      motion: formData.motion,
      notifications: formData.notifications
    });

    setIsEditing(false);

    setFeedback({
      type: 'success',
      message: 'Settings updated successfully!'
    });

    window.setTimeout(() => {
      setFeedback({ type: '', message: '' });
    }, 4000);
  };

  const handleCancel = () => {
    if (profile && preferences) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        currency: profile.currency || 'INR',
        theme: preferences.theme || 'dark',
        motion: preferences.motion || 'system',
        notifications: preferences.notifications ?? true
      });
    }

    setFeedback({ type: '', message: '' });
    setIsEditing(false);
  };

  return (
    <div className="dashboard-page">
      <Sidebar activePage="settings" />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-date">ACCOUNT SETTINGS</p>
            <h1>
              Settings
              <span> & Preferences</span>
            </h1>
            <p className="settings-subtitle">
              Manage your profile details and app preferences.
            </p>
          </div>

          <div className="dashboard-profile">
            <div className="notification" aria-label="Notifications">
              🔔
            </div>
            <div className="profile-avatar">
              {(formData.name.trim().charAt(0) || 'U').toUpperCase()}
            </div>
          </div>
        </header>

        {feedback.message && (
          <div
            className={`settings-feedback ${feedback.type}`}
            role="status"
          >
            {feedback.message}
          </div>
        )}

        <section className="settings-layout">
          <div className="settings-nav dashboard-panel">
            <h3>Settings</h3>

            <a className="settings-nav-link active" href="#profile">
              👤 Profile
            </a>

            <a className="settings-nav-link" href="#security">
              🔐 Security
            </a>

            <a className="settings-nav-link" href="#preferences">
              🎨 Preferences
            </a>

            <a className="settings-nav-link" href="#notifications">
              🔔 Notifications
            </a>
          </div>

          <div className="settings-content">
            <form onSubmit={handleSave}>
              <section
                className="dashboard-panel settings-section"
                id="profile"
              >
                <div className="settings-heading">
                  <div>
                    <span className="panel-label">PROFILE</span>
                    <h3>Personal Information</h3>
                  </div>

                  {!isEditing && (
                    <button
                      type="button"
                      className="settings-edit"
                      onClick={() => {
                        setFeedback({ type: '', message: '' });
                        setIsEditing(true);
                      }}
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                <div className="profile-settings">
                  <div className="settings-avatar">
                    {(formData.name.trim().charAt(0) || 'U').toUpperCase()}
                  </div>

                  <div>
                    <strong>{formData.name || 'Your Name'}</strong>
                    <span>{formData.email || 'Add your email address'}</span>
                  </div>
                </div>

                <div className="settings-fields">
                  <div>
                    <label htmlFor="settings-name">Full Name</label>
                    <input
                      id="settings-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="settings-email">Email Address</label>
                    <input
                      id="settings-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="settings-phone">Phone Number</label>
                    <input
                      id="settings-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="settings-currency">Currency</label>
                    <select
                      id="settings-currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      disabled={!isEditing}
                    >
                      <option value="INR">Indian Rupee (₹)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </div>
                </div>
              </section>

              <section
                className="dashboard-panel settings-section"
                id="security"
              >
                <div className="settings-heading">
                  <div>
                    <span className="panel-label">SECURITY</span>
                    <h3>Password & Security</h3>
                  </div>
                </div>

                <div className="setting-row">
                  <div>
                    <strong>Account Security</strong>
                    <span>
                      Keep your account information and login details secure.
                    </span>
                  </div>

                  <span className="settings-status">Protected</span>
                </div>

                <div className="setting-row">
                  <div>
                    <strong>Contact Information</strong>
                    <span>
                      Keep your email address and phone number up to date.
                    </span>
                  </div>

                  <button
                    type="button"
                    className="settings-outline"
                    onClick={() => {
                      setFeedback({ type: '', message: '' });
                      setIsEditing(true);
                      document.getElementById('profile')?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }}
                  >
                    Edit Profile
                  </button>
                </div>
              </section>

              <section
                className="dashboard-panel settings-section"
                id="preferences"
              >
                <div className="settings-heading">
                  <div>
                    <span className="panel-label">PREFERENCES</span>
                    <h3>App Preferences</h3>
                  </div>
                </div>

                <div className="settings-fields">
                  <div>
                    <label htmlFor="settings-theme">Theme</label>
                    <select
                      id="settings-theme"
                      name="theme"
                      value={formData.theme}
                      onChange={handleChange}
                      disabled={!isEditing}
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="settings-motion">
                      Motion / Animations
                    </label>
                    <select
                      id="settings-motion"
                      name="motion"
                      value={formData.motion}
                      onChange={handleChange}
                      disabled={!isEditing}
                    >
                      <option value="system">System Default</option>
                      <option value="reduced">Reduced Motion</option>
                      <option value="enhanced">Enhanced Animations</option>
                    </select>
                  </div>
                </div>

                <div className="setting-row">
                  <div>
                    <strong>Appearance Preferences</strong>
                    <span>
                      Choose the appearance and animation preferences for your
                      LedgerX experience.
                    </span>
                  </div>

                  <span className="settings-status">
                    {formData.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </span>
                </div>
              </section>

              <section
                className="dashboard-panel settings-section"
                id="notifications"
              >
                <div className="settings-heading">
                  <div>
                    <span className="panel-label">NOTIFICATIONS</span>
                    <h3>Notification Preferences</h3>
                  </div>
                </div>

                <div className="setting-row">
                  <div>
                    <strong>Financial Alerts</strong>
                    <span>
                      Enable system notifications and alerts about financial
                      activity and potential risks.
                    </span>
                  </div>

                  <label className="switch">
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={formData.notifications}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <span></span>
                  </label>
                </div>

                <div className="setting-row">
                  <div>
                    <strong>Notification Status</strong>
                    <span>
                      {formData.notifications
                        ? 'Financial notifications are enabled.'
                        : 'Financial notifications are disabled.'}
                    </span>
                  </div>

                  <span className="settings-status">
                    {formData.notifications ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </section>

              {isEditing && (
                <div className="settings-actions">
                  <button
                    type="button"
                    className="settings-outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="settings-save">
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}


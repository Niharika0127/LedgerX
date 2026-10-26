
import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function Loans() {
  const { financeData, updateFinanceData, profile } = useFinance();
  const liabilities = financeData.loans || [];
  const currencySymbol = profile?.currency === 'USD' ? '$' : '₹';

  const [form, setForm] = useState({
    name: '',
    balance: '',
    monthlyEmi: '',
    interestRate: ''
  });

  const handleAdd = (e) => {
    e.preventDefault();

    if (!form.name.trim() || form.balance === '' || Number(form.balance) < 0) return;

    const loan = {
      id: Date.now().toString(),
      name: form.name.trim(),
      balance: Number(form.balance),
      monthlyEmi: Number(form.monthlyEmi || 0),
      interestRate: Number(form.interestRate || 0)
    };

    updateFinanceData((current) => ({ ...current, loans: [...current.loans, loan] }));

    setForm({
      name: '',
      balance: '',
      monthlyEmi: '',
      interestRate: ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Kya aap is loan record ko delete karna chahte hain?')) {
      updateFinanceData((current) => ({ ...current, loans: current.loans.filter((item) => item.id !== id) }));
    }
  };

  const totalDebt = liabilities.reduce(
    (total, item) => total + Number(item.balance || 0),
    0
  );

  const totalEmi = liabilities.reduce(
    (total, item) => total + Number(item.monthlyEmi || 0),
    0
  );

  const weightedInterest = totalDebt > 0
    ? liabilities.reduce(
        (total, item) =>
          total + Number(item.balance || 0) * Number(item.interestRate || 0),
        0
      ) / totalDebt
    : 0;

  const panelStyle = {
    background: 'rgba(255, 255, 255, 0.48)',
    border: '1px solid rgba(255, 255, 255, 0.75)',
    borderRadius: '16px',
    padding: '22px',
    boxShadow: '0 8px 24px rgba(24, 35, 51, 0.06)',
    minWidth: 0,
    boxSizing: 'border-box'
  };

  const inputStyle = {
    width: '100%',
    minWidth: 0,
    height: '42px',
    padding: '0 12px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.65)',
    border: '1px solid rgba(116, 84, 217, 0.22)',
    color: '#182333',
    fontSize: '12px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    color: '#182333',
    fontSize: '11px',
    fontWeight: 600,
    marginBottom: '8px'
  };

  const mutedStyle = {
    color: '#64748b'
  };

  const formatMoney = (amount) =>
    Number(amount || 0).toLocaleString('en-IN', {
      maximumFractionDigits: 2
    });

  return (
    <div className="dashboard-page loans-page">
      <Sidebar activePage="loans" />

      <main className="dashboard-main loans-main">
        <Navbar />

        <div className="loans-content">
          {/* Header */}
          <header className="dashboard-header loans-header">
            <div>
              <p className="dashboard-date">LIABILITIES & PAYOFF STRATEGY</p>
              <h1>
                Loans & <span>Debt</span> 🏦
              </h1>
              <p className="loans-subtitle">
                Track loans and monthly EMI commitments.
              </p>
            </div>
          </header>

          {/* Summary Cards */}
          <section className="dashboard-summary loans-summary">
            <div className="summary-card">
              <div className="summary-card-top">
                <span>TOTAL OUTSTANDING DEBT</span>
                <span className="summary-icon">📉</span>
              </div>
              <h2>{currencySymbol}{formatMoney(totalDebt)}</h2>
              <p className="expense-text">
                Active balance across {liabilities.length}{' '}
                {liabilities.length === 1 ? 'account' : 'accounts'}
              </p>
            </div>

            <div className="summary-card">
              <div className="summary-card-top">
                <span>MONTHLY EMI OBLIGATION</span>
                <span className="summary-icon">🗓️</span>
              </div>
              <h2>{currencySymbol}{formatMoney(totalEmi)} <small>/ mo</small></h2>
              <p className="positive">Total monthly repayment</p>
            </div>

            <div className="summary-card">
              <div className="summary-card-top">
                <span>WEIGHTED AVG INTEREST</span>
                <span className="summary-icon">⚡</span>
              </div>
              <h2>{weightedInterest.toFixed(2)}%</h2>
              <p className="positive">Weighted by outstanding balance</p>
            </div>

            <div className="summary-card">
              <div className="summary-card-top">
                <span>ACTIVE LIABILITIES</span>
                <span className="summary-icon">🎯</span>
              </div>
              <h2>{liabilities.length}</h2>
              <p className="positive">Recorded loan accounts</p>
            </div>
          </section>

          {/* Add Loan Form */}
          <section className="dashboard-panel loans-form-panel">
            <div className="panel-header">
              <div>
                <span className="panel-label">LOAN MANAGEMENT</span>
                <h3>Add New Loan</h3>
              </div>
            </div>

            <form className="loans-form" onSubmit={handleAdd}>
              <div className="loans-field">
                <label style={labelStyle} htmlFor="loan-name">Loan Name *</label>
                <input
                  id="loan-name"
                  type="text"
                  placeholder="e.g. Home Loan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>

              <div className="loans-field">
                <label style={labelStyle} htmlFor="loan-balance">Outstanding Balance *</label>
                <input
                  id="loan-balance"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Balance"
                  value={form.balance}
                  onChange={(e) => setForm({ ...form, balance: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>

              <div className="loans-field">
                <label style={labelStyle} htmlFor="loan-emi">Monthly EMI</label>
                <input
                  id="loan-emi"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Monthly EMI"
                  value={form.monthlyEmi}
                  onChange={(e) => setForm({ ...form, monthlyEmi: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div className="loans-field">
                <label style={labelStyle} htmlFor="loan-interest">Interest (%)</label>
                <input
                  id="loan-interest"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Rate %"
                  value={form.interestRate}
                  onChange={(e) => setForm({ ...form, interestRate: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <button className="loans-add-btn" type="submit">
                + Add Loan
              </button>
            </form>
          </section>

          {/* Liability Breakdown */}
          <section className="dashboard-panel loans-list-panel">
            <div className="panel-header">
              <div>
                <span className="panel-label">ACTIVE ACCOUNTS</span>
                <h3>Liability Breakdown</h3>
              </div>
              <span className="loans-count">{liabilities.length} Records</span>
            </div>

            {liabilities.length === 0 ? (
              <div className="loans-empty">
                <span>🏦</span>
                <h4>No Active Loans</h4>
                <p>Add your first loan using the form above.</p>
              </div>
            ) : (
              <div className="loans-list">
                {liabilities.map((item) => (
                  <div className="loans-item" key={item.id}>
                    <div className="loans-item-info">
                      <div className="loans-item-icon">🏦</div>
                      <div className="loans-item-details">
                        <div className="loans-item-title">
                          <strong>{item.name}</strong>
                          {Number(item.interestRate) > 0 && (
                            <span className="loans-interest">
                              {item.interestRate}% Interest
                            </span>
                          )}
                        </div>
                        <p>
                          {Number(item.monthlyEmi) > 0
                            ? `Monthly EMI: ${currencySymbol}${formatMoney(item.monthlyEmi)}/mo`
                            : 'No monthly EMI recorded'}
                        </p>
                      </div>
                    </div>

                    <div className="loans-item-right">
                      <div className="loans-balance">
                        <span>OUTSTANDING</span>
                        <strong>{currencySymbol}{formatMoney(item.balance)}</strong>
                      </div>
                      <button
                        className="loans-delete-btn"
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        aria-label={`Delete ${item.name}`}
                        title="Delete loan"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <style>{`
        .loans-page {
          display: flex;
          min-height: 100vh;
          width: 100%;
          background: rgb(188, 222, 228);
          color: #182333;
          box-sizing: border-box;
        }

        .loans-page *,
        .loans-page *::before,
        .loans-page *::after {
          box-sizing: border-box;
        }

        .loans-page .loans-main {
          flex: 1 1 0;
          width: 0;
          min-width: 0;
          max-width: 100%;
          background: rgb(188, 222, 228);
          color: #182333;
        }

        .loans-content {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          padding: 24px;
          margin: 0;
        }

        .loans-header {
          margin-bottom: 24px;
        }

        .loans-page .dashboard-header h1 {
          color: #182333;
          font-size: 28px;
        }

        .loans-page .dashboard-header h1 span {
          color: #7454d9;
        }

        .loans-subtitle {
          color: #64748b;
          font-size: 12px;
          margin-top: 8px;
        }

        .loans-page .loans-summary {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 24px;
          width: 100%;
          min-width: 0;
        }

        .loans-page .summary-card,
        .loans-page .dashboard-panel {
          min-width: 0;
          background: rgba(255, 255, 255, 0.48);
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(24, 35, 51, 0.06);
          color: #182333;
        }

        .loans-page .summary-card {
          padding: 18px;
        }

        .loans-page .summary-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        .loans-page .summary-card-top > span:first-child {
          color: #64748b;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .loans-page .summary-card h2 {
          color: #182333;
          font-size: clamp(17px, 1.6vw, 23px);
          overflow-wrap: anywhere;
          margin: 16px 0 8px;
        }

        .loans-page .summary-card h2 small {
          font-size: 11px;
          color: #64748b;
        }

        .loans-page .summary-card p {
          font-size: 11px;
          margin: 0;
          overflow-wrap: anywhere;
        }

        .loans-page .expense-text {
          color: #64748b;
        }

        .loans-page .positive {
          color: #5967bd;
        }

        .loans-page .dashboard-panel {
          padding: 22px;
          margin-bottom: 24px;
        }

        .loans-page .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .loans-page .panel-label {
          color: #7454d9;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 1.1px;
        }

        .loans-page .panel-header h3 {
          color: #182333;
          font-size: 18px;
          font-weight: 700;
          margin: 7px 0 0;
        }

        .loans-page .loans-form {
          display: grid;
          grid-template-columns: minmax(0, 1.6fr) repeat(2, minmax(0, 1fr)) minmax(95px, 0.8fr) auto;
          align-items: end;
          gap: 12px;
          width: 100%;
          min-width: 0;
        }

        .loans-page .loans-field {
          min-width: 0;
        }

        .loans-page .loans-field input {
          font-family: inherit;
          max-width: 100%;
        }

        .loans-page .loans-field input:focus {
          border-color: #7454d9 !important;
          box-shadow: 0 0 0 3px rgba(116, 84, 217, 0.12);
        }

        .loans-page .loans-add-btn {
          min-height: 42px;
          padding: 0 17px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #7454d9, #8b5cf6);
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(116, 84, 217, 0.2);
        }

        .loans-page .loans-add-btn:hover {
          filter: brightness(1.06);
        }

        .loans-page .loans-count {
          padding: 6px 10px;
          border: 1px solid rgba(116, 84, 217, 0.16);
          border-radius: 7px;
          background: rgba(255, 255, 255, 0.45);
          color: #64748b;
          font-size: 11px;
        }

        .loans-page .loans-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .loans-page .loans-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          padding: 14px 16px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.4);
          min-width: 0;
        }

        .loans-page .loans-item-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1 1 200px;
          min-width: 0;
        }

        .loans-page .loans-item-icon {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(116,84, 217, 0.12);
          color: #7454d9;
          font-size: 18px;
        }

        .loans-page .loans-item-details {
          min-width: 0;
        }

        .loans-page .loans-item-title {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }

        .loans-page .loans-item-title strong {
          color: #182333;
          font-size: 13px;
          overflow-wrap: anywhere;
        }

        .loans-page .loans-interest {
          padding: 4px 7px;
          border-radius: 5px;
          background: rgba(116, 84, 217, 0.1);
          color: #7454d9;
          font-size: 10px;
          font-weight: 600;
        }

        .loans-page .loans-item-details p {
          margin: 6px 0 0;
          color: #64748b;
          font-size: 11px;
        }

        .loans-page .loans-item-right {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }

        .loans-page .loans-balance {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
        }

        .loans-page .loans-balance span {
          color: #64748b;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .loans-page .loans-balance strong {
          color: #182333;
          font-size: 14px;
        }

        .loans-page .loans-delete-btn {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(220, 70, 90, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.55);
          color: #d14359;
          cursor: pointer;
          font-size: 13px;
        }

        .loans-page .loans-delete-btn:hover {
          background: rgba(220, 70, 90, 0.1);
        }

        .loans-page .loans-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 38px 16px;
          text-align: center;
        }

        .loans-page .loans-empty > span {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          border-radius: 15px;
          background: rgba(116, 84, 217, 0.1);
          font-size: 25px;
          margin-bottom: 12px;
        }

        .loans-page .loans-empty h4 {
          color: #182333;
          font-size: 15px;
          margin: 0 0 7px;
        }

        .loans-page .loans-empty p {
          color: #64748b;
          font-size: 12px;
          margin: 0;
        }

        @media (max-width: 1200px) {
          .loans-page .loans-summary {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .loans-page .loans-form {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .loans-page .loans-add-btn {
            width: 100%;
          }
        }

        @media (max-width: 650px) {
          .loans-page .loans-content {
            padding: 16px;
          }

          .loans-page .loans-summary {
            grid-template-columns: minmax(0, 1fr);
          }

          .loans-page .loans-form {
            grid-template-columns: minmax(0, 1fr);
          }

          .loans-page .dashboard-panel {
            padding: 16px;
          }

          .loans-page .loans-item {
            align-items: flex-start;
          }

          .loans-page .loans-item-right {
            width: 100%;
            justify-content: space-between;
          }

          .loans-page .loans-balance {
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

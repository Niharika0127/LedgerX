
import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';

function Page() {
  const { financeData, updateFinanceData, profile } = useFinance();
  const incomeSources = financeData.income || [];
  const expenseCategories = financeData.expenses || [];

  const currencySymbol = profile?.currency === 'USD' ? '$' : '₹';

  const [incomeForm, setIncomeForm] = useState({
    name: '',
    amount: '',
    frequency: 'monthly'
  });

  const [expenseForm, setExpenseForm] = useState({
    name: '',
    amount: '',
    frequency: 'monthly'
  });

  const handleAddIncome = (e) => {
    e.preventDefault();

    if (!incomeForm.name.trim() || !incomeForm.amount) return;

    const newIncome = {
      id: Date.now().toString(),
      name: incomeForm.name.trim(),
      amount: parseFloat(incomeForm.amount),
      frequency: incomeForm.frequency
    };

    updateFinanceData((current) => ({ ...current, income: [...current.income, newIncome] }));
    setIncomeForm({ name: '', amount: '', frequency: 'monthly' });
  };

  const handleDeleteIncome = (id) => {
    if (window.confirm('Are you sure you want to delete this income source?')) {
      updateFinanceData((current) => ({ ...current, income: current.income.filter((item) => item.id !== id) }));
    }
  };

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!expenseForm.name.trim() || !expenseForm.amount) return;

    const newExpense = {
      id: Date.now().toString(),
      name: expenseForm.name.trim(),
      amount: parseFloat(expenseForm.amount),
      frequency: expenseForm.frequency
    };

    updateFinanceData((current) => ({ ...current, expenses: [...current.expenses, newExpense] }));
    setExpenseForm({ name: '', amount: '', frequency: 'monthly' });
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this expense category?')) {
      updateFinanceData((current) => ({ ...current, expenses: current.expenses.filter((item) => item.id !== id) }));
    }
  };

  const inputStyle = {
    padding: '8px 12px',
    borderRadius: '6px',
    background: 'rgba(255, 255, 255, 0.65)',
    border: '1px solid rgba(24, 35, 51, 0.18)',
    color: '#182333',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const selectStyle = {
    padding: '8px 12px',
    borderRadius: '6px',
    background: 'rgba(255, 255, 255, 0.65)',
    border: '1px solid rgba(24, 35, 51, 0.18)',
    color: '#182333',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    padding: '8px',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 600,
    cursor: 'pointer'
  };

  const deleteButtonStyle = {
    background: 'transparent',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    fontSize: '14px'
  };

  return (
    <div className="dashboard-page">
      <Sidebar activePage="finances" />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-date">FINANCIAL OVERVIEW & BREAKDOWN</p>
            <h1>
              My <span>Finances</span> 💳
            </h1>
          </div>

          <div className="dashboard-profile">
            <div className="notification">🔔</div>
          </div>
        </header>

        <section className="dashboard-summary">
          <div className="summary-card">
            <div className="summary-card-top">
              <span>TOTAL INCOME SOURCES</span>
              <span className="summary-icon">💵</span>
            </div>
            <h2>
              {currencySymbol}
              {incomeSources
                .reduce((sum, item) => sum + Number(item.amount || 0), 0)
                .toLocaleString('en-IN')}
            </h2>
            <p className="positive">
              Across {incomeSources.length} income sources
            </p>
          </div>

          <div className="summary-card">
            <div className="summary-card-top">
              <span>TOTAL EXPENSES</span>
              <span className="summary-icon">📉</span>
            </div>
            <h2>
              {currencySymbol}
              {expenseCategories
                .reduce((sum, item) => sum + Number(item.amount || 0), 0)
                .toLocaleString('en-IN')}
            </h2>
            <p className="expense-text">
              Across {expenseCategories.length} categories
            </p>
          </div>

          <div className="summary-card">
            <div className="summary-card-top">
              <span>MONTHLY INCOME</span>
              <span className="summary-icon">📈</span>
            </div>
            <h2>
              {incomeSources.filter((item) => item.frequency === 'monthly').length}
            </h2>
            <p className="positive">Monthly income sources</p>
          </div>

          <div className="summary-card">
            <div className="summary-card-top">
              <span>MONTHLY EXPENSES</span>
              <span className="summary-icon">💳</span>
            </div>
            <h2>
              {expenseCategories.filter((item) => item.frequency === 'monthly').length}
            </h2>
            <p className="expense-text">Monthly expense categories</p>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <span className="panel-label">INFLOW</span>
                <h3>Income Sources</h3>
              </div>
              <span className="positive">+ Income</span>
            </div>

            <form
              onSubmit={handleAddIncome}
              style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginBottom: '20px'
              }}
            >
              <input
                type="text"
                placeholder="Source (e.g. Salary, Freelance)"
                value={incomeForm.name}
                onChange={(e) =>
                  setIncomeForm({ ...incomeForm, name: e.target.value })
                }
                style={inputStyle}
                required
              />

              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="number"
                  placeholder="Amount"
                  value={incomeForm.amount}
                  onChange={(e) =>
                    setIncomeForm({ ...incomeForm, amount: e.target.value })
                  }
                  style={{ ...inputStyle, flex: 1, minWidth: 0 }}
                  required
                  min="1"
                />

                <select
                  value={incomeForm.frequency}
                  onChange={(e) =>
                    setIncomeForm({ ...incomeForm, frequency: e.target.value })
                  }
                  style={selectStyle}
                >
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual</option>
                </select>
              </div>

              <button
                type="submit"
                style={{ ...buttonStyle, background: '#10b981' }}
              >
                Add Income
              </button>
            </form>

            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}
            >
              {incomeSources.length === 0 ? (
                <p>No income sources added yet.</p>
              ) : (
                incomeSources.map((item) => (
                  <div className="simulation-result-preview" key={item.id}>
                    <div>
                      <span>{item.name}</span>
                      <strong>
                        {currencySymbol}
                        {Number(item.amount).toLocaleString('en-IN')} / {item.frequency}
                      </strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteIncome(item.id)}
                      style={deleteButtonStyle}
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <span className="panel-label">OUTFLOW</span>
                <h3>Expense Categories</h3>
              </div>
              <span className="expense-text">− Expenses</span>
            </div>

            <form
              onSubmit={handleAddExpense}
              style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginBottom: '20px'
              }}
            >
              <input
                type="text"
                placeholder="Category (e.g. Rent, Food, Utilities)"
                value={expenseForm.name}
                onChange={(e) =>
                  setExpenseForm({ ...expenseForm, name: e.target.value })
                }
                style={inputStyle}
                required
              />

              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="number"
                  placeholder="Amount"
                  value={expenseForm.amount}
                  onChange={(e) =>
                    setExpenseForm({ ...expenseForm, amount: e.target.value })
                  }
                  style={{ ...inputStyle, flex: 1, minWidth: 0 }}
                  required
                  min="1"
                />

                <select
                  value={expenseForm.frequency}
                  onChange={(e) =>
                    setExpenseForm({ ...expenseForm, frequency: e.target.value })
                  }
                  style={selectStyle}
                >
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual</option>
                </select>
              </div>

              <button
                type="submit"
                style={{ ...buttonStyle, background: '#ef4444' }}
              >
                Add Expense
              </button>
            </form>

            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}
            >
              {expenseCategories.length === 0 ? (
                <p>No expense categories added yet.</p>
              ) : (
                expenseCategories.map((item) => (
                  <div className="simulation-result-preview" key={item.id}>
                    <div>
                      <span>{item.name}</span>
                      <strong>
                        {currencySymbol}
                        {Number(item.amount).toLocaleString('en-IN')} / {item.frequency}
                      </strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteExpense(item.id)}
                      style={deleteButtonStyle}
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Page;

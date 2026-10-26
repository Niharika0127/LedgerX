import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function Investments() {
const { financeData, updateFinanceData, profile } = useFinance();
const investments = financeData.investments || [];
const currencySymbol = profile?.currency === 'USD' ? '$' : '₹';

const [form, setForm] = useState({
name: '',
type: 'Stocks',
amount: '',
currentValue: ''
});

const handleAdd = (e) => {
e.preventDefault();


if (!form.name.trim() || !form.amount || Number(form.amount) <= 0) {
  return;
}

const item = {
  id: Date.now().toString(),
  name: form.name.trim(),
  type: form.type,
  amount: Number(form.amount),
  currentValue: Number(form.currentValue || form.amount)
};

updateFinanceData((current) => ({ ...current, investments: [...current.investments, item] }));

setForm({
  name: '',
  type: 'Stocks',
  amount: '',
  currentValue: ''
});


};

const handleDelete = (id) => {
if (window.confirm('Kya aap is investment record ko delete karna chahte hain?')) {
updateFinanceData((current) => ({ ...current, investments: current.investments.filter((item) => item.id !== id) }));
}
};

const totalInvested = investments.reduce(
(total, item) => total + Number(item.amount || 0), 0
);

const currentTotal = investments.reduce(
(total, item) => total + Number(item.currentValue ?? item.amount ?? 0), 0
);

const totalReturns = currentTotal - totalInvested;

const returnPercentage = totalInvested
? ((totalReturns / totalInvested) * 100).toFixed(2)
: '0.00';

const investmentTypes = {
Stocks: 'EQ',
'Mutual Funds': 'MF',
Crypto: 'CR',
'Real Estate': 'RE',
'FD/Bonds': 'FD'
};

return ( <div className="dashboard-page investments-page"> <Sidebar activePage="investments" />


  <main className="dashboard-main">
    <Navbar />

    <header className="dashboard-header">
      <div>
        <p className="dashboard-date">WEALTH MANAGEMENT</p>
        <h1>My <span>Investments</span></h1>
        <p>Track and manage your investment portfolio.</p>
      </div>

      <div className="dashboard-profile">
        <div className="profile-avatar">
          {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
      </div>
    </header>

    <section className="investment-stats">
      <div className="dashboard-panel investment-stat">
        <span>Total Invested</span>
        <h2>{currencySymbol}{totalInvested.toLocaleString('en-IN')}</h2>
        <p>Across {investments.length} investments</p>
      </div>

      <div className="dashboard-panel investment-stat">
        <span>Current Value</span>
        <h2>{currencySymbol}{currentTotal.toLocaleString('en-IN')}</h2>
        <p className={totalReturns >= 0 ? 'investment-positive' : 'investment-negative'}>
          {totalReturns >= 0 ? '↑ ' : '↓ '}
          {currencySymbol}{Math.abs(totalReturns).toLocaleString('en-IN')} returns
        </p>
      </div>

      <div className="dashboard-panel investment-stat">
        <span>Total Returns</span>
        <h2>{returnPercentage}%</h2>
        <p className={totalReturns >= 0 ? 'investment-positive' : 'investment-negative'}>
          Portfolio growth
        </p>
      </div>

      <div className="dashboard-panel investment-stat">
        <span>Investment Count</span>
        <h2>{investments.length}</h2>
        <p>Active portfolio records</p>
      </div>
    </section>

    <section className="dashboard-panel portfolio-panel">
      <div className="investment-header">
        <div>
          <span className="panel-label">PORTFOLIO MANAGEMENT</span>
          <h3>Add New Investment</h3>
        </div>
      </div>

      <form className="investment-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Investment Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="Stocks">Stocks</option>
          <option value="Mutual Funds">Mutual Funds</option>
          <option value="Crypto">Crypto</option>
          <option value="Real Estate">Real Estate</option>
          <option value="FD/Bonds">FD / Bonds</option>
        </select>

        <input
          type="number"
          placeholder="Invested Amount"
          min="0.01"
          step="0.01"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Current Value"
          min="0"
          step="0.01"
          value={form.currentValue}
          onChange={(e) => setForm({ ...form, currentValue: e.target.value })}
        />

        <button type="submit" className="investment-btn">
          + Add Investment
        </button>
      </form>
    </section>

    <section className="dashboard-panel holdings-panel">
      <div className="investment-header">
        <div>
          <span className="panel-label">YOUR HOLDINGS</span>
          <h3>Current Investments</h3>
        </div>
        <span className="holdings-count">{investments.length} Records</span>
      </div>

      {investments.length === 0 ? (
        <p className="investment-empty">
          No investment records yet. Add your first investment above.
        </p>
      ) : (
        <div className="holdings-table">
          <div className="holding-row holding-heading">
            <span>Investment</span>
            <span>Invested</span>
            <span>Current Value</span>
            <span>Returns</span>
            <span>Action</span>
          </div>

          {investments.map((item) => {
            const invested = Number(item.amount || 0);
            const current = Number(item.currentValue ?? item.amount ?? 0);
            const returns = current - invested;
            const percentage = invested
              ? ((returns / invested) * 100).toFixed(2)
              : '0.00';

            return (
              <div className="holding-row" key={item.id}>
                <span className="holding-name">
                  <b>{investmentTypes[item.type] || 'IN'}</b>
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.type}</small>
                  </span>
                </span>

                <span>{currencySymbol}{invested.toLocaleString('en-IN')}</span>
                <span>{currencySymbol}{current.toLocaleString('en-IN')}</span>

                <strong className={returns >= 0 ? 'investment-positive' : 'investment-negative'}>
                  {returns >= 0 ? '+' : '-'}{Math.abs(Number(percentage))}%
                </strong>

                <button
                  type="button"
                  className="investment-delete"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  </main>

  <style>{`
    .investments-page {
      --investment-accent: #7454d9;
      --investment-light: rgb(188, 222, 228);
      --investment-text: #182333;
    }

    .investments-page .investment-form {
      display: grid;
      grid-template-columns: 1.5fr 1.1fr 1fr 1fr auto;
      align-items: center;
      gap: 12px;
      width: 100%;
      margin-top: 20px;
    }

    .investments-page .investment-form input,
    .investments-page .investment-form select {
      box-sizing: border-box;
      width: 100%;
      min-width: 0;
      height: 44px;
      padding: 0 12px;
      border: 1px solid #c3dce2;
      border-radius: 8px;
      background: #f3f9fa;
      color: #182333;
      font-family: inherit;
      font-size: 13px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .investments-page .investment-form input::placeholder {
      color: #748394;
      opacity: 1;
    }

    .investments-page .investment-form input:focus,
    .investments-page .investment-form select:focus {
      border-color: #7454d9;
      box-shadow: 0 0 0 3px rgba(116, 84, 217, 0.12);
    }

    .investments-page .investment-form select option {
      background: #fff;
      color: #182333;
    }

    .investments-page .investment-form .investment-btn {
      height: 44px;
      padding: 0 16px;
      border: none;
      border-radius: 8px;
      background: #7454d9;
      color: #fff;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
      transition: background 0.2s;
    }

    .investments-page .investment-form .investment-btn:hover {
      background: #5d3fc0;
    }

    .investments-page .investment-negative {
      color: #dc4545 !important;
    }

    .investments-page .holdings-count {
      color: #68788a;
      font-size: 13px;
    }

    .investments-page .investment-empty {
      padding: 30px 16px;
      text-align: center;
      color: #68788a;
    }

    .investments-page .investment-delete {
      padding: 7px 12px;
      border: 1px solid #efb7b7;
      border-radius: 6px;
      background: #fff5f5;
      color: #dc4545;
      font-family: inherit;
      cursor: pointer;
    }

    .investments-page .investment-delete:hover {
      background: #ffe5e5;
    }

    @media (max-width: 1100px) {
      .investments-page .investment-form {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .investments-page .investment-form .investment-btn {
        width: 100%;
      }
    }

    @media (max-width: 600px) {
      .investments-page .investment-form {
        grid-template-columns: minmax(0, 1fr);
      }

      .investments-page .holdings-table {
        overflow-x: auto;
      }

      .investments-page .holding-row {
        min-width: 650px;
      }
    }
  `}</style>
</div>


);
}

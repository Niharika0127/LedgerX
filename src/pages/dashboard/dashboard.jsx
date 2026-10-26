import { useEffect } from "react";
import { useFinance } from "../../context/FinanceContext.jsx";
import { InsightLayout, MetricCard, Panel, EmptyState } from "../../components/InsightUI.jsx";
import { formatINR, financialHealth, percent, recordName, formatDate, phase4Calculations, goalProgressDetails } from "../../utils/phase4Insights.js";

export default function Page() {
  const { financeData, calculations } = useFinance();
  const c = phase4Calculations(financeData, calculations);
  useEffect(() => { document.body.className = "dashboard-page"; return () => { document.body.className = ""; }; }, []);
  const health = financialHealth(c);
  const hasRecords = c.monthlyIncome || c.monthlyExpenses || c.totalAssets || c.totalLiabilities || c.transactionCount || financeData.goals.length;
  const recent = [...financeData.transactions].sort((a,b) => new Date(b.date || b.createdAt || 0)-new Date(a.date || a.createdAt || 0)).slice(0,5);
  const goals = financeData.goals.slice(0,3);
  return <InsightLayout activePage="dashboard" eyebrow={new Date().toLocaleDateString("en-IN", {weekday:"long", day:"numeric", month:"long", year:"numeric"}).toUpperCase()} title={<>Your financial <span>overview</span></>} emoji="👋">
    <section className="dashboard-summary">
      <MetricCard label="NET WORTH" value={formatINR(c.netWorth)} detail="Recorded assets minus liabilities" icon="💎" />
      <MetricCard label="MONTHLY INCOME" value={formatINR(c.monthlyIncome)} detail="Normalized to monthly amounts" icon="💵" />
      <MetricCard label="MONTHLY EXPENSES" value={formatINR(c.monthlyExpenses)} detail={`${c.monthlyIncome > 0 ? percent(c.monthlyExpenses / c.monthlyIncome * 100) : "—"} of recorded income`} icon="💳" />
      <MetricCard label="FINANCIAL HEALTH" value={`${health.score}/100`} detail={health.label + " · based on entered records"} icon="❤️" />
    </section>
    <section className="dashboard-grid">
      <Panel eyebrow="CASH FLOW" title="Monthly financial position">
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:12}}>
          <div className="simulation-result-preview"><div><span>Monthly surplus</span><strong style={{color:c.monthlySurplus >= 0 ? "#299565" : "#b65d5d"}}>{formatINR(c.monthlySurplus)}</strong></div></div>
          <div className="simulation-result-preview"><div><span>Savings rate</span><strong>{percent(c.savingsRatePercent)}</strong></div></div>
          <div className="simulation-result-preview"><div><span>Cash balance</span><strong>{formatINR(c.cashBalance)}</strong></div></div>
          <div className="simulation-result-preview"><div><span>Loan payments / month</span><strong>{formatINR(c.monthlyLoanPayments)}</strong></div></div>
        </div>
        {!hasRecords && <div style={{marginTop:16}}><EmptyState title="Your financial picture starts here" detail="This dashboard intentionally starts without sample financial figures. Add your own records to populate it." /></div>}
      </Panel>
      <Panel eyebrow="BALANCE SHEET" title="Assets & liabilities">
        {[ ["Cash", c.cashBalance], ["Other assets", c.otherAssets], ["Investments", c.investmentValue], ["Liabilities", -c.totalLiabilities] ].map(([label,value]) => <div key={label} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid rgba(24,35,51,.08)"}}><span>{label}</span><strong style={{color:value<0?"#b65d5d":"#182333"}}>{formatINR(value)}</strong></div>)}
      </Panel>
    </section>
    <section className="dashboard-grid">
      <Panel eyebrow="YOUR GOALS" title="Goal progress">
        {goals.length ? goals.map(goal => { const p=goalProgressDetails(goal); return <div key={goal.id} style={{marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",gap:12}}><strong>{recordName(goal)}</strong><span>{p.percent.toFixed(0)}%</span></div><p style={{fontSize:12,color:"#66778a",margin:"5px 0"}}>{formatINR(p.saved)} of {formatINR(p.target)}</p><div className="dashboard-progress"><div style={{width:`${p.percent}%`}} /></div></div>; }) : <EmptyState title="No goals added yet" detail="Create a goal to track progress here." link="/goals" />}
        <a href="/goals" className="simulation-button">Manage goals →</a>
      </Panel>
      <Panel eyebrow="RECENT ACTIVITY" title="Latest transactions">
        {recent.length ? recent.map(item => <div key={item.id} className="simulation-result-preview"><div><strong>{recordName(item)}</strong><p style={{fontSize:12,color:"#66778a",marginTop:4}}>{formatDate(item.date || item.createdAt)}</p></div><strong style={{color:item.type === "income" ? "#299565" : "#182333"}}>{item.type === "income" ? "+" : item.type === "expense" ? "−" : ""}{formatINR(item.amount)}</strong></div>) : <EmptyState title="No transactions recorded" detail="Your latest transactions will appear here once you add them." />}
      </Panel>
    </section>
  </InsightLayout>;
}

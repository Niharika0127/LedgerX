import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar.jsx";

export function InsightLayout({ activePage, eyebrow, title, emoji, children }) {
  return <div className="dashboard-page"><Sidebar activePage={activePage} /><main className="dashboard-main">
    <header className="dashboard-header"><div><p className="dashboard-date">{eyebrow || "LEDGERX FINANCIAL INTELLIGENCE"}</p><h1>{title} <span>{emoji || ""}</span></h1></div><div className="dashboard-profile"><div className="profile-avatar">LX</div></div></header>
    {children}
  </main></div>;
}

export function MetricCard({ label, value, detail, icon = "•" }) {
  return <div className="summary-card"><div className="summary-card-top"><span>{label}</span><span className="summary-icon">{icon}</span></div><h2>{value}</h2><p className="expense-text">{detail}</p></div>;
}

export function Panel({ eyebrow, title, children, style = {} }) {
  return <section className="dashboard-panel" style={style}><div className="panel-header" style={{ marginBottom: 16 }}><div>{eyebrow && <span className="panel-label">{eyebrow}</span>}{title && <h3>{title}</h3>}</div></div>{children}</section>;
}

export function EmptyState({ title = "Nothing to show yet", detail = "Add your financial records to see personalized insights here.", link = "/finances" }) {
  return <div style={{padding:"22px", border:"1px dashed rgba(24,35,51,.2)", borderRadius:12, textAlign:"center"}}><strong>{title}</strong><p style={{margin:"8px 0 14px", color:"#66778a", fontSize:13}}>{detail}</p><Link className="simulation-button" to={link}>Go to My Finances →</Link></div>;
}

export const controlStyle = { width:"100%", padding:"10px 12px", border:"1px solid rgba(24,35,51,.16)", borderRadius:8, background:"rgba(255,255,255,.75)", color:"#182333", font:"inherit", fontSize:13 };
export const labelStyle = { display:"block", marginBottom:6, color:"#66778a", fontSize:12, fontWeight:600 };
export const buttonStyle = { padding:"10px 15px", border:0, borderRadius:8, background:"#182333", color:"#fff", fontWeight:700, cursor:"pointer" };
export const softButtonStyle = { padding:"9px 13px", border:"1px solid rgba(24,35,51,.16)", borderRadius:8, background:"rgba(255,255,255,.6)", color:"#182333", fontWeight:600, cursor:"pointer" };

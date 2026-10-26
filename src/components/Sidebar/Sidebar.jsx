import "./Sidebar.css";

function Sidebar({ activePage }) {
    const groups = [
        ["OVERVIEW", [["📊","Dashboard","/dashboard","dashboard"],["💰","My Finances","/finances","finances"],["🧬","Digital Twin","/digital-twin","digital-twin"]]],
        ["PLAN & SIMULATE", [["🧪","Simulation Lab","/simulation","simulation"],["🔮","Future Projection","/projection","projection"],["🎯","Goals","/goals","goals"]]],
        ["FINANCIAL TOOLS", [["📈","Investments","/investments","investments"],["🏦","Loans & Debt","/loans","loans"],["🚨","Risk Center","/risk","risk"]]],
        ["INSIGHTS", [["🤖","AI Advisor","/advisor","advisor"],["🗓️","Timeline","/timeline","timeline"],["📄","Reports","/reports","reports"]]]
    ];
    return (
        <aside className="dashboard-sidebar">
            <a href="/" className="logo dashboard-logo"><div className="logo-icon">L</div><span>Ledger<span>X</span></span></a>
            <div className="sidebar-menu">
                {groups.map(([title, links]) => (
                    <React.Fragment key={title}>
                        <p className="menu-title">{title}</p>
                        {links.map(([icon,label,href,key]) => <a key={key} href={href} className={`sidebar-link ${activePage===key?"active":""}`}><span>{icon}</span>{label}</a>)}
                    </React.Fragment>
                ))}
            </div>
            <div className="sidebar-bottom">
                <a href="/settings" className={`sidebar-link ${activePage==="settings"?"active":""}`}><span>⚙️</span>Settings</a>
                <a href="/logout" className="sidebar-link logout-link"><span>↪</span>Log out</a>
            </div>
        </aside>
    );
}

import React from "react";
export default Sidebar;

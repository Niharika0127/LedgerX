function StatCard({title,value,icon,children}){return <div className="summary-card"><div className="summary-card-top"><span>{title}</span><span className="summary-icon">{icon}</span></div><h2>{value}</h2>{children}</div>}
export default StatCard;

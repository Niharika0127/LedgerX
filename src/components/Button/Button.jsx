function Button({children,variant="primary",href,onClick,type="button"}){return href?<a href={href} className={`custom-btn ${variant}-btn`}>{children}</a>:<button type={type} className={`custom-btn ${variant}-btn`} onClick={onClick}>{children}</button>}
export default Button;

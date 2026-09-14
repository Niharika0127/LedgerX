import { useEffect } from "react";
import "./Navbar.css";

function Navbar({ variant = "home" }) {
    const variants = {
        home: { links: true, question: null, action: null },
        login: { question: "Don't have an account?", action: ["Create Account", "/register"] },
        register: { question: "Already have an account?", action: ["Sign In", "/login"] },
        onboarding: { question: "Step 1 of 4", action: null }
    };
    const current = variants[variant] || variants.home;
    return (
        <header className="navbar">
            <a href="/" className="logo">
                <div className="logo-icon">L</div>
                <span>Ledger<span>X</span></span>
            </a>
            {current.links && (
                <nav>
                    <a href="#home">Home</a>
                    <a href="#how">How It Works</a>
                    <a href="#features">Features</a>
                    <a href="#simulation">Simulation</a>
                </nav>
            )}
            <div className="nav-buttons">
                {current.question && <span className={`${variant}-question`}>{current.question}</span>}
                {current.action && <a href={current.action[1]} className="signup-btn">{current.action[0]}</a>}
            </div>
        </header>
    );
}

export default Navbar;

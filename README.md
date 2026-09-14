# LedgerX — Your Financial Digital Twin

This React/Vite version is assembled from the original LedgerX HTML/CSS/JS project so the visual design and existing prototype behavior stay as close as possible to the original.

## Run

```bash
npm install
npm run dev
```

## Routes

Home, Login, Register, Onboarding, Dashboard, My Finances, Digital Twin, Simulation Lab, Future Projection, Goals, Investments, Loans & Debt, Risk Center, AI Advisor, Timeline, Reports, Settings, Admin.

Analytics is intentionally not included.

## React concepts

React Router, reusable Navbar/Sidebar/AdminSidebar/LegacyPage/StatCard/Button components, React lifecycle with useEffect, component props, and a React shell around the original page UI. Existing app.js behavior is retained through `src/services/legacyApp.js` and adapted for React routes.

## Important prototype notes

Authentication and financial calculations are frontend/demo logic. The AI Advisor and risk/simulation outputs are prototype logic and are not professional financial advice.


## JSX-consolidated version

All page markup is now written directly as React JSX inside each page's `.jsx` file.
The old `content` template strings and `LegacyPage` HTML injection layer were removed.
The existing prototype behavior in `src/services/legacyApp.jsx` is still initialized by
each page, so registration, login, onboarding, simulations, settings, etc. continue to
use the same localStorage/DOM behavior as the original prototype.

There are no page-level `.js` content files.

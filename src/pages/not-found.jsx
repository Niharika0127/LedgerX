import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar.jsx';
export default function NotFound() {
  return <><Navbar variant="home" /><main className="not-found-page"><div className="not-found-code">404</div><h1>This page wandered off.</h1><p>The address may be incorrect, or the page may have moved.</p><Link className="not-found-link" to="/">Return to LedgerX home</Link></main></>;
}

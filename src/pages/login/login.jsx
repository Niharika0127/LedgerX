import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser, getSavedOnboarding } from '../services/auth.js';

export default function ProtectedRoute({ children, requireOnboarding = false }) {
  const location = useLocation();
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  const savedProfile = getSavedOnboarding();
  const hasCompletedOnboarding = Boolean(user.onboardingComplete || (savedProfile?.email && savedProfile.email === user.email));
  if ((requireOnboarding || location.pathname !== '/onboarding') && !hasCompletedOnboarding && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }
  return children;
}

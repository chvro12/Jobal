import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function PrivateRoute({ children, role }) {
  const { token, role: userRole } = useAuth();
  if (!token) return <Navigate to="/connexion" />;
  if (role && userRole !== role) return <Navigate to="/" />;
  return children;
} 
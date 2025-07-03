import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = Boolean(token);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = true; // o lógica real

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

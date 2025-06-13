import { Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import DashboardLayout from './layouts/DashboardLayout';
import Clientes from './pages/Clientes';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AddClientForm from './components/AddClientForm';
import ClientDetails from './pages/ClientDetails';

const App: React.FC = () => {
  

  return (
    <>
      <Routes>
         <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="/dashboard/clientes/:id" element={<ClientDetails />} />
        <Route path="clientes/nuevo" element={<AddClientForm />} />
      </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;

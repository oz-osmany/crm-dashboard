import { Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AddClientForm from './components/AddClientForm';
import ClientDetails from './pages/ClientDetails';
import Deals from './pages/Deals';
import AddDealForm from './features/deals/AddDealForm';
import Tareas from './pages/Tareas';
import Client from './components/Client';
import ClientDetailLayout from './layouts/ClientDetailLayout';

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
          <Route path="clientes" element={<Client />} />
          <Route path="/dashboard/clientes/:id" element={<ClientDetailLayout />}>
             <Route index element={<ClientDetails />} />
         </Route>
          {/* <Route path="/dashboard/clientes/:id" element={<ClientDetails />} /> */}
          <Route path="clientes/nuevo" element={<AddClientForm />} />
          <Route path="/dashboard/deals" element={<Deals />} />
          <Route path="deals/nuevo" element={<AddDealForm />} />
          <Route path="/dashboard/tareas" element={<Tareas />} />

      </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;

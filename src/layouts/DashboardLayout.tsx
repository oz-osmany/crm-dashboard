import { Outlet } from 'react-router-dom';
import Sidebar from '../components/ClientSidebar';
import { useState } from 'react';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="dashboard-layout">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="main-content">
        <div className="page-content">
          <Outlet /> {/* Renderiza las páginas según la ruta activa (/dashboard, /dashboard/clientes, etc.) */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

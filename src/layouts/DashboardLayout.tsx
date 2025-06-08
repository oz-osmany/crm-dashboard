import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="main-content">
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
        
        <div className="page-content">
          <Outlet /> {/* Aquí se muestra el contenido de la ruta actual */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

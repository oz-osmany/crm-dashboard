// src/components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <button className="sidebar__close" onClick={onClose}>×</button>
      <nav className="sidebar__nav">
        <NavLink to="/dashboard" className="sidebar__link">Panel</NavLink>
        <NavLink to="/dashboard/clientes"
          className={({ isActive }) =>
            `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
          }>Clientes
        </NavLink>
        <NavLink to="/dashboard/metricas" className="sidebar__link">Métricas</NavLink>
      </nav>
    </aside>
  );
};


export default Sidebar;

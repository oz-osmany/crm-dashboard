import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../services/authServices';

const Navbar: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
       <div className="navbar__left">
        <button className="navbar__hamburger" onClick={onToggleSidebar}>
          ☰
        </button>
        <div className="navbar__title">ClientBoost</div>
      </div>
      <nav className="navbar__nav">
        {isAuthenticated() ? (
          <>
            <NavLink to="/dashboard" className="navbar__link">Panel</NavLink>
            <button className="navbar__button" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="navbar__link">Iniciar sesión</NavLink>
            <NavLink to="/register" className="navbar__link">Registrarse</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../services/authServices';
import { HiMenu, HiX } from "react-icons/hi";
import { LuListTodo } from 'react-icons/lu';

const Nav: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  return (
    <header className="nav">
       {/* <div className="nav__left"> */}
         <div className="nav__logo">ClientBoost</div>
            {/* <button className="nav__hamburger" onClick={onToggleSidebar}>
              ☰
            </button> */}
         <button className="nav__toggle" onClick={toggleMenu}>
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
         </button>
      {/* </div> */}
      <nav className={`nav__links ${isOpen ? "nav__links--open" : ""}`}>
        <NavLink to="/dashboard/" end className={({ isActive }) =>
            isActive ? 'nav__link nav__link--active' : 'nav__link'
          } onClick={toggleMenu}>
          Metrics
        </NavLink>
        <NavLink to="/dashboard/clientes" className={({ isActive }) =>
              isActive ? 'nav__link nav__link--active' : 'nav__link'
            } onClick={toggleMenu}>
          Clients
        </NavLink>
        <NavLink to="/dashboard/tareas" className={({ isActive }) =>
            isActive ? 'nav__link nav__link--active' : 'nav__link'
          } onClick={toggleMenu}>
          <LuListTodo /> Tasks
        </NavLink>
        <NavLink to="/dashboard/deals" className={({ isActive }) =>
            isActive ? 'nav__link nav__link--active' : 'nav__link'
          } onClick={toggleMenu}>
          Deals
        </NavLink>
      </nav>
      <nav className="nav__nav">
        {isAuthenticated() ? (
          <>
            <NavLink to="/dashboard" className="nav__link">Panel</NavLink>
            <button className="nav__button" onClick={handleLogout}>Close session</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav__link">Login</NavLink>
            <NavLink to="/register" className="nav__link">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Nav;

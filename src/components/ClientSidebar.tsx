import React from "react";
import { FaUserFriends } from "react-icons/fa";

interface SidebarProps {
  layoutType?: "dashboard" | "clientes" | "tareas";
  children: React.ReactNode;
}

const ClientSidebar = () => {
  return (
    <aside className="clientes-sidebar">
      <div className="clientes-sidebar__header">
        <FaUserFriends className="clientes-sidebar__icon" />
        <span>Contacts</span>
      </div>

      <ul className="clientes-sidebar__menu">
        <li className="active">All contacts</li>
        <li>All saved filters</li>
        <li className="clientes-sidebar__add-filter">+ Add filter</li>
      </ul>
    </aside>
  );
};

export default ClientSidebar;

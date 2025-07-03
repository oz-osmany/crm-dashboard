import { Outlet } from "react-router-dom";
import ClientSidebar from "../components/ClientSidebar";

const ClientLayout = () => {
  return (
    <div className="clientes-layout">
      <ClientSidebar />
      <main className="clientes-layout__main">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;

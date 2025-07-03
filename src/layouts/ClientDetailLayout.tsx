import { Outlet } from "react-router-dom";
import ClientInfoSidebar from "../components/ClientInfoSidebar";

const ClientDetailLayout = () => {
  return (
    <div className="cliente-detalle-layout">
      <ClientInfoSidebar />
      <main className="cliente-detalle-layout__main">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientDetailLayout;

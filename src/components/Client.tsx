import { Routes, Route } from "react-router-dom";
import ClientesLayout from "../layouts/ClientLayout";
import Clientes from "../pages/Clientes";
import AddClienteForm from "./AddClientForm";


const Client = () => {
  return (
    <Routes>
      <Route element={<ClientesLayout  />}>
        <Route index element={<Clientes />} />
        <Route path="nuevo" element={<AddClienteForm />} />
        
        {/* <Route path=":id" element={<ClienteDetalle />} /> */}
      </Route>
    </Routes>
  );
};

export default Client;

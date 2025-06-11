import React, { useEffect, useState } from 'react';
import { deleteClient, editClient, getClients } from '../services/clientService';
import ClientesLayout from '../components/ClientesLayout';
import ConfirmModal from '../components/ConfirmModal';
import ModalClient from "../components/ModalClient"

interface MyClients {
  id: number,
  name:string,
  email: string,
  phone: string,
  status: string,
  notes: string
}

const Clientes: React.FC = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');

  //Modal para eliminar
  const [showModal, setShowModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number>();

  //Modal para editar
  const [showModalE, setShowModalE] = useState(false);
  const [selectedClientIdE, setSelectedClientIdE] = useState<MyClients>(
    { 
      "id": 1 ,
      "name":"",
      "email": "",
      "phone": "",
      "status": "",
      "notes": ""
    }
  );

  const chargeClient = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
    
  }

  useEffect(() => {
   chargeClient();
  }, []);

  const handleEdit = ( info:MyClients) => {    
      setSelectedClientIdE(info );
      setShowModalE(true);
  } 
  const saveEdit = async (updatedData: any) => {
    await editClient( updatedData);
      setShowModalE(false);
      chargeClient();
  }

  const confirmDelete = async () => {
    if (!selectedClientId) return;
    try {
      await deleteClient( selectedClientId );
      setShowModal(false);
      chargeClient();
    } catch (err) {
      console.error('Error deleting client:', err);
    }
};
  const handleDelete = async(id:number) =>{
    try {      
      setSelectedClientId(id);
      setShowModal(true);
    } catch (error) {
      throw new Error( 'Error al borrar el cliente');
    }
  }

  const filteredClients = clients.filter((client: any) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ClientesLayout>
      <input
        className="clientes__search"
        type="text"
        placeholder="Buscar por nombre"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {showModal && (
        <ConfirmModal
          message="Are you sure?"
          onConfirm={confirmDelete}         // <- Elimina si confirma
          onCancel={() => setShowModal(false)}  // <- Cierra si cancela
        />
      )}
      {showModalE && (
        <ModalClient
          client={selectedClientIdE}
          onSave={saveEdit}  // 
          onClose={() => setShowModalE(false)}         // <- Elimina si confirma
        />
      )}
      <ul className="clientes__list">
        {filteredClients.map((client: MyClients) => (
          <li key={client.email} className="clientes__item">
            <div className="clientes__info">
              <strong>{client.name}</strong>
              <span>{client.status}</span>
              <span>{client.id}</span>
            </div>
            <div className="clientes__actions">
              <button className="clientes__edit" onClick={()=> handleEdit(client)}>Editar</button>
              <button className="clientes__delete" onClick={()=>handleDelete(client.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </ClientesLayout>
  );
};

export default Clientes;

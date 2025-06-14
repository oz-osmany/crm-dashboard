import React, { useEffect, useState } from 'react';
// import {  editClient, getClients } from '../services/clientService';
import ClientesLayout from '../components/ClientesLayout';
import ConfirmModal from '../components/ConfirmModal';
import ModalClient from "../components/ModalClient"
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hook';
import { fetchClients, deleteClient, updateClient } from '../store/slices/clientSlice';

interface MyClients {
  id: string,
  name:string,
  email: string,
  phone: string,
  status: string,
  notes: string
}

const Clientes: React.FC = () => {

  const dispatch = useAppDispatch();
  const clients = useAppSelector(state => state.clients.clients);
  
  useEffect(() => {
  dispatch(fetchClients());
  }, [dispatch]);

  const [search, setSearch] = useState('');

  //Modal para eliminar
  const [showModal, setShowModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  //Modal para editar
  const [showModalE, setShowModalE] = useState(false);
  const [selectedClientIdE, setSelectedClientIdE] = useState<MyClients>(
    { 
      "id": "" ,
      "name":"",
      "email": "",
      "phone": "",
      "status": "",
      "notes": ""
    }
  );
  const handleEdit = ( info:MyClients) => {    
      setSelectedClientIdE(info );
      setShowModalE(true);
  } 
  const saveEdit = async (updatedData: MyClients) => {

    try {
      dispatch( updateClient({id: updatedData.id, data:updatedData}))
      setShowModalE(false);
      dispatch( fetchClients())
      
    } catch (error) {
      console.error('Error updating client:', error);
    }
  }

  const confirmDelete = async () => {
    if (!selectedClientId) return;
    try {
      dispatch(deleteClient(selectedClientId));
      setShowModal(false);
      dispatch(fetchClients());
    } catch (err) {
      console.error('Error deleting client:', err);
    }
};
  const handleDelete = async(id:string) =>{
    try {      
      setSelectedClientId(id);
      setShowModal(true);
    } catch (error) {
      throw new Error( 'Error al borrar el cliente');
    }
  }

  return (
    <ClientesLayout>
      <div>
        <input
          className="clientes__search"
          type="text"
          placeholder="Buscar por nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
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
        {clients.map((client: MyClients) => (
          <li key={client.email} className="clientes__item">
            <Link to={`/dashboard/clientes/${client.id}`} className="clientes__link">
                <strong>{client.name}</strong>
                <span>{client.email}</span>
                <span>{client.phone}</span>
              </Link>
              <div className="clientes__actions">
                <button className="clientes__edit" onClick={()=> handleEdit(client)}>Editar</button>
                {/* <Link to={`/dashboard/clientes/editar/${client.id}`} className="clientes__edit">
                ✏️
              </Link> */}
                <button className="clientes__delete" onClick={()=>handleDelete(client.id)}>Eliminar</button>
              </div>
          </li>
        ))}
      </ul>
    </ClientesLayout>
  );
};

export default Clientes;

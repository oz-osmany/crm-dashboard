import React, { useEffect, useState } from 'react';
import ConfirmModal from '../components/ConfirmModal';
import ModalClient from "../components/ModalClient"
import {  useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hook';
import { fetchClients, deleteClient, updateClient } from '../features/clients/clientSlice';
import ClientTable from '../components/ClientTable';

interface MyClients {
  id: string,
  name:string,
  email: string,
  phone: string,
  due_date:string,
  status: 'activo' | 'inactivo',
}

const Clientes: React.FC = () => {

  const dispatch = useAppDispatch();
  const clients = useAppSelector(state => state.clients.clients);
  
  useEffect(() => {
  dispatch(fetchClients());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');


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
      "status": "activo",
      "due_date": ""
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

  const filteredClients = clients.filter((client) => {
  const matchesSearch =
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'todos' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const navigate = useNavigate();

  return (
    <div>
        <div className="clients-page">
          <h1 className="clientes-layout__title">Gestión de Clientes</h1>
          <section className="clients-main">
            <div className="clients-controls">              
              <input
                type="text"
                className='clients-search'
                placeholder="Search for clients"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <button
          className="clientes-layout__button"
          onClick={() => navigate('/dashboard/clientes/nuevo')}
        >
          + Add Client
        </button>
              
            </div>
             <ClientTable
                clients={filteredClients }
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
          </section>
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
      
      
    </div>
  );
};

export default Clientes;

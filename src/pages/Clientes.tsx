import React, { useEffect, useState } from 'react';
import { deleteClient, getClients } from '../services/clientService';
import ClientesLayout from '../components/ClientesLayout';

const Clientes: React.FC = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');

 
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
  const handleDelete = async(id:number) =>{
    try {
       await deleteClient( id );
       chargeClient();
      
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

      <ul className="clientes__list">
        {filteredClients.map((client: any) => (
          <li key={client.id} className="clientes__item">
            <div className="clientes__info">
              <strong>{client.name}</strong>
              <span>{client.status}</span>
            </div>
            <div className="clientes__actions">
              <button className="clientes__edit">Editar</button>
              <button className="clientes__delete" onClick={()=>handleDelete(client.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </ClientesLayout>
  );
};

export default Clientes;

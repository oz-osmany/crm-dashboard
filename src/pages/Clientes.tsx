import React, { useEffect, useState } from 'react';
import { getClients } from '../services/clientService';
import ClientesLayout from '../components/Clienteslayout';

const Clientes: React.FC = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      }
    };

    fetchClients();
  }, []);


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
          <li key={client._id} className="clientes__item">
            <div className="clientes__info">
              <strong>{client.name}</strong>
              <span>{client.status}</span>
            </div>
            <div className="clientes__actions">
              <button className="clientes__edit">Editar</button>
              <button className="clientes__delete">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </ClientesLayout>
  );
};

export default Clientes;

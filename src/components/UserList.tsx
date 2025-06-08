import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/clientTable.scss';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  notes: string;
}

const UserList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Client>>({});

  const fetchClients = async () => {
    const res = await axios.get('/clients');
    setClients(res.data);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/clients/${id}`);
    fetchClients();
  };

  const handleEditClick = (client: Client) => {
    setEditingId(client.id);
    setEditData(client);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await axios.put(`/clients/${editingId}`, editData);
    setEditingId(null);
    fetchClients();
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="client-table">
      <h2>Clientes registrados</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Notas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              {editingId === client.id ? (
                <>
                  <td><input name="name" value={editData.name || ''} onChange={handleEditChange} /></td>
                  <td>{client.email}</td>
                  <td><input name="phone" value={editData.phone || ''} onChange={handleEditChange} /></td>
                  <td>
                    <select name="status" value={editData.status} onChange={handleEditChange}>
                      <option value="Interesado">Interesado</option>
                      <option value="En seguimiento">En seguimiento</option>
                      <option value="Cerrado">Cerrado</option>
                    </select>
                  </td>
                  <td><input name="notes" value={editData.notes || ''} onChange={handleEditChange} /></td>
                  <td>
                    <button onClick={handleUpdate}>Guardar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.status}</td>
                  <td>{client.notes}</td>
                  <td>
                    <button onClick={() => handleEditClick(client)}>Editar</button>
                    <button onClick={() => handleDelete(client.id)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

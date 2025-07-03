import React from 'react';
import { Link } from 'react-router-dom';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  due_date:string;
  status: 'activo' | 'inactivo';
}

interface Props {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

const ClientTable: React.FC<Props> = ({ clients, onEdit, onDelete }) => {
  return (
    <table className="clients-table">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td><input type="checkbox" /></td>
            <td>
              <Link to={`/dashboard/clientes/${client.id}`} className="clientes__link">
                {client.name}
              </Link>
            </td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>{client.status}</td>
            <td>
              <button className="clientes__edit" onClick={() => onEdit(client)}>Edit</button>
            </td>
            <td>
              <button className="clientes__delete" onClick={() => onDelete(client.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientTable;

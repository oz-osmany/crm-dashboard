import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientesLayout from '../components/Clienteslayout';
import axios from 'axios';


const AddClient: React.FC = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState('seguimiento');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/clients',
        { name, email, phone, status, notes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate('/dashboard/clientes');
    } catch (error) {
      console.error('Error al crear cliente:', error);
      alert('Error al crear el cliente. Revisa la consola.');
    }
  };

  return (
    <ClientesLayout>
      <div className="add-client__container">
        <form className="add-client" onSubmit={handleSubmit}>
          <label className="add-client__label">
            name del Cliente
            <input
              className="add-client__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="add-client__label">
            Email
            <input
              className="add-client__input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="add-client__label">
            Phone
            <input
              className="add-client__input"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <label className="add-client__label">
            Notes
            <input
              className="add-client__input"
              type="textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            />
          </label>
          <label className="add-client__label">
            status
            <select
              className="add-client__select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="seguimiento">Seguimiento</option>
              <option value="cerrado">Cerrado</option>
            </select>
          </label>
          <button className="add-client__submit" type="submit">
            Crear Cliente
          </button>
        </form>
      </div>
    </ClientesLayout>
  );
};

export default AddClient;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../hook';
import { addClient } from '../features/clients/clientSlice';


const AddClient: React.FC = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"activo" | "inactivo">('activo');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newClient = {
      name,
      email,
      phone,
      status,
      
    };
    
    dispatch(addClient(newClient ))
    navigate('/dashboard/clientes');
    
  };

  return (
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
          {/* <label className="add-client__label">
            Notes
            <input
              className="add-client__input"
              type="textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            />
          </label> */}
          <label className="add-client__label">
            status
            <select
              className="add-client__select"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'activo' | 'inactivo')}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </label>
          <button className="add-client__submit" type="submit">
            Crear Cliente
          </button>
        </form>
      </div>
  );
};

export default AddClient;

import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { getClients } from '../services/clientService';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [clients, setClients] = useState([]);
  const [userName, setUserName] = useState('Usuario');
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decoded: { name?: string; email?: string } = jwtDecode(token);
        console.log(decoded)
        setUserName(decoded.name ?? decoded.email ?? 'Usuario');
      } catch (error) {
        console.error('Error al decodificar el token');
      }
    }

    const fetchData = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
      }
    };

    fetchData();
  }, []);

 
  const total = clients.length;
  const cerrados = clients.filter((c: any) => c.status === 'cerrado').length;
  const seguimiento = clients.filter((c: any) => c.status === 'En seguimiento').length;

  const stats = [
    { label: 'Total clientes', value: total },
    { label: 'Clientes cerrados', value: cerrados },
    { label: 'En seguimiento', value: seguimiento },
  ];

  return (
    <section className="dashboard">
      <h1 className="dashboard__title">¡Bienvenido, {userName}!</h1>
      <p className="dashboard__subtitle">Este es tu panel de control.</p>

      <div className="dashboard__stats">
        {stats.map((stat, index) => (
          <div className="dashboard__card" key={index}>
            <div className="dashboard__card-value">{stat.value}</div>
            <div className="dashboard__card-label">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="dashboard__recent">
        <h2 className="dashboard__section-title">Últimos clientes</h2>
        <div className="dashboard__actions">
          <button className="dashboard__button" onClick={() => navigate('/dashboard/clientes')}>
            Ver todos los clientes
          </button>
        </div>
        <ul className="dashboard__client-list">
            {clients
            .slice()
            .reverse()
            .slice(0, 5)
            .map((client: any) => (
                <li className="dashboard__client-item" key={client._id}>
                <span className="dashboard__client-name">{client.name}</span>
                <span className="dashboard__client-status">{client.status}</span>
                </li>
            ))}
        </ul>
        </div>
        
    </section>
  );
};

export default Dashboard;

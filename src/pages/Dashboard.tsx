import { parseISO, format, getWeek } from 'date-fns';
import { MdPerson, MdTask, MdEmail, MdCall } from 'react-icons/md';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';

import { useAppDispatch, useAppSelector } from '../hook';
import { fetchClients } from '../features/clients/clientSlice';
import { getTasks } from '../features/tasks/tasksSlices';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchClientCalls, fetchClientEmails } from '../features/clients/clientActivitySlice';




const Dashboard = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const clients = useAppSelector((state) => state.clients.clients);
  const tasks = useAppSelector((state) => state.tasks.list);
  const activities = useAppSelector((state) => state.clientActivity.items);
  

  useEffect(() => {
    dispatch(fetchClients());
    dispatch(getTasks());
    dispatch(fetchClientEmails())
    dispatch(fetchClientCalls())
  }, [dispatch]);

  // Datos para gráfico de tareas completadas esta semana
 const tareasData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => ({
  name: day,
  tareas: tasks.filter((task) => {
    const date = parseISO(task.due_date);
    const dayName = format(date, 'EEE'); // EEE: abreviatura en inglés (Mon, Tue, ...)
    return dayName === day;
  }).length,
}));
 // Generar datos agrupados por semana
const clientesPorSemana: { [key: string]: number } = {};

clients.forEach((client) => {
  const date = parseISO(client.created_at);
  const week = getWeek(date).toString();

  if (clientesPorSemana[week]) {
    clientesPorSemana[week] += 1;
  } else {
    clientesPorSemana[week] = 1;
  }
});

// Convertir a array de objetos para Recharts
const clientesData = Object.entries(clientesPorSemana).map(([semana, clientes]) => ({
  semana: `Semana ${semana}`,
  clientes,
}));
  return (
    <section className="metrica">
      <header className="metrica__header">
        <h2>Dashboard</h2>        
      </header>

      <section className="metrica__section">
        <h3>Summary</h3>
        <div className="metrica__cards">
          <div className="metrica-card">
            <MdPerson className="metrica-card__icon" />
            <div>
              <h4> { clients.length } </h4>
              <p>Active customers</p>
            </div>
          </div>

          <div className="metrica-card">
            <MdTask className="metrica-card__icon" />
            <div>
              <h4> { tasks.length } </h4>
              <p>Pending tasks</p>
            </div>
          </div>

          <div className="metrica-card">
            <MdEmail className="metrica-card__icon" />
            <div>
              <h4>
               {
                activities.length
                
               } 

              </h4>
              <p>Emails sent</p>
            </div>
          </div>

          <div className="metrica-card">
            <MdCall className="metrica-card__icon" />
            <div>
              <h4> 
                {
                  activities.length
                } </h4>
              <p>Registered calls </p>
            </div>
          </div>
        </div>
      </section>
      <section className='metrica__section'>
        <div className="dashboard__recent">
         <h2 className="dashboard__section-title">Latest customers</h2>
         <div className="dashboard__actions">
           <button className="dashboard__button" onClick={() => navigate('/dashboard/clientes')}>
             See all customers
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
      <section className="metrica__section">
        <h3>Tasks of the week</h3>
        <div className="metrica__chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tareasData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="tareas" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="metrica__section">
        <h3>New customers per week</h3>
        <div className="metrica__chart">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={clientesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semana" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="clientes" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
      <footer className="metrica__footer">
        <p>© {new Date().getFullYear()} ClientBoost CRM. All rights reserved.</p>
        <p>Developed by Oz Machado</p>
        <p>Version 1.0.0</p>
      </footer>

    </section>
  );
};

export default Dashboard;


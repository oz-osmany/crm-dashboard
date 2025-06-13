import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Clientes {
    created_at: string | number | Date;
    id:number,
    name:string,
    email:string,
    notes:string,
    phone:string,
    status:string
}
const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState<Clientes>({
    created_at:"",
    id: 1,
    name:"",
    email:"",
    notes:"",
    phone:"",
    status:""

  });

  useEffect(() => {
    
    const fetchClient = async () => {
        
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:3000/clients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClient(res.data[0]);
      } catch (error) {
        console.error('Error fetching client:', error);
      }
    };

    fetchClient();
  }, [id]);
    

  if (!client) return <p>Loading...</p>;

  return (
    <div className="client-details">
      <h2>Client Details</h2>      
      <div className="client-details__box">        
        {client.name && <p><strong>Name:</strong> {client.name}</p>}
        <p><strong>Email:</strong> {client.email}</p>
        <p><strong>Phone:</strong> {client.phone}</p>
        <p><strong>Status:</strong> {client.status}</p>
        <p><strong>Notes:</strong> {client.notes || 'No notes available.'}</p>
        <p><strong>Created:</strong> {new Date(client.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ClientDetails;

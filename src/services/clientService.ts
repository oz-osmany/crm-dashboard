import axios from 'axios';

const API_URL = 'http://localhost:3000'; // ajusta si usas proxy

const token = localStorage.getItem('token');
export const getClients = async () => {
    
  const response = await axios.get(`${API_URL}/clients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteClient = async ( id: number) =>{
  const response = await axios.delete(`${API_URL}/clients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
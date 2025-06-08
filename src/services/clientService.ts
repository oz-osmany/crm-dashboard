import axios from 'axios';

const API_URL = 'http://localhost:3000'; // ajusta si usas proxy

export const getClients = async () => {
  const token = localStorage.getItem('token');
    
  const response = await axios.get(`${API_URL}/clients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

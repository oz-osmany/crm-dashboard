// src/api/axios.js o axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // cambia si usas otro puerto
  headers: {
    'Content-Type': 'application/json'
  }

  
});

// Interceptor para añadir el token a cada petición
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  // console.log("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default instance;

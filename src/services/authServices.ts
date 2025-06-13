// authService.ts (o donde hagas el login)
import axios from '../api/axios';
import { jwtDecode } from 'jwt-decode';


type TokenPayload = {
  userId: string;
  
};

const TOKEN_KEY = 'token';
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
export const logout = () => {
  localStorage.removeItem('token');
};


export const login = async (email: string, password: string) => {
  
  const res = await axios.post('/auth/login', { email, password }); // ⬅️ AQUÍ sale `res`
  const token = res.data.token;
  localStorage.setItem(TOKEN_KEY, token); // Guardas el token que el backend devuelve

  const decoded = jwtDecode<TokenPayload>(token);
  // console.log(decoded)
  localStorage.setItem('userId', decoded.userId);
  return {res, decoded};
};

export const register = async (name: string, email: string, password: string) => {
  const res = await axios.post('/auth/register', { name, email, password });
  localStorage.setItem('token', res.data.token);
  return res.data;
};

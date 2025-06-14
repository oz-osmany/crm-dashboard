import React, { useState } from 'react';
import { login } from '../services/authServices';
import { useNavigate, Link } from 'react-router-dom';
// import '../styles/loginForm.scss';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const {res, decoded} =await login(email, password);
      setMsg('Login exitoso');
      dispatch(loginSuccess({ token: res.data.token, user: decoded.userId }));
      navigate('/dashboard'); // redirige después de login
    } catch (err) {
      console.error(err);
      setMsg('Error al iniciar sesión');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <h3>Iniciar sesión</h3>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        <p>{msg}</p>
      </form>
      <p className='register-form'>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </>
    
  );
};

export default LoginForm;

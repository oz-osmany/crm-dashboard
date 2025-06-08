import React, { useState } from 'react';
import { register } from '../services/authServices';
import { useNavigate } from 'react-router-dom';
import '../styles/registerForm.scss';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate(); // ✅

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData.name, formData.email, formData.password);
      setMsg('Registro exitoso');
      navigate('/dashboard'); // ✅ Redirige al panel
    } catch (err) {
      setMsg('Error al registrarse');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h3>Crear cuenta</h3>
      <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Correo" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
      <button type="submit">Registrarse</button>
      <p>{msg}</p>
    </form>
  );
};

export default RegisterForm;

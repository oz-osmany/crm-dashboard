import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const ClientesLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <section className="clientes-layout">
      <div className="clientes-layout__header">
        <h1 className="clientes-layout__title">Gestión de Clientes</h1>
        <button
          className="clientes-layout__button"
          onClick={() => navigate('/dashboard/clientes/nuevo')}
        >
          + Agregar Cliente
        </button>
      </div>

      <div className="clientes-layout__content">
        {children}
      </div>
    </section>
  );
};

export default ClientesLayout;

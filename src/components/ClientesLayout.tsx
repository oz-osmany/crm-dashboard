import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const ClientesLayout = () => {
  const navigate = useNavigate();

  return (
    <section className="clientes-layout">
      <div className="clientes-layout__header">
        <h1 className="clientes-layout__title">Customer Management</h1>
        <button
          className="clientes-layout__button"
          onClick={() => navigate('/dashboard/clientes/nuevo')}
        >
          + Add Client
        </button>
      </div>
    </section>
  );
};

export default ClientesLayout;

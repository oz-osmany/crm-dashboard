import React from "react";
import useDealForm from "../../hooks/useDealForm";
import { useAppDispatch, useAppSelector } from "../../hook";
import { createDeal } from "./dealSlice";

const AddDealForm = () => {
  const dispatch = useAppDispatch();
  const { formData, handleChange, resetForm } = useDealForm();
  const clients = useAppSelector(state => state.clients.clients);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createDeal(formData));
    resetForm();
  };

  return (
    <form className="deal-form" onSubmit={handleSubmit}>
      <h2>Nuevo Negocio</h2>

      <label>Cliente</label>
      <select name="client_id" value={formData.client_id} onChange={handleChange} required>
        <option value="">Selecciona un cliente</option>
        {clients.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <label>Título</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required />

      <label>Monto</label>
      <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />

      <label>Estado</label>
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="nuevo">Nuevo</option>
        <option value="contactado">Contactado</option>
        <option value="ganado">Ganado</option>
        <option value="perdido">Perdido</option>
      </select>

      <label>Fecha de cierre</label>
      <input type="date" name="close_date" value={formData.close_date} onChange={handleChange} />

      <label>Notas</label>
      <textarea name="notes" value={formData.notes} onChange={handleChange} />

      <button type="submit">Guardar negocio</button>
    </form>
  );
};

export default AddDealForm;

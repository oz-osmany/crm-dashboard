import React, { useState } from 'react';

interface EditClientModalProps {
  client: {
    id:string,
    name:string,
    email:string,
    phone: string,
    status: string,
    // notes: string
  };
  onClose: () => void;
  onSave: (updatedData: any) => void;
}

const ModalClient: React.FC<EditClientModalProps> = ({ client, onClose, onSave }) => {


    const [formData, setFormData] = useState(client);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);  // llama al handler externo con los nuevos datos
  };
  return (
     <div className="confirm-modal__overlay" onClick={onClose}>      
        <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Client</h2>
        <form onSubmit={handleSubmit} className='confirm-modal__form'>
          <input name="name" value={formData.name} onChange={handleChange} />
          <input name="email" value={formData.email} onChange={handleChange} />
          <input name="phone" value={formData.phone} onChange={handleChange} />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="nuevo">Nuevo</option>
            <option value="seguimiento">Seguimiento</option>
            <option value="cerrado">Cerrado</option>
          </select>
          {/* <textarea name="notes" value={formData.notes}  onChange={handleChange}/> */}
          <div className="confirm-modal__actions">
            <button type="submit" className="confirm-modal__confirm">Save</button>
            <button type="button" className="confirm-modal__cancel" onClick={onClose}>Cancel</button>
          </div>

        </form>
        </div>
        
    </div>
  );
};
export default ModalClient;
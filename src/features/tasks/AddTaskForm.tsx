import React, { useState } from "react";
import { useAppDispatch } from "../../hook";
import { addTask, getTasks } from "./tasksSlices";

const AddTaskForm = ({ onClose }: { onClose: () => void }) => {
    
    const [contenido, setContenido] = useState("");
    const [description, setDescription] = useState("");
    const [tipo, setTipo] = useState("");
    const [due_date, setDue_date] = useState("");
    const [status, setStatus] = useState("pendiente");
    
    const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
        contenido,
        tipo,
        description,
        status,
        due_date
    }
    if ( !contenido ) return;

    dispatch(
      addTask(newTask)
    );
    dispatch(getTasks());
    onClose();
    setContenido("");
    setDescription("");
    setStatus("To Do");

  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Add Task</h3>

      <label>Title</label>
      <input
        type="text"
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        required
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Fecha límite</label>
      <input
        type="date"
        value={due_date}
        onChange={(e) => setDue_date(e.target.value)}
        required
      />

      <label>Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="to do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="In Progress">Review</option>
        <option value="In Progress">Done</option>
      </select>

      <button type="submit">Create Task</button>
    </form>
  );
};

export default AddTaskForm;

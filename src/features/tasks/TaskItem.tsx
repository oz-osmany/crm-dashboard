import React from "react";

type Task = {
  id: number;
  contenido: string;
  status: string;
  description: string;
  created_at: string;
};

interface Props {
  task: Task;
  onToggle?: (taskId: number, currentStatus: string) => void;
  onDelete?: (taskId: number) => void;
}

const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete }) => {
  return (
    <div
      // className={`task-card ${task.status === "completada" ? "task-card--done" : ""}`}
    >
      <div className="task-card__header">
        <h4>{task.contenido}</h4>
        <span className="task-card__date">{task.created_at}</span>
      </div>

      <p className="task-card__desc">{task.description}</p>

      <div className="task-card__actions">
        {/* <label>
          <input
            type="checkbox"
            checked={task.status === "completada"}
            onChange={() => onToggle && onToggle(task.id, task.status)}
          />
          {task.status === "completada" ? "Completada" : "Pendiente"}
        </label> */}

        <button
          onClick={() => onDelete && onDelete(task.id)}
          className="task-card__delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

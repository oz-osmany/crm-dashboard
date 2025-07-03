import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { getTasks, removeTask } from "./tasksSlices";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.list);
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleToggle = (taskId: number, currentStatus: string) => {
    const newStatus = currentStatus === "pendiente" ? "completada" : "pendiente";
    // dispatch(completeTask({ id: taskId, status: newStatus }));
  };

  const handleDelete = (taskId: number) => {
    dispatch(removeTask(taskId));
  };

  return (
    <div className="task-list">
        {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}

      {
        tasks.map((task:any) => (
            <div key={task.id}
            className={`task-card ${task.status === "completada" ? "task-card--done" : ""}`}
            >
            <div className="task-card__header">
                <h4>{task.title}</h4>
                <span className="task-card__date">{task.due_date}</span>
            </div>

            <p className="task-card__desc">{task.description}</p>

            <div className="task-card__actions">
                <label>
                <input
                    type="checkbox"
                    checked={task.status === "completada"}
                    onChange={() => handleToggle(task.id, task.status)}
                />
                {task.status === "completada" ? "Completada" : "Pendiente"}
                </label>

                <button onClick={() => handleDelete(task.id)} className="task-card__delete">
                🗑️
                </button>
            </div>
            </div>
        ))}
    </div>
  );
};

export default TaskList;

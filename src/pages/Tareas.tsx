import { useEffect, useState } from "react";
import AddTaskForm from "../features/tasks/AddTaskForm";
import Modal from "../components/ui/Modal";
import TaskBoard from "../features/tasks/TaskBoard";
import { useAppDispatch, useAppSelector } from "../hook";
import { getTasks, updateTaskStatus } from "../features/tasks/tasksSlices";


export interface TasksData {
    contenido: string,
    tipo:string
    description: string,
    status: string,
}

const Tareas = ()  => {

  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const tasks = useAppSelector((state) => state.tasks.list);

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])
  
  const handleStatusChange = (taskId: number, newStatus: string) => {
  dispatch(updateTaskStatus({ id: taskId,  status:newStatus }));
  dispatch(getTasks())
};
  return (
    <section className="tareas-page">
      <div className="tareas-page__header">
        <h2>Task Management</h2>
      </div>
        <button onClick={handleOpenModal} className="btn btn--primary">
          + New Task
        </button>

      <TaskBoard
        tasks={tasks}
        onStatusChange={handleStatusChange}
      />

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <AddTaskForm onClose={handleCloseModal} />
        </Modal>
      )}
    </section>
  );
};

export default Tareas;

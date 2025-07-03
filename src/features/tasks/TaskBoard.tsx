import React from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from '@hello-pangea/dnd';
import TaskItem from './TaskItem';
import { useAppDispatch } from '../../hook';
import { removeTask, updateTaskStatus } from './tasksSlices';

type Tasks = {
  id: number;
  contenido: string;
  status: string;
  description: string;
  created_at: string;
  // otros campos según tu modelo
};

interface Props {
  tasks: Tasks[];
  onStatusChange: (taskId: number, newStatus: string) => void;
}

const columns = ['To Do', 'In Progress', 'Review', 'Done'];

const TaskBoard: React.FC<Props> = ({ tasks, onStatusChange }) => {

  const dispatch = useAppDispatch();

  const handleToggle = (taskId: number, currentStatus: string) => {
    // const newStatus = currentStatus === 'pendiente' ? 'completada' : 'pendiente';
    dispatch(updateTaskStatus({ id: taskId, status: currentStatus }));
  };

  const handleDelete = (taskId: number) => {
    dispatch(removeTask(taskId));
  };
  
  const tasksByColumn = columns.reduce((acc, column) => {
    acc[column] = tasks.filter((task) => task.status === column);
    return acc;
  }, {} as Record<string, Tasks[]>);
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    onStatusChange(parseInt(draggableId), destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="task-board">
        {columns.map((column) => (
          <Droppable droppableId={column} key={column}>
            {(provided) => (
              <div
                className="task-column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>{column}</h3>
                {
                tasksByColumn[column].map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="task-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem
                            task={task}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                            />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;

import axios from "../../api/axios";
import type { TasksData } from "./tasksSlices";

const API_URL = 'http://localhost:3000/tasks';

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (taskData: TasksData,getState:any) => {
    const token = (getState() as any).auth.token;
//   const response = await axios.post(API_URL, taskData);
  const response = await axios.post(API_URL, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// export const updateTaskStatus = async (id, status) => {
//   await axios.put(`/tasks/${id}`, { status });
// };

export const deleteTask = async (id: number) => {
  await axios.delete(`/tasks/${id}`);
};
function getState(): any {
    throw new Error("Function not implemented.");
}


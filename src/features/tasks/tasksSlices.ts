import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasks, createTask, deleteTask } from "./tasksAPI";
import type { RootState } from "../../store/store";
import axios from "axios";

const API_URL = 'http://localhost:3000/tasks';


export interface TasksData {   
    contenido: string,
    tipo:string
    description: string,
    status: string,
    due_date: string,
}
export interface Tasks extends TasksData {
   id:number,
    user_id: number,
    client_id: number,
    created_at:string
}
export interface TasksUnion {
  id: number;
  data: TasksData;
  
}
interface TaskState {
    list: Tasks[],
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}
const initialState: TaskState = { 
    list: [],
    status: "idle",
    error: null,
 } ;

export const getTasks = createAsyncThunk<Tasks[], void, { state: RootState }>(
  "deals/getTasks", async (_, { getState }: any) => {
  const token = getState().auth.token;
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});
export const fetchTasksbyId = createAsyncThunk<Tasks[], string, { state: RootState }>(
  'clients/fetchTasksById',//nombre de la accion
  async (id, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);
export const addTask = createAsyncThunk<Tasks, TasksData, {state: RootState}>(
    "tasks/addTask", async (tasksdata, { getState }) => {
    const token = (getState() as any).auth.token;
  const response = await axios.post(API_URL, tasksdata, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

// export const completeTask = createAsyncThunk("tasks/completeTask", async ({ id, status }) => {
//   await updateTaskStatus(id, status);
//   return { id, status };
// });

export const removeTask = createAsyncThunk("tasks/removeTask", async (id: number) => {
  await deleteTask(id);
  return id;
});
// export const updateTaskStatus = createAsyncThunk(
//   'tasks/updateTaskStatus',
//   async ({ id, status }: { id: number; status: string }) => {
//     console.log(id)
//     const res = await axios.put(`${API_URL}/${id}`, { status });
//     return res.data; // retorna solo lo necesario
//   }
// );

export const updateTaskStatus = createAsyncThunk<Tasks, { id: number; status: string }, { state: RootState }>(
  'tasks/updateTaskStatus',
  async ({ id, status }, { getState }) => {
    const token = (getState() as any).auth.token;
    console.log(token)
    const res = await axios.put(`${API_URL}/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data)
    return res.data;
  }
);


const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(getTasks.pending, (state) => {
            state.status = "loading";
        })
        .addCase(getTasks.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.list= action.payload;
        })
        .addCase(getTasks.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.error.message || "Failed to fetch deals";
            })
        .addCase(fetchTasksbyId.pending, (state) => {
                          state.status = "loading";
                        })
        .addCase(fetchTasksbyId.fulfilled, (state, action) => {
                          state.status = "succeeded";
                          state.list = action.payload;
                        })
        .addCase(fetchTasksbyId.rejected, (state) => {
                          state.status = "failed";
                          state.error = "Failed to fetch deals";
                        })
       .addCase(addTask.fulfilled, (state, action) => {
        
        state.list.push(action.payload);
      })
       .addCase(updateTaskStatus.fulfilled, (state, action) => {
    const index = state.list.findIndex(task => task.id === action.payload.id);
    if (index !== -1) {
      state.list[index].status = action.payload.status;
    }
  });
  // .addCase(removeTask.fulfilled, (state, action) => {
  //   state.list = state.list.filter(task => task.id !== action.payload);
  // });
    //   .addCase(completeTask.fulfilled, (state, action) => {
    //     const task = state.list.find((t) => t.id === action.payload.id);
    //     if (task) task.status = action.payload.status;
    //   })
    //   .addCase(removeTask.fulfilled, (state, action) => {
    //     state.list = state.list.filter((t) => t.id !== action.payload);
    //   });
  },
});

export default tasksSlice.reducer;

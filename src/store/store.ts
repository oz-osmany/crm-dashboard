import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import clientsReducer from '../features/clients/clientSlice';
import dealsReducer from "../features/deals/dealSlice";
import taskReducer from "../features/tasks/tasksSlices";
import activityReducer from "../features/clients/clientActivitySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientsReducer,
    deals: dealsReducer,
    tasks: taskReducer,
    clientActivity: activityReducer,
    // puedes añadir más reducers aquí
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

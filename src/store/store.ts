import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import clientsReducer from './slices/clientSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientsReducer,
    // puedes añadir más reducers aquí
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

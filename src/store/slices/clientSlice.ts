import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';

const API_URL = 'http://localhost:3000/clients';

export interface ClientData {
  name: string;
  email: string;
  phone: string;
  status: string;
  notes: string;
}
//Estos los asigna el backend
export interface Client extends ClientData {
  id: string;
  user_id: string;
  created_at: string;
}

export interface ClientUnion {
  id: string;
  data: ClientData;
}
interface ClientState {
  clients: Client[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  loading: false,
  error: null,
};

// Token desde Redux
const getToken = (getState: () => RootState) => getState().auth.token;

// --- Thunks async ---
export const fetchClients = createAsyncThunk<Client[], void, { state: RootState }>(
  'clients/fetchClients',
  async (_, { getState }) => {
    const token = getToken(getState);
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

export const deleteClient = createAsyncThunk<string, string, { state: RootState }>(
  'clients/deleteClient',
  async (id, { getState }) => {
    const token = getToken(getState);
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  }
);

//addClient
export const addClient = createAsyncThunk<Client, ClientData,{ state: RootState} > (
  'clients/addClient',
  async (clientData, { getState }) => {
    const token = getToken(getState);
    const res = await axios.post(`${API_URL}`,clientData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

//Update client
export const updateClient = createAsyncThunk<Client, ClientUnion, {state: RootState}> (
  'clients/updateClient',
  async ( { id, data}, { getState }) => {
    const token = getToken(getState);
    const res = await axios.put(`${API_URL}/${id}`,data, {
       headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
)

// --- Slice ---
const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })    

      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch clients';
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.clients.findIndex((c) => c.id === updated.id);

        if (index !== -1) {
          state.clients[index] = updated;
        }
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter((c) => c.id !== action.payload);
      });
      
  },
});

export default clientSlice.reducer;

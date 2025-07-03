import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { ActivityItem } from "./types";
import type { RootState } from '../../store/store';


const API_URL = 'http://localhost:3000/activity';

interface ClientActivityState {
  items: ActivityItem[];
  loading: boolean;
  error: string | null;
}

// interface Email {
//   subject: string,
//   body:string,
//   created_at: string

// }
// const intitialState: Email = {
//   list: []
// }
const initialState: ClientActivityState = {
  items: [],
  loading: false,
  error: null,
};
// export const fetchClientTasks = createAsyncThunk(
//   "activity/fetchTasks",
//   async (clientId: string) => {
//     const res = await axios.get(`/api/activity/tasks/${clientId}`);
//     return res.data.map((task: any) => ({ ...task, type: "task" }));
//   }
// );

// export const fetchClientNotes = createAsyncThunk(
//   "activity/fetchNotes",
//   async (clientId: string) => {
//     const res = await axios.get(`/api/activity/notes/${clientId}`);
//     return res.data.map((note: any) => ({ ...note, type: "note" }));
//   }
// );

export const fetchClientEmails = createAsyncThunk<ActivityItem[], void, { state: RootState }>(
  "activity/fetchEmails",
   async (_, { getState }) => {
    const token = getToken(getState);
    const res = await axios.get(API_URL , {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);
export const fetchClientCalls = createAsyncThunk<ActivityItem[], void, { state: RootState }>(
  "activity/fetchCalls",
   async (_, { getState }) => {
    const token = getToken(getState);
    const res = await axios.get('API_URL/calls' , {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

// export const fetchClientCalls = createAsyncThunk(
//   "activity/fetchCalls",
//   async (clientId: string) => {
//     const res = await axios.get(`/api/activity/calls/${clientId}`);
//     return res.data.map((call: any) => ({ ...call, type: "call" }));
//   }
// );
const getToken = (getState: () => RootState) => getState().auth.token;



export const fetchClientActivity = createAsyncThunk<
  ActivityItem[],      // lo que retorna
  string,              // parámetro: clientId
  { state: RootState } // acceso al state para obtener el token
>(
  'clientActivity/fetchClientActivity',
  async (clientId, { getState }) => {
    const token = getToken(getState);
    const res = await axios.get(`${API_URL}/${clientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);
const clientActivitySlice = createSlice({
  name: "clientActivity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchClientEmails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchClientCalls.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientCalls.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      
  },
});

export default clientActivitySlice.reducer;

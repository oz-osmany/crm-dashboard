import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../../store/store";
const API_URL = 'http://localhost:3000/deals';

export interface DealData {
  
  client_id: number | string;
  title: string;
  amount: number;
  status: "nuevo" | "contactado" | "ganado" | "perdido";
  close_date: string;
  notes: string;
}
export interface Deal extends DealData {
  id: string;
  created_at: string;
}

interface DealState {
  // selectedDeal: Deal | null ;
  deals: Deal[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DealState = {
  // selectedDeal: null,
  deals: [],
  status: "idle",
  error: null,
};

// Token desde Redux
const getToken = (getState: () => RootState) => getState().auth.token;

// GET
export const fetchDeals = createAsyncThunk<Deal[], void, { state: RootState }>(
  "deals/fetchDeals", async (_, { getState }: any) => {
  const token = getState().auth.token;
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});
//Get by Id
export const fetchDealsbyId = createAsyncThunk<Deal[], string, { state: RootState }>(
  'clients/fetchDealsById',//nombre de la accion
  async (id, { getState }) => {
    const token = getToken(getState);
    const res = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

// POST
export const createDeal = 

createAsyncThunk<Deal, DealData, { state: RootState }>(
  "deals/createDeal", async (dealdata, { getState }) => {
    const token = (getState() as any).auth.token;
  const response = await axios.post(API_URL, dealdata, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

const dealSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deals = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch deals";
      })
      // .addCase(createDeal.fulfilled, (state, action) => {
      //   state.deals.push(action.payload);
      // });
      .addCase(fetchDealsbyId.pending, (state) => {
              state.status = "loading";
            })
      .addCase(fetchDealsbyId.fulfilled, (state, action) => {
              state.status = "succeeded";
              state.deals = action.payload;
            })
      .addCase(fetchDealsbyId.rejected, (state) => {
              state.status = "failed";
              state.error = "Failed to fetch deals";
            })
  },
});

export default dealSlice.reducer;

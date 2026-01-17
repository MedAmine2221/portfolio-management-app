import { createSlice } from "@reduxjs/toolkit";

const initialState: { clients: any[] } = {
  clients: [],
};
const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    clearClients: (state) => {
      state.clients = [];
    },
    updateClient: (state, action) => {
      const { id } = action.payload;      
      const index = state.clients.findIndex(
        (client) => client.id === id
      );      
      if (index !== -1) {
        state.clients[index] = {
          ...state.clients[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { setClients, clearClients, updateClient } = clientSlice.actions;
export default clientSlice.reducer;

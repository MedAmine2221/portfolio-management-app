import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clients: [],
};
const calendarSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    clearClients: (state) => {
      state.clients = [];
    },
  },
});

export const { setClients, clearClients } = calendarSlice.actions;
export default calendarSlice.reducer;

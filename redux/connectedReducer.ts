import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
};
const connectedSlice = createSlice({
  name: "connected",
  initialState,
  reducers: {
    setConnectedTrue: (state) => {
      state.connected = true;
    },
    setConnectedFalse: (state) => {
      state.connected = false;
    },
  },
});

export const { setConnectedFalse, setConnectedTrue } = connectedSlice.actions;
export default connectedSlice.reducer;

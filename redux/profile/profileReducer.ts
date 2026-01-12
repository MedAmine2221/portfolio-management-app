import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: null,
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.items = action.payload;
    },
    clearProfile: (state) => {
      state.items = null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: {
        email: "",
        password: "",
        remember: false
    },
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.auth = action.payload;
        },
        clearAuth: (state) => {
            state.auth = {
                email: "",
                password: "",
                remember: false
            };
        },
    }
});
export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
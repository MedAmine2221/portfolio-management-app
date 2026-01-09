import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    calendar: [],
}
const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        setCalendar: (state, action) => {
            state.calendar = action.payload;
        },
        clearCalendar: (state) => {
            state.calendar = [];
        },
    }
});
export const { setCalendar, clearCalendar } = calendarSlice.actions;
export default calendarSlice.reducer;
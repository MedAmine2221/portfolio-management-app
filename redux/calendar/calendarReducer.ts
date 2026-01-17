import { createSlice } from "@reduxjs/toolkit";

const initialState: { calendar: any[] } = {
  calendar: [],
};
const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendar: (state, action) => {
      state.calendar = action.payload;
    },

    addEvent: (state, action) => {
      state.calendar.push(action.payload);
    },
    updateEvent: (state, action) => {
      const index = state.calendar.findIndex(
        (event) => event.id === action.payload.id
      );
      if (index !== -1) {
        state.calendar[index] = {
          ...state.calendar[index],
          ...action.payload,
        };
      }
    },
    deleteEventFromCalendar: (state, action) => {
      state.calendar = state.calendar.filter(
        (event) => event.id !== action.payload.id
      );
    }, 
    clearCalendar: (state) => {
      state.calendar = [];
    },
  },
});

export const { setCalendar, clearCalendar, addEvent, updateEvent, deleteEventFromCalendar } = calendarSlice.actions;
export default calendarSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile/profileReducer";
import loadingReducer from "./loadingReducer";
import calendarReducer from "./calendar/calendarReducer";
import clientReducer from "./clients/clientReducer";
import authReducer from "./auth/authReducer";

export const store = configureStore({    
    reducer: {
        profile: profileReducer,
        calendar: calendarReducer,
        clients: clientReducer,
        loading: loadingReducer,
        auth: authReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
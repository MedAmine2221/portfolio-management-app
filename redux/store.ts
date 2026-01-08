import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile/profileReducer";
import loadingReducer from "./loadingReducer";

export const store = configureStore({    
    reducer: {
        profile: profileReducer,
        loading: loadingReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
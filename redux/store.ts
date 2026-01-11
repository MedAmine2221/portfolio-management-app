import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import profileReducer from "./profile/profileReducer";
import loadingReducer from "./loadingReducer";
import calendarReducer from "./calendar/calendarReducer";
import clientReducer from "./clients/clientReducer";
import authReducer from "./auth/authReducer";

const authPersistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    calendar: calendarReducer,
    clients: clientReducer,
    loading: loadingReducer,
    auth: persistedAuthReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

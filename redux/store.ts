import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import profileReducer from "./profile/profileReducer";
import loadingReducer from "./loadingReducer";
import calendarReducer from "./calendar/calendarReducer";
import clientReducer from "./clients/clientReducer";
import authReducer from "./auth/authReducer";
import tokenReducer from "./token/tokenReducer";

const authPersistConfig = {
  key: "auth",
  storage,
};
const tokenPersistConfig = {
  key: "token",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedTokenReducer = persistReducer(tokenPersistConfig, tokenReducer);

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    calendar: calendarReducer,
    clients: clientReducer,
    loading: loadingReducer,
    auth: persistedAuthReducer,
    token: persistedTokenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these redux-persist action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

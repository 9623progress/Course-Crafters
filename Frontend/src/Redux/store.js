import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "./slices/userSlice";

// Persist Config
const persistConfig = {
  key: "Course Selling app",
  storage, // Use localStorage
};

// Wrap your userReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Allow non-serializable values to persist
    }),
  devTools: {
    name: "Course Selling app",
  },
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };

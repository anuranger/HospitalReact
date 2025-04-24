import { configureStore } from '@reduxjs/toolkit';
import treeReducer from './treeSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, treeReducer);

export const store = configureStore({
  reducer: {
    tree: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    })
});

export const persistor = persistStore(store);

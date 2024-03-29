import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { getListOfUser } from "../reducer/index.js";
import localStorage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { fetchAllPatient } from "../reducer/PatientReducer.js";

const persistConfig = {
  key: "root",
  storage: localStorage,
};

const bigReducer = combineReducers({
  user: getListOfUser,
  patient: fetchAllPatient,
});

const persistedReducer = persistReducer(persistConfig, bigReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

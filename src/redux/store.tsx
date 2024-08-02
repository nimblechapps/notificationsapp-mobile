import {
  PayloadAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import notificationSlice from "./features/notification/notificationSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const combinedReducer = combineReducers({
  notification: notificationSlice,
});

const rootReducer = (state: any, action: PayloadAction | never) => {
  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

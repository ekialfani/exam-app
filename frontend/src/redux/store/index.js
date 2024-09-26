import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import examReducer from "../slice/examSlice";
import questionReducer from "../slice/questionSlice";
import studentReducer from "../slice/studentSlice";
import lecturerReducer from "../slice/lecturerSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducers = combineReducers({
  auth: authReducer,
  exam: examReducer,
  question: questionReducer,
  student: studentReducer,
  lecturer: lecturerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };

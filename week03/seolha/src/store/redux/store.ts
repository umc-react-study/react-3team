import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

// 타입 (TS 필수🔥)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
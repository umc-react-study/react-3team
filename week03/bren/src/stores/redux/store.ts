import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice.ts";

// Redux store 생성
export const store = configureStore({
  reducer: {
    // todo라는 이름으로 slice reducer 등록
    todo: todoReducer,
  },
});

// TypeScript에서 store 타입 자동 추론용
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

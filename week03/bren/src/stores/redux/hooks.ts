import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// dispatch를 타입 안전하게 쓰기 위한 훅
export const useAppDispatch = () => useDispatch<AppDispatch>();

// selector를 타입 안전하게 쓰기 위한 훅
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

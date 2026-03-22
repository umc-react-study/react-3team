import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";
import type { Priority, State, Todo } from "../../types/redux/Todo";

const initialState: State = {
  todos: JSON.parse(localStorage.getItem("todos") || "[]"),
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    ADD_TODO: (state, action: PayloadAction<{ text: string; priority: Priority }>) => {
      state.todos.push({
        id: crypto.randomUUID(),
        text: action.payload.text,
        priority: action.payload.priority,
        completed: false,
      });
    },

    TOGGLE_TODO: (state, action: PayloadAction<{ id: string }>) => {
      const todo = state.todos.find(t => t.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    DELETE_TODO: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter(t => t.id !== action.payload.id);
    },

    LOAD_TODOS: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },

    CLEAR_COMPLETED: (state) => {
      state.todos = state.todos.filter(t => !t.completed);
    },

    RESET_SAMPLE: (state) => {
      state.todos = [
        { id: crypto.randomUUID(), text: "리액트 공부하기", priority: "mid", completed: false },
        { id: crypto.randomUUID(), text: "할 일 목록 만들기", priority: "high", completed: true },
        { id: crypto.randomUUID(), text: "리듀서 연습하기", priority: "low", completed: false },
      ];
    },
  },
});

export const {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  LOAD_TODOS,
  CLEAR_COMPLETED,
  RESET_SAMPLE,
} = todoSlice.actions;

export default todoSlice.reducer;
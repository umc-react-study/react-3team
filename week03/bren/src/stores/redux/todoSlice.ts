import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { sampleTodos } from "../../data/sampleTodos";
import type { RootState } from "./store";
import type { Priority, Todo, TodoFilter } from "../../types/todo";

// Redux todo 상태 구조
type TodoState = {
  todos: Todo[];
  filter: TodoFilter;
};

// 초기 상태
const initialState: TodoState = {
  todos: sampleTodos,
  filter: "all",
};

// createSlice는 action + reducer를 한 번에 만들어준다.
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // 새 할 일 추가
    addTodo: (state, action: PayloadAction<{ text: string; priority: Priority }>) => {
      // 새로운 todo 객체 생성
      const newTodo: Todo = {
        id: Date.now(), // 간단하게 고유 id 생성
        text: action.payload.text,
        priority: action.payload.priority,
        completed: false,
      };

      // Redux Toolkit은 Immer를 써서 이런 식으로 직접 수정처럼 써도 괜찮다.
      state.todos.unshift(newTodo);
    },

    // 완료 여부 토글
    toggleTodo: (state, action: PayloadAction<number>) => {
      // id가 같은 항목 찾기
      const target = state.todos.find((todo) => todo.id === action.payload);

      // 찾았으면 completed 값을 반대로 바꾼다.
      if (target) {
        target.completed = !target.completed;
      }
    },

    // 할 일 하나 삭제
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    // 완료 항목 전체 삭제
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },

    // 필터 변경
    setFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload;
    },

    // 샘플 상태로 초기화
    resetSample: (state) => {
      state.todos = sampleTodos;
      state.filter = "all";
    },
  },
});

// action export
export const { addTodo, toggleTodo, deleteTodo, clearCompleted, setFilter, resetSample } = todoSlice.actions;

// reducer export
export default todoSlice.reducer;

/* ---------------------------
   selector 모음
   컴포넌트가 필요한 값을 꺼내기 쉽게 만든 함수
---------------------------- */

// 전체 todo state
export const selectTodoState = (state: RootState) => state.todo;

// 원본 todos
export const selectTodos = (state: RootState) => state.todo.todos;

// 현재 filter
export const selectFilter = (state: RootState) => state.todo.filter;

// 전체 개수
export const selectTotalCount = (state: RootState) => state.todo.todos.length;

// 진행중 개수
export const selectActiveCount = (state: RootState) => state.todo.todos.filter((todo) => !todo.completed).length;

// 완료 개수
export const selectCompletedCount = (state: RootState) => state.todo.todos.filter((todo) => todo.completed).length;

// 현재 filter에 맞는 목록
export const selectFilteredTodos = (state: RootState) => {
  const { todos, filter } = state.todo;

  if (filter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (filter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
};

import type { Priority, State, Todo } from "../../types/redux/Todo";

type Action =
  | { type: "ADD_TODO"; payload: { text: string; priority: Priority } }
  | { type: "TOGGLE_TODO"; payload: { id: string } }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "LOAD_TODOS"; payload: Todo[] }
  | { type: "CLEAR_COMPLETED" }
  | { type: "RESET_SAMPLE" }; 

export function todoReducer(state: State, action: Action): State {
  switch (action.type) {

    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: crypto.randomUUID(),
            text: action.payload.text,
            priority: action.payload.priority,
            completed: false,
          },
        ],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => todo.id !== action.payload.id
        ),
      };

    case "LOAD_TODOS":
      return {
        ...state,
        todos: action.payload,
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case "RESET_SAMPLE":
      return {
        ...state,
        todos: [
          { id: crypto.randomUUID(), text: "리액트 공부하기", priority: "mid", completed: false },
          { id: crypto.randomUUID(), text: "할 일 목록 만들기", priority: "high", completed: true },
          { id: crypto.randomUUID(), text: "리듀서 연습하기", priority: "low", completed: false },
        ],
      };

    default:
      return state;
  }
}
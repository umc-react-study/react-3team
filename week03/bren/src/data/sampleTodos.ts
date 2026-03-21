import type { Todo } from "../types/todo";

export const sampleTodos: Todo[] = [
  {
    id: 1,
    text: "Redux 공부하기",
    completed: true,
    priority: "high",
  },
  {
    id: 2,
    text: "Zustand 공부하기",
    completed: false,
    priority: "medium",
  },
  {
    id: 3,
    text: "Context 공부하기",
    completed: false,
    priority: "low",
  },
];

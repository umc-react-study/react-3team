export type Priority = "high" | "mid" | "low";

export type Todo = {
  id: string;
  text: string;
  priority: Priority;
  completed: boolean;
};

export type State = {
  todos: Todo[];
};
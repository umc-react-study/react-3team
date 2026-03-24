export type Priority = "low" | "medium" | "high";
export type TodoFilter = "all" | "active" | "completed";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
}

import { createContext, useContext, useState, type ReactNode } from "react";

// Type

type Todo = { id: number; text: string; completed: boolean };

// Context

type TodoContextValue = {
  todos: Todo[];
  input: string;
  setInput: (v: string) => void;
  addTodo: () => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

const TodoContext = createContext<TodoContextValue | null>(null);

function useTodoContext() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("TodoList 컴포넌트 안에서만 사용할 수 있습니다.");
  return ctx;
}

// Compound Component

type TodoListProps = {
  initialTodos?: Todo[];
  children: ReactNode;
};

function TodoList({ initialTodos = [], children }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [input, setInput] = useState("");

  function addTodo() {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
    setInput("");
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <TodoContext.Provider value={{ todos, input, setInput, addTodo, toggleTodo, deleteTodo }}>
      <div className="max-w-md mx-auto space-y-4">{children}</div>
    </TodoContext.Provider>
  );
}

// Sub-components

TodoList.Header = function Header({ title }: { title: string }) {
  const { todos } = useTodoContext();
  const done = todos.filter((t) => t.completed).length;

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">{title}</h2>
      <span className="text-sm text-white/40">
        {done} / {todos.length} 완료
      </span>
    </div>
  );
};

TodoList.AddForm = function AddForm() {
  const { input, setInput, addTodo } = useTodoContext();

  return (
    <div className="flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTodo()}
        placeholder="할 일 추가..."
        className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-white/50"
      />
      <button
        onClick={addTodo}
        className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        추가
      </button>
    </div>
  );
};

TodoList.Empty = function Empty({ message = "할 일이 없습니다." }: { message?: string }) {
  return (
    <p className="text-center text-white/40 py-8">{message}</p>
  );
};

TodoList.Item = function Item({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <li className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4 accent-blue-500"
      />
      <span
        className={`flex-1 text-sm ${todo.completed ? "line-through text-white/40" : ""}`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-white/30 hover:text-red-400 transition-colors text-lg leading-none"
      >
        ×
      </button>
    </li>
  );
};

TodoList.Items = function Items() {
  const { todos, toggleTodo, deleteTodo } = useTodoContext();

  if (todos.length === 0) return <TodoList.Empty />;

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoList.Item key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
      ))}
    </ul>
  );
};



const INITIAL_TODOS: Todo[] = [
  { id: 1, text: "SRP 개념 이해하기", completed: true },
  { id: 2, text: "Presentational/Container 패턴 학습", completed: false },
  { id: 3, text: "Compound Component 실습", completed: false },
];

export function MyPractice() {
  return (
    <TodoList initialTodos={INITIAL_TODOS}>
      <TodoList.Header title="📋 Todo List" />
      <TodoList.AddForm />
      <TodoList.Items />
    </TodoList>
  );
}

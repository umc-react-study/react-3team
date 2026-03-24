/**
 * Step 2: Presentational / Container Pattern
 *
 * actor별로 컴포넌트를 분리한다.
 *
 * Presentational (TodoView, TodoItem):
 *   - UI만 담당. 데이터가 어디서 오는지 모른다.
 *   - props로만 데이터를 받는다.
 *
 * Container (TodoContainer):
 *   - 상태와 로직만 담당. UI가 어떻게 생겼는지 모른다.
 *   - Presentational에게 데이터와 핸들러를 내려준다.
 */

import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Todo = { id: number; text: string; completed: boolean };

// ─── Presentational Components ────────────────────────────────────────────────

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
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
}

type TodoViewProps = {
  todos: Todo[];
  input: string;
  onInputChange: (value: string) => void;
  onAdd: () => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

function TodoView({ todos, input, onInputChange, onAdd, onToggle, onDelete }: TodoViewProps) {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">📋 Todo List</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAdd()}
          placeholder="할 일 추가..."
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-white/50"
        />
        <button
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          추가
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="text-center text-white/40 py-8">할 일이 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Container Component ──────────────────────────────────────────────────────

export function Step2_PresentationalContainer() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "SRP 개념 이해하기", completed: true },
    { id: 2, text: "Presentational/Container 패턴 학습", completed: false },
    { id: 3, text: "Compound Component 실습", completed: false },
  ]);
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
    <>
      <div className="max-w-md mx-auto bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4 text-sm text-blue-300">
        ✅ UI(TodoView)와 로직(Container)이 분리됐습니다.<br />
        <span className="text-white/50 text-xs">단, Container 컴포넌트 자체의 재사용성은 여전히 낮습니다.</span>
      </div>
      <TodoView
        todos={todos}
        input={input}
        onInputChange={setInput}
        onAdd={addTodo}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </>
  );
}

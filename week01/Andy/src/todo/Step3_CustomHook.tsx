/**
 * Step 3: Custom Hook
 *
 * Container 컴포넌트를 Custom Hook으로 대체한다.
 *
 * useTodos():
 *   - 상태와 로직만 담당.
 *   - 어떤 컴포넌트에서도, 어떤 방식으로도 조합 가능.
 *   - Container 컴포넌트와 달리 JSX를 반환하지 않아 더 유연하다.
 *
 * TodoApp:
 *   - Hook에서 데이터/핸들러를 받아 Presentational 컴포넌트에 전달.
 *   - 조합의 중심이 컴포넌트 트리가 아니라 함수 호출로 이동한다.
 */

import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Todo = { id: number; text: string; completed: boolean };

// ─── Custom Hook (Container 대체) ─────────────────────────────────────────────

function useTodos(initialTodos: Todo[]) {
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

  return { todos, input, setInput, addTodo, toggleTodo, deleteTodo };
}

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

// ─── App ──────────────────────────────────────────────────────────────────────

const INITIAL_TODOS: Todo[] = [
  { id: 1, text: "SRP 개념 이해하기", completed: true },
  { id: 2, text: "Presentational/Container 패턴 학습", completed: true },
  { id: 3, text: "Custom Hook으로 Container 대체", completed: false },
  { id: 4, text: "Compound Component 실습", completed: false },
];

export function Step3_CustomHook() {
  const { todos, input, setInput, addTodo, toggleTodo, deleteTodo } =
    useTodos(INITIAL_TODOS);

  return (
    <>
      <div className="max-w-md mx-auto bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4 text-sm text-green-300">
        ✅ Container가 <code className="bg-white/10 px-1 rounded">useTodos()</code> Hook으로 대체됐습니다.<br />
        <span className="text-white/50 text-xs">로직을 어떤 컴포넌트에서도 재사용할 수 있습니다.</span>
      </div>

      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">📋 Todo List</h2>

        <div className="flex gap-2 mb-4">
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

        {todos.length === 0 ? (
          <p className="text-center text-white/40 py-8">할 일이 없습니다.</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

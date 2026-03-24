/**
 * Step 1: Monolithic Component
 *
 * 하나의 컴포넌트에 UI, 상태, 로직이 모두 섞여 있다.
 * actor가 여럿이라 변경 이유가 여러 개다.
 *   - 디자인 바뀌면 → JSX 수정
 *   - 필터 로직 바뀌면 → 상태/핸들러 수정
 *   - 저장 방식 바뀌면 (API/localStorage) → fetch 로직 수정
 */

import { useState } from "react";

type Todo = { id: number; text: string; completed: boolean };

export function Step1_Monolithic() {
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
    <div className="max-w-md mx-auto">
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4 text-sm text-yellow-300">
        ⚠️ UI / 상태 / 로직이 하나의 컴포넌트에 뒤섞여 있습니다.
      </div>

      <h2 className="text-xl font-bold mb-4">📋 Todo List</h2>

      {/* Add Form */}
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

      {/* List */}
      {todos.length === 0 ? (
        <p className="text-center text-white/40 py-8">할 일이 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-4 h-4 accent-blue-500"
              />
              <span
                className={`flex-1 text-sm ${todo.completed ? "line-through text-white/40" : ""}`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-white/30 hover:text-red-400 transition-colors text-lg leading-none"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

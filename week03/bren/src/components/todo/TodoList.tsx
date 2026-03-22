import TodoItem from "./TodoItem";
import type { Todo, TodoFilter } from "../../types/todo";

type TodoListProps = {
  todos: Todo[];
  currentFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onClearCompleted: () => void;
  onResetSample: () => void;
};

export default function TodoList({
  todos,
  currentFilter,
  onFilterChange,
  onToggleTodo,
  onDeleteTodo,
  onClearCompleted,
  onResetSample,
}: TodoListProps) {
  // 필터 버튼 스타일 재사용
  const getFilterButtonClass = (filter: TodoFilter) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      currentFilter === filter
        ? "bg-blue-600 text-white"
        : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
    }`;

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold text-slate-900">할 일 목록</h2>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onClearCompleted}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            완료 항목 삭제
          </button>

          <button
            onClick={onResetSample}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            샘플로 초기화
          </button>
        </div>
      </div>

      {/* 필터 버튼 영역 */}
      <div className="mt-4 flex gap-2">
        <button onClick={() => onFilterChange("all")} className={getFilterButtonClass("all")}>
          전체
        </button>

        <button onClick={() => onFilterChange("active")} className={getFilterButtonClass("active")}>
          진행중
        </button>

        <button onClick={() => onFilterChange("completed")} className={getFilterButtonClass("completed")}>
          완료
        </button>
      </div>

      {/* 목록이 비었을 때 문구 */}
      {todos.length === 0 ? (
        <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center text-sm text-slate-500">
          현재 표시할 할 일이 없어.
        </div>
      ) : (
        <ul className="mt-5 space-y-3">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={onToggleTodo} onDelete={onDeleteTodo} />
          ))}
        </ul>
      )}
    </section>
  );
}

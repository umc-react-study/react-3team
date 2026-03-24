import type { Todo } from "../../types/todo";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

// 우선순위 뱃지 스타일 매핑
const priorityStyleMap = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-rose-100 text-rose-700",
};

// 우선순위 라벨 한글 변환
const priorityLabelMap = {
  low: "낮음",
  medium: "보통",
  high: "높음",
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        {/* 완료 여부 체크박스 */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-4 w-4 accent-blue-600"
        />

        {/* completed가 true면 밑줄 + 흐린 색 */}
        <span className={`text-sm font-medium ${todo.completed ? "text-slate-400 line-through" : "text-slate-800"}`}>
          {todo.text}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* 우선순위 뱃지 */}
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyleMap[todo.priority]}`}>
          {priorityLabelMap[todo.priority]}
        </span>

        {/* 개별 삭제 버튼 */}
        <button
          onClick={() => onDelete(todo.id)}
          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50"
        >
          삭제
        </button>
      </div>
    </li>
  );
}

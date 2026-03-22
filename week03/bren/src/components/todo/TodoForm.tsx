import type { Priority } from "../../types/todo";

type TodoFormProps = {
  text: string;
  priority: Priority;
  onTextChange: (value: string) => void;
  onPriorityChange: (value: Priority) => void;
  onSubmit: () => void;
};

export default function TodoForm({ text, priority, onTextChange, onPriorityChange, onSubmit }: TodoFormProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">할 일 추가</h2>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_160px_100px]">
        {/* 할 일 입력 */}
        <input
          type="text"
          value={text}
          placeholder="새 할 일을 입력하세요"
          onChange={(e) => onTextChange(e.target.value)}
          onKeyDown={(e) => {
            // Enter 키로도 추가 가능하게 처리
            if (e.key === "Enter") {
              onSubmit();
            }
          }}
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />

        {/* 우선순위 선택 */}
        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value as Priority)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option value="low">낮음</option>
          <option value="medium">보통</option>
          <option value="high">높음</option>
        </select>

        {/* 추가 버튼 */}
        <button
          onClick={onSubmit}
          className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          추가
        </button>
      </div>
    </section>
  );
}

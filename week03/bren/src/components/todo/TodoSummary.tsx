type TodoSummaryProps = {
  totalCount: number;
  activeCount: number;
  completedCount: number;
};

export default function TodoSummary({ totalCount, activeCount, completedCount }: TodoSummaryProps) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* 전체 카드 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">전체 할 일</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">{totalCount}</h2>
      </div>

      {/* 진행중 카드 */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
        <p className="text-sm font-medium text-blue-600">진행중</p>
        <h2 className="mt-2 text-3xl font-bold text-blue-700">{activeCount}</h2>
      </div>

      {/* 완료 카드 */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
        <p className="text-sm font-medium text-emerald-600">완료</p>
        <h2 className="mt-2 text-3xl font-bold text-emerald-700">{completedCount}</h2>
      </div>
    </section>
  );
}

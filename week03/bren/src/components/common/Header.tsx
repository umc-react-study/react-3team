// 헤더 (네비게이션)
import { NavLink } from "react-router-dom";

// 공통으로 사용할 링크 스타일 함수
const getNavClassName = ({ isActive }: { isActive: boolean }) =>
  `rounded-xl px-4 py-2 text-sm font-semibold transition ${
    isActive ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-200"
  }`;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#999] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Week3 React Study</h1>
          <p className="text-xs text-slate-500">Redux / Context / Zustand</p>
        </div>

        <nav className="flex flex-wrap gap-2">
          <NavLink to="/redux" className={getNavClassName}>
            Redux
          </NavLink>

          <NavLink to="/context" className={getNavClassName}>
            Context
          </NavLink>

          <NavLink to="/zustand" className={getNavClassName}>
            Zustand
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

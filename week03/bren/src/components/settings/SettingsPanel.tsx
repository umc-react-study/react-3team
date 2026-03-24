import { useSettings } from "../../stores/context/SettingsContext";

export default function SettingsPanel() {
  const { state, setTheme, setLanguage, setNotificationsEnabled, resetDefaults } = useSettings();

  return (
    <section className="rounded-2xl border border-white/10 bg-[#2a2a2a] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">설정 패널</h3>
        <button
          onClick={resetDefaults}
          className="rounded-lg border border-white/10 bg-[#353535] px-4 py-2 text-sm text-slate-200 transition hover:bg-[#404040]"
        >
          기본값 복원
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-[#2f2f2f] p-4">
          <p className="text-xs text-slate-400">테마</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setTheme("dark")}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                state.theme === "dark" ? "bg-slate-100 text-slate-900" : "bg-[#3a3a3a] text-slate-200"
              }`}
            >
              다크
            </button>
            <button
              onClick={() => setTheme("light")}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                state.theme === "light" ? "bg-slate-100 text-slate-900" : "bg-[#3a3a3a] text-slate-200"
              }`}
            >
              라이트
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#2f2f2f] p-4">
          <p className="text-xs text-slate-400">언어</p>
          <select
            value={state.language}
            onChange={(e) => setLanguage(e.target.value as "ko" | "en")}
            className="mt-3 w-full rounded-lg border border-white/10 bg-[#3a3a3a] px-3 py-2 text-sm text-white outline-none"
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#2f2f2f] p-4">
          <p className="text-xs text-slate-400">알림</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setNotificationsEnabled(true)}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                state.notificationsEnabled ? "bg-slate-100 text-slate-900" : "bg-[#3a3a3a] text-slate-200"
              }`}
            >
              켜짐
            </button>
            <button
              onClick={() => setNotificationsEnabled(false)}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                !state.notificationsEnabled ? "bg-slate-100 text-slate-900" : "bg-[#3a3a3a] text-slate-200"
              }`}
            >
              꺼짐
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

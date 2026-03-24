import { useSettings } from "../../stores/context/SettingsContext";

export default function SettingsPreviewCard() {
  const { state } = useSettings();

  const isDark = state.theme === "dark";
  const isKo = state.language === "ko";

  const cardClass = isDark ? "bg-[#04153b] text-white" : "bg-white text-slate-900";

  return (
    <section className="rounded-2xl border border-white/10 bg-[#2a2a2a] p-5 shadow-sm">
      <h3 className="text-lg font-bold text-white">{isKo ? "미리보기 카드" : "Preview Card"}</h3>

      <div className={`mt-4 rounded-2xl p-5 shadow-sm ${cardClass}`}>
        <p className="text-sm font-bold">
          {isKo ? `현재 테마: ${isDark ? "Dark" : "Light"}` : `Current Theme: ${isDark ? "Dark" : "Light"}`}
        </p>

        <p className="mt-2 text-sm opacity-80">
          {isKo ? "Context가 가져온 설정을 UI에 반영합니다." : "Applying settings from Context to the UI."}
        </p>

        <p className="mt-4 text-sm font-medium">
          {isKo
            ? `알림 상태: ${state.notificationsEnabled ? "ON" : "OFF"}`
            : `Notifications: ${state.notificationsEnabled ? "ON" : "OFF"}`}
        </p>
      </div>
    </section>
  );
}

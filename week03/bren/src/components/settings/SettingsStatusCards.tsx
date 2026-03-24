import { useSettings } from "../../stores/context/SettingsContext";

export default function SettingsStatusCards() {
  const { state } = useSettings();

  const themeLabel = state.theme === "dark" ? "Dark" : "Light";
  const languageLabel = state.language === "ko" ? "한국어" : "English";
  const notificationsLabel = state.notificationsEnabled ? "Enabled" : "Disabled";

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-indigo-400/30 bg-gradient-to-br from-indigo-900/70 to-indigo-800/40 p-5 shadow-sm">
        <p className="text-xs text-slate-300">Theme</p>
        <h3 className="mt-2 text-2xl font-bold text-white">{themeLabel}</h3>
      </div>

      <div className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-900/60 to-emerald-800/30 p-5 shadow-sm">
        <p className="text-xs text-slate-300">Language</p>
        <h3 className="mt-2 text-2xl font-bold text-white">{languageLabel}</h3>
      </div>

      <div className="rounded-2xl border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-900/60 to-fuchsia-800/30 p-5 shadow-sm">
        <p className="text-xs text-slate-300">Notifications</p>
        <h3 className="mt-2 text-2xl font-bold text-white">{notificationsLabel}</h3>
      </div>
    </section>
  );
}

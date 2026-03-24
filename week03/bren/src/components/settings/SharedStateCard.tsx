import { useSettings } from "../../stores/context/SettingsContext";

export default function SharedStateCard() {
  const { state } = useSettings();

  return (
    <section className="rounded-2xl border border-indigo-500/20 bg-[#241f35] p-5 shadow-sm">
      <p className="text-sm text-slate-200">
        공유 상태: theme={state.theme} | language={state.language} | notifications={String(state.notificationsEnabled)}
      </p>
    </section>
  );
}

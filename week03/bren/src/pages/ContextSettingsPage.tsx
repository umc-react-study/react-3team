import { SettingsProvider } from "../stores/context/SettingsContext";
import SettingsStatusCards from "../components/settings/SettingsStatusCards";
import SettingsPanel from "../components/settings/SettingsPanel";
import SettingsPreviewCard from "../components/settings/SettingsPreviewCard";
import NotificationFeed from "../components/settings/NotificationFeed";
import SharedStateCard from "../components/settings/SharedStateCard";

function ContextSettingsContent() {
  return (
    <div className="space-y-6">
      <SettingsStatusCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <SettingsPanel />
          <SettingsPreviewCard />
        </div>

        <div className="space-y-6">
          <NotificationFeed />
          <SharedStateCard />
        </div>
      </div>
    </div>
  );
}

export default function ContextSettingsPage() {
  return (
    <SettingsProvider>
      <ContextSettingsContent />
    </SettingsProvider>
  );
}

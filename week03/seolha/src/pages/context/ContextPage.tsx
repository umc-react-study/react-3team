import { useSettings } from "../../store/context/SettingsContext";
import NotificationFeed from "./NotificationFeed";
import PreviewCard from "./PreviewCard";
import SettingsPanel from "./SettingsPanel";

export default function ContextPage() {
    const { theme, language, notification } = useSettings(); // Context 사용을 위한 커스텀 훅 호출 (값은 SettingsPanel과 PreviewCard에서 사용)
    return (
        <div className="bg-[#242424] min-h-screen p-4 gap-4 flex flex-col">
            <div className="flex flex-row items-start gap-4 text-white">

                {/* Theme */}
                <div
                    className={`w-full border border-[#4a4a4a] p-4 rounded-2xl ${
                        theme === "dark"
                        ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur"
                        : "bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur"
                    }`}
                >
                    <p className="text-gray-300">Theme</p>
                    <h1 className="text-2xl font-bold">{theme}</h1>
                </div>

                {/* Language */}
                <div className="w-full border border-[#4a4a4a] p-4 rounded-2xl 
                    bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur">
                    <p className="text-gray-300">Language</p>
                    <h1 className="text-2xl font-bold">{language === 'ko' ? '한국어' : 'English'}</h1>
                </div>

                {/* Notification */}
                <div className="w-full border border-[#4a4a4a] p-4 rounded-2xl 
                    bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur">
                    <p className="text-gray-300">Notification</p>
                    <h1 className="text-2xl font-bold">{notification ? "Enabled" : "Disabled"}</h1>
                </div>

            </div>
            <SettingsPanel />
            <PreviewCard />
            <NotificationFeed />
        </div>
    );
}
import { useSettings } from "../../store/context/SettingsContext";

export default function PreviewCard() {
    const { language, theme, notification } = useSettings();

    const text = {
        ko: {
            title: "미리보기 카드",
            currentTheme: "현재 테마",
            dark: "다크",
            light: "라이트",
            description: "이 카드에서는 현재 선택된 테마의 미리보기를 보여줍니다.",
            notification: "알림 상태",
            on: "ON",
            off: "OFF"
        },
        en: {
            title: "Preview Card",
            currentTheme: "Current Theme",
            dark: "Dark",
            light: "Light",
            description: "This card shows a preview of the selected theme.",
            notification: "Notification",
            on: "ON",
            off: "OFF"
        }
    };

    const currentText = text[language];

    return (
        <div className="text-white bg-[#2d2d2d] border border-[#4a4a4a] p-4 rounded-2xl">
            <h1 className="text-xl font-bold">{currentText.title}</h1>

            <div
                className={`mt-4 text-sm border border-[#4a4a4a] p-4 rounded-xl ${
                    theme === "dark"
                        ? "bg-gray-900"
                        : "bg-[#e0e0e0] text-gray-800"
                }`}
            >
                <h2 className="text-lg font-semibold">
                    {currentText.currentTheme}:{" "}
                    {theme === "dark" ? currentText.dark : currentText.light}
                </h2>

                <p className="mb-2">{currentText.description}</p>

                <p>
                    {currentText.notification}:{" "}
                    {notification ? currentText.on : currentText.off}
                </p>
            </div>
        </div>
    );
}
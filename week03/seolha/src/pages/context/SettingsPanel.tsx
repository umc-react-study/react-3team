import { useState } from "react";
import { useSettings } from "../../store/context/SettingsContext";

export default function SettingsPanel() {
    const [isOpen, setIsOpen] = useState(false);

    const { language, setLanguage, theme, setTheme, notification, setNotification } = useSettings();

    const text = {
        ko: {
            title: "설정 패널",
            reset: "기본값 복원",
            theme: "테마",
            dark: "다크",
            light: "라이트",
            language: "언어",
            notification: "알림",
            on: "ON",
            off: "OFF"
        },
        en: {
            title: "Settings Panel",
            reset: "Reset",
            theme: "Theme",
            dark: "Dark",
            light: "Light",
            language: "Language",
            notification: "Notification",
            on: "ON",
            off: "OFF"
        }
    };

    const currentText = text[language];

    const handleLanguageChange = (lang: "ko" | "en") => {
        setLanguage(lang);
        setIsOpen(false);
    };

    const handleReset = () => {
        setTheme("dark");
        setLanguage("ko");
        setNotification(true);
    };

    return (
        <div className="text-white bg-[#2d2d2d] border border-[#4a4a4a] p-4 rounded-2xl">
            
            {/* 헤더 */}
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-xl font-bold">{currentText.title}</h1>
                <button 
                    onClick={handleReset}
                    className="border border-[#4a4a4a] px-4 py-2 rounded-xl"
                >
                    {currentText.reset}
                </button>
            </div>

            <div className="flex flex-row items-start gap-4 mt-4">
                
                {/* 테마 */}
                <button 
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-full text-left border border-[#4a4a4a] p-4 rounded-xl"
                >
                    <p className="text-sm text-blue-500/80">{currentText.theme}</p>
                    <h2 className="text-lg font-semibold mt-5 mb-1">
                        {theme === "dark" ? currentText.dark : currentText.light}
                    </h2>
                </button>

                {/* 언어 */}
                <div className="w-full text-left border border-[#4a4a4a] p-4 rounded-xl">
                    <p className="text-sm text-blue-500/80">{currentText.language}</p>

                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex w-full justify-between mt-2 border-2 border-blue-300/80 p-2 rounded-xl"
                    >
                        <span>{language === "ko" ? "한국어" : "English"}</span>

                        <svg
                            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" fill="none"/>
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="mt-2 border border-[#4a4a4a] rounded-xl">
                            <button
                                onClick={() => handleLanguageChange("ko")}
                                className="w-full text-left p-2 hover:bg-[#4a4a4a]/50"
                            >
                                한국어
                            </button>
                            <button
                                onClick={() => handleLanguageChange("en")}
                                className="w-full text-left p-2 hover:bg-[#4a4a4a]/50"
                            >
                                English
                            </button>
                        </div>
                    )}
                </div>

                {/* 알림 */}
                <button
                    onClick={() => setNotification(!notification)}
                    className="w-full text-left border border-[#4a4a4a] p-4 rounded-xl"
                >
                    <p className="text-sm text-blue-500/80">{currentText.notification}</p>
                    <h2 className="text-lg font-semibold mt-4 mb-2">
                        {notification ? currentText.on : currentText.off}
                    </h2>
                </button>

            </div>
        </div>
    );
}
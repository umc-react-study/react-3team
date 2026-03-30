import { createContext, useContext, useState, type ReactNode } from "react";

// 1. 타입 정의
type SettingsType = {
  theme: "light" | "dark";
  language: "ko" | "en";
  notification: boolean;
  setTheme: (theme: "light" | "dark") => void;
  setLanguage: (lang: "ko" | "en") => void;
  setNotification: (value: boolean) => void;
};

// 2. Context 생성
const SettingsContext = createContext<SettingsType | null>(null);

// 3. Provider
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [language, setLanguage] = useState<"ko" | "en">("ko");
  const [notification, setNotification] = useState(true);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        language,
        notification,
        setTheme,
        setLanguage,
        setNotification,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

// 4. 커스텀 훅
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("SettingsProvider 안에서 사용해야 함");
  }
  return context;
}
export type ThemeMode = "light" | "dark";
export type Language = "ko" | "en";

export type SettingsState = {
  theme: ThemeMode;
  language: Language;
  notificationsEnabled: boolean;
};

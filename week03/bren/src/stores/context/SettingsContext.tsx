import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import type { Language, SettingsState, ThemeMode } from "../../types/settings";

type SettingsAction =
  | { type: "SET_THEME"; payload: ThemeMode }
  | { type: "SET_LANGUAGE"; payload: Language }
  | { type: "SET_NOTIFICATIONS"; payload: boolean }
  | { type: "RESET_DEFAULTS" };

const defaultSettings: SettingsState = {
  theme: "light",
  language: "ko",
  notificationsEnabled: true,
};

function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };

    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };

    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notificationsEnabled: action.payload,
      };

    case "RESET_DEFAULTS":
      return defaultSettings;

    default:
      return state;
  }
}

type SettingsContextValue = {
  state: SettingsState;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: Language) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  resetDefaults: () => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(settingsReducer, defaultSettings);

  const value = useMemo<SettingsContextValue>(
    () => ({
      state,
      setTheme: (theme) => dispatch({ type: "SET_THEME", payload: theme }),
      setLanguage: (language) => dispatch({ type: "SET_LANGUAGE", payload: language }),
      setNotificationsEnabled: (enabled) => dispatch({ type: "SET_NOTIFICATIONS", payload: enabled }),
      resetDefaults: () => dispatch({ type: "RESET_DEFAULTS" }),
    }),
    [state],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings는 SettingsProvider 내부에서만 사용 가능합니다.");
  }

  return context;
}

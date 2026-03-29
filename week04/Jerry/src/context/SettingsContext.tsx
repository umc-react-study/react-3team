import { createContext, useContext, useState, PropsWithChildren } from 'react'

type Theme = 'dark' | 'light'
type Language = 'ko' | 'en'

interface Settings {
  theme: Theme
  language: Language
  notifications: boolean
  setTheme: (t: Theme) => void
  setLanguage: (l: Language) => void
  setNotifications: (n: boolean) => void
  reset: () => void
}

// 초기 상태
const INITIAL = { theme: 'dark' as Theme, language: 'ko' as Language, notifications: true }

const SettingsContext = createContext<Settings | null>(null)

export function SettingsProvider({ children }: PropsWithChildren) {
  // 상태 말고 setTheme 이런 형식으로 설정 
  const [theme, setTheme] = useState<Theme>(INITIAL.theme)
  const [language, setLanguage] = useState<Language>(INITIAL.language)
  const [notifications, setNotifications] = useState(INITIAL.notifications)

  const reset = () => {
    setTheme(INITIAL.theme)
    setLanguage(INITIAL.language)
    setNotifications(INITIAL.notifications)
  }

  return (
    <SettingsContext.Provider value={{ theme, language, notifications, setTheme, setLanguage, setNotifications, reset }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)!

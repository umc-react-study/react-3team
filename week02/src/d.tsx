import { createContext, useContext } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function App() {
  return (
    <ThemeContext.Provider value={{ isDarkMode: true }}>
      <Page />
    </ThemeContext.Provider>
  );
}

function Page() {
  return <Layout />;
}

function Layout() {
  return <Header />;
}

function Header() {
  const theme = useContext(ThemeContext);

  if (!theme) return null;

  return <h1>{theme.isDarkMode ? "Dark" : "Light"} Mode</h1>;
}
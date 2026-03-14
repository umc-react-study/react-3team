import { useState, type ReactNode } from "react";

// Presentational
function ModeToggleButton({ onClick, dark }: { onClick: () => void; dark: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-lg px-4 py-2 font-semibold shadow-md transition
        ${dark 
          ? "bg-white text-black hover:bg-gray-200" 
          : "bg-gray-700 text-white hover:bg-gray-600"}
      `}
    >
      {dark ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>
  );
}

// Container
export default function DarkModeToggle({ children }: { children: (dark: boolean) => ReactNode }) {
  const [dark, setDark] = useState(false);

  return (
    <div
      className={`min-h-screen flex flex-col items-center gap-6 p-8 transition-colors duration-300
        ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}
      `}
    >
      <div className="w-full flex justify-end">
        <ModeToggleButton onClick={() => setDark((prev) => !prev)} dark={dark} />
      </div>

      {children(dark)}
    </div>
  );
}
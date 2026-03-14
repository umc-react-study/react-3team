import { createContext, useContext, useState, type ReactNode } from "react";

interface CardContextType {
  isOpen: boolean;
  toggleOpen: () => void;
  darkMode: boolean;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

interface CardProps {
  children: ReactNode;
  darkMode: boolean;
}

export default function Card({ children, darkMode }: CardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <CardContext.Provider value={{ isOpen, toggleOpen, darkMode }}>
      <div
        className={`w-150 rounded-xl shadow-xl transition-colors duration-300
          ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}
        `}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
}

// Compound Children
function Header({ children }: { children: ReactNode }) {
  const context = useContext(CardContext);
  if (!context) throw new Error("Header must be used within Card");

  return (
    <div
      onClick={context.toggleOpen}
      className={`cursor-pointer w-full h-16 flex items-center justify-center rounded-t-xl
        ${context.darkMode ? "bg-blue-600" : "bg-blue-500"}
        hover:brightness-110 transition
      `}
    >
      <h2 className="text-white text-lg font-bold">{children}</h2>
    </div>
  );
}

function Body({ children }: { children: ReactNode }) {
  const context = useContext(CardContext);
  if (!context) throw new Error("Body must be used within Card");

  return (
    <div
      className={`overflow-hidden transition-all duration-300 rounded-b-xl
        ${context.isOpen ? "max-h-96 opacity-100 p-6" : "max-h-0 opacity-0 p-0"}
        ${context.darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-800"}
      `}
    >
      {children}
    </div>
  );
}

Card.Header = Header;
Card.Body = Body;
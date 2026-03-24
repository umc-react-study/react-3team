import { createContext, useContext, type ReactNode } from "react";
import { useForm } from "../hooks/useForm";

const FormContext = createContext<ReturnType<typeof useForm> | null>(null);

export function FormProvider({ children, value }: { children: ReactNode; value: ReturnType<typeof useForm> }) {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext는 FormProvider 내부에서만 사용할 수 있습니다.");
  }

  return context;
};

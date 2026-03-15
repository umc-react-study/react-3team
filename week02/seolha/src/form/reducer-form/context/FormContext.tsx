import { createContext, useContext, useReducer } from "react";
import formReducer from "../reducer/formReducer";

type FormContextType = {
  state: {
    name: string;
    email: string;
  };
  dispatch: React.Dispatch<any>;
};

export const FormContext = createContext<FormContextType | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("FormContextProvider 안에서 사용해야 합니다.");
  }

  return context;
}

export default function FormContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(formReducer, {
    name: "",
    email: ""
  });

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}
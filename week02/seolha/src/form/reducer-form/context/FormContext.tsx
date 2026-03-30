import React, { createContext, useContext, useReducer } from "react";
import formReducer from "../reducer/formReducer";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type FormState = {
  values: FormValues;
  errors: FormErrors;
  isSubmitting: boolean;
};

type FormContextType = {
  state: FormState;
  dispatch: React.Dispatch<any>;
};

const initialState: FormState = {
  values: {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  },
  errors: {},
  isSubmitting: false
};

const FormContext = createContext<FormContextType | null>(null);

export const FormContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext must be used within FormContextProvider");
  }

  return context;
};
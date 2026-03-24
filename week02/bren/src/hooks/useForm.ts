import { useReducer, useCallback } from "react";
import type { FormState, FormAction } from "../types/form";
// import { useValidation } from "./useValidation"; // 훅으로 import
import { validateStep } from "./useValidation"; // 순수함수로 리팩토링 후 import
const initialState: FormState = {
  step: 1,
  formData: { name: "", email: "" },
  error: "",
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, formData: { ...state.formData, [action.field]: action.value }, error: "" };
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREV_STEP":
      return { ...state, step: state.step - 1 };
    case "SET_ERROR":
      return { ...state, error: action.message };
    default:
      return state;
  }
}

export function useForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  // const { validateStep } = useValidation();

  const handleChange = (field: string, value: string) => dispatch({ type: "SET_FIELD", field, value });
  const prevStep = () => dispatch({ type: "PREV_STEP" });
  const nextStep = useCallback(() => {
    const error = validateStep(state.step, state.formData);
    if (error) return dispatch({ type: "SET_ERROR", message: error });
    dispatch({ type: "NEXT_STEP" });
  }, [state.step, state.formData]);

  return { state, handleChange, nextStep, prevStep };
}

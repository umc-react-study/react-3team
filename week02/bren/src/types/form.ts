export interface FormData {
  name: string;
  email: string;
}

export interface FormState {
  step: number;
  formData: FormData;
  error: string;
}

export type FormAction =
  | { type: "SET_FIELD"; field: string; value: string }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_ERROR"; message: string };

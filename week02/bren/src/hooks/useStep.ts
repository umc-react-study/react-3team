import { useState } from "react";

export function useStep(initialStep = 1) {
  const [step, setStep] = useState(initialStep);
  const next = () => setStep((p) => p + 1);
  const prev = () => setStep((p) => p - 1);
  return { step, next, prev };
}

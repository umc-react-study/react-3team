import type { ComponentType } from "react";
import { FormProvider } from "../../context/FormContext";
import { useForm } from "../../hooks/useForm";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { FormControls } from "./FormControls";

const STEP_MAP: Record<number, ComponentType> = {
  1: Step1,
  2: Step2,
};

export default function MultiStepForm() {
  const methods = useForm();
  const CurrentStep = STEP_MAP[methods.state.step] || (() => <div>작성 완료 !!</div>);

  return (
    <FormProvider value={methods}>
      <div className="p-10 border rounded-2xl shadow-sm bg-white">
        <CurrentStep />
        {methods.state.error && <p className="text-red-500 text-sm mt-2">{methods.state.error}</p>}
        <FormControls />
      </div>
    </FormProvider>
  );
}

import { useFormContext } from "../../context/FormContext";

export const FormControls = () => {
  const { state, nextStep, prevStep } = useFormContext();
  return (
    <div className="flex justify-between mt-4">
      <button onClick={prevStep} disabled={state.step === 1} className="disabled:opacity-20">
        Back
      </button>
      <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 mx-2 rounded">
        Next
      </button>
    </div>
  );
};

import { useFormContext } from "../../context/FormContext";

export const Step1 = () => {
  const { state, handleChange } = useFormContext();
  return (
    <div>
      <h2 className="text-lg font-bold">Step 1: 이름</h2>
      <input
        className="border p-2 w-full mt-2"
        value={state.formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
    </div>
  );
};

import { useFormContext } from "../../context/FormContext";

export const Step2 = () => {
  const { state, handleChange } = useFormContext();
  return (
    <div>
      <h2 className="text-lg font-bold">Step 2: 이메일</h2>
      <input
        className="border p-2 w-full mt-2"
        value={state.formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
    </div>
  );
};

import ReducerForm from "../form/reducer-form/components/ReducerForm";
import { FormContextProvider } from "../form/reducer-form/context/FormContext";

export default function FormPage() {
  return (
    <FormContextProvider>
      <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center">
        <ReducerForm />
      </div>
    </FormContextProvider>
  );
}
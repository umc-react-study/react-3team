import FormUI from "../../../components/common/FormUI";
import useFormWithComposition from "../hooks/useFormWithComposition";

export default function CompositionForm() {
  const form = useFormWithComposition();

  return (
    <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center">
      <FormUI
        {...form}
        title="Hook Composition Form"
      />
    </div>
  );
}
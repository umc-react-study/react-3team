import FormUI from "../../../components/common/FormUI"
import useForm from "../hooks/useForm"


export default function HookForm() {
  const form = useForm()

  return (
    <FormUI
      {...form}
      title="Custom Hook Form"
    />
  )
}
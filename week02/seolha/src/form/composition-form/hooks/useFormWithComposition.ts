import useInput from "./useInput"
import useValidation from "./useValidation"
import useSubmit from "./useSubmit"

export default function useFormWithComposition() {
  const { values, handleChange } = useInput({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const { errors, runValidation } = useValidation()
  const { isSubmitting, submit } = useSubmit()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = runValidation(values)

    if (Object.keys(validationErrors).length > 0) return

    submit(values)
  }

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  }
}
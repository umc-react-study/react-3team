import { useState } from "react"
import { validate } from "../../../utils/validateForm"

export default function useForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validate(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)

    setTimeout(() => {
      alert(JSON.stringify(values))
      setIsSubmitting(false)
    }, 1000)
  }

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  }
}
import { useState } from "react"
import { validate } from "../../../utils/validateForm"

export default function useValidation() {
  const [errors, setErrors] = useState({})

  const runValidation = (values: any) => {
    const validationErrors = validate(values)
    setErrors(validationErrors)

    return validationErrors
  }

  return { errors, runValidation }
}
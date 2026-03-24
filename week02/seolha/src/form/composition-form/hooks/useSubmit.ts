import { useState } from "react"

export default function useSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = (values: any) => {
    setIsSubmitting(true)

    setTimeout(() => {
      alert(JSON.stringify(values))
      setIsSubmitting(false)
    }, 1000)
  }

  return { isSubmitting, submit }
}
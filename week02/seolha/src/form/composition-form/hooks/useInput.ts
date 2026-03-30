import { useState } from "react"

export default function useInput(initial: any) {
  const [values, setValues] = useState(initial)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues((prev: any) => ({
      ...prev,
      [name]: value
    }))
  }

  return { values, handleChange, setValues }
}
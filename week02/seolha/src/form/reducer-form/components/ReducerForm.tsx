import FormUI from "../../../components/common/FormUI"
import { validate } from "../../../utils/validateForm"
import { useFormContext } from "../context/FormContext"


export default function ReducerForm() {
  const { state, dispatch } = useFormContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      name: e.target.name,
      value: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const errors = validate(state.values)

    dispatch({ type: "SET_ERRORS", payload: errors })

    if (Object.keys(errors).length > 0) return

    dispatch({ type: "SET_SUBMITTING", payload: true })

    setTimeout(() => {
      alert(JSON.stringify(state.values))
      dispatch({ type: "SET_SUBMITTING", payload: false })
    }, 1000)
  }

  return (
    <FormUI
      values={state.values}
      errors={state.errors}
      isSubmitting={state.isSubmitting}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      title="Reducer + Context Form"
    />
  )
}
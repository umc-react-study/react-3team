export default function formReducer(state: any, action: any) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        values: {
          ...state.values,
          [action.name]: action.value
        }
      }

    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload
      }

    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.payload
      }

    default:
      return state
  }
}
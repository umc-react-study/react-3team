export default function formReducer(state: any, action: any) {
    switch (action.type) {
        case "CHANGE_NAME":
            return {
                ...state,
                name: action.payload
            };
        case "CHANGE_EMAIL":
            return {
                ...state,
                email: action.payload
            };
        default:
            return state;
    }
}
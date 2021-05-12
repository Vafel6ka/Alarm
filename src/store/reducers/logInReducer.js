import { GET_LOGIN, GET_PASS, GET_EMAIL, GET_ID, REJECT_FRIENDSHIP_REQUEST } from "../actions_type"

const initialState = {
    username: '',
    password: '',
    email: '',
    id: []
}

const SignUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOGIN:
            return {...state, username: action.payload}
        case GET_PASS:
            return {...state, password: action.payload}
        case GET_EMAIL:
            return {...state, email: action.payload}
        case GET_ID:
            return {...state, id: action.payload}
        case REJECT_FRIENDSHIP_REQUEST:
            const index = action.payload;
            return {...state, id: [...state.id.slice(0, index), ...state.id.slice(index + 1)]}

        default: return state
    } 
};

export default SignUpReducer;
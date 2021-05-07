import { GET_LOGIN, GET_PASS, GET_EMAIL } from "../actions_type"

const initialState = {
    username: '',
    password: '',
    email: ''
}

const SignUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOGIN:
            return {...state, username: action.payload}
        case GET_PASS:
            return {...state, password: action.payload}
        case GET_EMAIL:
            return {...state, email: action.payload}

        default: return state
    }
};

export default SignUpReducer;
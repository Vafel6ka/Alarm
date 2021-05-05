import { GET_CURRENT_LOC_DATA } from "../actions_type";

const initialState = {
    data: ""
}

const getCurLocReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_LOC_DATA: {
            return {
                ...state, data: action.payload
            }
        }
        default:
            return state
    }
}

export default getCurLocReducer;
import { GET_REQUEST_ON_FRIENDSHIP } from "../actions_type";

const initialState = {
    isRequest: ''
}

const getRequestOnFriendshipReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REQUEST_ON_FRIENDSHIP: {
            return {
                ...state, isRequest: action.payload
            }
        }
        default:
            return state
    }
}

export default getRequestOnFriendshipReducer;
import { GET_FRIEND_NAME } from "../actions_type";

const initialState = {
    name: ''
};

const getFriendNameReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FRIEND_NAME: {
            return {
                ...state, name: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export default getFriendNameReducer
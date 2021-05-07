import { GET_MEET_POINT_LOC_DATA } from "../actions_type";

const initialState = {
    meetPointData: {
        latitude: '',
        longitude: ''
        }
}

const getMeetPointReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MEET_POINT_LOC_DATA: {
            return {
                ...state, meetPointData: action.payload
            }
        }
        default:
            return state
    }
}

export default getMeetPointReducer;
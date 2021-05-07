import { GET_MEET_POINT_MARKER_DATA } from "../actions_type";

const initialState = {
    meetPointMarkerData: {
            key: '',
            coordinate: '',
            title: '',
            description: ''
        }
}

const getMeetPointMarkerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MEET_POINT_MARKER_DATA: {
            return {
                ...state, meetPointMarkerData: action.payload
            }
        }
        default:
            return state
    }
}

export default getMeetPointMarkerReducer;
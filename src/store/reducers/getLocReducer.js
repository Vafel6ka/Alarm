import { GET_CURRENT_LOC_DATA, GET_END_POINT_LOC_DATA } from "../actions_type";

const initialState = {
    initialRegion: {
        latitude: 37,
        longitude: -122,
        latitudeDelta: 0.04,
        longitudeDelta: 0.005
        }
}

const getLocReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_LOC_DATA: {
            return {
                ...state, initialRegion: action.payload
            }
        }
        default:
            return state
    }
}

export default getLocReducer;
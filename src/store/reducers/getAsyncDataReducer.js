import { 
    GET_DATA_LOADING, 
    GET_DATA_SUCCESS, 
    GET_DATA_ERROR  
} from "../actions_type";

const initialState = {
    loading: false,
    data: "",
    errorMessage: null   
}

const getAsyncDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_LOADING: {
            return {
                ...state, loading: true
            }
        }
        case GET_DATA_SUCCESS: {
            return {
                ...state, loading: false, data: action.payload, error: null
            }
        }

        case GET_DATA_ERROR: {
            return {
                ...state, loading: false, errorMessage: action.error
            }
        }

        default:
            return state
    }
}

export default getAsyncDataReducer;
import { combineReducers } from "redux";
import getLocReducer from "./getLocReducer";
import getAsyncDataReducer from "./getAsyncDataReducer"

const rootReducer = combineReducers({
    location: getLocReducer,
    data: getAsyncDataReducer
})

export default rootReducer
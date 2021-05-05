import { combineReducers } from "redux";
import getCurLocReducer from "./getCurLocReducer"

const rootReducer = combineReducers({
    currentlocation: getCurLocReducer
})

export default rootReducer
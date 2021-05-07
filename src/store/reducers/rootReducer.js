import { combineReducers } from "redux";
import getLocReducer from "./getLocReducer";
import getMeetPointReducer from "./getMeetPointReducer"


const rootReducer = combineReducers({
    location: getLocReducer,
    meetPoint: getMeetPointReducer
    
})

export default rootReducer
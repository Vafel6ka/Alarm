import { combineReducers } from "redux";
import getLocReducer from "./getLocReducer";
import getMeetPointReducer from "./getMeetPointReducer"
import LogInReducer from "./logInReducer"


const rootReducer = combineReducers({
    location: getLocReducer,
    meetPoint: getMeetPointReducer,
    currentUserInfo: LogInReducer,
    
})

export default rootReducer
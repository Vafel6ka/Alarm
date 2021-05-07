import { combineReducers } from "redux";
import getLocReducer from "./getLocReducer";
import getMeetPointReducer from "./getMeetPointReducer"
import LogInReducer from "./logInReducer";
import { USER_LOG_OUT } from "../actions_type"
import getMeetPointMarkerReducer from "./getMeetPointMarkerReducer";

const appReducer = combineReducers({
    location: getLocReducer,
    meetPoint: getMeetPointReducer,
    currentUserInfo: LogInReducer,
    meetPointMarker: getMeetPointMarkerReducer
})

const rootReducer = (state, action) => {
if (action.type === USER_LOG_OUT) {
  state = undefined
}

return appReducer(state, action)
}

export default rootReducer;
import { USER_LOG_OUT } from "../actions_type"

const logOutUser = () =>{
    return {
        type: USER_LOG_OUT,
    }
}

export default logOutUser;

import { GET_LOGIN } from "../actions_type"

const getLogin = (data) => {
    return {
        type: GET_LOGIN,
        payload: data
    }
}

export default getLogin;
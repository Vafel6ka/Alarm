import { GET_PASS } from "../actions_type"

const getPass = (data) =>{
    return {
        type: GET_PASS,
        payload: data
    }
}

export default getPass;
import { GET_EMAIL } from "../actions_type"

const getEmail = (data) =>{
    return {
        type: GET_EMAIL,
        payload: data
    }
}

export default getEmail;
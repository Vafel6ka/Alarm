import { GET_ID } from "../actions_type"

const getId = (data) =>{
    return {
        type: GET_ID,
        payload: data
    }
}

export default getId;
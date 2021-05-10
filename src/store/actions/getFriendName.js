import { GET_FRIEND_NAME } from "../actions_type";

const getFriendName = (data) => {
    return {
        type: GET_FRIEND_NAME,
        payload: data
    }
}

export default getFriendName
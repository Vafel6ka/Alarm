import { REJECT_FRIENDSHIP_REQUEST } from "../actions_type"

const rejectFriendshipRequest = (data) =>{
    return {
        type: REJECT_FRIENDSHIP_REQUEST,
        payload: data
    }
}

export default rejectFriendshipRequest;
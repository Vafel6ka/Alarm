import { GET_REQUEST_ON_FRIENDSHIP } from '../actions_type';

const getRequestOnFriendship = (data) => {
    return {
        type: GET_REQUEST_ON_FRIENDSHIP,
        payload: data
    }
}

export default getRequestOnFriendship
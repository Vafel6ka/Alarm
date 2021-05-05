import { GET_CURRENT_LOC_DATA } from "../actions_type";

export const getCurLocData = (data) => ({
    type: GET_CURRENT_LOC_DATA,
    payload: data
})
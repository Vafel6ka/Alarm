import { GET_DATA_SUCCESS } from "../actions_type";

export const getDataSuccess = (data) => ({
    type: GET_DATA_SUCCESS,
    payload: data
})
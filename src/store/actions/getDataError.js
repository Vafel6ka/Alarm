import { GET_DATA_ERROR } from "../actions_type";

export const getDataError = (er) => ({
    type: GET_DATA_ERROR,
    error: er
})
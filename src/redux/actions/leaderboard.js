import { Leaderboard } from '../helpers/Services/Leaderboard';


export const getAllUsers = params => {
    return async dispatch => {
        return await Leaderboard.List().then(res => {
            let response = res.data;
            if (response.success === 200) {
                dispatch({
                    type: "GET_ALL_USERS",
                    payload: response.payload
                })
                return response.payload;
            }
            else {
                dispatch({
                    type: "GET_ALL_USERS",
                    payload: []
                })
                return [];
            }
        });
    }
}
export const deleteAndUpdate = params => {
    return async dispatch => {
        return await Leaderboard.Delete(params).then(res => {
            let response = res;
            if (response.success === 200) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
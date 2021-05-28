import {USER_SIGNIN_REQUEST,USER_SIGNIN_FAILED, USER_SIGNIN_SUCCESS} from "../Constants/userConstants";


export const sign_in_request = () => {
    return {
        type: USER_SIGNIN_REQUEST
    }
}

export const sign_in_success = (user) => {
    return {
        type: USER_SIGNIN_SUCCESS,
        payload: user
    }
}

export const sign_in_failed = (error) => {
    return {
        type: USER_SIGNIN_FAILED,
        payload: error
    }
} 
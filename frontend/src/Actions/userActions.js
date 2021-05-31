import {USER_SIGNIN_REQUEST,USER_SIGNIN_FAILED, USER_SIGNIN_SUCCESS} from "../Constants/userConstants";
import {axios} from "axios";


export const sign_in = (email,password) => (dispatch) => {
    dispatch({
        type: USER_SIGNIN_REQUEST
    })
    axios.post("http://127.0.0.1:5000/login",{email: email,password: password})
    .then((res) => {
        if(res == "User not verified" || res == "user not found")
        {
            dispatch({
            type: USER_SIGNIN_FAILED,
            payload: res
        })
    }
        else
        {
            dispatch({
                type: USER_SIGNIN_SUCCESS,
                payload: res
            })
        }
    })
    .catch((err) => {
        dispatch({
            type: USER_SIGNIN_FAILED,
            payload: err
        })
    })
}  
import {USER_SIGNIN_REQUEST,USER_SIGNIN_FAILED, USER_SIGNIN_SUCCESS, USER_DETAILS_REQUEST, USER_DEATAILS_SUCCESS, USER_DETAILS_FAILED,USER_SIGNOUT_SUCCESS} from "../Constants/userConstants";
import axios from "axios";
import jwt from "jsonwebtoken";


export const sign_in = (email,password) => (dispatch) => {
    dispatch({
        type: USER_SIGNIN_REQUEST
    })
    axios.post("http://127.0.0.1:5000/api/login",{email: email,password: password})
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
                payload: res.data
            })
            localStorage.setItem("UserInfo",JSON.stringify(res.data))
        }
    })
    .catch((err) => {
        dispatch({
            type: USER_SIGNIN_FAILED,
            payload: err
        })
    })
}

export const details = () => async (dispatch) => {
    dispatch({
        type: USER_DETAILS_REQUEST
    })
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"))
    if(userInfo)
    {
        jwt.verify(userInfo.token, 'Secrettoken', async function(err, decoded) { 
        await axios.get(`http://127.0.0.1:5000/api/${decoded?._id}`,{
                        headers:{
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${userInfo?.token}`
                        }
                    })
        .then((res) => {
            dispatch({
                type: USER_DEATAILS_SUCCESS,
                payload: res
            })
            localStorage.setItem("UserDetails",res)
        })
        .catch((err) => {
            dispatch({
                type: USER_DETAILS_FAILED,
                payload: err
            })
        })
    })
    }

}

export const sign_out = () => (dispatch) => {
    dispatch({
        type: USER_SIGNOUT_SUCCESS,
    })
    localStorage.removeItem("UserInfo")
}
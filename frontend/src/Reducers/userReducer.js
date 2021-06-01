import {USER_SIGNIN_FAILED,USER_SIGNIN_SUCCESS,USER_SIGNIN_REQUEST,USER_DETAILS_FAILED,USER_DETAILS_REQUEST,USER_DEATAILS_SUCCESS,USER_SIGNOUT_SUCCESS} from "../Constants/userConstants";

/*const initialstate = {
    loading: false,
    user: {},
    error: {}
}*/



const reducer = (state = {},action) => {
    switch(action.type)
    {
        case USER_SIGNIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_SIGNIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: {}
            }
        case USER_SIGNIN_FAILED:
            return {
                ...state,
                error: action.payload,
                user: {}
            }
        case USER_SIGNOUT_SUCCESS:
            return {}
        default: 
            return state;
    }
}

export const details_reducer = (state={loading: true},action) => {
    switch(action.type)
    {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_DEATAILS_SUCCESS:
            return {
                ...state,
                userDetails: action.payload,
                error: {}
            }
        case USER_DETAILS_FAILED:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}



export default reducer
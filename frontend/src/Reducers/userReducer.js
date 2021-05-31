import {USER_SIGNIN_FAILED,USER_SIGNIN_SUCCESS,USER_SIGNIN_REQUEST} from "../Constants/userConstants";

const initialstate = {
    loading: false,
    user: {},
    error: {}
}

const reducer = (state = initialstate,action) => {
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
                user: action.payload
            }
        case USER_SIGNIN_FAILED:
            return {
                ...state,
                error: action.payload
            }
        default: 
            return state;
    }
}

export default reducer
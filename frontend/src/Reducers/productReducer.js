import {  
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILED
} from "../Constants/productConstants";

const productReducer = (state={},action) => {
    switch(action.type)
    {
        case PRODUCT_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                productList: action.payload
            }
        case PRODUCT_LIST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default productReducer
import {PRODUCT_LIST_REQUEST,
PRODUCT_LIST_SUCCESS,
PRODUCT_LIST_FAILED  } from "../Constants/productConstants";
import axios from "axios";

export const get_all_products = () => (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })
    axios.get(`${process.env.REACT_APP_BACKEND}/products/`)
    .then((res) => dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: res.data
    }))
    .catch((err) => dispatch({
        type: PRODUCT_LIST_FAILED,
        payload: err.message
    })) 
} 
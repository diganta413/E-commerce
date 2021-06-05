import userReducer,{details_reducer} from "./userReducer";
import {combineReducers} from "redux";
import productReducer from "./productReducer";


const rootreducer = combineReducers({userData: userReducer,userDetails: details_reducer,products:productReducer})

export default rootreducer
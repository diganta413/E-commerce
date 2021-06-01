import userReducer,{details_reducer} from "./userReducer";
import {combineReducers} from "redux";


const rootreducer = combineReducers({userData: userReducer,userDetails: details_reducer})

export default rootreducer
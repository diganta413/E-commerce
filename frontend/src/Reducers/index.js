import userReducer from "./userReducer";
import {combineReducers} from "redux";


const rootreducer = combineReducers({userData: userReducer})

export default rootreducer
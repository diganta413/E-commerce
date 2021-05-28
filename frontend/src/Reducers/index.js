import {userReducer} from "./userReducer";
import {combineReducers} from "redux";


export const rootreducer = combineReducers({user: userReducer})
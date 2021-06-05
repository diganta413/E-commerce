import {createStore,applyMiddleware} from "redux";
import rootreducer from "./Reducers/index";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const initialstate = {
    userData: {
        user:localStorage.getItem("UserInfo")?JSON.parse(localStorage.getItem("UserInfo")):null
    }
}

const store = createStore(rootreducer,initialstate,composeWithDevTools(applyMiddleware(thunk)))


export default store;
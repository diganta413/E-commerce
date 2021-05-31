import {createStore,applyMiddleware} from "redux";
import rootreducer from "./Reducers/index";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(rootreducer,composeWithDevTools(applyMiddleware(thunk)))


export default store;
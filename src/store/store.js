import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { listReducer } from "../reducer/";

const reducers = combineReducers({
    listReducer: listReducer
});

let configureStore = () => {
    return createStore(reducers);
};

export default compose(applyMiddleware(thunk))(configureStore);

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import banner from "./reducer/banner";

const store = createStore(
    combineReducers({
        banner,
    }),
    applyMiddleware(thunk)
);

export default store;

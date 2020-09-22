import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import banner from "./reducer/banner";
import RecommendThePlaylist from "./reducer/RecommendThePlaylist";

const store = createStore(
    combineReducers({
        banner,
        RecommendThePlaylist,
    }),
    applyMiddleware(thunk)
);

export default store;

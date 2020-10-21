import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import banner from "./reducer/banner";
import RecommendThePlaylist from "./reducer/RecommendThePlaylist";
import SongListDetails from "./reducer/SongListDetails";
const store = createStore(
    combineReducers({
        banner,
        RecommendThePlaylist,
        SongListDetails,
    }),
    applyMiddleware(thunk)
);

export default store;

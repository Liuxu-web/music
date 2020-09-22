import { GET_RECOMMEND_THE_PLAYLIST } from "../actionType/RecommendThePlaylist";
let list = {
    RecommendThePlaylist: [],
};

const getRecommendThePlaylist = (state = list, { type, payload }) => {
    state = JSON.parse(JSON.stringify(state));
    switch (type) {
        case GET_RECOMMEND_THE_PLAYLIST: {
            state.RecommendThePlaylist = payload;
            return state;
        }
        default: {
            return state;
        }
    }
};

export default getRecommendThePlaylist;

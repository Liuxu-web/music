import { GET_SONG_LIST_DETALIS } from "../actionType/SongListDetails";

let list = "";

const getSongListDetails = (state = list, { type, payload }) => {
    state = JSON.parse(JSON.stringify(state));
    switch (type) {
        case GET_SONG_LIST_DETALIS: {
            state = payload;
            return state;
        }
        default: {
            return state;
        }
    }
};
export default getSongListDetails;

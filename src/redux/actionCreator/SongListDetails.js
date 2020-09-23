import { GET_SONG_LIST_DETALIS } from "../actionType/SongListDetails";

function actionSongListDetails(payload) {
    return {
        type: GET_SONG_LIST_DETALIS,
        payload,
    };
}

export default {
    GET_SONG_LIST_DETALIS() {
        return (dispatch) => {
            console.log(111);
        };
    },
};

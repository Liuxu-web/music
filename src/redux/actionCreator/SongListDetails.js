import { GET_SONG_LIST_DETALIS } from "../actionType/SongListDetails";
import { api_playlist_detail } from "../../utils/api";

function actionSongListDetails(payload) {
    return {
        type: GET_SONG_LIST_DETALIS,
        payload,
    };
}

export default {
    GET_SONG_LIST_DETALIS() {
        return (dispatch) => {
            // 获取歌单详情
            // 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 ,
            // 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)
            api_playlist_detail(this.props.match.params.id).then((data) => {
                const { code, playlist } = data;
                if (code === 200) dispatch(actionSongListDetails(playlist));
                else console.log("服务器瞌睡了");
                console.log(this.props);
            });
        };
    },
};

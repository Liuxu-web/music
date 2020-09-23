import { GET_RECOMMEND_THE_PLAYLIST } from "../actionType/RecommendThePlaylist";
import { api_personalized } from "../../utils/api";
function actionRecommendThePlaylist(payload) {
    return {
        type: GET_RECOMMEND_THE_PLAYLIST,
        payload,
    };
}

export default {
    GET_RECOMMEND_THE_PLAYLIST() {
        return (dispatch) => {
            api_personalized(10).then((data) => {
                const { code, result } = data;
                if (code === 200) dispatch(actionRecommendThePlaylist(result));
                else console.log("服务器瞌睡了");
                console.log(this.props);
            });
        };
    },
};

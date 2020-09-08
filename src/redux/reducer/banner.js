import { GET_BANNER } from "../actionType/banner";

let list = {
    banner_list: [],
};

const getBannerList = (state = list, { type, payload }) => {
    state = JSON.parse(JSON.stringify(state));
    switch (type) {
        case GET_BANNER: {
            state.banner_list = payload;
            return state;
        }
        default: {
            return state;
        }
    }
};
export default getBannerList;

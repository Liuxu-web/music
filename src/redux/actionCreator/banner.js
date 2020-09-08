const { GET_BANNER } = require("../actionType/banner");

function actionBanner(payload) {
    return {
        type: GET_BANNER,
        payload,
    };
}

export default {
    GET_BANNER() {
        return (dispatch) => {
            console.log(111);
            this.$get("/api/banner?type=0").then(({ banners, code }) => {
                console.log(this, "我是Creator");
                code === 200 ? dispatch(actionBanner(banners)) : console.log("服务器瞌睡啦!banner");
                // console.log();
            });
        };
    },
};

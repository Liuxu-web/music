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
            this.$get("/api/banner?type=0").then(({ banners, code }) => {
                code === 200 ? dispatch(actionBanner(banners)) : console.log("服务器瞌睡啦!banner");
                const length = banners.length;
                let newDir = [];
                for (let i = 0; i < length; i++) {
                    if (i === 0) newDir.push({ name: "middle" });
                    else if (i === 1) newDir.push({ name: "end" });
                    else if (i === length - 1) newDir.push({ name: "start" });
                    else newDir.push({ name: "normal" });
                }
                this.setState({ dir: newDir, length: length });
            });
        };
    },
};

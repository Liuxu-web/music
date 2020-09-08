const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "^/api",
        proxy.createProxyMiddleware({
            target: "http://123.56.121.173:3000/",
            changeOrigin: true,
            pathRewrite: {
                "^/api": "",
            },
        })
    );
};

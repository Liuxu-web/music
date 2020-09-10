import React from "react";
const context = require.context("../pages", true, /\.(jsx)$/);
const subassembly = {};
context.keys().forEach((filename) => {
    let name = filename.substr(2).replace(/\.(jsx)$/, "");
    subassembly[name] = React.lazy(() => import(`../pages/${name}`));
});

export default [
    {
        // 404
        path: "/error",
        component: subassembly.Err,
    },
    {
        // 首页
        path: "/",
        component: subassembly.Home,
        childrens: [
            {
                // 私人FM
                path: "/personalfm",
                component: subassembly.PersonalFM,
            },
            {
                // LOOK直播
                path: "/looklive",
                component: subassembly.LookLive,
            },
            {
                // 视频
                path: "/Video",
                component: subassembly.Video,
            },
            {
                // 朋友
                path: "/Friend",
                component: subassembly.Friend,
            },
            {
                // 本地音乐
                path: "/Localmusic",
                component: subassembly.Localmusic,
            },
            {
                // 下载管理
                path: "/Download",
                component: subassembly.Download,
            },
            {
                // 我的音乐云盘
                path: "/MusicCloudDisk",
                component: subassembly.MusicCloudDisk,
            },
            {
                // 我的收藏
                path: "/MeCollect",
                component: subassembly.MeCollect,
            },
            {
                // 发现音乐
                path: "/Main",
                component: subassembly.Main,
                childrens: [
                    {
                        // 个性推荐
                        path: "/Main",
                        exact: true,
                        component: subassembly.Recommendation,
                    },
                    {
                        // 歌单
                        path: "/Main/SongList",
                        component: subassembly.SongList,
                    },
                    {
                        // 主播电台
                        path: "/Main/Anchor",
                        component: subassembly.Anchor,
                    },
                    {
                        // 排行榜
                        path: "/Main/RankingList",
                        component: subassembly.RankingList,
                    },
                    {
                        // 歌手
                        path: "/Main/Singer",
                        component: subassembly.Singer,
                    },
                    {
                        // 最新音乐
                        path: "/Main/NewestMusic",
                        component: subassembly.NewestMusic,
                    },
                ],
            },
        ],
    },
];

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export default class NavSidebar extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>推荐</h1>
                <NavLink to="/Main">
                    <i className="iconfont icon-yinle2" />
                    发现音乐
                </NavLink>
                <NavLink to="/personalfm">
                    <i className="iconfont icon-xinhao" />
                    私人FM
                </NavLink>
                <NavLink to="/LookLive">
                    <i className="iconfont icon-ziyuan" />
                    LOOK直播
                </NavLink>
                <NavLink to="/Video">
                    <i className="iconfont icon-shipin" />
                    视频
                </NavLink>
                <NavLink to="/Friend">
                    <i className="iconfont icon-pengyou" />
                    朋友
                </NavLink>
                <h1>我的音乐</h1>
                <NavLink to="/Localmusic">
                    <i className="iconfont icon-yinle1" />
                    本地音乐
                </NavLink>
                <NavLink to="/Download">
                    <i className="iconfont icon-xiazai" />
                    下载管理
                </NavLink>
                <NavLink to="/MusicCloudDisk">
                    <i className="iconfont icon-yun" />
                    我的音乐云盘
                </NavLink>
                <NavLink to="/MeCollect">
                    <i className="iconfont icon-wodeshoucang" />
                    我的收藏
                </NavLink>
                <h1>创建的歌单</h1>
            </React.Fragment>
        );
    }
}

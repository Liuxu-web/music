import React, { Component } from "react";
import Router from "../routers/Router";
import pubsub from "pubsub-js";
import "./less/BHome.less";

import AudioPlayer from "../components/audioPlayer/AudioPlayer";
import NavSidebar from "../components/navSidebar/NavSidebar";
import Login from "../components/login/Login";
import { api_login_status } from "../utils/api";
import { fullScreen } from "../utils";
import { encode } from "jwt-simple";

export default class Home extends Component {
    constructor(params) {
        super(params);
        this.state = {
            isShow: false,
            userName: "未登录",
            avatarUrl: require("../assets/Blankface.jpg"),
            userId: "",
            userType: 0,
        };
    }

    // 获取用户信息
    getUser = () => {
        api_login_status().then((data) => {
            if (data && data.code === 200) {
                this.setState(() => {
                    return {
                        userName: data.profile.nickname,
                        avatarUrl: data.profile.avatarUrl,
                        userId: data.profile.userId,
                        userType: data.profile.userType,
                    };
                });
                if (!sessionStorage.uid) sessionStorage.uid = encode(data.profile.userId, "liuxu");
            }
            console.log("home获取用户信息", data);
        });
    };
    componentDidMount() {
        // 发布订阅-是否显示登录窗口
        pubsub.subscribe("isShow", (msgName, content) => {
            this.setState({ isShow: !this.state.isShow }, () => {
                console.log("发布订阅content");
                if (content) this.getUser();
            });
        });
        // 获取用户信息
        this.getUser();
    }
    openColor = () => {
        console.log("打开全局背景颜色视窗");
        
    };
    render() {
        const routerList = this.props.childrens;
        const { avatarUrl, userName, isShow } = this.state;
        return (
            <div className="Home">
                {isShow ? <Login /> : null}
                <header>
                    <div className="h-lf">
                        <div className="logo" />
                        <div className="n-lf">
                            <div className="btn">
                                <button className="iconfont icon-jiantouzuo1"></button>
                                <span></span>
                                <button className="iconfont icon-jiantouyou"></button>
                            </div>
                            <input type="text" placeholder="搜索音乐，视频，歌词，电台" />
                            <span className="iconfont icon-sousuo"></span>
                        </div>
                    </div>
                    <div className="h-rg">
                        <ul>
                            <img src={avatarUrl} alt="" />
                            <li
                                onClick={() => {
                                    this.setState({ isShow: !isShow });
                                }}
                            >
                                {userName}&nbsp;<i className="iconfont icon-jiantouxia"></i>
                            </li>
                            <li>开通VIP</li>
                            <li className="iconfont icon-pifu" onClick={this.openColor} />
                            <li className="iconfont icon-youxiang1"></li>
                            <li className="iconfont icon-shezhi"></li>
                            <li className="iconfont icon-zuixiaohua"></li>
                            <li className="iconfont icon-chuangkou" onClick={fullScreen} />
                            <li
                                className="iconfont icon-guanbi"
                                onClick={() => window.close()}
                            ></li>
                        </ul>
                    </div>
                </header>
                <main>
                    <aside>
                        <NavSidebar />
                    </aside>
                    <section>
                        <Router routerList={routerList} />
                    </section>
                </main>
                <footer>
                    <AudioPlayer />
                </footer>
            </div>
        );
    }
}

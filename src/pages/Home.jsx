import React, { Component } from "react";
import Router from "../routers/Router";
import pubsub from "pubsub-js";
import "./less/Home.css";
import AudioPlayer from "../components/audioPlayer/AudioPlayer";
import NavSidebar from "../components/navSidebar/NavSidebar";
import Login from "../components/login/Login";

export default class Home extends Component {
    constructor(params) {
        super(params);
        this.state = {
            isShow: false,
            userName: "未登录",
            avatarUrl: "http://suo.im/5NIhtK",
            userId: "",
            userType: 0,
        };
    }
    // 切换全屏
    fullScreen = () => {
        const docElm = document.documentElement;
        const fullhalf =
            document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
        console.log(fullhalf);
        if (fullhalf) {
            //W3C
            if (document.exitFullscreen) document.exitFullscreen();
            //FireFox
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            //Chrome等
            else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        } else {
            if (docElm.requestFullscreen) docElm.requestFullscreen();
            //FireFox
            else if (docElm.mozRequestFullScreen) docElm.mozRequestFullScreen();
            //Chrome等
            else if (docElm.webkitRequestFullScreen) docElm.webkitRequestFullScreen();
        }
    };
    getUser = () => {
        this.$get("/api/login/status", {
            withCredentials: true,
        }).then(({ code, profile }) => {
            if (code === 200) {
                this.setState(() => {
                    return {
                        userName: profile.nickname,
                        avatarUrl: profile.avatarUrl,
                        userId: profile.userId,
                        userType: profile.userType,
                    };
                });
            }
            console.log(code, profile);
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
        // this.getUser();
    }
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
                            <li className="iconfont icon-pifu"></li>
                            <li className="iconfont icon-youxiang1"></li>
                            <li className="iconfont icon-shezhi"></li>
                            <li style={{ borderLeft: "2px solid #a82828", padding: "0" }}></li>
                            <li className="iconfont icon-zuixiaohua"></li>
                            <li className="iconfont icon-chuangkou" onClick={this.fullScreen} />
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

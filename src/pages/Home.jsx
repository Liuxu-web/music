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
        };
    }
    render() {
        const routerList = this.props.childrens;
        return (
            <div className="Home">
                {this.state.isShow ? <Login /> : null}
                <header>
                    <div className="h-lf">
                        <h1>网易云音乐</h1>
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
                            <img
                                src="https://c-ssl.duitang.com/uploads/item/202004/04/20200404232224_EnfTK.thumb.1000_0.jpeg"
                                alt=""
                            />
                            <li
                                onClick={() => {
                                    this.setState({ isShow: !this.state.isShow });
                                    console.log(this.state.isShow);
                                }}
                            >
                                未登录&nbsp;<i className="iconfont icon-jiantouxia"></i>
                            </li>
                            <li>开通VIP</li>
                            <li className="iconfont icon-pifu"></li>
                            <li className="iconfont icon-youxiang1"></li>
                            <li className="iconfont icon-shezhi"></li>
                            <li style={{ borderLeft: "2px solid #a82828", padding: "0" }}></li>
                            <li className="iconfont icon-zuixiaohua"></li>
                            <li className="iconfont icon-chuangkou"></li>
                            <li className="iconfont icon-guanbi"></li>
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
    componentDidMount() {
        pubsub.subscribe("isShow", () => {
            this.setState({ isShow: !this.state.isShow });
        });
    }
}

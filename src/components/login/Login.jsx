import React, { Component } from "react";
import pubsub from "pubsub-js";
import "./Loing.css";
import LoginCom from "./LoginCom/LoginCom";
import ResetCom from "./ResetCom/ResetCom";
import SigninCom from "./SigninCom/SigninCom";
import AuthCode from "./AuthCode/AuthCode";

export default class Login extends Component {
    constructor(params) {
        super(params);
        this.state = {
            isTab: "code",
        };
    }
    // 改变父级的state,发布订阅
    changeFatherState = () => {
        pubsub.publishSync("isShow");
    };
    table = () => {
        switch (this.state.isTab) {
            case "login": {
                return <LoginCom />;
            }
            case "reset": {
                return <ResetCom />;
            }
            case "sigin": {
                return <SigninCom />;
            }
            case "code": {
                return <AuthCode />;
            }
            default: {
                return <LoginCom />;
            }
        }
    };
    componentDidMount() {
        // 发布订阅-是否显示登录窗口
        pubsub.subscribe("isTab", (msgName, content) => {
            this.setState({ isTab: content });
        });
    }
    render() {
        const { isTab } = this.state;
        return (
            <div className="conceal">
                <div className="login_box">
                    {/* 返回登录 */}
                    {isTab !== "login" ? (
                        <div onClick={() => this.setState({ isTab: "login" })} className="back">
                            <i className="iconfont icon-jiantouzuo1"></i>
                            返回登录
                        </div>
                    ) : null}
                    {/* 关闭按钮 */}
                    <button className="iconfont icon-guanbi" onClick={this.changeFatherState} />
                    {/*  */}
                    {this.table()}
                </div>
            </div>
        );
    }
}

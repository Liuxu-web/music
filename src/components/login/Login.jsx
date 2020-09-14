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
            isTab: "login",
            phone: "",
            password: "",
            nickname: "",
            isMove: true, //是否移动
            disX: "",
            disY: "",
            left: "",
            top: "",
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
                return (
                    <AuthCode
                        phone={this.state.phone}
                        password={this.state.password}
                        nickname={this.state.nickname}
                    />
                );
            }
            default: {
                return <LoginCom />;
            }
        }
    };
    componentDidMount() {
        // 发布订阅-是否显示登录窗口
        pubsub.subscribe("isTab", (msgName, { tab, phone = "", password = "", nickname = "" }) => {
            this.setState({ isTab: tab, phone, password, nickname });
        });
    }
    // 鼠标按下
    mouseDown = (event) => {
        event.persist();
        if (event.target.className === "login_box") {
            this.setState(() => {
                return {
                    isMove: false,
                    disX: event.clientX - event.target.offsetLeft,
                    disY: event.clientY - event.target.offsetTop,
                };
            });
        }
    };
    // 鼠标移动
    mouseMove = (event) => {
        event.persist();
        if (this.state.isMove) return;
        if (event.target.className === "login_box") {
            this.setState((prevState) => {
                return {
                    isMove: false,
                    left: event.clientX - prevState.disX,
                    top: event.clientY - prevState.disY,
                };
            });
            this.setState({
                isMove: false,
                left: event.clientX - this.state.disX,
                top: event.clientY - this.state.disY,
            });
        }
    };
    // 鼠标抬起-鼠标移出
    mouseUp = () => {
        this.setState({ isMove: true });
    };

    render() {
        const { isTab, left, top } = this.state;
        return (
            <div className="conceal">
                <div
                    className="login_box"
                    onMouseDown={this.mouseDown}
                    onMouseMove={this.mouseMove}
                    onMouseUp={this.mouseUp}
                    onMouseLeave={this.mouseUp}
                    style={{ left: left, top: top }}
                >
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

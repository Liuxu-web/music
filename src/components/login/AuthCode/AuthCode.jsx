import React, { Component } from "react";
import pubsub from "pubsub-js";
import { supplement } from "../../../utils";
import { api_getcode, api_verifyCode, api_sign_reset } from "../../../utils/api";
export default class AuthCode extends Component {
    constructor(params) {
        super(params);
        this.timer = "";
        this.state = {
            code: "",
            time: 60,
            isCountDown: true,
        };
    }
    // 受控组件
    changeCode = (e) => {
        const value = e.target.value;
        this.setState(() => {
            return {
                code: value,
            };
        });
    };
    // 获取验证码
    getCode = () => {
        if (this.state.isCountDown) return;
        this.setState(
            () => {
                return {
                    time: 60,
                    isCountDown: true,
                };
            },
            () => {
                this.countDown();
                api_getcode(this.props.phone).then((data) => {
                    if (data.code === 200) console.log("获取验证码成功,请注意查看手机", data);
                    else console.log("获取验证码失败,请检查次数", data);
                });
            }
        );
    };
    // 倒计时
    countDown = () => {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.setState(
                (prevState) => {
                    return {
                        time: supplement(prevState.time--),
                    };
                },
                () => {
                    if (this.state.time === "00") {
                        clearInterval(this.timer);
                        this.setState({ isCountDown: false });
                    }
                }
            );
        }, 1000);
    };
    // 完成按钮
    finish = () => {
        api_verifyCode(this.props.phone, this.state.code).then((data) => {
            if (data.code === 200) {
                console.log("验证验证码成功,继续操作", data);
                api_sign_reset(
                    this.props.phone,
                    this.props.password,
                    this.state.code,
                    this.props.nickname
                ).then((res) => {
                    console.log("修改密码或者注册", res);
                    if (res.code === 200) {
                        pubsub.publishSync("isTab", {
                            tab: "login",
                        });
                    }
                });
            } else console.log("验证验证码失败,请重新检查", data);
        });
    };
    componentDidMount() {
        this.countDown();
        api_getcode(this.props.phone).then((data) => {
            if (data.code === 200) console.log("获取验证码成功,请注意查看手机", data);
            else console.log("获取验证码失败,请检查次数", data);
        });
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render() {
        const { time, isCountDown } = this.state;
        return (
            <React.Fragment>
                <div className="code">
                    <p>为了安全，我们会向你的手机发送短信验证码</p>
                    <input
                        type="text"
                        onChange={this.changeCode}
                        value={this.state.code}
                        placeholder="请填验证码"
                    />
                    <i className="iconfont icon-quanxianyuechi-xianxing" />
                    <button
                        className={isCountDown ? "count-down" : "none-count-down"}
                        onClick={this.getCode}
                    >
                        {isCountDown ? `00:${time}` : "重新获取"}
                    </button>
                </div>
                <button className="finish" onClick={this.finish}>
                    完成
                </button>
            </React.Fragment>
        );
    }
}

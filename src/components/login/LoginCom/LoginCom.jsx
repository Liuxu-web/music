import React, { Component } from "react";
import pubsub from "pubsub-js";
import md5 from "md5";
import "./LoginCom.css";

export default class LoginCom extends Component {
    constructor(params) {
        super(params);
        this.state = {
            text: "", // 手机号
            password: "", // 密码
            hint: [], // 提示验证是否正确
            agreementBoll: false, // 条款input 是否选中
            popup: false, // 弹出提示,条款
        };
    }

    // 受控组件
    changeValue = (event) => {
        event.persist();
        this.setState(() => {
            return {
                [event.target.type]: event.target.value,
            };
        });
    };
    componentDidMount() {
        // 退出登录
        // this.$get("/api/logout").then((data) => {
        //     console.group("退出登录");
        //     console.log(data);
        //     console.groupEnd();
        // });
    }
    // 登录按钮
    login = () => {
        // 判断是否选中条款
        if (!this.state.agreementBoll) {
            this.setState({ popup: true }, () => {
                setTimeout(() => {
                    this.setState({ popup: false });
                }, 1400);
            });
            return;
        }
        // 验证手机号-密码
        const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
        const regText = reg.test(this.state.text);
        let setstate = [];
        if (!regText) setstate = [1, "请输入正确的手机号"];
        else if (this.state.password === "") setstate = [2, "请输入登录密码"];
        else if (this.state.password.length < 7) setstate = [2, "请输入合规密码"];
        this.setState(
            () => {
                return {
                    hint: setstate,
                };
            },
            async () => {
                if (this.state.hint.length === 0) {
                    console.log("发射请求把");
                    const logData = await this.$post("/api/login/cellphone", {
                        phone: this.state.text,
                        md5_password: md5(this.state.password),
                    });
                    console.group("登录");
                    console.log(logData);
                    console.groupEnd();
                    if (logData.code === 502) {
                        console.log("密码或者手机号错误");
                    } else if (logData.code === 200) {
                        const refresh = await this.$get("/api/login/refresh", {
                            withCredentials: true,
                        });

                        console.group("刷新登录状态");
                        console.log(refresh);
                        console.groupEnd();

                        const status = await this.$get("/api/login/status", {
                            withCredentials: true,
                        });
                        console.group("获取登录状态");
                        console.log(status);
                        console.groupEnd();
                    }
                }
            }
        );
    };
    // 手机号-密码验证提示
    verify = () => {
        const index = this.state.hint;
        if (index[0] === 1) {
            return (
                <div className="loginerr">
                    <i className="iconfont icon-jinggao"></i>
                    {index[1]}
                </div>
            );
        } else if (index[0] === 2) {
            return (
                <div className="loginerr">
                    <i className="iconfont icon-jinggao"></i>
                    {index[1]}
                </div>
            );
        }
    };
    // 同意 服务条款等...选择框
    checkedAgreement = () => {
        this.setState((prevState) => {
            return {
                agreementBoll: !prevState.agreementBoll,
            };
        });
    };
    // 重设密码
    resetPassword = () => {
        pubsub.publishSync("isTab", "reset");
    };
    signUp = () => {
        // 判断是否选中条款
        if (!this.state.agreementBoll) {
            this.setState({ popup: true }, () => {
                setTimeout(() => {
                    this.setState({ popup: false });
                }, 1400);
            });
            return;
        }
        pubsub.publishSync("isTab", "sigin");
    };
    render() {
        return (
            <div className="login-com">
                {this.state.popup ? (
                    <div className="message">
                        请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》
                    </div>
                ) : null}

                {/* form表单 */}
                <div className="form">
                    <div className="phone">
                        <div className="select">
                            <i className="iconfont icon-shouji"></i>
                            <div className="area_code">
                                +86 <i className="iconfont icon-jiantouxia"></i>
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="请输入手机号"
                            onChange={this.changeValue}
                            value={this.state.text}
                        />
                    </div>
                    <div className="password">
                        <i className="iconfont icon-mima"></i>
                        <input
                            type="password"
                            placeholder="请输入密码"
                            onChange={this.changeValue}
                            value={this.state.password}
                        />
                        <button onClick={this.resetPassword}>重设密码</button>
                    </div>
                </div>
                {/* 登录按钮 - 下一步*/}
                <button onClick={this.login}>登录</button>
                {/* 提示账号 */}
                <div className="hint">
                    <div className="autologin">
                        <input type="checkbox" />
                        <span>自动登录</span>
                    </div>
                    {this.verify()}
                </div>

                <button onClick={this.signUp}>注册</button>
                {/* 条款 */}
                <div className="agreement">
                    <input
                        type="checkbox"
                        onChange={this.checkedAgreement}
                        checked={this.state.agreementBoll}
                    />
                    <span>同意</span>
                    <i>《服务条款》</i>
                    <i>《隐私政策》</i>
                    <i>《儿童隐私条款》</i>
                </div>
            </div>
        );
    }
}

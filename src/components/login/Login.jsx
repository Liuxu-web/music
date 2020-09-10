import React, { Component } from "react";
import pubsub from "pubsub-js";
import style from "./Loing.module.css";
import md5 from "md5";
export default class Login extends Component {
    constructor(params) {
        super(params);
        this.conceal = null;
        this.icon_guanbi = null;
        this.state = {
            text: "",
            password: "",
            hint: [],
            agreementBoll: false,
            isShow: false,
        };
    }
    // 改变父级的state,发布订阅
    changeFatherState = (event) => {
        const name = event.target.className;
        if (name === this.conceal.className || name === this.icon_guanbi.className) {
            pubsub.publishSync("isShow");
        }
    };
    // 受控组件
    changeValue = (event) => {
        event.persist();
        this.setState(() => {
            return {
                [event.target.type]: event.target.value,
            };
        });
    };
    // 登录按钮
    login = () => {
        // 判断是否选中条款
        if (!this.state.agreementBoll) {
            this.setState({ isShow: true }, () => {
                setTimeout(() => {
                    this.setState({ isShow: false });
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
                <div className={style.loginerr}>
                    <i className="iconfont icon-jinggao"></i>
                    {index[1]}
                </div>
            );
        } else if (index[0] === 2) {
            return (
                <div className={style.loginerr}>
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
    render() {
        return (
            <div
                ref={(e) => (this.conceal = e)}
                className={style.conceal}
                onClick={this.changeFatherState}
            >
                <div className={style.login_box}>
                    {this.state.isShow ? (
                        <div className={style.message}>
                            请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》
                        </div>
                    ) : null}
                    <button
                        ref={(e) => (this.icon_guanbi = e)}
                        className="iconfont icon-guanbi"
                        onClick={this.changeFatherState}
                    />
                    <div className={style.form}>
                        <div className={style.phone}>
                            <div className={style.select}>
                                <i className="iconfont icon-shouji"></i>
                                <div className={style.area_code}>
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
                        <div className={style.password}>
                            <i className="iconfont icon-mima"></i>
                            <input
                                type="password"
                                placeholder="请输入密码"
                                onChange={this.changeValue}
                                value={this.state.password}
                            />
                            <button>重设密码</button>
                        </div>
                    </div>
                    <div className={style.hint}>
                        <div className={style.autologin}>
                            <input type="checkbox" />
                            <span>自动登录</span>
                        </div>
                        {this.verify()}
                    </div>
                    <button onClick={this.login}>登录</button>
                    <button>注册</button>
                    <div className={style.agreement}>
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
            </div>
        );
    }
}

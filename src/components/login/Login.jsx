import React, { Component } from "react";
import pubsub from "pubsub-js";
import style from "./Loing.module.css";
export default class Login extends Component {
    constructor(params) {
        super(params);
        this.conceal = null;
        this.icon_guanbi = null;
        this.state = {
            text: "",
            password: "",
            hint: [],
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
    // 登录
    login = () => {
        const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
        const regText = reg.test(this.state.text);
        let setstate = [];
        if (!regText) {
            setstate = [1, "请输入正确的手机号"];
        } else if (this.state.password === "") {
            setstate = [2, "请输入登录密码"];
        }
        this.setState(() => {
            return {
                hint: setstate,
            };
        });
    };

    showHidden = () => {
        if (this.state.hint[0] === 1) {
            return (
                <div className={style.loginerr}>
                    <i className="iconfont icon-jinggao"></i>
                    {this.state.hint[1]}
                </div>
            );
        } else if (this.state.hint[0] === 2) {
            return (
                <div className={style.loginerr}>
                    <i className="iconfont icon-jinggao"></i>
                    {this.state.hint[1]}
                </div>
            );
        }
    };

    render() {
        return (
            <div
                ref={(e) => (this.conceal = e)}
                className={style.conceal}
                onClick={this.changeFatherState}
            >
                <div className={style.login_box}>
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
                            <input type="radio" />
                            <span>自动登录</span>
                        </div>
                        {this.showHidden()}
                    </div>
                    <button onClick={this.login}>登录</button>
                    <button>注册</button>
                    <div className={style.agreement}>
                        <input type="radio" name="" id="" />
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

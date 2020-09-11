import React, { Component } from "react";
import "../LoginCom/LoginCom.css"
export default class SigninCom extends Component {
    constructor(params) {
        super(params);
        this.state = {
            text: "", // 手机号
            password: "", // 密码
            hint: [], // 提示验证是否正确
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

    // 登录按钮
    login = () => {
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
    render() {
        return (
            <div className="reset-com">
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
                            placeholder="设置登录密码，不少于6位数"
                            onChange={this.changeValue}
                            value={this.state.password}
                        />
                    </div>
                </div>
                {/* 登录按钮 - 下一步*/}
                <button onClick={this.login}>注册</button>
                {/* 提示账号 */}
                <div className="hint">{this.verify()}</div>
            </div>
        );
    }
}

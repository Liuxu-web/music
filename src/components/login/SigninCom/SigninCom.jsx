import React, { Component } from "react";
import { isPhone, verify } from "../../../utils";
import { api_isSign } from "../../../utils/api";
import Prompt from "../../prompt/Prompt";
import "../LoginCom/LoginCom.less";
export default class SigninCom extends Component {
    constructor(params) {
        super(params);
        this.state = {
            text: "", // 手机号
            password: "", // 密码
            hint: [], // 提示验证是否正确
            popup: false,
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
    signUp = () => {
        let setstate = [];
        // 验证手机号-密码
        if (!isPhone(this.state.text)) setstate = [1, "请输入正确的手机号"];
        else if (this.state.password === "") setstate = [2, "请输入登录密码"];
        else if (this.state.password.length < 6) setstate = [2, "密码长度不少于6位数"];
        this.setState(
            () => {
                return {
                    hint: setstate,
                };
            },

            () => {
                if (setstate.length === 0) {
                    // 检测手机号码是否已注册

                    api_isSign(this.state.text).then((data) => {
                        console.log("注册-手机号是否被注册方法", data);
                        const { code, hasPassword } = data;
                        if (code === 200 && hasPassword === false) {
                            console.log("没有注册");
                        } else {
                            // 进入这个条件,手机号已经被注册
                            this.setState({ popup: true }, () => {
                                setTimeout(() => {
                                    this.setState({ popup: false });
                                }, 1400);
                            });
                        }
                    });
                }
            }
        );
    };

    render() {
        const { hint, popup } = this.state;
        return (
            <div className="reset-com">
                {popup ? <Prompt text={"该手机号已经被注册,请去登录"} /> : null}
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
                <button onClick={this.signUp}>注册</button>
                {/* 提示账号 */}
                <div className="hint">{verify(hint)}</div>
            </div>
        );
    }
}

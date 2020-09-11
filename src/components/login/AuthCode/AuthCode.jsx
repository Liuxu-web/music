import React, { Component } from "react";

export default class AuthCode extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="code">
                    <p>为了安全，我们会向你的手机发送短信验证码</p>
                    <input type="text" />
                    <div className="count-down">60</div>
                </div>
                <button className="finish">完成</button>
            </React.Fragment>
        );
    }
}

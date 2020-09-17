/**
 * 弹出提示组件 (公用)
 */
import React, { Component } from "react";
import "./Prompt.css"
export default class Prompt extends Component {
    render() {
        return <div className="message">{this.props.text}</div>;
    }
}

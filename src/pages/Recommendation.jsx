/**
 * 个性推荐
 */
import React, { Component } from "react";

import "./less/Recommendation.less";
import Banner from "../components/banner/Banner";

export default class Recommendation extends Component {
    render() {
        return (
            <div className="Recommendation">
                <Banner orientation="right" />
            </div>
        );
    }
}

/**
 * 个性推荐
 */
import React, { Component } from "react";

import "./less/Recommendation.css";
import Banner from "../components/banner/Banner";

export default class Recommendation extends Component {
    render() {
        return (
            <div className="Recommendation">
                <Banner orientation="right" />
            </div>
        );
    }
    componentDidMount() {
        this.$get("/api/personal_fm").then((res) => {
            console.log("res", res);
        });
    }
}

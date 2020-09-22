/**
 * 个性推荐
 */
import React, { Component } from "react";

import "./less/Recommendation.less";
import Banner from "../components/Recommendation/banner/Banner";
import RecommendThePlaylist from "../components/Recommendation/RecommendThePlaylist/RecommendThePlaylist";

export default class Recommendation extends Component {
    render() {
        return (
            <div className="Recommendation">
                {/* 轮播图 */}
                <Banner orientation="right" />
                {/* 每日推荐-推荐歌单 */}
                <RecommendThePlaylist />
             
            </div>
        );
    }
}

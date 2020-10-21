/**
 * 歌单详情页面
 * 根据不同的歌单展示歌单详情
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SongListDetailsCreator from "../redux/actionCreator/SongListDetails.js";
import { getTheDate } from "../utils";
import "./less/SongListDetails.less";

class SongListDetails extends Component {
    componentDidMount() {
        this.props.GET_SONG_LIST_DETALIS.apply(this);
    }
    render() {
        return (
            <div className="SongListDetails">
                <div className="sld_header_box">
                    <div className="sld_hedaer">
                        {/* 详情背景图片 */}
                        <div className="details_img">
                            <img src={require("../assets/lazy.gif")} alt="1" />
                        </div>
                        {/* 详情介绍 */}
                        <div className="details_text">
                            {/* 歌单标题 */}
                            <div className="details_title">[日系喜人定制]最懂你的日系推荐 每日更新35首</div>
                            {/* 歌单用户 */}
                            <div className="details_user">
                                <img src="http://p1.music.126.net/zkWURDiavZGoPq-sVTC-uQ==/109951165165281866.jpg" alt="" />
                                <div className="name">网易云音乐</div>
                                <div className="time">{getTheDate(1601207987060)}创建</div>
                            </div>
                            {/* 按钮 */}
                            <div className="details_button">
                                <div className="all_play_button">
                                    <button>全部播放</button>
                                    <button />
                                </div>
                                <button>收藏(2)</button>
                                <button>分享(2)</button>
                                <button>下载全部</button>
                            </div>
                            {/* 介绍 */}
                            <div className="details_introduce">
                                <div className="label">
                                    标签: <a href="JavaScript:;">添加标签</a>
                                </div>
                                <div className="introduce">简介:</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//redux
const mapStateToProps = (state) => {
    return {
        SongList: state.SongListDetails,
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(SongListDetailsCreator, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SongListDetails);

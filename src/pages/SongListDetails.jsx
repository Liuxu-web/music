/**
 * 歌单详情页面
 * 根据不同的歌单展示歌单详情
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SongListDetailsCreator from "../redux/actionCreator/SongListDetails.js";
import { api_playlist_detail } from "../utils/api";
import "./less/SongListDetails.less";

class SongListDetails extends Component {
    componentDidMount() {
        api_playlist_detail(this.props.match.params.id).then((data) => {
            console.log(data);
        });
    }
    render() {
        return (
            <div className="SongListDetails">
                <div className="title">
                    <img src={require("../assets/lazy.gif")} alt="" />
                    <div className="information">
                        <h1>【回到日本泡沫时代】FM调频广播83.5</h1>
                        {/* 用户头像-名字-歌单创建时间 */}
                        <div className="user">
                            <img src="" alt="" />
                            <p></p>
                            <span></span>
                        </div>
                        {/* 播放-收藏-分享-全部下载 */}
                        <div>
                            <div className="btn">全部播放</div>
                            <button>收藏</button>
                            <button>分享</button>
                            <button>下载全部</button>
                        </div>
                        {/* 标签 */}
                        <div className="tag">标签:阿萨德/阿萨德/阿萨德</div>
                        {/* 简介 */}
                        <div className="brief">
                            简介:如同穿梭在恍惚的时空隧道,透过蓝白条的银色,以及明亮的吉他弦,伴随着抓耳的旋律,Clty-Pop萱堂积极向上的雷管就像是肥皂宝宝的先例空虚,往西的美好景象在清空类日下,随着太阳的热量逐渐蒸发掉
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//redux
const mapStateToProps = (state) => {
    console.log(state);
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(SongListDetailsCreator, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SongListDetails);

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import RecommendThePlaylistCreator from "../../../redux/actionCreator/RecommendThePlaylist";
import { changeNum } from "../../../utils";
class RecommendThePlaylist extends Component {
    skipRouter = (id) => {
        this.props.history.push(`/SongListDetails/${id}`);
    };

    componentDidMount() {
        this.props.GET_RECOMMEND_THE_PLAYLIST.apply(this);
    }
    render() {
        const { RecommendThePlaylist } = this.props;
        return (
            <div className="RecommendThePlaylist">
                <div className="title">
                    <h1>推荐歌单</h1>
                    <button>更多</button>
                </div>
                <div className="content">
                    {RecommendThePlaylist.map((item) => (
                        <div
                            className="list"
                            play-list={item.id}
                            onClick={this.skipRouter.bind(this, item.id)}
                            key={item.id}
                        >
                            <div className="playCount iconfont icon-headset">
                                {changeNum(item.playCount)}
                            </div>
                            <div className="tit">{item.copywriter}</div>
                            <img src={item.picUrl} alt={item.copywriter} />
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
//redux
const mapStateToProps = (state) => {
    return {
        RecommendThePlaylist: state.RecommendThePlaylist.RecommendThePlaylist,
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(RecommendThePlaylistCreator, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecommendThePlaylist));

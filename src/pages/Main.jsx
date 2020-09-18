/**
 * 发现音乐
 */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./less/Main.less";
import Router from "../routers/Router";
export default class Main extends Component {
    render() {
        const routerList = this.props.childrens;
        return (
            <div className="Main">
                <header>
                    <NavLink exact to="/Main">
                        个性推荐
                    </NavLink>
                    <NavLink to="/Main/SongList">歌单</NavLink>
                    <NavLink to="/Main/Anchor">主播电台</NavLink>
                    <NavLink to="/Main/RankingList">排行榜</NavLink>
                    <NavLink to="/Main/Singer">歌手</NavLink>
                    <NavLink to="/Main/NewestMusic">最新音乐</NavLink>
                </header>
                {/* 路由 */}
                <Router routerList={routerList} />
            </div>
        );
    }
}

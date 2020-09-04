import React, { Component } from "react";
import { musicTime } from "../../utils";

export default class AudioPlayer extends Component {
    constructor(params) {
        super(params);
        this.audio = "";
        this.dot = "";
        this.state = {
            totalTime: "", //总时长
            presentTime: "", // 播放时长
            iconfont: "iconfont icon-bofang", // 图标
            width: 0, // 进度条宽
            songTime: "", // 未修改:原总时长 单位S
            playtime: "", // 未修改:播放时长 单位S
            isChange: false, // 是否开启移动函数开关
            isMute: false, // 是否静音
            m_move_x: 0, 
            m_down_x: 0,
            dx: 0,
            md_x: 0,
            ndx: 165,
        };
    }

    // 根据时间获取百分比
    percentum(znum, gnum, func) {
        let number = ((znum - gnum) / znum).toFixed(4).substr(2, 4).split("") || 100;
        let num = 1 - (znum - gnum) / znum;
        number.splice(2, 0, ".");
        number = number.join("") - 0;
        if (number === 0) number = 100;
        this.setState(
            () => {
                return {
                    width: 100 - number + "%",
                };
            },
            () => {
                if (func) {
                    func(num);
                }
            }
        );
    }
    // 播放暂停
    play() {
        if (this.audio.paused)
            this.setState(
                () => {
                    return {
                        iconfont: "iconfont icon-stop",
                    };
                },
                () => {
                    this.audio.play();
                }
            );
        else
            this.setState(
                () => {
                    return { iconfont: "iconfont icon-bofang" };
                },
                () => {
                    this.audio.pause();
                }
            );
    }
    // 点击进度条
    clickProgress(event) {
        event.persist();
        if (event.target.className === "progress") {
            console.log(event.target.clientWidth, event.nativeEvent.offsetX);
            this.percentum(event.target.clientWidth, event.nativeEvent.offsetX, (num) => {
                this.audio.currentTime = num * this.state.songTime;
            });
        }
    }

    mouseDown(event) {
        event.persist();
        if (event.target.className === "volume") {
            this.setState(
                () => {
                    return {
                        isDown: true,
                        m_down_x: event.pageX - 8,
                        dx: this.dot.offsetLeft,
                    };
                },
                () => {
                    this.setState((prevState) => {
                        return {
                            md_x: prevState.m_down_x - prevState.dx,
                        };
                    });
                }
            );
        }
    }
    mouseMove(event) {
        event.persist();
        if (event.target.className === "volume") {
            //鼠标按下时移动才触发
            if (this.state.isDown) {
                this.setState(
                    () => {
                        return {
                            dx: this.dot.offsetLeft,
                            m_move_x: event.pageX - 8,
                        };
                    },
                    () => {
                        this.setState(
                            (prevState) => {
                                return {
                                    ndx: prevState.m_move_x - prevState.md_x,
                                };
                            },
                            () => {
                                let num = (1 - (165 - this.state.ndx) / 165).toFixed(2);
                                if (num > 1) num = 1;
                                else if (num < 0) num = 0;
                                this.audio.volume = num;
                            }
                        );
                    }
                );
            }
        }
    }
    mouseUp() {
        if (this.state.isDown) {
            this.setState(() => {
                return {
                    isDown: false,
                };
            });
        }
    }
    // 静音
    mute() {
        this.setState(
            (prevState) => {
                return {
                    isMute: !prevState.isMute,
                    ndx: this.state.isMute ? 165 : 0,
                };
            },
            () => {
                console.log(this.state.isMute);
                this.audio.muted = this.state.isMute;
            }
        );
    }

    componentDidMount() {
        this.audio.src =
            "https://isure.stream.qqmusic.qq.com/C400000I42sc1Lrn0d.m4a?guid=4671197247&vkey=214882FEAB679573C08645C641490EE9AECD8F7C2FF851DF98FB66CA5A1D3A49DDA6B889156E6DD95FE0764477F5DAA03C8EB624DCE72CB6&uin=0&fromtag=66";
        // 加载完毕周期
        this.audio.playbackRate = 1;

        console.log("当前音量", this.audio.volume);

        this.audio.addEventListener("canplay", () => {
            this.setState(() => {
                return {
                    presentTime: musicTime(this.audio.currentTime),
                    totalTime: musicTime(this.audio.duration),
                    songTime: this.audio.duration,
                };
            });
        });
        // 开始周期
        this.audio.addEventListener("play", () => {
            console.log("开始播放:" + this.audio.currentTime);
        });
        // 暂停周期
        this.audio.addEventListener("pause", () => {
            console.log("暂停播放:" + this.audio.currentTime);
            console.table();
            if (this.audio.ended) {
                this.setState(() => {
                    return {
                        iconfont: "iconfont icon-bofang",
                        presentTime :"00:00"
                    };
                });
            }
        });
        // 播放中周期
        this.audio.addEventListener("timeupdate", () => {
            this.setState(
                () => {
                    return {
                        presentTime: musicTime(this.audio.currentTime),
                        playtime: this.audio.currentTime,
                    };
                },
                () => {
                    this.percentum(this.state.songTime, this.state.playtime);
                }
            );
        });
    }

    render() {
        return (
            <React.Fragment>
                <audio ref={(e) => (this.audio = e)}></audio>
                {/* 上一首|暂停|播放|下一首 */}
                <div className="controlOne">
                    <button className="iconfont icon-shangyishou"></button>
                    <button className={this.state.iconfont} onClick={this.play.bind(this)}></button>
                    <button className="iconfont icon-xiayishou"></button>
                </div>
                {/* 播放进度 */}
                <div className="progress_box">
                    <div className="musicTime">{this.state.presentTime}</div>
                    <div className="progress" onClick={this.clickProgress.bind(this)}>
                        <div style={{ width: this.state.width }} className="pro">
                            <div className="dot" />
                        </div>
                    </div>
                    <div className="musicTime">{this.state.totalTime}</div>
                </div>
                {/* 其他控制 */}
                <div className="controlTwo" onMouseUp={this.mouseUp.bind(this)}>
                    <div
                        className="volumeBox"
                        onMouseDown={this.mouseDown.bind(this)}
                        onMouseMove={this.mouseMove.bind(this)}
                    >
                        <i
                            target={"静音"}
                            className="iconfont icon-Volumeyinliang"
                            onClick={this.mute.bind(this)}
                        />
                        <div className="volume">
                            <div
                                className="pro"
                                style={{
                                    width: this.state.ndx > 165 ? "165px" : this.state.ndx + "px",
                                }}
                            >
                                <div className="dot" ref={(e) => (this.dot = e)} />
                            </div>
                        </div>
                    </div>
                    <button>标准</button>
                    <button>词</button>
                    <button className="iconfont icon-wj-bflb"></button>
                </div>
            </React.Fragment>
        );
    }
}

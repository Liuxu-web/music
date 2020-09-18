import React, { Component } from "react";
import { musicTime, supplement } from "../../utils";

export default class AudioPlayer extends Component {
    constructor(params) {
        super(params);
        this.sumProgress = null;
        this.audio = null;
        this.dot = null;
        this.volume_sumProgress = null;
        this.volume_dot = null;
        this.state = {
            volume_width: localStorage.volume_width || "100%", // 进度条宽
            muteIconfont: "iconfont icon-Volumeyinliang",
            iconfont: "iconfont icon-bofang", // 图标
            presentTime: "", // 播放时长
            totalTime: "", //总时长
            songTime: "", // 未修改:原总时长 单位S
            playtime: "", // 未修改:播放时长 单位S
            isMove: true, // 是否开启移动函数开关
            isMute: false, // 是否静音
            isPlay: false, // 是否播放
            width: null, // 进度条宽
        };
    }
    percentum(znum, gnum, boll, func) {
        let number = ((znum - gnum) / znum).toFixed(4).substr(2, 4).split("");
        let num = 1 - (znum - gnum) / znum;
        number.splice(2, 0, ".");
        number = number.join("");
        this.setState(
            () => {
                let width = boll ? "width" : "volume_width";
                return {
                    [width]: 100 - number === 100 ? 0 : 100 - number + "%",
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
                        isPlay: true,
                    };
                },
                () => {
                    this.audio.play();
                }
            );
        else
            this.setState(
                () => {
                    return {
                        iconfont: "iconfont icon-bofang",
                        isPlay: false,
                    };
                },
                () => {
                    this.audio.pause();
                }
            );
    }
    // 音量
    history(boll) {
        if (boll) {
            if (localStorage.volume_width === "0") return "20%";
            else if (!localStorage.volume_width) return "100%";
            else if (localStorage.volume_width) return localStorage.volume_width;
        } else return "0%";
    }
    // 静音
    mute = () => {
        console.log(this.state.volume_width);
        this.setState(
            (prevState) => {
                return {
                    isMute: !prevState.isMute,
                    muteIconfont: !prevState.isMute
                        ? "iconfont icon-jingyin"
                        : "iconfont icon-Volumeyinliang",
                    volume_width: this.history(this.state.isMute),
                };
            },
            () => {
                this.audio.muted = this.state.isMute;

                if (localStorage.volume_width) {
                    this.audio.volume = "0." + supplement(parseInt(this.state.volume_width));
                } else this.audio.volume = 1;
            }
        );
    };
    // 播放模式
    playPattern = () => {
        this.audio.loop = true;
    };
    componentDidMount() {
        this.audio.src = require("../../assets/冻结.mp3");
        this.audio.playbackRate = 1;
        if (localStorage.volume_width) {
            this.audio.volume = "0." + parseInt(localStorage.volume_width);
        } else this.audio.volume = 1;

        // 加载完毕周期
        this.audio.addEventListener("canplay", () => {
            this.setState(() => {
                return {
                    presentTime: musicTime(this.audio.currentTime),
                    totalTime: musicTime(this.audio.duration),
                    songTime: this.audio.duration,
                };
            });
        });
        // 暂停周期
        this.audio.addEventListener("pause", () => {
            if (this.audio.ended) {
                this.setState(() => {
                    return {
                        iconfont: "iconfont icon-bofang",
                        presentTime: "00:00",
                        isPlay: false,
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
                    this.percentum(this.state.songTime, this.state.playtime, true);
                }
            );
        });
    }
    //点击跳转指定播放位置
    sumProgressClick = (event) => {
        event.persist();
        this.percentum(event.target.clientWidth, event.nativeEvent.layerX, true, (num) => {
            this.audio.currentTime = num * this.state.songTime;
        });
    };
    //dot 鼠标按下
    dotMouseDown = () => {
        this.setState(
            () => {
                return {
                    isMove: false,
                };
            },
            () => {
                this.dot.style.pointerEvents = "none";
                this.sumProgress.style.pointerEvents = "none";
                this.audio.pause();
            }
        );
    };
    //fansile 鼠标移动
    fansileMouseMove = (event) => {
        event.persist();
        if (this.state.isMove) return;

        this.percentum(event.target.clientWidth, event.nativeEvent.layerX, true, (num) => {
            this.audio.currentTime = num * this.state.songTime;
        });
    };
    //dot 鼠标抬起 fansile 鼠标抬起 鼠标移出
    MouseUp = () => {
        if (this.state.isMove === false) {
            this.setState(
                () => {
                    return {
                        isMove: true,
                    };
                },
                () => {
                    this.dot.style.pointerEvents = "all";
                    this.sumProgress.style.pointerEvents = "all";
                    if (this.audio.paused && this.state.isPlay) this.audio.play();
                }
            );
        }
    };
    //点击调到指定位置音量
    volume_sumProgressClick = (event) => {
        event.persist();
        this.percentum(event.target.clientWidth, event.nativeEvent.layerX, false, (num) => {
            this.audio.volume = num.toFixed(2);
            localStorage.volume_width = this.state.volume_width;
        });
    };
    //volume_dot 鼠标按下
    volume_dotMouseDown = () => {
        this.setState(
            () => {
                return {
                    isMove: false,
                };
            },
            () => {
                this.volume_dot.style.pointerEvents = "none";
                this.volume_sumProgress.style.pointerEvents = "none";
            }
        );
    };
    //volume_fansile 鼠标移动
    volume_fansileMouseMove = (event) => {
        event.persist();
        if (this.state.isMove) return;
        this.percentum(event.target.clientWidth, event.nativeEvent.layerX, false, (num) => {
            this.audio.volume = num.toFixed(2);
            localStorage.volume_width = this.state.volume_width;
            if (this.audio.volume === 0) {
                this.setState(
                    (prevState) => {
                        return {
                            isMute: !prevState.isMute,
                            muteIconfont: !prevState.isMute
                                ? "iconfont icon-jingyin"
                                : "iconfont icon-Volumeyinliang",
                            volume_width: this.history(this.state.isMute),
                        };
                    },
                    () => {
                        this.audio.muted = this.state.isMute;
                    }
                );
            } else {
                this.setState(
                    () => {
                        return {
                            isMute: false,
                            muteIconfont: "iconfont icon-Volumeyinliang",
                        };
                    },
                    () => {
                        this.audio.muted = this.state.isMute;
                    }
                );
            }
        });
    };
    //volume_dot 鼠标抬起 volume_fansile 鼠标抬起 鼠标移出
    volume_MouseUp = () => {
        if (this.state.isMove === false) {
            this.setState(
                () => {
                    return {
                        isMove: true,
                    };
                },
                () => {
                    this.volume_dot.style.pointerEvents = "all";
                    this.volume_sumProgress.style.pointerEvents = "all";
                }
            );
        }
    };

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
                    <div
                        className="fansile"
                        onMouseLeave={this.MouseUp}
                        onMouseUp={this.MouseUp}
                        onMouseMove={this.fansileMouseMove}
                    >
                        <div
                            className="sumProgress"
                            ref={(e) => (this.sumProgress = e)}
                            onClick={this.sumProgressClick}
                        ></div>
                        <div className="progress" style={{ width: this.state.width }}>
                            <i
                                className="dot"
                                ref={(e) => (this.dot = e)}
                                onMouseDown={this.dotMouseDown}
                                onMouseUp={this.MouseUp}
                            ></i>
                        </div>
                    </div>
                    <div className="musicTime">{this.state.totalTime}</div>
                </div>
                {/* 其他控制 */}
                <div className="controlTwo">
                    <div className="volumeBox">
                        <i
                            target={"静音"}
                            className={this.state.muteIconfont}
                            onClick={this.mute}
                        />
                        <div className="volume">
                            <div
                                className="volume-fansile"
                                onMouseLeave={this.volume_MouseUp}
                                onMouseUp={this.volume_MouseUp}
                                onMouseMove={this.volume_fansileMouseMove}
                            >
                                <div
                                    className="volume-sumProgress"
                                    ref={(e) => (this.volume_sumProgress = e)}
                                    onClick={this.volume_sumProgressClick}
                                ></div>
                                <div
                                    className="volume-progress"
                                    style={{ width: this.state.volume_width }}
                                >
                                    <i
                                        className="volume-dot"
                                        ref={(e) => (this.volume_dot = e)}
                                        onMouseDown={this.volume_dotMouseDown}
                                        onMouseUp={this.volume_MouseUp}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="iconfont icon-danquxunhuan1"
                        onClick={this.playPattern}
                    ></button>
                    <button>标准</button>
                    <button>词</button>
                </div>
            </React.Fragment>
        );
    }
}

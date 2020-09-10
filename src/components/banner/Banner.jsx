import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import bannerCreator from "../../redux/actionCreator/banner";

class Banner extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            current: 0,
            dir: [{ name: "middle" }, { name: "end" }, { name: "normal" }, { name: "start" }],
        };
    }

    // 鼠标移出
    bannerLeave = () => {
        clearInterval(this.timer);
        this.automatic();
    };
    // 鼠标移入
    bannerEnter = () => {
        clearInterval(this.timer);
    };
    // 轮播
    automatic = () => {
        this.timer = setInterval(() => {
            this.switchover(this.props.orientation);
        }, 5000);
    };
    // 替换数组
    switchover = (direction) => {
        let dirCopy = this.state.dir;
        if (direction === "right") {
            const pop = dirCopy.pop(); // 从数组尾部弹出一个元素
            dirCopy.unshift(pop); // 尾部元素添加到数组头部
            this.setState(
                (prevState) => {
                    return {
                        current: prevState.current++,
                    };
                },
                () => {
                    if (this.state.current > 9)
                        this.setState(() => {
                            return { current: 0 };
                        });
                }
            );
        } else if (direction === "left") {
            const shift = dirCopy.shift(); // 从数组头部弹出一个元素
            dirCopy.push(shift); // 添加到数组尾部
            this.setState(
                (prevState) => {
                    return {
                        current: prevState.current--,
                    };
                },
                () => {
                    if (this.state.current < 0)
                        this.setState(() => {
                            return { current: 9 };
                        });
                }
            );
        }
        this.setState(() => {
            return { dir: dirCopy };
        }); // 保存重新排列的数组 并触发render
    };
    // 小面的小点点
    pointFunc = (index) => {
        // 按钮点击
        const { current } = this.state;
        const dirCopy = this.state.dir;
        if (index < current) {
            // 鼠标经过左侧的按钮
            for (let i = 0; i < current - index; i += 1) {
                // 判断距离
                const shift = dirCopy.shift(); // 进行数组操作
                dirCopy.push(shift);
            }
        } else if (index > current) {
            // 鼠标经过右侧的按钮
            for (let i = 0; i < index - current; i += 1) {
                const pop = dirCopy.pop();
                dirCopy.unshift(pop);
            }
        }
        this.setState({ dir: dirCopy }); // 触发react-render重新渲染页面
        this.setState({ current: index }); // 记录当前图片节点
    };
    // 监听页面是否可见
    visibilityState = () => {
        // 页面变为不可见时触发
        if (document.visibilityState === "hidden") clearTimeout(this.timer);
        // 页面变为可见时触发
        if (document.visibilityState === "visible") this.automatic();
    };
    // 界面挂载结束
    componentDidMount() {
        this.props.GET_BANNER.apply(this);

        this.automatic();
        document.addEventListener("visibilitychange", this.visibilityState);
    }
    // 页面销毁时
    componentWillUnmount() {
        clearInterval(this.timer);
        document.removeEventListener("visibilitychange", this.visibilityState);
    }
    render() {
        const { dir } = this.state;
        const { banner } = this.props;
        return (
            <div className="banner" onMouseEnter={this.bannerEnter} onMouseLeave={this.bannerLeave}>
                <button value="<" onClick={this.switchover.bind(this, "left")} />
                <button value=">" onClick={this.switchover.bind(this, "right")} />
                {dir.map((item, index) => (
                    <div key={item + index} className={item.name}>
                        <img
                            src={
                                banner[index]
                                    ? banner[index].imageUrl
                                    : require("../../assets/lazy.gif")
                            }
                            alt={banner[index] ? banner[index].typeTitle : ""}
                        />
                        <div
                            className="title"
                            style={{ background: banner[index] ? banner[index].titleColor : "" }}
                        >
                            {banner[index] ? banner[index].typeTitle : ""}
                        </div>
                    </div>
                ))}
                <div className="point">
                    {dir.map((item, index) => (
                        <span
                            key={item + index}
                            className={item.name === "middle" ? "hover" : ""}
                            onMouseEnter={this.pointFunc.bind(this, index)} // 鼠标进入动画
                        ></span>
                    ))}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        banner: state.banner.banner_list,
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(bannerCreator, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Banner);

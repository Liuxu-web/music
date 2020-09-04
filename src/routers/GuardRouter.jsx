import React, { Component } from "react";

import { withRouter } from "react-router-dom";

class GuardRouter extends Component {
  render() {
    return <this.props.component {...this.props} />;
  }
}
// 使用withRouter 给每一个路由组件 添加 路由信息.
export default withRouter(GuardRouter);

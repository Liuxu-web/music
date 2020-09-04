import React, { Component, Fragment, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import GuardRouter from "./GuardRouter";
class Router extends Component {
  render() {
    return (
      <Fragment>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {this.props.routerList.map((v) => (
              <Route
                key={v.path}
                path={v.path}
                exact={v.exact}
                render={() => <GuardRouter {...v} />}
              />
            ))}
            {/* 重定向 404 */}
            <Redirect to={"/Main"} from={"/"} />
          </Switch>
        </Suspense>
      </Fragment>
    );
  }
}
export default Router;

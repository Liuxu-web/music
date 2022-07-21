import React, { Component } from "react";
import routerList from "./routers";
import Router from "./routers/Router";

class App extends Component {
  componentDidMount() {
    console.log('新的修改');
  }

  render() {
    return (
      <React.Fragment>
        <Router routerList={routerList} />
      </React.Fragment>
    );
  }
}

export default App;

import React, { Component } from "react";
import routerList from "./routers";
import Router from "./routers/Router";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router routerList={routerList} />
      </React.Fragment>
    );
  }
}

export default App;

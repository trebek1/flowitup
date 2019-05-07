import React from "react";
import Styles from "./App.less";
import canvasBuilder from "./CanvasBuilder.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = element => {
      this.canvas = element;
    };
  }
  componentDidMount() {
    const { nodes, connectors, config } = this.props;
    this._canvasBuilder = canvasBuilder.default.createInstance(this.canvas);
    this._canvasBuilder.update(nodes, connectors, config);
  }

  render() {
    return <div ref={this.canvas} className={Styles.root} />;
  }
}

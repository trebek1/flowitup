import React from "react";
import Styles from "./App.less";
import Modal from "../Modal/Modal.jsx";
import canvasBuilder from "../../CanvasBuilder.js";

let NODE_ID = 0;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = element => {
      this.canvas = element;
    };

    this.state = {
      nodeForModal: null
    };
  }

  _addHandlersToConfig(config) {
    config.nodeEvents.onClick = node => this.setState({ nodeForModal: node });
    return config;
  }

  componentDidMount() {
    const { nodes, connectors, config, addNode } = this.props;
    this._canvasBuilder = canvasBuilder.default.createInstance(this.canvas);
    this._canvasBuilder.update(
      nodes,
      connectors,
      this._addHandlersToConfig(config)
    );

    quip.apps.updateToolbar({
      toolbarCommandIds: ["addVariable", "addConstant"],
      menuCommands: [
        {
          id: "addVariable",
          label: "Add Variable",
          handler: () => {
            const nodeId = "Node-ID-" + ++NODE_ID;
            addNode({
              id: nodeId,
              lable: nodeId,
              left: 0,
              top: 0,
              width: 64,
              height: 64,
              nodeShape: "CIRCLE",
              nodeColor: "pink"
            });
          }
        },
        {
          id: "addConstant",
          label: "Add Constant",
          handler: () => {
            const nodeId = "Node-ID-" + ++NODE_ID;
            addNode({
              id: nodeId,
              lable: nodeId,
              left: 0,
              top: 0,
              width: 64,
              height: 64,
              nodeShape: "SQUARE",
              nodeColor: "green"
            });
          }
        }
      ]
    });
  }

  handleModalClose = () => this.setState({ nodeForModal: null });

  handleModalSave = () => this.setState({ nodeForModal: null });

  render() {
    if (this._canvasBuilder) {
      const { nodes, connectors, config } = this.props;
      this._canvasBuilder.update(
        nodes,
        connectors,
        this._addHandlersToConfig(config)
      );
    }

    return (
      <div className={Styles.root}>
        {this.state.nodeForModal ? (
          <Modal
            handleModalClose={this.handleModalClose}
            handleModalSave={this.handleModalSave}
          />
        ) : null}
        <div ref={this.canvas} className={Styles.canvas} />
      </div>
    );
  }
}

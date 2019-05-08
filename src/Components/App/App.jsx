import React from "react";
import Styles from "./App.less";
import Modal from "../Modal/Modal.jsx";
import canvasBuilder from "../../CanvasBuilder.js";

let NODE_ID = 0;

const createNode = nodeId => ({
  anchors: [
    { id: "top", location: "Top" },
    { id: "left", location: "Left" },
    { id: "right", location: "Right" },
    { id: "bottom", location: "Bottom" }
  ],
  height: 64,
  id: nodeId,
  label: "",
  left: 0,
  nodeShape: "SQUARE",
  nodeColor: "orange",
  top: 0,
  width: 64
});

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
    config.nodeEvents.onClick = nodeForModal => this.setState({ nodeForModal });
    config.connectorEvents.onConnectorAdd = (
      sourceNodeId,
      targetNodeId,
      sourceAnchorId,
      targetAnchorId
    ) => {
      this.props.addConnector({
        sourceNodeId,
        targetNodeId,
        sourceAnchorId,
        targetAnchorId
      });
    };
    return config;
  }

  componentDidMount() {
    const { addNode, config, connectors, nodes } = this.props;
    this._canvasBuilder = canvasBuilder.default.createInstance(this.canvas);
    this._canvasBuilder.update(
      nodes,
      connectors,
      this._addHandlersToConfig(config)
    );

    quip.apps.updateToolbar({
      menuCommands: [
        {
          handler: () => addNode(createNode(`Node-ID-"${++NODE_ID}`)),
          id: "addAssignment",
          label: "Add Assignment"
        }
      ],
      toolbarCommandIds: ["addAssignment"]
    });
  }

  handleModalClose = () => this.setState({ nodeForModal: null });

  handleModalSave = data => {
    this.props.updateNode(data);
    this.setState({ nodeForModal: null });
  };

  render() {
    const { nodeForModal } = this.state;
    const { canvas, root } = Styles;
    const { config, connectors, nodes, variables } = this.props;
    if (this._canvasBuilder) {
      this._canvasBuilder.update(
        nodes,
        connectors,
        this._addHandlersToConfig(config)
      );
    }

    return (
      <div className={root}>
        {nodeForModal ? (
          <Modal
            data={{
              id: nodeForModal.id,
              label: nodeForModal.label,
              variableName:
                variables[nodeForModal.id] && variables[nodeForModal.id].name,
              variableValue:
                variables[nodeForModal.id] && variables[nodeForModal.id].value
            }}
            handleModalClose={this.handleModalClose}
            handleModalSave={this.handleModalSave}
          />
        ) : null}
        <div className={canvas} ref={this.canvas} />
      </div>
    );
  }
}

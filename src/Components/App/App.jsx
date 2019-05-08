import React from "react";
import Styles from "./App.less";
import Modal from "../Modal/Modal.jsx";
import canvasBuilder from "../../CanvasBuilder.js";

let NODE_ID = 0;

const createNode = (nodeId) => {
  return {
	id: nodeId,
	label: "",
	left: 0,
	top: 0,
	width: 64,
	height: 64,
	nodeShape: "SQUARE",
	nodeColor: "orange",
	anchors: [
	  { id: "top", location: "Top" },
	  { id: "left", location: "Left" },
	  { id: "right", location: "Right" },
	  { id: "bottom", location: "Bottom" }
    ]
  };
};

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
	config.connectorEvents.onConnectorAdd = (sourceNodeId, targetNodeId, sourceAnchorId, targetAnchorId) => {
		this.props.addConnector({ sourceNodeId, targetNodeId, sourceAnchorId, targetAnchorId });
	};
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
      toolbarCommandIds: ["addAssignment"],
      menuCommands: [
        {
          id: "addAssignment",
          label: "Add Assignment",
          handler: () => {
			const newNode = createNode("Node-ID-" + ++NODE_ID);
            addNode(newNode);
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

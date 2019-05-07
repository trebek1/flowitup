import React from "react";
import Styles from "./App.less";
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
	const copyConfig = JSON.parse(JSON.stringify(config));
	copyConfig.nodeEvents = {};
	copyConfig.nodeEvents.onClick = function(node) {
		this.setState({ nodeForModal: node });
	}.bind(this);
	return copyConfig;
  }

  componentDidMount() {
    const { nodes, connectors, config, addNode } = this.props;
    this._canvasBuilder = canvasBuilder.default.createInstance(this.canvas);
    this._canvasBuilder.update(nodes, connectors, this._addHandlersToConfig(config));

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

  _handleModalClose() {
	  this.setState({nodeForModal: null});
  }

  _handleModalSave() {
	this.setState({nodeForModal: null});
  }

  _renderModal() {
	  if (!this.state.nodeForModal) {
		  return null;
	  }
	  return (
	  	<div className={Styles.modal}>
		  <div className={Styles.modalTitle}>Edit Node</div>
		  <div className={Styles.modalBodyContainer}>
			  <div className={Styles.modalBodySurface}>
			    <div>Node Name</div>
			  	<input type="text"></input>
			  </div>
		  </div>
		  <div className={Styles.modalFooter}>
		  	<button onClick={this._handleModalClose.bind(this)}>Close</button>
		    <button onClick={this._handleModalSave.bind(this)}>Save</button>
		  </div>
	    </div>
	  );
  }

  render() {
    if (this._canvasBuilder) {
      const { nodes, connectors, config } = this.props;
      this._canvasBuilder.update(nodes, connectors, this._addHandlersToConfig(config));
	}

    return (
		<div className={Styles.root}>
			{this._renderModal()}
			<div ref={this.canvas} className={Styles.canvas} />
		</div>
	);
  }
}

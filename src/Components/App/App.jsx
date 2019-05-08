import React from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";
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
    const { addNode, config, connectors, variables } = this.props;
    let {nodes} = this.props;
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
        },
        {
          id: "deploy",
          label: "Deploy Flow",
          handler: () => {
            console.log(nodes);
            /*var map = {};
            console.log('nodes');
            for (var i = 0; i < nodes.length; i++) {
              console.log(nodes[i].id);
              map[nodes[i].id] = {n:nodes[i], c:null};
            }
            console.log(map);*/
            console.log("connectors");
            var map = {};
            nodes = nodes.filter((node) => node.id != '0');
            for (var i = 0; i < connectors.length; i++) {
              console.log(connectors[i].sourceNodeId);
              map[connectors[i].sourceNodeId] = connectors[i].targetNodeId;
            }
            console.log("later");
            console.log(map);

            var doc = document.implementation.createDocument("", "", null);
            var flow = doc.createElementNS(
              "http://soap.sforce.com/2006/04/metadata",
              "Flow"
            );
            var se = null;
            for (var i = 0; i < nodes.length; i++) {
              var node = nodes[i];

              var assignments = doc.createElement("assignments");

              var assignmentItems = doc.createElement("assignmentItems");

              var name = doc.createElement("name");
              name.innerHTML = node.label;

              var label = doc.createElement("label");
              label.innerHTML = node.label;

              console.log(node.left);
              var locx = doc.createElement("locationX");
              locx.innerHTML = node.left.toString();

              var locy = doc.createElement("locationY");
              locy.innerHTML = node.top.toString();

              var assignVar = variables[node.id];

              var assignToReference = doc.createElement("assignToReference");
              assignToReference.innerHTML = assignVar.name;

              var operator = doc.createElement("operator");
              operator.innerHTML = "Assign";

              var value = doc.createElement("value");

              var stringValue = doc.createElement("stringValue");
              stringValue.innerHTML = assignVar.value;

              if (map[node.id] != undefined || map[node.id] != null) {
                var connector = doc.createElement("connector");
                var targetReference = doc.createElement("targetReference");
                targetReference.innerHTML = map[node.id];
                connector.append(targetReference);
                assignments.append(connector);
              }

              value.appendChild(stringValue);
              assignmentItems.appendChild(value);
              assignmentItems.appendChild(operator);
              assignmentItems.appendChild(value);
              assignmentItems.appendChild(assignToReference);

              assignments.appendChild(name);
              assignments.appendChild(label);
              assignments.appendChild(locx);
              assignments.appendChild(locy);
              assignments.appendChild(assignmentItems);
              flow.appendChild(assignments);
            }

            var interviewLabel = doc.createElement("interviewLabel");
            interviewLabel.innerHTML = "flowhack {!$Flow.CurrentDateTime}";
            flow.appendChild(interviewLabel);

            var label = doc.createElement("label");
            label.innerHTML = "flowhack";
            flow.appendChild(label);

            var processMetadataValues = doc.createElement(
              "processMetadataValues"
            );
            var name = doc.createElement("name");
            name.innerHTML = "BuilderType";

            var value = doc.createElement("value");
            var stringValue = doc.createElement("stringValue");
            stringValue.innerHTML = "LightningFlowBuilder";

            value.appendChild(stringValue);
            processMetadataValues.appendChild(name);
            processMetadataValues.appendChild(value);

            var processMetadataValues1 = doc.createElement(
              "processMetadataValues"
            );
            var name1 = doc.createElement("name");
            name1.innerHTML = "OriginBuilderType";

            var value1 = doc.createElement("value");
            var stringValue1 = doc.createElement("stringValue");
            stringValue1.innerHTML = "LightningFlowBuilder";

            value1.appendChild(stringValue1);
            processMetadataValues1.appendChild(name1);
            processMetadataValues1.appendChild(value1);

            flow.appendChild(processMetadataValues);
            flow.appendChild(processMetadataValues1);

            var ptype = doc.createElement("processType");
            ptype.innerHTML = "AutoLaunchedFlow";

            var start = doc.createElement("startElementReference");
            start.innerHTML = "node1";

            var status = doc.createElement("status");
            status.innerHTML = "Draft";

            flow.appendChild(ptype);
            flow.appendChild(start);
            flow.appendChild(status);

            for (var i = 0; i < Object.keys(variables); i++) {
              var variable = Object.keys(variables)[i];
              var vars = doc.createElement("variables");
              var n = doc.createElement("name");
              n.innerHTML = variable.name;

              var dt = doc.createElement("dataType");
              dt.innerHTML = "String";

              var collect = doc.createElement("isCollection");
              collect.innerHTML = "false";

              var isInput = doc.createElement("isInput");
              isInput.innerHTML = "false";

              var isOutput = doc.createElement("isOutput");
              isOutput.innerHTML = "false";

              vars.appendChild(n);
              vars.appendChild(dt);
              vars.appendChild(collect);
              vars.appendChild(isInput);
              vars.appendChild(isOutput);
              flow.appendChild(vars);
            }
            doc.appendChild(flow);

            var header = '<?xml version="1.0" encoding="UTF-8"?>';
            var serializer = new XMLSerializer();
            var xmlString = serializer.serializeToString(doc);
            var res = header.concat(xmlString);

            var zip = new JSZip();

            var pkgdoc = document.implementation.createDocument("", "", null);
            var pkgele = pkgdoc.createElementNS(
              "http://soap.sforce.com/2006/04/metadata",
              "Package"
            );
            var types = pkgdoc.createElement("types");
            var members = pkgdoc.createElement("members");
            members.innerHTML = "flowhack";
            name.innerHTML = "Flow";
            types.appendChild(members);
            types.appendChild(name);
            var version = pkgdoc.createElement("version");
            version.innerHTML = "45.0";
            pkgele.appendChild(types);
            pkgele.appendChild(version);
            pkgdoc.appendChild(pkgele);

            serializer = new XMLSerializer();
            xmlString = serializer.serializeToString(pkgdoc);
            var pkgres = header.concat(xmlString);

            var zip = new JSZip();
            zip.file("package.xml", pkgres);

            var flows = zip.folder("flows");
            flows.file("flowhack.flow", res);
            zip.generateAsync({ type: "blob" }).then(function(content) {
              // see FileSaver.js
              saveAs(content, "example.zip");
            });

            //create static stuff
            /*var static = '<interviewLabel>flowhack {!$Flow.CurrentDateTime}</interviewLabel>\
            <label>flowhack</label>\
            <processMetadataValues>\
            <name>BuilderType</name>\
            <value>\
            <stringValue>LightningFlowBuilder</stringValue>\
            </value>\
            </processMetadataValues>\
            <processMetadataValues>\
            <name>OriginBuilderType</name>\
            <value>\
            <stringValue>LightningFlowBuilder</stringValue>\
            </value>\
            </processMetadataValues>';*/

            var blob = new Blob(["done"], { type: "text/plain;charset=utf-8" });
            FileSaver.saveAs(blob, "done.txt");
          }
        }
      ],
      toolbarCommandIds: ["addAssignment","deploy"]
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

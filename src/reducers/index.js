import { store } from "../root.jsx";
import {
  ADD_CONNECTOR,
  ADD_NODE,
  UPDATE_NODE,
  UPDATE_NODE_VALUES
} from "../Actions";

const INITIAL_STATE = {
  config: {
    classPrefix: "App__slds-canvas-builder",
    connectorEvents: {},
    connectorHoverStrokeWidth: 4,
    connectorStrokeWidth: 2,
    dragMode: "INSTANCE",
    dragRules: [],
    nodeEvents: {
      onDrop: (node, x, y, target) => {
        store.dispatch({ type: UPDATE_NODE, payload: { x, y, node } });
      }
    },
    snapToGrid: [64, 64],
    surfaceBrushKeyToggle: ["CTRL", "SHIFT"],
    surfaceDragMode: "KEY_TOGGLE",
    surfacePanKeyToggle: "ANY"
  },
  connectors: [
  ],
  nodes: [
    {
      iconClassName: "node-icon1",
      id: "0",
      label: "Start",
      left: 50,
	  nodeColor: "#33AAAA",
	  nodeShape: 'CIRCLE',
	  top: 10,
	  anchors: [
		  { id: "left", location: "LEFT" },
		  { id: "right", location: "RIGHT" },
		  { id: "top", location: "TOP" },
		  { id: "bottom", location: "BOTTOM" }
	  ]
    }
  ],
  variables: {
    "0": {
      name: "test",
      value: "test value"
    }
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CONNECTOR:
      return {
        ...state,
        connectors: [...state.connectors, action.connector]
      };
    case ADD_NODE:
      return {
        ...state,
        nodes: [...state.nodes, action.node]
      };
    case UPDATE_NODE:
      const { node, x, y } = action.payload;
      const id = node.id;
      let newNode = state.nodes.filter(node => node.id === id)[0];
      newNode.left = x;
      newNode.top = y;
      return {
        ...state,
        nodes: state.nodes.map(node => (node.id === id ? newNode : node))
      };
    case UPDATE_NODE_VALUES:
      const changeId = action.node.id;
      const updateNode = state.nodes.filter(node => node.id === changeId)[0];
      updateNode.label = action.node.label;
      const variableObj = {
        name: action.node.variableName,
        value: action.node.variableValue
      };
      return {
        ...state,
        variables: {
          ...state.variables,
          [changeId]: variableObj
        },
        nodes: state.nodes.map(node =>
          node.id === changeId ? updateNode : node
        )
      };
    default:
      return state;
  }
};

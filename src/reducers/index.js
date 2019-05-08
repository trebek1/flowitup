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
    {
      sourceNodeId: "gary",
      targetNodeId: "josh",
      sourceAnchorId: "top2",
      targetAnchorId: "left",
      strokeWidth: 5,
      hoverStrokeWidth: 8
    },
    {
      sourceNodeId: "gary",
      targetNodeId: "1234567"
    },
    {
      sourceNodeId: "faraway",
      targetNodeId: "faraway2"
    }
  ],
  connectors: [
    {
      sourceNodeId: "gary",
      targetNodeId: "josh",
      sourceAnchorId: "top2",
      targetAnchorId: "left",
      strokeWidth: 5,
      hoverStrokeWidth: 8
    },
    {
      sourceNodeId: "gary",
      targetNodeId: "1234567"
    },
    {
      sourceNodeId: "faraway",
      targetNodeId: "faraway2"
    }
  ],
  nodes: [
    {
      iconClassName: "node-icon1",
      id: "0",
      label: "Start",
      left: 50,
      nodeColor: "#33AAAA",
      top: 10
    },
    {
      iconClassName: "node-icon1",
      id: "1234567",
      label: "Hello",
      left: 2000,
      nodeColor: "#33AAAA",
      top: 50
    },
    {
      iconClassName: "node-icon2",
      id: "faraway",
      label: "So Far!",
      left: 2300,
      nodeColor: "orange",
      top: 200
    },
    {
      iconClassName: "node-icon2",
      id: "faraway2",
      label: "So Far II",
      left: 2300,
      nodeColor: "orange",
      top: 433
    },
    {
      className: "node-selected",
      height: 100,
      iconClassName: "node-icon1",
      id: "gary",
      isSelected: true,
      label: "Gary's Node!",
      left: 301,
      nodeColor: "green",
      nodeShape: "SQUARE",
      top: 200,
      width: 100,
      anchors: [
        {
          id: "top",
          location: {
            leftPercent: 0.15,
            topPercent: 0.55
          }
        },
        {
          id: "top2",
          location: {
            leftPercent: 1,
            topPercent: 0.24
          }
        }
      ]
    },
    {
      className: "node-selected",
      iconClassName: "node-icon1",
      id: "josh",
      label: "Josh Node",
      left: 544,
      nodeColor: "orange",
      nodeShape: "DIAMOND",
      startElement: false,
      top: 75,
      anchors: [
        {
          id: "bottom",
          location: "BOTTOM"
        },
        {
          id: "left",
          location: "LEFT"
        },
        {
          id: "right",
          location: "TOP"
        }
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

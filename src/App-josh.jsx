import Styles from "./App.less";
import canvasBuilder from "./CanvasBuilder.js";
import loadingGiphyGif from "file-loader?publicPath=dist/!./symbols.svg";

const DEMO_NODES = [
	{
	  "id": "1234567",
	  "label": "Hello",
	  "left": 2000,
	  "top": 50,
	  "iconPath": "/symbols.svg#file",
	  "iconClassName": "node-icon1",
	  "nodeColor": "#33AAAA"
	},
	{
	  "id": "faraway",
	  "label": "So Far!",
	  "left": 2300,
	  "top": 200,
	  "iconPath": "/symbols.svg#file",
	  "iconClassName": "node-icon2",
	  "nodeColor": "orange"
	},
	{
	  "id": "faraway2",
	  "label": "So Far II",
	  "left": 2300,
	  "top": 433,
	  "iconPath": "/symbols.svg#file",
	  "iconClassName": "node-icon2",
	  "nodeColor": "orange"
	},
	{
	  "id": "gary",
	  "label": "Gary's Node!",
	  "className": "node-selected",
	  "isSelected": true,
	  "width": 100,
	  "top": 200,
	  "left": 301,
	  "height": 100,
	  "nodeColor": "green",
	  "nodeShape": "SQUARE",
	  "iconPath": "/symbols.svg#redo",
	  "iconClassName": "node-icon1",
	  "anchors": [
		{
		  "id": "top",
		  "location": {
			"leftPercent": 0.15,
			"topPercent": 0.55
		  }
		},
		{
		  "id": "top2",
		  "location": {
			"leftPercent": 1,
			"topPercent": 0.24
		  }
		}
	  ]
	},
	{
	  "id": "josh",
	  "label": "Josh Node",
	  "left": 544,
	  "top": 75,
	  "nodeShape": "DIAMOND",
	  "iconPath": "/symbols.svg#undo",
	  "iconClassName": "node-icon1",
	  "nodeColor": "orange",
	  "className": "node-selected",
	  "anchors": [
		{
		  "id": "bottom",
		  "location": "BOTTOM"
		},
		{
		  "id": "left",
		  "location": "LEFT"
		},
		{
		  "id": "right",
		  "location": "TOP"
		}
	  ]
	}
  ];

const DEMO_CONNECTORS = [
	{
	  "sourceNodeId": "gary",
	  "targetNodeId": "josh",
	  "sourceAnchorId": "top2",
	  "targetAnchorId": "left",
	  "strokeWidth": 5,
	  "hoverStrokeWidth": 8
	},
	{
	  "sourceNodeId": "gary",
	  "targetNodeId": "1234567"
	},
	{
	  "sourceNodeId": "faraway",
	  "targetNodeId": "faraway2"
	}
  ];

const DEMO_CONFIG = {
	"classPrefix": "App__slds-canvas-builder",
	"snapToGrid": [
	  64,
	  64
	],
	"surfaceDragMode": "KEY_TOGGLE",
	"surfacePanKeyToggle": "ANY",
	"surfaceBrushKeyToggle": [
	  "CTRL",
	  "SHIFT"
	],
	"dragMode": "INSTANCE",
	"dragRules": [],
	"connectorStrokeWidth": 2,
	"connectorHoverStrokeWidth": 4,
	"nodeEvents": {},
	"connectorEvents": {}
  };

export default class App extends React.Component {
	componentDidMount() {
		const root = document.querySelector("#root");
		this._canvasBuilder = canvasBuilder.default.createInstance(root);
		this._canvasBuilder.update(DEMO_NODES, DEMO_CONNECTORS, DEMO_CONFIG);
	}

    render() {
        return <div id="root" className={Styles.root}></div>;
    }
}

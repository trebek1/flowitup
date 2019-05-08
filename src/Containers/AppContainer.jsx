import { connect } from "react-redux";
import App from "../Components/App/App.jsx";
import { ADD_CONNECTOR, ADD_NODE, UPDATE_NODE_VALUES } from "../Actions";

const mapStateToProps = (state, ownProps) => ({
  ...state
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addConnector(connector) {
    dispatch({
      type: ADD_CONNECTOR,
      connector
    });
  },
  addNode(node) {
    dispatch({
      type: ADD_NODE,
      node
    });
  },
  updateNode(node) {
    dispatch({
      type: UPDATE_NODE_VALUES,
      node
    });
  }
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;

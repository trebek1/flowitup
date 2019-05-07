import { connect } from "react-redux";
import App from "../Components/App/App.jsx";

const mapStateToProps = (state, ownProps) => ({
  ...state
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addNode(node) {
    dispatch({
      type: "ADD_NODE",
      node
    });
  }
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
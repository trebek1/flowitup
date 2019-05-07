import { connect } from 'react-redux'
import App from '../App.jsx';

const mapStateToProps = (state, ownProps) => ({
  nodes: state.nodes,
  connectors: state.connectors,
  config: state.config
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // onClick: () => {
  //   dispatch(setVisibilityFilter(ownProps.filter))
  // }
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer

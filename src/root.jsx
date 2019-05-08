import quip from "quip";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AppContainer from "./Containers/AppContainer.jsx";
import canvasData from "./reducers";

export const store = createStore(canvasData);

quip.apps.initialize({
  initializationCallback: rootNode =>
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer />
      </Provider>,
      rootNode
    )
});

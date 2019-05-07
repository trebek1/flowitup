import quip from "quip";
import AppContainer from "./Containers/AppContainer.jsx";

import { createStore } from "redux";
import canvasData from "./reducers";

import { Provider } from "react-redux";

export const store = createStore(canvasData);

quip.apps.initialize({
  initializationCallback: function(rootNode) {
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer />
      </Provider>,
      rootNode
    );
  }
});

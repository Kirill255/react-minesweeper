import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";

import thunk from "redux-thunk";
// import logger from "redux-logger";

import rootReducer from "../reducers";
import history from "../history";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, routerMiddleware(history) /* , logger */)
  // other store enhancers if any
);

const store = createStore(rootReducer, enhancer);

// export default createStore(rootReducer, enhancer);

// window.store = store;
export default store;

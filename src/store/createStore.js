/* global history */

import { applyMiddleware, compose, createStore } from "redux";
import { setStore } from "actionware";

import makeRootReducer from "./reducers";

export default (initialState = {}) => {
  const middleware = [];

  const enhancers = [];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV === "development") {
    const composeWithDevToolsExtension =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === "function") {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers)
  );
  setStore(store);
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const reducers = require("./reducers").default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};

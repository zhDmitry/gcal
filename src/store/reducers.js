import { combineReducers } from "redux";
import { actionwareReducer } from "actionware";
import { reducer } from "./calendar";
import { reducer as modal } from "./modal";

const reducers = {
  requests: actionwareReducer,
  calendar: reducer,
  modal
};

export const makeRootReducer = asyncReducers =>
  combineReducers({
    ...reducers,
    ...asyncReducers
  });

export default makeRootReducer;
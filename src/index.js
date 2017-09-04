import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { Provider } from "react-redux";
import crateStore from "./store/createStore";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

ReactDOM.render(
  <Provider store={crateStore({})}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

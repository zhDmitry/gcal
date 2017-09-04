/* global gapi */

import React, { Component } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import Calendar from "./containers/Calendar";

var DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
];
var CLIENT_ID =
  "837641710637-5h02koq415hgn5o514lpah7iugbtpcg9.apps.googleusercontent.com";

const API_KEY =
  "837641710637-5h02koq415hgn5o514lpah7iugbtpcg9.apps.googleusercontent.com";
var SCOPES = "https://www.googleapis.com/auth/calendar";

class App extends Component {
  state = {};
  loadApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      // gapi.client.setApiKey(API_KEY);
      gapi.load("client:auth2", this.initClient);
    };

    document.body.appendChild(script);
  }

  initClient = err => {
    this.setState({ gapiReady: true });
    gapi.client
      .init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
      })
      .then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

        // Handle the initial sign-in state.
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
  };

  updateSigninStatus = isSignedIn => {
    console.log(isSignedIn);
    if (isSignedIn) {
      this.setState({ signIn: true });
    }
  };

  signIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  };
  componentDidMount() {
    this.loadApi();
  }

  render() {
    if (this.state.gapiReady && this.state.signIn) {
      return <Calendar />;
    } else {
      return (
        <div>
          <button onClick={this.signIn} className="btn btn--stripe">
            auth
          </button>
        </div>
      );
    }
  }
}

export default App;

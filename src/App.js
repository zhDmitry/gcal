/* global gapi */

import React, { Component } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCalendar from "react-big-calendar";
import moment from "moment";

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
    console.log(err);
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
      this.listUpcomingEvents();
    }
  };
  listUpcomingEvents = () => {
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime"
      })
      .then(response => {
        var events = response.result.items;
        console.log("events");
        console.log(events);
        this.setState({
          events: events.map(this.mapEvent)
        });
      });
  };
  createEvent = ({ start, end, title = "test title" + Math.random() }) => {
    console.log(start, end);
    const event = this.toGoogleEvent({ start, end, title });
    const request = gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event
    });
    request.execute(event => {
      console.log(event);
      const newEvents = [...this.state.events, this.mapEvent(event)];
      this.setState({
        events: newEvents
      });
    });
  };

  toGoogleEvent({ start, end, title }) {
    console.log(start, end);
    return {
      summary: title,
      start: {
        dateTime: start,
        timeZone: "America/Los_Angeles"
      },
      attendees: [{ email: "dev@vez.io" }],
      end: {
        dateTime: end,
        timeZone: "America/Los_Angeles"
      }
    };
  }

  mapEvent = event => ({
    title: event.summary,
    start: moment(event.start.dateTime).toDate(),
    end: moment(event.end.dateTime).toDate()
  });

  signIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  };
  componentDidMount() {
    this.loadApi();
  }

  render() {
    if (this.state.gapiReady && this.state.events) {
      return (
        <div>
          <BigCalendar
            popup
            selectable
            onSelectSlot={slotInfo =>
              this.createEvent({ start: slotInfo.start, end: slotInfo.end })}
            events={this.state.events}
            defaultDate={new Date()}
          />
        </div>
      );
    } else {
      return (
        <div>
          {" "}<button onClick={this.signIn}>auth</button>
        </div>
      );
    }
  }
}

export default App;

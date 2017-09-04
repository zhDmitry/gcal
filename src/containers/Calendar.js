/* global gapi */

import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import Modal from "react-modal";
import { withActions, isBusy } from "actionware";
import { connect } from "react-redux";
import { compose } from "redux";

import Wrapper from "../components/EventWrapper";
import { actions } from "../store/calendar";
import { actions as modalActions } from "../store/modal";
import { toGoogleEvent } from "../store/utils";
import Header from "../components/week/header";

import WeekEvent from "../components/week/weekEvent";
import EventCreate from "../components/EventCreate";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const components = {
  eventWrapper: Wrapper,
  week: {
    header: Header,
    event: WeekEvent
  },
  day: {
    header: Header,
    event: WeekEvent
  }
};

class Calendar extends React.Component {
  state = {};

  componentDidMount() {
    this.props.getEvents();
  }
  listUpcomingEvents = () => {
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        showDeleted: false,
        singleEvents: true,
        maxResults: 300,
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
  createEvent = event => {
    this.props.createEvent(event);
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
      },
      ...{
        location: "800 Howard St., San Francisco, CA 94103",
        description: "A chance to hear more about Google's developer products.",
        attendees: [
          { email: "lpage@example.com" },
          { email: "sbrin@example.com" }
        ]
      }
    };
  }

  mapEvent = event => ({
    ...event,
    location: event.start.timeZone,
    title: event.summary,
    startTime: moment(event.start.dateTime).toDate(),
    endTime: moment(event.end.dateTime).toDate()
  });

  render() {
    console.log(this.state.events);
    return this.props.events &&
    this.props.events.length &&
    !this.props.eventsLoading ? (
      <div>
        <Modal
          isOpen={this.props.isModalOpen}
          closeTimeoutMS={200}
          onRequestClose={() => {
            this.props.closeModal("createEvent");
          }}
          contentLabel="Modal"
        >
          <EventCreate
            event={this.props.modalPayload}
            onSave={e =>
              this.props
                .createEvent(e)
                .then(el => this.props.closeModal("createEvent"))}
            onClose={e => this.props.closeModal("createEvent")}
          />
        </Modal>
        <BigCalendar
          selectable
          eventPropGetter={el => {
            return {
              style: {
                backgroud: "red",
                color: "white",
                width: "50%"
              }
            };
          }}
          startAccessor={"startTime"}
          endAccessor={"endTime"}
          components={components}
          onSelectSlot={slotInfo =>
            this.props.openModal("createEvent", { ...slotInfo })}
          events={this.props.events}
          defaultDate={new Date()}
        />
      </div>
    ) : (
      <div />
    );
  }
}

const enhance = compose(
  connect(state => {
    console.log(state.calendar.eventsCount);
    return {
      events: state.calendar.events,
      eventsLoading: isBusy(actions.getEvents),
      isModalOpen: state.modal.createEvent && state.modal.createEvent.isOpen,
      modalPayload: state.modal.createEvent && state.modal.createEvent.payload
    };
  }),
  withActions({ ...actions, ...modalActions })
);

export default enhance(Calendar);

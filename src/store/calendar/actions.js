/* global gapi*/

import moment from "moment";
import { createReducer, call, createAction } from "../../actionware";
import { createState } from "stateware";

import { toGoogleEvent, mapEvent, isIntersect } from "../utils";

const getEvents = createAction(async () => {
  return await gapi.client.calendar.events
    .list({
      calendarId: "primary",
      showDeleted: false,
      singleEvents: true,
      maxResults: 300,
      orderBy: "startTime"
    })
    .then(response => {
      return response.result.items.map(mapEvent);
    });
}, "GET_EVENTS");

const createEvent = createAction(event => {
  event.title = event.title || "qwer";
  const request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: toGoogleEvent(event)
  });
  return new Promise(resolve => {
    request.execute(ev => {
      return resolve(mapEvent(ev));
    });
  });
});

const deleteEvent = createAction(event => {
  const request = gapi.client.calendar.events.delete({
    calendarId: "primary",
    eventId: event.id
  });
  return new Promise(r => {
    request.then(res => {
      return r(event.id);
    });
  });
});

const editEvent = createAction((event, store) => {
  return new Promise(res => {
    gapi.client.calendar.events
      .update({
        calendarId: "primary",
        eventId: event.id,
        resource: event
      })
      .execute(e => {
        res(mapEvent(e));
      });
  });
});

export default {
  createEvent,
  getEvents,
  editEvent,
  deleteEvent
};

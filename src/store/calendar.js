/* global gapi*/

import moment from "moment";
import { createReducer, call } from "actionware";
import { createState } from "stateware";

import { toGoogleEvent, mapEvent, isIntersect } from "./utils";


const getEvents = async () => {
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
};

const createEvent = event => {
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
};

const deleteEvent = event => {
  const request = gapi.client.calendar.events.delete({
    calendarId: "primary",
    eventId: event.id
  });
  return new Promise(r => {
    request.then(res => {
      return r(event.id);
    });
  });
};

const editEvent = (event, store) => {
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
};

export const actions = {
  createEvent,
  getEvents,
  editEvent,
  deleteEvent
};

const initalState = createState({
  events: [],
  eventsMap(events) {
    const res = events.reduce((acc, el) => {
      let index = 0;
      const eventInfo = {
        eventsCount: events.filter(ev => {
          const is = isIntersect(
            el.start.dateTime,
            el.end.dateTime,
            ev.start.dateTime,
            ev.end.dateTime
          );

          if (is && acc[ev.id]) {
            index += 1;
          }
          return is;
        }).length
      };
      acc[el.id] = { index, ...eventInfo };
      return acc;
    }, {});
    return res;
  }
});

export const reducer = createReducer(initalState)
  .on(actions.createEvent, (state, event) => {
    return state.copy({ events: [...state.events, mapEvent(event)] });
  })
  .on(actions.getEvents, (state, events) => state.copy({ events }))
  .on(actions.editEvent, (state, event) => {
    console.log(state, event);
    const eventIndex = state.events.findIndex(el => el.id === event.id);
    state.events[eventIndex] = event;
    return state.copy({
      events: state.events
    });
  })
  .on(deleteEvent, (state, id) => {
    const eventIndex = state.events.findIndex(el => el.id === id);
    state.events.splice(eventIndex, 1);
    return state.copy({ events: [...state.events] });
  })
  .onBusy(actions.editEvent, (state, action) => {
    console.log(action);
    return state.update('qwerw.qwwer.qwer', ()=> {});
  });

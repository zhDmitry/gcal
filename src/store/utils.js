import moment from "moment";

export const mapEvent = event => ({
  ...event,
  startTime: moment(event.start.dateTime).toDate(),
  endTime: moment(event.end.dateTime).toDate()
});

export const toGoogleEvent = ({ start, end, title }) => {
  return {
    summary: title,
    start: {
      dateTime: start,
      timeZone: "America/Los_Angeles"
    },
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
};

export const isIntersect = (event1start, event1end, event2start, event2end) => {
  const start1 = moment(event1start);
  const start2 = moment(event2start);
  const end1 = moment(event1end);
  const end2 = moment(event2end);
  const isSameDay = start1.isSame(start2, "day");
  if (!isSameDay) {
    return false;
  }

  const res =
    start1.isBetween(start2, end2, null, "[]") ||
    end1.isBetween(start2, end2, null, "[]") ||
    start2.isBetween(start1, end1, null, "[]") ||
    end2.isBetween(start1, end1, null, "[]");
  return res;
};

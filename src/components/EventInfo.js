import React from "react";

class EventInfo extends React.Component {
  state = {};
  render() {
    const { event, closePopover, startEditing, deleteEvent } = this.props;
    const { title, start, end, attendees } = event;
    return (
      <div className="event-info">
        <div className="card-content">
          <span className="card-title">{event.summary}</span>
          <div>{start.dateTime.toString()}</div>
          <div>{end.dateTime.toString()}</div>
          <div>{event.location}</div>
          <div>
            {attendees &&
              attendees.reduce((acc, el) => {
                if (acc === "") {
                  return el.email;
                }
                return acc + ", " + el.email;
              }, "")}
          </div>
        </div>
        <div className="card-action">
          <a
            className="waves-effect waves-teal btn-flat"
            onClick={startEditing}
          >
            Edit
          </a>
          <a className="waves-effect waves-teal btn-flat" onClick={deleteEvent}>
            Delete
          </a>

          <a
            type="button"
            className="waves-effect waves-teal btn-flat"
            onClick={closePopover}
          >
            Close
          </a>
        </div>
      </div>
    );
  }
}

export default EventInfo;

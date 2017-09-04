import React from "react";

class EventInfo extends React.Component {
  state = {};
  constructor(p) {
    super();
    this.state = {
      form: p.event
    };
  }
  bindInput = key => {
    return {
      value: this.state.form[key],
      onChange: e =>
        this.setState({ form: { ...this.state.form, [key]: e.target.value } })
    };
  };

  render() {
    const { event, closePopover, onSave } = this.props;
    const { summary, attendees } = event;
    return (
      <div>
        <div className="card-content">
          <form className="col s12">
            <div className="row" style={{ minWidth: 400 }}>
              <div className="input-field">
                <i className="material-icons prefix">event_note</i>
                <input
                  id="icon_prefix"
                  type="text"
                  {...this.bindInput("summary")}
                  defaultValue={summary}
                  placeholder="Event name"
                />
              </div>
              <div className="input-field">
                <i className="material-icons prefix">access_time</i>
                <input
                  id="icon_prefix"
                  type="text"
                  {...this.bindInput("startTime")}
                  placeholder="Time"
                />
              </div>
              <div className="input-field">
                <i className="material-icons prefix">people</i>
                <input
                  placeholder="Add people to invite"
                  value={attendees.reduce((acc, el) => acc + "," + el.email, "")}
                  defaultValue={"qwer"}
                />
              </div>
              <div className="input-field">
                <i className="material-icons prefix">place</i>
                <input
                  placeholder="Location"
                  defaultValue={"qwer"}
                  {...this.bindInput("location")}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="card-actions">
          <a
            className="waves-effect waves-teal btn-flat"
            onClick={() => onSave(this.state.form)}
          >
            Save
          </a>
          <a
            className="waves-effect waves-teal btn-flat"
            onClick={closePopover}
          >
            Cancel
          </a>
        </div>
      </div>
    );
  }
}

export default EventInfo;

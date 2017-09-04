import React from "react";

class EventCreate extends React.Component {
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
    const { event, onClose, onSave } = this.props;
    const { summary, start, end } = {};
    console.log(this.props);
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
                  value={''}
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
          <a className="waves-effect waves-teal btn-flat" onClick={onClose}>
            Cancel
          </a>
        </div>
      </div>
    );
  }
}

export default EventCreate;

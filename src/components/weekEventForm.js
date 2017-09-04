import React from "react";

class WeekEventForm extends React.Component {
  state = {};
  values = {};
  render() {
    const { value } = this.props;
    return (
      <div>
        <input
          className="input"
          defaultValue={value.title}
          onChange={e => {
            this.values.title = e.target.value;
          }}
          placeholder="Title"
        />
        <input
          className="input"
          onChange={e => {
            this.values.location = e.target.value;
          }}
          defaultValue={value.location}
          placeholder="Location"
        />
      </div>
    );
  }
}

export default WeekEventForm;

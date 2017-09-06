/* global gapi */
import React from "react";
import Popover from "react-popover";
import { withActions, isBusy } from "actionware";
import { connect } from "react-redux";
import { compose } from "redux";
import EventInfo from "../EventInfo";
import EventEdit from "../EventEdit";
import Loader from "../Loader";
import { actions } from "../../store/calendar";

class WeekEvent extends React.PureComponent {
  state = {
    isSelected: false
  };

  toggleSelected = () => {
    console.log("toggle");
    this.setState({
      isSelected: !this.state.isSelected
    });
  };

  closePopover = () => {
    this.setState({
      isSelected: false
    });
  };

  saveEvent = event => {
    this.props.editEvent(event).then(el => {
      this.setState(
        {
          isSelected: false,
          isSaving: false
        },
        () => {
          setTimeout(() => {
            this.setState({ editing: false });
          }, 300);
        }
      );
    });
  };
  deleteEvent = () => {
    this.setState(
      {
        isSelected: false
      },
      () => this.props.deleteEvent(this.props.event)
    );
  };
  startEdit = () => {
    this.setState({
      editing: true
    });
  };
  render() {
    const { isSaving, event } = this.props;
    const { editing } = this.state;
    const props = {
      event: event,
      closePopover: () =>
        this.setState({ isSelected: false }, () => {
          setTimeout(() => {
            this.setState({ editing: false });
          }, 200);
        }),
      onSave: this.saveEvent,
      startEditing: this.startEdit,
      deleteEvent: this.deleteEvent
    };
    return (
      <Popover
        isOpen={this.state.isSelected}
        target={this.refs.container}
        enterExitTransitionDurationMs={200}
        onOuterAction={this.closePopover}
        body={
          <div className="card">
            {isSaving && <Loader />}
            {editing ? <EventEdit {...props} /> : <EventInfo {...props} />}
          </div>
        }
      >
        <div
          ref="container"
          onClick={this.toggleSelected}
          style={{ width: "100%", height: "100%" }}
        />
      </Popover>
    );
  }
}

const enhance = compose(
  connect(state => {
    return {
      isSaving: isBusy(actions.editEvent)
    };
  }),
  withActions(actions)
);

export default enhance(WeekEvent);
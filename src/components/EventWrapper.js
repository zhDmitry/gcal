import React from "react";
import { connect } from "react-redux";

const backgroudColor = {
  0: "#40C4FF",
  1: "#bbd167",
  2: "#b7f59f",
  3: "#f5dda9",
  4: "#f1aaa9",
  5: "#4DB6AC",
  6: "#7986CB"
};

class EventWrapper extends React.PureComponent {
  state = {};
  render() {
    const { children, eventsCount, index } = this.props;
    const styles = children.props.style;
    return (
      <div
        className="wrapper"
        style={{
          position: "absolute",
          ...styles,
          width: 100 / eventsCount + "%",
          left: 100 / eventsCount * index + "%",
          backgroundColor: backgroudColor[index],
          border: `1px solid ${backgroudColor[index]}`
        }}
      >
        {React.cloneElement(children, {
          ...children.props,
          style: { width: "100%", height: "100%" }
        })}
      </div>
    );
  }
}
const enhance = connect((state, { event }) => {
  const eventsIntersection = state.calendar.eventsMap;
  return {
    eventsCount: eventsIntersection[event.id].eventsCount,
    index: eventsIntersection[event.id].index
  };
});

export default enhance(EventWrapper);

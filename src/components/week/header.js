import PropTypes from "prop-types";
import React from "react";
import moment from "moment";

const Header = ({ label, date, ...props }) => {
  const dateValue = moment(date);
  return (
    <span>
      <span>{dateValue.format("dddd").toLocaleUpperCase()}</span>
      <br />
      <span style={{ fontWeight: 400 }}>{dateValue.format("MMM DD")}</span>
    </span>
  );
};

Header.propTypes = {
  label: PropTypes.node
};

export default Header;

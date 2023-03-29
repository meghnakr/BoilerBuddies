import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { endpoint } from "../global";

export default class NotifBox extends React.Component {
  static propTypes = {
    content: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      content: PropTypes.string,
    };
  }

  render() {


    return (
      <div className="profile-header">
          <h6>{this.state.content}</h6>
      </div>
    );
  }
}

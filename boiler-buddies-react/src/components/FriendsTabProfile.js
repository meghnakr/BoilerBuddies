import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../assets/logo_vector.png";
import { endpoint } from "../global";
import axios from "../utils/Axios";
import { getusertoken } from "../utils/auth";

export default class FriendsTabProfile extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    displayName: PropTypes.string,
    interestTags: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
      displayName: this.props.displayName,
      interestTags: this.props.interestTags,
      sendRequest: this.props.sendRequest,
      userId: this.props.userId, //user_id property
    };
  }


  render() {
    return (
      <div className="profile-header">
        <div className="profile-picture">
          <span>
            <img src={logo} alt="img" />
          </span>
        </div>
        <div className="profile-info">
          <h2>{this.state.displayName}</h2>
          <h6>{this.state.username}</h6>
          <h6>{this.state.interestTags}</h6>
        </div>

      </div>
    );
  }
}

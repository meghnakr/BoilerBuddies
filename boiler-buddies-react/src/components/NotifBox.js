import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { endpoint } from "../global";

export default class FriendProfile extends React.Component {
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
    };
  }

  render() {
    const {
      state: { username, interestTags, displayName },
      handleClick,
      sendRequest,
    } = this;

    return (
      <div className="profile-header">
          username liked/commented [on] your post
      </div>
    );
  }
}

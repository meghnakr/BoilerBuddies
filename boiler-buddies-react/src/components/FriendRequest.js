import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../assets/logo_vector.png";
import { endpoint } from "../global";
import axios from "../utils/Axios";
import { getusertoken } from "../utils/auth";

export default class FriendRequest extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    displayName: PropTypes.string,
    interestTags: PropTypes.string,
  };

  constructor(props) {
    // const {
    //     state: {
    //         username,
    //         interestTags,
    //         displayName,
    //         sendRequest
    //     },
    //     handleClick
    // } = this;

    super(props);

    this.state = {
      username: this.props.username,
      displayName: this.props.displayName,
      interestTags: this.props.interestTags,
      acceptRequest: false,
      declineRequest: false,
      userId: this.props.userId, //user_id property
    };
  }

  async handleAcceptClick() {
    if (this.state.acceptRequest) {
      return;
    }
    //this.state.preventDefault()

    // make axios request to accept request
    console.log("CURRENT USER TOKEN: ", await getusertoken());
    console.log("0");
    //console.log("OTHER USER ID: ", this.state.userId);

    console.log("1");

    var token = await getusertoken();
    var otherusername = this.state.username;

    console.log("2");

    var otherId = await axios.get(
      "http://54.200.193.22:3000/getUserIdFromUsername/",
      {
        params: {
          username: otherusername,
        },
      }
    );
    console.log("3");

    console.log("NEW OTHERID: ", otherId);

    var acceptRequestURL = "http://54.200.193.22:3000/acceptFriendRequest/?";
    acceptRequestURL += "token=" + token + "&otherId=" + otherId;
    console.log("FR OTHERID: ", otherId);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", acceptRequestURL, false); // false for synchronous request
    //this.state.acceptRequest = true;
    xmlHttp.send(null);
    var result = xmlHttp.responseText;
    console.log(result);
    // this.setState({
    //   ...this.state,
    //   acceptRequest: true,
    // });
  }

  async handleDeclineClick() {
    /*if (this.state.acceptRequest) {
      return;
    }*/
    // make axios request to decline request
    console.log("CURRENT USER TOKEN: ", await getusertoken());
    console.log("OTHER USER ID: ", this.state.userId);

    var myFormData = new FormData();
    myFormData.append("token", await getusertoken());
    myFormData.append("otherId", this.state.userId);

    /* Accept Friend Request Code */
    //update declineRequest state
    this.setState({
      ...this.state,
      declineRequest: true,
    });
  }

  render() {
    /*if (this.state.declineRequest == true) {
      return null;
    }*/
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
        <div className="profile-button">
          <button
            className={
              this.state.acceptRequest ? "default-btn-white" : "default-btn"
            }
            style={{
              fontWeight: "normal",
              textTransform: "capitalize",
              border: "1px solid #88BBF6",
            }}
            onClick={this.handleAcceptClick.bind(this)}
          >
            {this.state.acceptRequest ? "Accepted" : "Accept Request"}
            {/* this.state.sendRequest ? 'Request Sent' : 'Send Request' */}
          </button>
          {/* TODO: change button to edit if it's the user's profile */}

          <button
            className={
              this.state.declineRequest ? "default-btn-white" : "default-btn"
            }
            style={{
              fontWeight: "normal",
              textTransform: "capitalize",
              border: "1px solid #88BBF6",
            }}
            onClick={this.handleDeclineClick.bind(this)}
          >
            {this.state.declineRequest ? "Declined" : "Decline Request"}
            {/* this.state.sendRequest ? 'Request Sent' : 'Send Request' */}
          </button>
        </div>
        <div></div>
      </div>
    );
  }
}

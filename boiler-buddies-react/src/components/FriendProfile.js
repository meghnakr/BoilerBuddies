import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../assets/logo_vector.png";
import { endpoint } from "../global";
import axios from "../utils/Axios";
import { getusertoken } from "../utils/auth";

export default class FriendProfile extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    displayName: PropTypes.string,
    interestTags: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.username = this.props.username;
    this.displayName = this.props.displayName;
    this.interestTags = this.props.interestTags;
    this.img = this.props.img;
    this.userId = this.props.userId; //user_id property
    this.state = {
      sendRequest: this.props.sendRequest,
      blockUser: this.props.blockUser,
    };
  }

  async handleClick() {
    if (this.state.sendRequest) {
      return;
    }
    console.log("CURRENT USER TOKEN: ", await getusertoken());
    var token = await getusertoken();
    var otherId = this.userId;
    var sendRequestURL = "http://54.200.193.22:3000/sendFriendRequest/?";
    sendRequestURL += "token=" + token + "&otherId=" + otherId;
    console.log(sendRequestURL);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", sendRequestURL, false); // false for synchronous request
    this.setState({ sendRequest: true });
    xmlHttp.send(null);
    var result = xmlHttp.responseText;
    console.log(result);
  }

  async handleBlockClick() {
    if (this.state.blockUser) {
      return;
    }
    console.log("CURRENT USER TOKEN: ", await getusertoken());
    var token = await getusertoken();
    var otherId = this.userId;
    var blockUserURL = "http://54.200.193.22:3000/blockOther/?";
    blockUserURL += "token=" + token + "&otherId=" + otherId;
    console.log(blockUserURL);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", blockUserURL, false); // false for synchronous request
    this.setState({ blockUser: true });
    xmlHttp.send(null);
    var result = xmlHttp.responseText;
    console.log(result);
  }

  async handleMessageClick() {
    var getDirectMessageURL = endpoint + "getDirectChat/?";
    var chatParams = new URLSearchParams();
    var token = await getusertoken();
    var otherId = this.userId;
    chatParams.append("token", token);
    chatParams.append("otherId", otherId);
    getDirectMessageURL = getDirectMessageURL + chatParams;
    try {
      const response = await axios.get(getDirectMessageURL);
      this.props.navigate("/chat/" + response.data.chat_id + "/D", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="profile-header">
        <div className="profile-picture">
          <div className="profile-photo-circle">
            <div className="upload-icon">
              <i
                className="fa fa-user"
                style={{
                  fontSize: "9vmin",
                }}
              ></i>
            </div>
            {this.img !== "" ? <img src={this.img} alt="img" /> : <></>}
          </div>
        </div>
        <div className="profile-info">
          <h2>{this.displayName}</h2>
          <h6 style={{ fontWeight: "normal" }}>{this.username}</h6>
          <h6>{this.interestTags}</h6>
        </div>
        <div className="profile-button">
          {this.props.currentUser !== this.username ? (
            <button
              className={
                this.state.sendRequest ? "default-btn-white" : "default-btn"
              }
              style={{
                fontWeight: "normal",
                textTransform: "capitalize",
                border: "1px solid #88BBF6",
              }}
              onClick={this.handleClick.bind(this)}
            >
              {this.state.sendRequest ? "Request Sent" : "Send Request"}
            </button>
          ) : (
            <></>
          )}

          <div className="profile-button">
            {this.props.currentUser !== this.username ? (
              <button
                className={
                  this.state.blockUser ? "default-btn-white" : "default-btn"
                }
                style={{
                  fontWeight: "normal",
                  textTransform: "capitalize",
                  border: "1px solid #88BBF6",
                }}
                onClick={this.handleBlockClick.bind(this)}
              >
                {this.state.blockUser ? "User Blocked" : "Block User"}
              </button>
            ) : (
              <></>
            )}
          </div>

          <div className="profile-button">
            {this.props.currentUser !== this.username ? (
              <button
                className="default-btn"
                style={{
                  fontWeight: "normal",
                  textTransform: "capitalize",
                  border: "1px solid #88BBF6",
                }}
                onClick={this.handleMessageClick.bind(this)}
              >
                Message
              </button>
            ) : (
              <></>
            )}
            {this.props.currentUser !== this.username ? (
              <Link to="reportuser">
              <button
                className="default-btn"
                style={{
                  fontWeight: "normal",
                  textTransform: "capitalize",
                  border: "1px solid #88BBF6",
                }}
              >
                Report User
              </button>
            </Link>
            ) : <></>}
            
          </div>

          <div className="profile-button">
            {this.props.currentUser !== this.username ? (
              <button
                className="default-btn"
                style={{
                  fontWeight: "normal",
                  textTransform: "capitalize",
                  border: "1px solid #88BBF6",
                }}
                onClick={this.handleMessageClick.bind(this)}
              >
                Message
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

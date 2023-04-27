import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../assets/logo_vector.png";
import { endpoint } from "../global";
import axios from "../utils/Axios";
import { getusertoken } from "../utils/auth";

export default class ProfileHeader extends React.Component {
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
        <div className="profile-button" style={{width:'30%'}}>
          {this.props.currentUser !== this.username ? (
            <button
              className="default-btn"
              style={{
                fontWeight: "normal",
                textTransform: "capitalize",
                border: "1px solid #88BBF6",
              }}
              onClick={this.handleClick.bind(this)}
            >
                <Link to={`/user/${this.userId}`} style={{textDecoration: 'none', color: 'white'}}>View Profile</Link>
            </button>
          ) : (
            <></>
          )}
          
        </div>
      </div>
    );
  }
}

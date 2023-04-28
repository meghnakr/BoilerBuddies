import React from "react";
import PropTypes from "prop-types";
import logo from "../assets/logo_vector.png";
import axios from "../utils/Axios";
import { getusertoken } from "../utils/auth";

export default class FriendProfileForGroups extends React.Component {
    
  static propTypes = {
    username: PropTypes.string,
    displayName: PropTypes.string,
    interestTags: PropTypes.string,
    updateFriendProfiles: PropTypes.func,
    chatId: PropTypes.string,
  };

  constructor(props) {
      
    super(props);

    this.state = {
      username: this.props.username,
      displayName: this.props.displayName,
      interestTags: this.props.interestTags,
      updateFriendProfiles: this.props.updateFriendProfiles,
      chatId: this.props.chatId,
    };
  }


  async handleAddClick(e) {
    e.preventDefault();
    const token = await getusertoken();
    console.log("Token: ", token)
    //const otherusername = this.state.username;    // UNDEFINED
    //console.log("OTHERID FTP: ", otherusername)
    
    const otherIdvar = (await axios.get(
      "http://54.200.193.22:3000/getUserIdFromUsername/",
      {
        params: {
          username: this.state.username,
        },
      }
    )).data.user_id;

    console.log("OTHERID: ", otherIdvar);

    const result = await axios.get("/addUserToGroupChat/", {
        params: {
          token: token,
          //groupId: "15c723b1-3f5f-46ca-9027-4217b4f3facf",   //test2
          groupId: this.state.chatId,
          otherId: otherIdvar,
        },
      });

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

        <div className="profile-button">
          <button
            className={"default-btn"}
            style={{
              fontWeight: "normal",
              textTransform: "capitalize",
              border: "1px solid #88BBF6",
            }}
            onClick={this.handleAddClick.bind(this)}
          >
            {'Add to group'}
          </button>
        </div>
      </div>
    );
  }
}

import React from "react";
import PropTypes from "prop-types";
import logo from "../assets/logo_vector.png";
import axios from "../utils/Axios";
import { getusertoken } from "../utils/auth";

export default class BlockedProfile extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    displayName: PropTypes.string,
    interestTags: PropTypes.string,
    updateBlockProfiles: PropTypes.func,

  };

  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
      displayName: this.props.displayName,
      interestTags: this.props.interestTags,
      updateBlockProfiles: this.props.updateBlockProfiles,

    };
  }


  /*
The code is re-rendering when the button is clicked because the handleRemoveClick() 
function is an asynchronous function that is updating the component's state. When a 
component's state changes, React re-renders the component to reflect the new state.

In this case, the handleRemoveClick() function is retrieving the user token and 
updating the component's state with the otherusername value, which is initially 
undefined. Once the state is updated, React re-renders the component with the updated state.

If you don't want the component to re-render when the button is clicked, you can 
move the state update logic to a separate function that does not update the state 
of the component. For example, you can define a separate function that retrieves the 
user token and returns the otherusername value, and then pass that value to the 
handleRemoveClick() function. This way, the component's state is not updated, and 
React does not re-render the component unnecessarily.
  */


  /* Function to remove the friend from the friendProfs state */


  async handleRemoveClick(e) {
    e.preventDefault();
    const token = await getusertoken();
    console.log("BLOCK Token: ", token)
    //const otherusername = this.state.username;    // UNDEFINED
    //console.log("OTHERID FTP: ", otherusername)
    
    const otherId = (await axios.get(
      "http://54.200.193.22:3000/getUserIdFromUsername/",
      {
        params: {
          username: this.state.username,
        },
      }
    )).data.user_id;

    console.log("BLOCK OTHERID: ", otherId);


    let unfriendRequestURL = "http://54.200.193.22:3000/unblockOther/?";
    unfriendRequestURL += "token=" + token + "&otherId=" + otherId;
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", unfriendRequestURL, false); // false for synchronous request
    xmlHttp.send(null);
    const result = xmlHttp.responseText;
    console.log(result);

    console.log("BUTTON WAS CLICKED")
    this.state.updateBlockProfiles(this.state.username);
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
            onClick={this.handleRemoveClick.bind(this)}
          >
            {'Unblock User'}
          </button>
        </div>
      </div>
    );
  }
}
import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import logo from "../assets/logo_vector.png";
import {endpoint} from "../global";
import axios from "../utils/Axios";
import {getusertoken} from "../utils/auth";

export default class FriendProfile extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        displayName: PropTypes.string,
        interestTags: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.username = this.props.username
        this.displayName = this.props.displayName
        this.interestTags = this.props.interestTags
        this.img = this.props.img
        this.userId = this.props.userId //user_id property
        this.state = {
            sendRequest: this.props.sendRequest
        };
    }

    async handleClick() {
        if (this.state.sendRequest) {
            return;
        }

        // var myFormData = new FormData(); myFormData.append("token", await
        // getusertoken());        add an = sign? myFormData.append("otherId",
        // this.state.userId); const data = {token: await getusertoken(), otherId:
        // this.state.userId} make axios request to send request
        console.log("CURRENT USER TOKEN: ", await getusertoken());
        //console.log("OTHER USER ID: ", this.state.userId)
        /*axios.post("/sendFriendRequest/?", myFormData, {"Content-Type":"multipart/form-data"})
            .then( (data) => {
                if (data.data !== "Invalid\n") {
                    //update sendRequest state
                    this.setState({
                        ...this.state,
                        sendRequest: true
                    })

                }
            })*/
        var token = await getusertoken()
        var otherId = this.userId
        var sendRequestURL = "http://54.200.193.22:3000/sendFriendRequest/?"
        sendRequestURL += "token=" + token + "&otherId=" + otherId
        console.log(sendRequestURL)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", sendRequestURL, false); // false for synchronous request
        this.setState({sendRequest: true})
        xmlHttp.send(null);
        var result = xmlHttp.responseText
        console.log(result)
    }

    render() {
        return (
            <div className="profile-header">
                <div className='profile-picture'>
                <div className='profile-photo-circle' >
                            <div className='upload-icon'>
                                <i
                                    className='fa fa-user'
                                    style={{
                                        fontSize: '9vmin'
                                    }}></i>
                            </div>
                            {(this.img !== "") ? <img src={this.img} alt='img'/>: <></>}

                        </div>
                </div>
                <div className="profile-info">
                    <h2>{this.displayName}</h2>
                    <h6>{this.username}</h6>
                    <h6>{this.interestTags}</h6>
                </div>
                <div className="profile-button">
                    {this.props.currentUser !== this.username 
                    ? <button
                        className={this.state.sendRequest
                            ? "default-btn-white"
                            : "default-btn"
}
                        style={{
                            fontWeight: "normal",
                            textTransform: "capitalize",
                            border: "1px solid #88BBF6"
                        }}
                        onClick={this
                            .handleClick
                            .bind(this)}>
                        {
                            this.state.sendRequest
                                ? "Request Sent"
                                : "Send Request"
                        }
                    </button>
                    : <></>}
                </div>
            </div>
        );
    }
}

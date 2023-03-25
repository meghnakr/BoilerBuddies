import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from '../assets/logo_vector.png';
import { endpoint } from "../global";
import axios from "../utils/Axios";
import { getusertoken } from "../utils/auth";


export default class FriendProfile extends React.Component {

    
    
    static propTypes = {
        username: PropTypes.string,
        displayName: PropTypes.string,
        interestTags: PropTypes.string
    }

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
            sendRequest: this.props.sendRequest,
            userId: this.props.userId     //user_id property 
        };
    }

    async handleClick() {

        if (this.state.sendRequest) {
            return;
        }

        var myFormData = new FormData();
        myFormData.append("token", await getusertoken());
        myFormData.append("otherId", this.state.userId);

        const data = {token: await getusertoken(), otherId: this.state.userId}
        

        // make axios request to send request
        console.log("CURRENT USER TOKEN: ", await getusertoken())
        console.log("OTHER USER ID: ", this.state.userId)
    
        axios.post("/sendFriendRequest/", myFormData, {"Content-Type":"multipart/form-data"})
            .then( (data) => {
                if (data.data !== "Invalid\n") {        
                    //update sendRequest state
                    this.setState({
                        ...this.state,
                        sendRequest: true
                    })
                    
                }
            })
       

        

    }

    render() {
        

        return (
            <div className="profile-header">
            <div className='profile-picture'>
                <span><img src={logo} alt='img'/></span>
            </div>
            <div className='profile-info'>
                <h2>{this.state.displayName}</h2>
                <h6>{this.state.username}</h6>
                <h6>{this.state.interestTags}</h6>
            </div>
            <div className='profile-button'>
                <button className= {this.state.sendRequest ? 'default-btn-white' : 'default-btn'} 
                style= {{ fontWeight: 'normal', textTransform: 'capitalize', border: '1px solid #88BBF6'}}
                onClick={this.handleClick.bind(this)}>
                    { this.state.sendRequest ? 'Request Sent' : 'Send Request' }
                </button>
                {/* TODO: change button to edit if it's the user's profile */}
            </div>
            
            </div>
            )
    }

}
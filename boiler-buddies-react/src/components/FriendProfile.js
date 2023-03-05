import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from '../assets/logo_vector.png';


export default class FriendProfile extends React.Component {

    static propTypes = {
        username: PropTypes.string,
        displayName: PropTypes.string,
        interestTags: PropTypes.string
    }

    constructor(props) {
        super(props);
        
        this.state = {
            username: this.props.username,
            displayName: this.props.displayName,
            interestTags: this.props.interestTags
        };
    }

    render() {
        const {
            state: {
                username,
                interestTags,
                displayName
            },
            handleClick,
            sendRequest
        } = this;

        return (
            <div className="profile-header">
            <div className='profile-picture'>
                <span><img src={logo} alt='img'/></span>
            </div>
            <div className='profile-info'>
                <h2>{displayName}</h2>
                <h6>{username}</h6>
                <h6>{interestTags}</h6>
            </div>
            <div className='profile-button'>
                <button className= {sendRequest ? 'default-btn-white' : 'default-btn'} 
                style= {{ fontWeight: 'normal', textTransform: 'capitalize', border: '1px solid #88BBF6'}}
                onClick={handleClick}>
                    { sendRequest ? 'Sent Request' : 'Add Friend' }
                </button>
                {/* TODO: change button to edit if it's the user's profile */}
            </div>
            
            </div>
            )
    }

}
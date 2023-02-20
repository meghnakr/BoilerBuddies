import React, { useState } from 'react';
import logo from '../assets/logo_vector.png';

export default function Profile() {
    const [sendRequest, setSendRequest] = useState(false);

    const handleClick = () => {
        setSendRequest(!sendRequest);
    }

    return (
    <div className="page-container">
        <div className="profile-header">
            <div className='profile-picture'>
                <span><img src={logo} alt='img'/></span>
            </div>
            <div className='profile-info'>
                <h2>Name</h2>
                <h6>Age:</h6>
                <h6>Major:</h6>
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
    </div>
    )
}
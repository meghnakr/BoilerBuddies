import React, { useState } from 'react';
import logo from '../assets/logo_vector.png';
import FriendProfile from '../components/FriendProfile';

export default function Profile() {
    const [sendRequest, setSendRequest] = useState(false);

    const handleClick = () => {
        setSendRequest(!sendRequest);
    }

    return (
    <div className="page-container">
        <FriendProfile  sendRequest={sendRequest} handleClick = {handleClick}/>
    </div>
    )
}
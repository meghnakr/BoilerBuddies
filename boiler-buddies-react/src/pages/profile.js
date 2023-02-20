import React from 'react';
import logo from '../assets/logo_vector.png';

export default function Profile(props) {
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
            
        </div>
    </div>
    )
}
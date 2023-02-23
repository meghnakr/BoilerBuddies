import React, {useRef, useState} from 'react';
import MyProfile from '../components/MyProfile';

export default function EditProfile() {
    return (
        <div className='page-container' >
            <h3
                    style={{
                        fontWeight: 'bolder',
                        textAlign:"left"
                    }}>Edit Profile</h3>
            <MyProfile />
        </div>
    )
}
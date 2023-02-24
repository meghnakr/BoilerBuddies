import React, {useRef, useState} from 'react';
import MyProfile from '../components/MyProfile';
import { auth } from '../utils/auth';
import useUser from "../hooks/useUser";

export default function EditProfile() {
    const currentUser = useUser();
    
    return (
        <div className='page-container' >
            <h3
                    style={{
                        fontWeight: 'bolder',
                        textAlign:"left"
                    }}>Edit Profile</h3>
            <MyProfile tokenId={currentUser.token} />
        </div>
    )
}
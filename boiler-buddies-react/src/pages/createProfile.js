import React from 'react';
import MyProfile from '../components/MyProfile';
import useUser from "../hooks/useUser";

export default function CreateProfile(props) {
    props.funcNav(false);
    
    const currentUser = useUser();

    return (
        <div className='page-container' >
            <h3
                    style={{
                        fontWeight: 'bolder',
                        textAlign: 'left'
                    }}>Create a new profile</h3>
            <p style={{ fontWeight: 'lighter'}}>Fill out your information below to get started!</p>
            <MyProfile tokenId={currentUser.token}/>
        </div>
    )
}
import React from 'react';
import MyProfile from '../components/MyProfile';

export default function CreateProfile(props) {
    props.funcNav(false);
    
    return (
        <div className='page-container' >
            <h3
                    style={{
                        fontWeight: 'bolder',
                        textAlign: 'left'
                    }}>Create a new profile</h3>
            <p style={{ fontWeight: 'lighter'}}>Fill out your information below to get started!</p>
            <MyProfile />
        </div>
    )
}
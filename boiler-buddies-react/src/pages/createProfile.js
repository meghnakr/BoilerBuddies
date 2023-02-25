import React, { useEffect } from 'react';
import MyProfile from '../components/MyProfile';
import useUser from "../hooks/useUser";
import { useLocation } from 'react-router-dom';

export default function CreateProfile(props) {
    props.funcNav(false);
    
    //const currentUser = useUser();
    const location = useLocation();


    return (
        <div className='page-container' >
            <h3
                    style={{
                        fontWeight: 'bolder',
                        textAlign: 'left'
                    }}>Create a new profile</h3>
            <p style={{ fontWeight: 'lighter'}}>Fill out your information below to get started!</p>
            <MyProfile username={location.state.username} 
            displayName=''
            interests=''
            bio=''
            image=''
            route="/"/>
        </div>
    )
}
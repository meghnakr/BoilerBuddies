import React, {useEffect, useRef, useState} from 'react';
import MyProfile from '../components/MyProfile';
import {auth} from '../utils/auth';
import useUser from "../hooks/useUser";
import axios from 'axios';
import {endpoint,username } from '../global';

export default function EditProfile() {
    const currentUser = useUser();
    const [userData, setUserData] = useState(
        {displayName: "", interests: '', bio: "", image: ""}
    )

    useEffect(() => {
        var params = new URLSearchParams()
        //params.append('token', currentUser.token)
        params.append('username', currentUser.username)
        var config = {
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        /*
        axios
            .get(endpoint + "getUser/", params, config)
            .then(response => {
                console.log(response)
                setUserData(
                    {displayName: response.data.display_name, interests: response.data.interests, bio: response.data.intro, image: response.data.big_image}
                )
            })*/
        var getUserRequestURL = endpoint + "getUser/?" + params
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", getUserRequestURL, false ); // false for synchronous request
        xmlHttp.send(null);
        var response = xmlHttp.responseText;
        console.log(response);
        setUserData(
            {displayName: response.display_name, interests: response.interests, bio: response.intro, image: response.big_image}
        )
    },[]);

    return (
        <div className='page-container'>
            <h3
                style={{
                    fontWeight: 'bolder',
                    textAlign: "left"
                }}>Edit Profile</h3>
            <MyProfile
                username={currentUser.username}
                displayName={userData.displayName}
                interests={userData.interests}
                bio={userData.bio}
                image={userData.image}
                route="/"/>
        </div>
    )
}
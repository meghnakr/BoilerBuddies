import React, {useState, useEffect} from 'react';
import logo from '../assets/logo_vector.png';
import FriendProfile from '../components/FriendProfile';
import {Link} from 'react-router-dom';
import useUser from "../hooks/useUser";
import {endpoint} from '../global';

export default function Profile() {
    const currentUser = useUser();
    const username = currentUser.username;
    //const [username, setUsername] = useState('ntra')
    const [userData, setUserData] = useState({displayName: '', interests: '', bio: '', image: null})
    const [hasData, setHasData] = useState(false)
    const [sendRequest, setSendRequest] = useState(false);

    useEffect(() => {
        if(!hasData) {
            var params = new URLSearchParams()
            //params.append('token', currentUser.token)
            params.append('username', username)
            var config = {
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
    
            var getUserRequestURL = endpoint + "getUser/?" + params
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", getUserRequestURL, false); // false for synchronous request
            xmlHttp.send(null);
            var response = JSON.parse(xmlHttp.responseText);
            console.log(response)
            setUserData(
                {displayName: response.display_name, interests: response.interests.replaceAll('&&', ', '), bio: response.intro, image: response.big_image}
            )
            setHasData(true)
        }
        
    }, [userData]);
    

    const handleClick = () => {
        setSendRequest(!sendRequest);
    }

    return (
        <div className="page-container">
            {(userData.displayName==='' & userData.interests==='' & userData.bio==='' & userData.image==='')
            ? <div>
                <h4>You haven't created a profile yet. Create a profile <Link to='/edit-profile'>here</Link>.</h4>
                </div>
            :
            <div className="profile-header">
                <div className='profile-picture'>
                <div className='profile-photo-circle' >
                            <div className='upload-icon'>
                                <i
                                    className='fa fa-user'
                                    style={{
                                        fontSize: '9vmin'
                                    }}></i>
                            </div>
                            {(userData.image !== "null") ? <img src={userData.image} alt='img'/>: <></>}

                        </div>
                </div>
                <div className='profile-info'>
                    <h2>{userData.displayName}</h2>
                    <p>Interests: {userData.interests}</p>
                </div>
                <div className='profile-button'>
                    
                    {/* TODO: change button to edit if it's the user's profile */}
                </div>

            </div>
            }   
        </div>
    )
}
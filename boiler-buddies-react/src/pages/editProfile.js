import React, {useEffect, useState} from 'react';
import MyProfile from '../components/MyProfile';
import useUser from "../hooks/useUser";
import {endpoint} from '../global';
import {  useNavigate } from "react-router-dom";

export default function EditProfile() {
    const currentUser = useUser();
    const username = currentUser.username;
    //const [username, setUsername] = useState('ntra')
    const [userData, setUserData] = useState({displayName: '', interests: '', bio: '', image: null})
    const [hasData, setHasData] = useState(false)
    const navigate = useNavigate();

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

    function handleSubmit ()  {
        console.log(userData)
        var params = new URLSearchParams();
    
        //params.append('token', this.token)
        params.append('username', currentUser.username)
        params.append('displayName', userData.displayName)
        params.append('interests', userData.interests.replaceAll(/[ ]*,[ ]*|[ ]+/g, '&&'))
        params.append('intro', userData.bio)
        params.append('bigImage', userData.image)
        console.log(params)
        var updateRequestURL = endpoint + "updateUser/?" + params
        console.log(updateRequestURL)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", updateRequestURL, true ); // false for synchronous request
        xmlHttp.send(null);
        console.log(xmlHttp.responseText);
        navigate('/feed', {replace:true})
    }

    function handleFileInputChange (event) {
        let file = event.target.files[0]

        convertToBase64(file).then(result => {
            setUserData({...userData, image:result});
        }).catch(err => {
            console.log(err);
          });
    }

    function convertToBase64 (file) {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    }
    return (
        <div className='page-container'>
            <h3
                style={{
                    fontWeight: 'bolder',
                    textAlign: "left"
                }}>Edit Profile</h3>
                {/*
            {userData && <MyProfile
                username={username}
                displayName={userData.displayName}
                interestTags={userData.interests}
                bio={userData.bio}
                image={userData.image}
            />*/}

            <form className='edit-profile-form' type="submit" onSubmit={handleSubmit}>
                <div className='profile-photo'>
                    <div className='profile-photo-container'>
                        <div className='profile-photo-circle'>
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
                    <div className='button-container'>

                        <label htmlFor="upload-file"><i
                            className="fa fa-upload"
                            style={{
                    marginRight: "4px"
                }}/>
                            Upload photo</label>
                        <input
                            type="file"
                            id="upload-file"
                            accept='image/*'
                            style={{
                                display: 'none'
                            }}
                            onChange={handleFileInputChange}/>
                        <button
                            className='default-btn-white'
                            onClick={() => {
                                setUserData({image:''})
                            }}><i
                            className="fa fa-trash"
                            style={{
                    marginRight: "4px"
                }}/>
                            Remove photo</button>
                    </div>
                </div>

                <div className="profile-info">
                    <div>
                        <label>Display Name</label>
                        <input type="text" value={userData.displayName}
                        onChange={(event) => {setUserData({...userData, displayName:event.target.value})}}/>
                    </div>
                    <div>
                        <label>Interests <i>(Seperate each tag with a comma)</i></label>
                        <input type="text" value={userData.interests} 
                        onChange={(event) => {setUserData({...userData, interests:event.target.value})}}/>
                        {/*
                        <Multiselect
                            
                            selectedValues={tags}
                            style={{
                                searchBox: {
                                    borderRadius: '0%',
                                    border: '0.5px solid grey',
                                    padding: '0.5px 2px'
                                },
                                optionContainer: {
                                    borderRadius: '0%',
                                    border: '0.5px solid grey'
                                }
                            }}/>*/}
                    </div>
                    <div>
                        <label>Bio</label>
                        <textarea type="text" cols="40" rows="5" value={userData.bio} onChange={(event) => {setUserData({...userData, bio:event.target.value})}}/>
                    </div>

                </div>
                <button
                    type="submit"
                    className='default-btn'
                    onClick={handleSubmit}
                    style={{
                        width: '80%'
                    }}>Save profile</button>
            </form>

        </div>
    )
}
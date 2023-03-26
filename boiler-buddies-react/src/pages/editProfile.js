import React, {useEffect, useState} from 'react';
import useUser from "../hooks/useUser";
import {endpoint} from '../global';
import {  useNavigate } from "react-router-dom";
import CreatableSelect from 'react-select/creatable';

export default function EditProfile() {
    const currentUser = useUser();
    const [username, setUsername] = useState(currentUser.username)
    const [userData, setUserData] = useState({displayName: '', interests: null, bio: '', image: null})
    const [allTags, setAllTags] = useState([])
    const [hasData, setHasData] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setUsername(currentUser.username)
        if(!hasData) {
            var params = new URLSearchParams()
            params.append('username', username)
    
            var getUserRequestURL = endpoint + "getUser/?" + params
            var getTagsRequestURL = endpoint + "getTags/?"
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", getUserRequestURL, false); // false for synchronous request
            xmlHttp.send(null);
            var response = JSON.parse(xmlHttp.responseText);
            var interest_tag = []
            if(response.interests === '&&') {
                interest_tag = null
            } else {
                interest_tag = formatTags(response.interests.split('&&'))
            }
            console.log(interest_tag)
            setUserData(
                {displayName: response.display_name, interests: interest_tag, bio: response.intro, image: response.big_image}
            )

            var xmlHttp_2 = new XMLHttpRequest();
            xmlHttp_2.open("GET", getTagsRequestURL, false); // false for synchronous request
            xmlHttp_2.send(null);
            var response_2 = JSON.parse(xmlHttp_2.responseText);
            var tags = formatTags(response_2.interests);
            console.log(tags)
            setAllTags(tags)
            setHasData(true);
        }
        
    }, [userData]);

    
    function formatTags (tags) {
        var formattedTags = [];
        tags.forEach(element => {
            if(element !== '&&') {
                var arr = element.split('&&')
                arr.forEach(val => {
                    val = val.charAt(0).toUpperCase() + val.slice(1)
                    if(!formattedTags.includes(val)) {
                        formattedTags.push({value: val, label: val})
                    }
                })
            } 
        });
        return formattedTags
    }

    function handleSubmit ()  {
        console.log(userData)
        var params = new URLSearchParams();
    
        //params.append('token', this.token)
        params.append('username', currentUser.username)
        params.append('displayName', userData.displayName)
        if (userData.interests === null) {
            params.append('interests', '&&')
        } else {
            var arr = []
            userData.interests.forEach(element => {
                arr.push(element.value.trim())
            })
            params.append('interests', arr.toString().replaceAll(',', '&&'))
        }
        
        params.append('intro', userData.bio)
        params.append('bigImage', userData.image)
        console.log(params)
        var updateRequestURL = endpoint + "updateUser/?" + params
        console.log(updateRequestURL)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", updateRequestURL, true ); // false for synchronous request
        xmlHttp.send(null);
        
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
                            {(userData.image !== "") ? <img src={userData.image} alt='img'/>: <></>}

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
                        <label>Interests</label>
                        {/*<input type="text" value={userData.interests} 
                        onChange={(event) => {setUserData({...userData, interests:event.target.value})}}/>*/}
                        <CreatableSelect isMulti options={allTags} value={userData.interests}
                        onChange={(selected) => {
                            setUserData({...userData, interests: selected})}}
                        />
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
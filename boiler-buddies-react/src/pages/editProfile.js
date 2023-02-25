import React, {useEffect, useState, useNavigate} from 'react';
import MyProfile from '../components/MyProfile';
import useUser from "../hooks/useUser";
import {endpoint} from '../global';

export default function EditProfile() {
    const currentUser = useUser();
    const [username, setUsername] = useState('ntra')
    const [userData, setUserData] = useState({displayName: '', interests: '', bio: '', image: ''})
    const [selectedImage, setSelectedImage] = useState(null)
    const [base64Image, setBase64Image] = useState('')

    useEffect(() => {
        var params = new URLSearchParams()
        //params.append('token', currentUser.token)
        params.append('username', currentUser.username)
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
            {displayName: response.display_name, interests: response.interests, bio: response.intro, image: response.big_image}
        )
        setUsername(currentUser.username)
    }, []);

    function handleSubmit ()  {
        var params = new URLSearchParams();
    
        //params.append('token', this.token)
        params.append('username', username)
        params.append('displayName', userData.displayName)
        params.append('interests', userData.interests)
        params.append('intro', userData.bio)
        params.append('bigImage', userData.image)
        console.log(params)
        var updateRequestURL = endpoint + "updateUser/?" + params
        console.log(updateRequestURL)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", updateRequestURL, false ); // false for synchronous request
        xmlHttp.send(null);
        console.log(xmlHttp.responseText);
        /*
        let profile = {
            token: this.token,
            displayName: this.state.name,
            interests: this.state.tags,
            intro: this.state.biography,
            bigImage: this.state.base64Image,
            smallImage: this.state.base64Image
        }
        console.log(profile);
        axios.post(endpoint + "updateUser/", {
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            profile})
            .then(response => console.log(response))
            .finally(this.setState({submit: true}));*/
        
    }

    function handleFileInputChange (event) {
        setSelectedImage(event
                .target
                .files[0]);

        let file = event.target.files[0]

        convertToBase64(file).then(result => {
            setUserData({image:result});
            console.log("setuserData img")
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
                            {(userData.image !== '') ? <img src={userData.image} alt='img'/>: <></>}

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
                        onChange={(event) => {setUserData({displayName:event.target.value})}}/>
                    </div>
                    <div>
                        <label>Interests <i>(Seperate each tag with a comma)</i></label>
                        <input type="text" value={userData.interests} 
                        onChange={(event) => {setUserData({interests:event.target.value})}}/>
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
                        <textarea type="text" cols="40" rows="5" value={userData.bio} onChange={(event) => {setUserData({bio:event.target.value})}}/>
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
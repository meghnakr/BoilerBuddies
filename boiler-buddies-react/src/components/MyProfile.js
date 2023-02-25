import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { endpoint } from '../global';
import { Multiselect } from "multiselect-react-dropdown";
import { Navigate } from 'react-router-dom';

export default class MyProfile extends React.Component {
    static propTypes = {
        tokenId: PropTypes.string,
        username: PropTypes.string,
        displayName: PropTypes.string,
        interestTags: PropTypes.string,
        bio: PropTypes.string,
        image: PropTypes.string,
        route: PropTypes.string
    }

    constructor(props) {
        super(props);

       this.token = this.props.tokenId;
       this.route = this.props.route;
       this.username = this.props.username;
       

        this.state = {
            submit: false,
            selectedImage: null,
            name: this.props.displayName,
            tags: this.props.interestTags,
            biography: this.props.bio,
            base64Image: this.props.image
        };
    }

    

    handleSubmit = () => {
        var params = new URLSearchParams();
        var config = {
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
        //params.append('token', this.token)
        params.append('username', this.username)
        params.append('displayName', this.state.name)
        params.append('interests', this.state.tags)
        params.append('intro', this.state.biography)
        params.append('bigImage', this.state.base64Image)
        params.append('smallImage', this.state.base64Image)
        /*
        axios
            .post(endpoint + "updateUser/", this.params, this.config)
            .then(response => console.log("updateUser" + response))
        
        */
        var updateRequestURL = endpoint + "updateUser/?" + params
        console.log(updateRequestURL)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", updateRequestURL, false ); // false for synchronous request
        xmlHttp.send(null);
        console.log(xmlHttp.responseText);
        this.setState({submit: true})
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

    handleFileInputChange = (event) => {
        this.setState({
            selectedImage: event
                .target
                .files[0]
        });

        let file = event.target.files[0]

        this.convertToBase64(file).then(result => {
            this.setState({base64Image: result});
        }).catch(err => {
            console.log(err);
          });
    }

    convertToBase64 = (file) => {
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


    render() {
        const {
            state: {
                selectedImage,
                name,
                tags,
                biography,
                base64Image,
                submit
            },
            handleSubmit, route
        } = this;
        return (
            <>
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
                            {(base64Image !== '') ? <img src={base64Image} alt='img'/>: <></>}

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
                            onChange={this.handleFileInputChange}/>
                        <button
                            className='default-btn-white'
                            onClick={() => {
                                this.setState({selectedImage: null})
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
                        <input type="text" value={name}
                        onChange={(event) => {this.setState({name:event.target.value})}}/>
                    </div>
                    <div>
                        <label>Interests</label>
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
                            }}/>
                    </div>
                    <div>
                        <label>Bio</label>
                        <textarea type="text" cols="40" rows="5" value={biography} onChange={(event) => {this.setState({biography:event.target.value})}}/>
                    </div>

                </div>
                <button
                    type="submit"
                    className='default-btn'
                    style={{
                        width: '80%'
                    }}>Save profile</button>
            </form>
            {submit ? <Navigate to='/feed' replace={true}/> : <></>}
            </>
        )
    }
}
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { endpoint } from '../global';
import { Multiselect } from "multiselect-react-dropdown";

export default class MyProfile extends React.Component {
    static propTypes = {
        displayName: PropTypes.string,
        interestTags: PropTypes.instanceOf(Array),
        bio: PropTypes.string
    }

    constructor(props) {
        super(props);

        this.state = {
            selectedImage: null,
            name: this.props.displayName,
            tags: this.props.interestTags,
            biography: this.props.bio,
            base64Image: ""
        };

    }

    handleSubmit = () => {
        let profile = {
            token: 0,
            displayName: this.state.name,
            interests: this.state.tags,
            intro: this.state.biography,
            bigImage: this.state.base64Image,
            smallImage: this.state.base64Image
        }
        axios.post(endpoint + "updateUser/", {
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            profile})
            .then(response => console.log(response));
        
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
                biography
            },
            handleSubmit
        } = this;
        return (
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
                            {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt='img'/>}

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
                        <input type="text" value={name}/>
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
                        <textarea type="text" cols="40" rows="5" value={biography}/>
                    </div>

                </div>
                <button
                    type="submit"
                    className='default-btn'
                    style={{
                        width: '80%'
                    }}>Save profile</button>
            </form>
        )
    }
}
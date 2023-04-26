import React from 'react';
import PropTypes from 'prop-types';
import { endpoint } from '../global';
import axios from '../utils/Axios';
import { getusertoken } from '../utils/auth';

export default class EditGroupChat extends React.Component {
    static propTypes = {
        //tokenId: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        isNew: PropTypes.bool, // this is true when we are creating this group chat, false when editing
    }

    constructor(props) {
        super(props);

       //this.token = this.props.tokenId;

        this.state = {
            name: this.props.name,
            description: this.props.description,
            base64Image: this.props.image,
            isNew: this.props.isNew
        };
    }

    

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log("In handlesubmit")

        const token = await getusertoken();
        var params = new URLSearchParams();
        params.append('token', token)
        params.append('name', this.state.name)
        params.append('description', this.state.description)
        params.append('bigImage', this.state.base64Image)

        var requestURL = ""
        
        if (this.state.isNew) {
            requestURL = endpoint + "addGroupChat/?" + params
            console.log(requestURL)
        }
        else {
            // call update group chat
        }

        axios.get(requestURL).then( (result)=>{ 
            console.log("Making request to create/edit group chat")
            console.log(result.data)
            this.props.navigation('/chat/' + result.data.groupId + '/G', {replace:true});
        } )
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
                name,
                description,
                base64Image,
            },
            handleSubmit
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
                            {(base64Image !== '') ? <img src={base64Image} alt=''/>: <></>}

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
                        <label>Name</label>
                        <input type="text" value={name}
                        onChange={(event) => {this.setState({name:event.target.value})}}/>
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea type="text" cols="40" rows="5" value={description} onChange={(event) => {this.setState({description:event.target.value})}}/>
                    </div>

                </div>
                <button
                    type="submit"
                    className='default-btn'
                    style={{
                        width: '80%'
                    }}>Save</button>
            </form>
            </>
        )
    }
}
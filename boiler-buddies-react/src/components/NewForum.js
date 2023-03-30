import React from 'react';
import PropTypes from 'prop-types';
import { endpoint } from '../global';
import axios from '../utils/Axios';

export default class NewForum extends React.Component {
    static propTypes = {
        tokenId: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
    }

    constructor(props) {
        super(props);

       this.token = this.props.tokenId;

        this.state = {
            name: this.props.name,
            description: this.props.description,
            base64Image: this.props.image
        };
    }

    

    handleSubmit = (event) => {
        event.preventDefault();
        //delay(10000).then(() => console.log('ran after 10 seconds passed'));
        console.log("In handlesubmit")
        var params = new URLSearchParams();

        //getusertoken().then(result => params.append('token', result))
        //params.append('token', this.token)
        params.append('name', this.state.name)
        params.append('description', this.state.description)
        params.append('bigImage', this.state.base64Image)
        //params.append('smallImage', this.state.base64Image)
        /*
        axios
            .post(endpoint + "updateUser/", this.params, this.config)
            .then(response => console.log("updateUser" + response))
        
        */
        var createForumRequestURL = endpoint + "addForum/?" + params
        console.log(createForumRequestURL)
        
        /*
        var xmlHttp = new XMLHttpRequest();
        console.log("Making request to create forum")
        xmlHttp.open( "GET", createForumRequestURL, true ); // false for synchronous request
        xmlHttp.send(null);
        console.log(xmlHttp.responseText)*/
        
        //var forumId = JSON.parse(xmlHttp.responseText).forumId
        //console.log(forumId);
        //this.returnForumID(forumId)
        //console.log(xmlHttp.responseText);
        //this.props.navigation('/feed', {replace:true});

        axios.get(createForumRequestURL).then( (result)=>{ 
            console.log("Making request to create forum")
            console.log(result.data)
            this.props.navigation('/forum/' + result.data.forumId, {replace:true});
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
                    }}>Save forum</button>
            </form>
            </>
        )
    }
}
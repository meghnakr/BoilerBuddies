import React from 'react';
import PropTypes from 'prop-types';
import {endpoint} from '../global';

export default  class Post extends React.Component {
    static propTypes = {
        tokenId: PropTypes.string,
    }

    constructor(props) {
        super(props)
        this.token = this.props.tokenId
        this.state = {
            file: null,
            file64: '',
            content: ''
        }
    }

    handleFileInputChange = (event) => {
        var file = event.target.files[0]
        this.setState({file: URL.createObjectURL(file)})
        this.convertToBase64(file).then(result => {
            this.setState({file64:result});
        }).catch(err => {
            console.log(err);
          });
    }

    handlePosting = () => {
        if(this.state.content === '') {return;}
        var params = new URLSearchParams();
        params.append('token', this.token)
        params.append('content', this.state.content)
        params.append('bigImage', this.state.file64)
        
        var postRequestURL = endpoint + "addPost/?" + params
        console.log(postRequestURL)
        /*
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", postRequestURL, false ); // false for synchronous request
        xmlHttp.send(null);
        var postId = JSON.parse(xmlHttp.responseText).postId
        console.log(postId);*/
        
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
            handlePosting,
            handleFileInputChange,
            state: {file, content}
        } = this
        return (
            <div className='post-container'>
            <textarea rows='1' className='create-post' placeholder='Share your thoughts' type='text' value={content} onChange={(event)=>{this.setState({content:event.target.value})}}/>
            {file && <div className='photo-uploaded-container'>
                <button className='remove-img' onClick={() => {this.setState({file:null, file64:''})}}><i className='fa fa-times-circle'></i></button>
                <img src={file} alt='img'/>
            </div>}
            <hr class="solid" ></hr>
            <div className='post-utils-container' >
                <label htmlFor="upload-photo"><i className='fa fa-file-image-o' style={{fontSize: '1.5em', fontWeight:'light', color: '#88BBF6'}}></i></label>
                <input
                            type="file"
                            id="upload-photo"
                            accept='image/*'
                            style={{
                                display: 'none'
                            }}
                            onChange={handleFileInputChange}
                            />
            </div>
            <div className='post-button-container'>
                <button className='default-btn' onClick={handlePosting}>Post</button>
            </div>
            
            </div>
        )
    }
}
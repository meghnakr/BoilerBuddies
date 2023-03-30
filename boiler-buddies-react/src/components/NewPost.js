import React from 'react';
import PropTypes from 'prop-types';
import {endpoint} from '../global';
import Select from 'react-select';

export default  class NewPost extends React.Component {
    static propTypes = {
        tokenId: PropTypes.string,
    }

    constructor(props) {
        super(props)
        this.token = this.props.tokenId
        this.returnPostID = this.props.handleCallback
        this.state = {
            file: null,
            file64: '',
            content: '',
            selectedForum: null,
            disableBtn: true,
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
        console.log(this.token)
        if(this.state.content === '' ) {return;}
        var params = new URLSearchParams();
        params.append('token', this.token)
        params.append('content', this.state.content)
        params.append('bigImage', this.state.file64)
        params.append('forumId', this.state.selectedForum.value)
        var postRequestURL = endpoint + "addPost/?" + params
        console.log(postRequestURL)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", postRequestURL, false ); // false for synchronous request
        xmlHttp.send(null);
        var postId = JSON.parse(xmlHttp.responseText).postId
        this.returnPostID(postId)
        window.location.reload()
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
            state: {file, content, disableBtn, selectedForum},
        } = this
        return (
            <div className='post-container'>
                <Select className="forum-select" placeholder="Choose a forum" options={this.props.forums} onChange={(selected)=> {
                    if(content.length === 0 || selected === null) {
                        this.setState({disableBtn: true})
                    } else {
                        this.setState({disableBtn: false})
                    }
                    this.setState({selectedForum:selected})}}/> 
            <textarea rows='1' className='create-post' placeholder='Share your thoughts' type='text' value={content} 
                onChange={(event)=>{
                    if(event.target.value.length === 0 || selectedForum === null) {
                        this.setState({disableBtn: true})
                    } else {
                        this.setState({disableBtn: false})
                    }
                    this.setState({content:event.target.value})}}/>
            {file && <div className='photo-uploaded-container'>
                <button className='no-outline-btn' onClick={() => {this.setState({file:null, file64:''})}}><i className='fa fa-times-circle'></i></button>
                <img src={file} alt='img'/>
            </div>}
            <hr class="solid" ></hr>
            <div className='post-utils-container' >
                <label htmlFor="upload-photo"><i className='fa fa-file-image-o' style={{fontSize: '1.5em', fontWeight:'light', color: '#88BBF6', cursor:'pointer'}}></i></label>
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
                <button className='default-btn' onClick={handlePosting} disabled={disableBtn}>Post</button>
            </div>
            
            </div>
        )
    }
}
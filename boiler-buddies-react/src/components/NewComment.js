import React from "react";
import {endpoint} from "../global";

export default class NewComment extends React.Component {
    constructor(props) {
        super(props)
        this.token = this.props.token
        this.username = this.props.username
        this.postId = this.props.postId
        this.parentCommentId = this.props.parentCommentId
        this.state = {
            disableBtn: true,
            content: '',
            file: '',
            file64: ''
        }
    }

    handleFileInputChange = (event) => {
        var file = event
            .target
            .files[0]
        this.setState({file: URL.createObjectURL(file)})
        this
            .convertToBase64(file)
            .then(result => {
                this.setState({file64: result});
            })
            .catch(err => {
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

    handleCommenting = () => {
        var params = new URLSearchParams();
        params.append('token', this.token)
        params.append('content', this.state.content)
        params.append('postId', this.postId)
        params.append('bigImage', this.state.file64)
        params.append('parentCommentId', this.parentCommentId)
        var commentRequestURL = endpoint + "addComment/?" + params
        console.log(commentRequestURL)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", commentRequestURL, true); // false for synchronous request
        xmlHttp.onload = (e) => { //handle async request
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        var commentId = JSON
                            .parse(xmlHttp.responseText)
                            .commentId
                            window
                            .location
                            .reload()
                    } catch (e) {
                        if (e instanceof SyntaxError) {
                            console.log(xmlHttp.responseText);
                            window
                                .location
                                .reload()
                        }
                    }
                } else {
                    console.error(xmlHttp.statusText)
                }
            }
        }
        xmlHttp.onerror = (e) => {
            console.error(xmlHttp.statusText)
        }
        xmlHttp.send(null);

    }

    render() {
        const {
            username,
            state: {
                content,
                file,
                disableBtn
            },
            handleFileInputChange,
            handleCommenting
        } = this
        return (
            <div style={{height: '35vmin'}}>
                {
                    username && <label
                            style={{
                                fontWeight: 'normal'
                            }}>Comment as <b>{username}</b>
                        </label>
                }
                <textarea
                    rows='6'
                    className='create-comment'
                    placeholder='What are your thoughts?'
                    type='text'
                    value={content}
                    onChange={(event) => {
                        if (event.target.value.length === 0) {
                            this.setState({disableBtn: true})
                        } else {
                            this.setState({disableBtn: false})
                        }
                        this.setState({content: event.target.value})
                    }}/> {
                    file && <div className='photo-uploaded-container'>
                            <button
                                className='no-outline-btn'
                                onClick={() => {
                                    this.setState({file: null})
                                }}>
                                <i className='fa fa-times-circle'></i>
                            </button>
                            <img src={file} alt='img'/>
                        </div>
                }
                <div className='post-utils-container'>
                    <label htmlFor="upload-photo">
                        <i
                            className='fa fa-file-image-o'
                            style={{
                                fontSize: '1.5em',
                                fontWeight: 'light',
                                color: '#88BBF6',
                                cursor: 'pointer'
                            }}></i>
                    </label>
                    <input
                        type="file"
                        id="upload-photo"
                        accept='image/*'
                        style={{
                            display: 'none'
                        }}
                        onChange={handleFileInputChange}/>
                </div>

                <div className='post-button-container'>
                    <button
                        className='default-btn'
                        disabled={disableBtn}
                        onClick={handleCommenting}>Comment</button>
                </div>
            </div>
        )
    }
}
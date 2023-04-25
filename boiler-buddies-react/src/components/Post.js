import React from 'react';
import PropTypes from 'prop-types';
import {endpoint} from '../global';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import FriendProfile from './FriendProfile';
import { useNavigate } from "react-router-dom";


export default  class Post extends React.Component {
    static propTypes = {
        content: PropTypes.string,
        disable: PropTypes.bool
    }

    constructor(props) {
        super(props)
        this.token = this.props.token
        this.disable = this.props.disable
        this.id = this.props.id
        this.username = this.props.username
        this.userId = this.props.userId
        this.postAt = this.props.postAt
        this.content = this.props.content
        this.img = this.props.img
        this.forumId = this.props.forumId
        this.forumName = this.props.forumName
        this.chatId = this.props.chatId
        this.state = {
            liked: this.props.liked,
            likes: this.props.likes,
            comments: this.props.comments,
            open: false,
            postLikes: null, 
        }
    }

    handleLike = () => {
        var params = new URLSearchParams()
        params.append("token", this.token)
        params.append("postId", this.id)
        var xmlHttp = new XMLHttpRequest();
        
        if (this.state.liked) {
            var unlikePostRequest = endpoint + 'unlikePost/?' + params
            console.log(unlikePostRequest)
            xmlHttp.open("POST", unlikePostRequest, true); // false for synchronous request
            xmlHttp.send(null)
            this.setState({liked: false, likes: this.state.likes--})
        } else {
            var likePostRequest = endpoint + 'likePost/?' + params
            console.log(likePostRequest)
            xmlHttp.open("POST", likePostRequest, true); // false for synchronous request
            xmlHttp.send(null)
            this.setState({liked: true, likes: this.state.likes++})
        }
    }
    timeDifference = (current, previous) => {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;

        var elapsed = current - previous;

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        } else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        } else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        } else if (elapsed < msPerMonth) {
            var diff = Math.round(elapsed / msPerDay)
            if (diff === 1) {
                return '1 day ago';
            }
            return diff + ' days ago';
        } else {
            return previous.toDateString();
        }
    }

    formatNumber = (num, txt) => {
        if(num === 1) {
            return num + " " + txt
        } else {
            return num + " " + txt + "s"
        }
    }

    openDialog = () => {
        this.setState({open:true})
        var params = new URLSearchParams()
        params.append("token", this.token)
        params.append("postId", this.id)
        var xmlHttp = new XMLHttpRequest();
        var getPostLikesRequest = endpoint + 'getPostLikes/?' + params
        console.log(getPostLikesRequest)
        xmlHttp.open("GET", getPostLikesRequest, true); // false for synchronous request
        xmlHttp.onload = (e) => { //handle async request
            if(xmlHttp.readyState === 4) {
                if(xmlHttp.status === 200) {
                    try {
                        var response = JSON.parse(xmlHttp.responseText);
                        console.log(response)
                        var formatted = this.formatResults(response)
                        this.setState({postLikes: formatted})
                    }
                    catch (e) {
                        if (e instanceof SyntaxError) {
                            console.log(xmlHttp.responseText);
                            window.location.reload()
                        }
                    }
                } else { 
                    console.error(xmlHttp.statusText)
                }
            }
        }
        xmlHttp.send(null)
    }

    closeDialog = () => {
        this.setState({open: false})
    }

    formatResults = (result) => {
        const navigate = useNavigate();
        var jsonResults = result;
        var formattedResults = [];
        var currUser = this.props.currentUser
        Object.keys(jsonResults).forEach(function (key) {
            var curr = jsonResults[key]
            var user = (<FriendProfile 
                currentUser={currUser}
                displayName={curr["display_name"]}
                userId = {curr["otherId"]}
                username = {curr["username"]}
                img = {curr["big_image"]}
                navigate={navigate}/>)
            formattedResults.push(user)
        });
        return formattedResults;
      }

    render () {
        const {
            content, img, username, postAt, id, disable, userId, forumId, forumName, chatId,
            state: {liked, likes, comments, open, postLikes},
            formatNumber, timeDifference, openDialog, closeDialog
        } = this
        return (
            <>
            <div className='post-container'>
                <p style={{color:"grey", fontSize:"smaller"}}>In <button className='no-outline-btn' style={{padding:'0', }} 
                onClick={()=> {this.props.navigate(`/forum/${forumId}`)}}> {forumName}</button> - Posted by <button className='no-outline-btn' style={{padding:'0'}} 
                onClick={()=> {this.props.navigate(`/user/${userId}`)}}>{username}</button> - {timeDifference(new Date(), new Date(postAt))} </p>
                <p>{content}</p>
                {(img !== "") ? <div className="image-container">
                    <img src={img} alt="<image>"/> 
                    </div>: <></>}
                <div className='post-stats-container'>
                    {(likes!==0) ?
                    <button className='no-outline-btn' onClick={openDialog}>
                        {formatNumber(likes, "Like")}
                    </button>
                    : null }
                </div>
                <div className='post-stats-container'>
                    <button className='no-outline-btn' disabled={disable}
                    onClick={() => {this.props.navigate(`/post/${id}`, {
                    state: {content: content, img:img, username:username,postAt:postAt, userId:userId, liked:liked, likes: likes, comments:comments, forumId:forumId, forumName:forumName}})}}>
                        <i className='fa fa-comment-o'></i> {formatNumber(comments, "Comment")}</button>
                    <button className='no-outline-btn' onClick={() => this.setState(this.handleLike)} style={liked ? {color: 'red'} : {color:'grey'}}>
                        <i className={liked ? 'fa fa-heart' : 'fa fa-heart-o'}></i> 
                        Like
                    </button>
                    <button className='no-outline-btn' /*onClick={() => {this.props.navigate(`/chat/${chatId}`)}*/ >
                        <i className='fa fa-paper-plane-o'></i> Direct Message
                    </button>
                </div>
            </div>
            <Dialog fullWidth={true} open={open} onClose={closeDialog} >
            <DialogTitle sx={{textAlign:'center', fontWeight:'bold', borderBottom:'solid grey 1px'}}>Likes 
            <i className='fa fa-close' style={{float:'right', cursor:'pointer'}} onClick={closeDialog}/></DialogTitle>
            <DialogContent>
                {postLikes}
            </DialogContent>
            </Dialog>
            </>
        )
    }
}
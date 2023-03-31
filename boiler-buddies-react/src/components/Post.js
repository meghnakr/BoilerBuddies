import React from 'react';
import PropTypes from 'prop-types';
import {endpoint} from '../global';
import { Link } from 'react-router-dom';

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
        this.state = {
            liked: this.props.liked,
            likes: this.props.likes,
            comments: this.props.comments
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
    render () {
        const {
            content, img, username, postAt, id, disable, userId,
            state: {liked, likes, comments,},
            formatNumber, timeDifference
        } = this
        //console.log("IMAGE");
        //console.log(img);
        return (
            <div className='post-container'>
                <p style={{color:"grey", fontSize:"smaller"}}>Posted by <button className='no-outline-btn' style={{padding:'0'}} 
                onClick={()=> {this.props.navigate(`/user/${userId}`, {replace:true})}}>{username}</button> - {timeDifference(new Date(), new Date(postAt))} </p>
                <p>{content}</p>
                <img src={img} alt=""/>
                <div className='post-stats-container'>
                    <button className='no-outline-btn' disabled={disable}
                    onClick={() => {this.props.navigate(`/post/${id}`, {replace:true, 
                    state: {content: content, img:img, username:username,postAt:postAt, userId:userId, liked:liked, likes: likes, comments:comments}})}}>
                        <i className='fa fa-comment-o'></i> {formatNumber(comments, "Comment")}</button>
                    <button className='no-outline-btn' onClick={() => this.setState(this.handleLike)} style={liked ? {color: 'red'} : {color:'grey'}}>
                        <i className={liked ? 'fa fa-heart' : 'fa fa-heart-o'}></i> 
                        {formatNumber(likes, "Like")}
                    </button>
                </div>
            </div>
        )
    }
}
import React from 'react';
import PropTypes from 'prop-types';
import {endpoint} from '../global';
import { Link } from 'react-router-dom';
import {getusertoken} from "../utils/auth";


export default  class ProfileComment extends React.Component {
    static propTypes = {
        content: PropTypes.string,
        disable: PropTypes.bool
    }

    constructor(props) {
        super(props)
        this.token = this.props.token
        this.userId = this.props.userId
        this.postId = this.props.postId
        this.id = this.props.id
        this.content = this.props.content
        this.username = this.props.username
        this.commentAt = this.props.commentAt
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


    render () {
        const {
            content, username, commentAt, postId, userId,
            timeDifference
        } = this
        return (
            <div className='post-container'>
                <p style={{color:"grey", fontSize:"smaller"}}>In <button className='no-outline-btn' style={{padding:'0', }} 
                onClick={()=> {this.props.navigate(`/post/${postId}`, {replace:true})}}> {postId}</button> - Posted by <button className='no-outline-btn' style={{padding:'0'}} 
                onClick={()=> {this.props.navigate(`/user/${userId}`, {replace:true})}}>{username}</button> - {timeDifference(new Date(), new Date(commentAt))} </p>
                <p>{content}</p>
            </div>
        )
    }
}
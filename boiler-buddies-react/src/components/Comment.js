import React from 'react';
import { endpoint } from '../global';
import NewComment from './NewComment';
export default class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.token = this.props.token
        this.id = this.props.id
        this.parentCommentId = this.props.parentCommentId
        this.username = this.props.username
        this.content = this.props.content
        this.disable = this.props.disable
        this.marginLeft = this.props.marginLeft
        this.postAt = this.props.postAt
        this.state = {
            openTextBox: false,
            liked: this.props.liked,
            likes: this.props.likes
        }
    }

    handleLike = () => {
        var params = new URLSearchParams()
        params.append("token", this.token)
        params.append("commentId", this.id)
        var xmlHttp = new XMLHttpRequest();
        
        if (this.state.liked) {
            var unlikeCommentRequest = endpoint + 'unlikeComment/?' + params
            console.log(unlikeCommentRequest)
            xmlHttp.open("POST", unlikeCommentRequest, true); // false for synchronous request
            xmlHttp.send(null)
            this.setState({liked: false, likes: this.state.likes--})
        } else {
            var likeCommentRequest = endpoint + 'likeComment/?' + params
            console.log(likeCommentRequest)
            xmlHttp.open("POST", likeCommentRequest, true); // false for synchronous request
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


    render() {
        const {
            username, content, marginLeft, postAt,
            state: {liked, likes, openTextBox},
            formatNumber, timeDifference
        } = this
        return(
            <div className='post-container' style={{border:'none', borderLeft:'black 1px solid', marginLeft: `${marginLeft}`, borderBottom:'black 1px solid'}}>
                <p style={{color:"grey", fontSize:"smaller"}}>Posted by <button className='no-outline-btn' style={{padding:'0'}} 
                >{username}</button> - {timeDifference(new Date(), new Date(postAt))} </p>
                <p>{content}</p>
                <div className='post-stats-container'>
                    <button className='no-outline-btn' onClick={() => this.setState({openTextBox: !openTextBox})}> <i className='fa fa-comment-o'></i>  Reply</button>
                    
                    <button className='no-outline-btn' onClick={() => this.setState(this.handleLike)} style={liked ? {color: 'red'} : {color:'grey'}}>
                        <i className={liked ? 'fa fa-heart' : 'fa fa-heart-o'}></i> 
                        {formatNumber(likes, "Like")}
                    </button>
                </div>
                {openTextBox && <NewComment token={this.token} username={null} parentCommentId={this.id} postId={this.props.postId}/>}
            
            </div>
        )
    }
}
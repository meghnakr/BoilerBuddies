import React from 'react';
import { endpoint } from '../global';
import NewComment from './NewComment';
export default class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.id = this.props.id
        this.parentCommentId = this.props.parentCommentId
        this.username = this.props.username
        this.content = "Dummy content"
        this.disable = this.props.disable
        this.marginLeft = this.props.marginLeft
        this.state = {
            openTextBox: false,
            liked: true,
            likes: 2
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

    formatNumber = (num, txt) => {
        if(num === 1) {
            return num + " " + txt
        } else {
            return num + " " + txt + "s"
        }
    }


    render() {
        const {
            username, content, marginLeft,
            state: {liked, likes, openTextBox},
            formatNumber
        } = this
        return(
            <div className='post-container' style={{border:'none', borderLeft:'black 1px solid', marginLeft: `${marginLeft}`, borderBottom:'black 1px solid'}}>
                <p style={{color:"grey", fontSize:"smaller"}}>Posted by <button className='no-outline-btn' style={{padding:'0'}} 
                >{username}</button> - 2 days ago </p>
                <p>{content}</p>
                <div className='post-stats-container'>
                    <button className='no-outline-btn' onClick={() => this.setState({openTextBox: !openTextBox})}> <i className='fa fa-comment-o'></i>  Reply</button>
                    
                    <button className='no-outline-btn' onClick={() => this.setState(this.handleLike)} style={liked ? {color: 'red'} : {color:'grey'}}>
                        <i className={liked ? 'fa fa-heart' : 'fa fa-heart-o'}></i> 
                        {formatNumber(likes, "Like")}
                    </button>
                </div>
                {openTextBox && <NewComment />}
            
            </div>
        )
    }
}
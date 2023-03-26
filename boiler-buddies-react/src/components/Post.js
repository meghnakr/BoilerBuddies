import React from 'react';
import PropTypes from 'prop-types';
import {endpoint} from '../global';

export default  class Post extends React.Component {
    static propTypes = {
        content: PropTypes.string
    }

    constructor(props) {
        super(props)
        this.username = this.props.username
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
        if (this.state.liked) {
            this.setState({liked: false, likes: this.state.likes--})
        } else {
            this.setState({liked: true, likes: this.state.likes++})
        }
    }
    render () {
        const {
            content, img, username, postAt, 
            state: {liked, likes, comments,}
        } = this
        return (
            <div className='post-container'>
                <p style={{color:"grey", fontSize:"smaller"}}>Posted by <u> {username}</u> - {postAt} </p>
                <p>{content}</p>
                <div className='post-stats-container'>
                    <button className='no-outline-btn'><i className='fa fa-comment-o'></i> {comments} Comments</button>
                    <button className='no-outline-btn' onClick={() => this.setState(this.handleLike)} style={liked ? {color: 'red'} : {color:'grey'}}>
                        <i className={liked ? 'fa fa-heart' : 'fa fa-heart-o'}></i> 
                         {likes} Likes
                    </button>
                </div>
            </div>
        )
    }
}
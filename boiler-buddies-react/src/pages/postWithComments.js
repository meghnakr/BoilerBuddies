import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import Post from "../components/Post";
import useUser from "../hooks/useUser";
import NewComment from "../components/NewComment";
import Comment from "../components/Comment";
import { uuidNil } from './global';

const PostWithComments = () => {
    const currentUser = useUser()
    const {postId} = useParams()
    const location = useLocation();
    /*
    useEffect(() => {
        if(currentUser.token !== null) {
            var params = new URLSearchParams()
            let timer = setTimeout(() => {
                params.append("token", currentUser.token)
                params.append("postId", postId)
                var getCommentRequestURL = endpoint + "getPostComments/?" + params
                console.log(getCommentRequestURL)
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", getCommentRequestURL, true); // false for synchronous request
                xmlHttp.onload = (e) => { //handle async request
                    if(xmlHttp.readyState === 4) {
                        if(xmlHttp.status === 200) {
                            var response = JSON.parse(xmlHttp.responseText);
                            console.log(response)
                        } else {
                            console.error(xmlHttp.statusText)
                        }
                    }
                }

                xmlHttp.onerror = (e) => {
                    console.error(xmlHttp.statusText)
                }

                xmlHttp.send(null)

            }, 1000);

            return () => clearTimeout(timer)
        }

    }, [currentUser.token])
    */

    return (
        <div className="page-container" id="comments">
                <Post
                    disable={true}
                    token={currentUser.token}
                    content={location.state.content}
                    img={location.state.img}
                    userId={location.state.userId}
                    id={postId}
                    username={location.state.username}
                    postAt={location.state.postAt}
                    likes={location.state.likes}
                    comments={location.state.comments}
                    liked={location.state.liked}/>
                <div
                    className="post-container"
                    style={{
                        borderTop: 'none', borderBottom: '1px solid black'
                    }}>
                    <NewComment username={currentUser.username} parentCommentId={uuidNil}/>
                </div>

            <div style={{
                    height: '3vmin'
                }}></div>
                <div className="comments">
                    <Comment marginLeft='0em'/>
                    <Comment marginLeft='5em' />
                    <Comment marginLeft='0em' />
                </div>
            
            <div style={{height: '5vmax'}}/>
        </div>
    )
}

export default PostWithComments;
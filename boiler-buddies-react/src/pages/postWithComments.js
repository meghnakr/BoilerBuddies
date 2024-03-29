import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import Post from "../components/Post";
import useUser from "../hooks/useUser";
import NewComment from "../components/NewComment";
import Comment from "../components/Comment";
import { uuidNil, endpoint } from '../global';
import { useNavigate } from 'react-router-dom';

const PostWithComments = () => {
    const currentUser = useUser()
    const {postId} = useParams()
    const location = useLocation()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [token, setToken] = useState()
    const navigate = useNavigate();
    
    useEffect(() => {
        if(currentUser.token !== null) {
            setToken(currentUser.token)
            var params = new URLSearchParams()
            let timer = setTimeout(() => {
                params.append("token", currentUser.token)
                params.append("postId", postId)
                var getCommentRequestURL = endpoint + "getPostComments/?" + params
                var getPostRequestURL = endpoint + "getPost/?" + params
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", getCommentRequestURL, true); // false for synchronous request
                xmlHttp.onload = (e) => { //handle async request
                    if(xmlHttp.readyState === 4) {
                        if(xmlHttp.status === 200) {
                            var response = JSON.parse(xmlHttp.responseText);
                            console.log(response)
                            var formattedComments = formatResults(response);
                        } else {
                            console.error(xmlHttp.statusText)
                        }
                    }
                }

                xmlHttp.onerror = (e) => {
                    console.error(xmlHttp.statusText)
                }

                xmlHttp.send(null)

                /* get post */
                var xmlHttp2 = new XMLHttpRequest();
                xmlHttp2.open("GET", getPostRequestURL, true); // false for synchronous request
                xmlHttp2.onload = (e) => { //handle async request
                    if(xmlHttp.readyState === 4) {
                        if(xmlHttp.status === 200) {
                            var response = JSON.parse(xmlHttp2.responseText);
                            var post = {userId:response.userId, username:response.username, lastVisitAt:response.lastVisitedAt, content:response.content,
                            image:response.bigImage, likes:response.likes,comments:response.comments, liked:response.isLiked, postAt:response.postedAt}
                            setPost(post)
                        } else {
                            console.error(xmlHttp.statusText)
                        }
                    }
                }

                xmlHttp2.onerror = (e) => {
                    console.error(xmlHttp.statusText)
                }

                xmlHttp2.send(null)

            }, 1000);

            return () => clearTimeout(timer)
        }

    }, [currentUser.token])

    function formatResults(result) {
        var jsonResults = result;
        var formattedResults = [];
        var keys = []
        Object.keys(jsonResults).forEach(function (key) {
            var curr = jsonResults[key]
            var id = curr["commentId"]
            var parentCommentId = curr["parentCommentId"]
            var comment = {id: id, userId: curr["userId"], username: curr["username"], lastVisitAt: curr["lastVisitedAt"], content: curr["content"],
                        parentUserId: curr["parentUserId"], parentUsername: curr["parentUsername"], parentCommentId: parentCommentId,
                        likes: curr["likes"], liked: curr["isLiked"], postAt: curr["postedAt"], img: curr["big_image"]
                        }
            formattedResults.push({
                value: comment,
                children: []
            })
            keys.push(id)
            
            //append current comment to its parent
            if( keys.includes(parentCommentId)) {
                var index = keys.indexOf(parentCommentId)
                formattedResults[index].children.push(id)
            }
        })
        
        formattedResults.forEach(element => {
            if(element !== undefined) {
                commentThread(formattedResults, keys, element.value.id, -11 ) 
            }})
          
        return formattedResults;
      }


    function commentThread(arr, keys, id, leftMargin) {
        if(arr.length === 0) { return; }
        leftMargin+= 5
        var left = leftMargin + 'em'
        var index = keys.indexOf(id)
        var element = arr[index]
        var comment = element.value
        var children = element.children
        var newComment = <Comment currentUser={currentUser.username} marginLeft={left} token={currentUser.token} id={comment.id} username={comment.username} content={comment.content} 
                postAt={comment.postAt} postId={postId} likes={comment.likes} liked={comment.liked} img={comment.img}/>
        setComments(comments => [...comments, newComment])
        delete arr[index]
        children.forEach(childId => commentThread(arr, keys, childId, leftMargin))
        /*
        arr.map(
            element => {
                var comment = element.value
                var children = element.children
                var newComment = <Comment marginLeft={left} token={currentUser.token} id={comment.id} username={comment.username} content={comment.content} 
                postAt={comment.postAt} postId={postId} likes={comment.likes} liked={comment.liked}/>
                delete arr[keys.indexOf[comment.id]]
                setComments(comments => [...comments, newComment])
                children.forEach(childComment => commentThread(arr, keys, leftMargin))
                
            })*/
    }

    return (
        <div className="page-container" id="comments">
                <Post
                    currentUser={currentUser.username}
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
                    liked={location.state.liked}
                    navigate={navigate}
                    forumId={location.state.forumId}
                    forumName={location.state.forumName}/>
                <div
                    className="post-container"
                    style={{
                        borderTop: 'none', borderBottom: '1px solid black'
                    }}>
                    {token && <NewComment token={token} username={currentUser.username} parentCommentId={""} postId={postId}/>}
                </div>

            <div style={{
                    height: '3vmin'
                }}></div>
                <div className="comments">
                    <p>{comments}</p>
                    {/*comments.map(element => {
                        var comment = element.value
                        var left = 0;
                        return <>
                            <Comment marginLeft='0em' token={currentUser.token} id={comment.id} username={comment.username} content={comment.content} 
                                postAt={comment.postAt} postId={postId} likes={comment.likes} liked={comment.liked}/>
                            {element.children.forEach(commentId => {
                                left = getMarginLeft(left)
                                var index = keys.indexOf(commentId)
                                var childComment = comments[index]
                                return <Comment marginLeft={left + 'em'} token={currentUser.token} id={childComment.id} username={childComment.username} content={childComment.content} 
                                postAt={childComment.postAt} postId={postId} likes={childComment.likes} liked={childComment.liked}/>
                            })}
                        </>
                    })*/}
                </div>
            
            <div style={{height: '5vmax'}}/>
        </div>
    )
}

export default PostWithComments;
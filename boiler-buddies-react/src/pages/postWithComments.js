import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import Post from "../components/Post";
import useUser from "../hooks/useUser";
import NewComment from "../components/NewComment";
import Comment from "../components/Comment";
import { uuidNil, endpoint } from '../global';

const PostWithComments = () => {
    const currentUser = useUser()
    const {postId} = useParams()
    const location = useLocation();
    const [comments, setComments] = useState([])
    
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
                            var formattedComments = formatResults(response);
                            console.log(formattedComments)
                            setComments(formattedComments)
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

    function formatResults(result) {
        var jsonResults = result;
        var formattedResults = [];
        var i = 0;
        Object.keys(jsonResults).forEach(function (key) {
            var curr = jsonResults[key]
            var comment = {id: curr["commentId"], userId: curr["userId"], username: curr["username"], lastVisitAt: curr["lastVisitAt"], content: curr["content"],
                        parentUserId: curr["parentUserId"], parentUsername: curr["parentUsername"], likes: curr["likes"], liked: curr["isLiked"], postAt: curr["postedAt"]}
            formattedResults.push(comment)
            i++;
          })
          
        return formattedResults;
      }

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
                    <NewComment token={currentUser.token} username={currentUser.username} parentCommentId={uuidNil} postId={postId}/>
                </div>

            <div style={{
                    height: '3vmin'
                }}></div>
                <div className="comments">
                    {comments.map(element => {
                        return <Comment marginLeft='0em' id={element.id} username={element.username} content={element.content} 
                        postAt={element.postAt}/>
                    })}
                </div>
            
            <div style={{height: '5vmax'}}/>
        </div>
    )
}

export default PostWithComments;
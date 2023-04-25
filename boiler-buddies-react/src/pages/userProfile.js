import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import FriendProfile from '../components/FriendProfile';
import {endpoint} from '../global';
import useUser from '../hooks/useUser';
import Post from '../components/Post';
import Tabs from '../components/Tabs';
import Comment from '../components/Comment';
import ProfileComment from '../components/ProfileComment';

const UserProfile = () => {
    const currentUser = useUser();
    const {userId} = useParams()
    const [username, setUsername] = useState();
    const [bio, setBio] = useState();
    const [displayName, setDisplayName] = useState();
    const [img, setImg] = useState();
    const [interests, setInterests] = useState()
    const [posts, setUserPosts] = useState([]);
    const [comments, setUserComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        /* info about user */
        var params = new URLSearchParams()
        var xmlHttp = new XMLHttpRequest();
        params.append("user_id", userId)

        var getUserByIdRequest = endpoint + "getUserById/?" + params
        console.log(getUserByIdRequest)

        xmlHttp.open("GET", getUserByIdRequest, false); // false for synchronous request
        xmlHttp.send(null);
        var response = JSON.parse(xmlHttp.responseText);
        if (response.interests === '&&') {
            response.interests = '';
        }
        setUsername(response.username)
        setBio(response.intro)
        setImg(response.big_image)
        setInterests(response.interests.replaceAll('&&', ', '))
        setDisplayName(response.display_name)

        /* get all their posts */
        params.append("token", currentUser.token)
        var getPostsRequest = endpoint + "getPosts/?" + params
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", getPostsRequest, false); // false for synchronous request
        xmlHttp.onload = (e) => { //handle async request
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        var response_2 = JSON.parse(xmlHttp.responseText);
                        var allPosts = [];
                        response_2.map(element => {
                            allPosts.push({
                                id: element.postId,
                                userId: response.userId,
                                content: element.content,
                                likes: element.likes,
                                comments: element.comments,
                                liked: element.isLiked,
                                postAt: element.postedAt,
                                image: element.image,
                                forumId: element.forumId,
                                forumName: element.forumName
                            })
                        });
                        setUserPosts(allPosts)
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

        var getCommentsRequest = endpoint + "getComments/?" + params
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", getCommentsRequest, false); // false for synchronous request
        xmlHttp.onload = (e) => { //handle async request
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    try {
                        var response_3 = JSON.parse(xmlHttp.responseText);
                        var allComments = [];
                        response_3.map(element => {
                            allComments.push({
                                id: element.commentId,
                                userId: response.userId,
                                postId: element.postId,
                                content: element.content,
                                likes: element.likes,
                                liked: element.isLiked,
                                commentAt: element.commentedAt
                            })
                        });
                        setUserComments(allComments)
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
        
    }, [])

    function timeDifference(current, previous) {
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

    return (
        <div className='page-container'>
            {
                displayName && <FriendProfile
                        currentUser={currentUser.username}
                        username={username}
                        displayName={displayName}
                        interestTags={interests}
                        img={img}
                        userId={userId}
                        navigate={navigate}/>
            }
            <Tabs>
                <div label="Posts" className='all-post'>
                    {
                        posts.map(post => {
                            return <Post
                                token={currentUser.token}
                                disable={false}
                                userId={post.userId}
                                navigate={navigate}
                                id={post.id}
                                content={post.content}
                                username={username}
                                postAt={post.postAt}
                                likes={post.likes}
                                comments={post.comments}
                                liked={post.liked}
                                img={post.image}
                                forumId={post.forumId}
                                forumName={post.forumName}/>
                        })
                    }</div>
                    <div label="Comments" className='all-post'>
                    {
                        comments.map(comment => {
                            return <ProfileComment
                                token={currentUser.token}
                                userId={comment.userId}
                                postId={comment.postId}
                                navigate={navigate}
                                id={comment.id}
                                content={comment.content}
                                username={username}
                                commentAt={comment.commentAt}/>
                        })
                    }
                    </div>
            </Tabs>

        </div>
    )
}

export default UserProfile;
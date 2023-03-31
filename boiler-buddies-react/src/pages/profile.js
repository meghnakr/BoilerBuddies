import React, {useState, useEffect} from 'react';
import Post from '../components/Post';
import useUser from "../hooks/useUser";
import {endpoint} from '../global';
import {useNavigate} from 'react-router-dom';

export default function Profile() {
    const currentUser = useUser();
    const [username, setUsername] = useState();
    const [bio, setBio] = useState();
    const [displayName, setDisplayName] = useState();
    const [img, setImg] = useState();
    const [interests, setInterests] = useState()
    const [posts, setUserPosts] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser.token !== null) {
            let timer = setTimeout(() => {
                var params = new URLSearchParams()
                params.append('username', currentUser.username)
                console.log(params)
                var getUserRequestURL = endpoint + "getUser/?" + params
                console.log(getUserRequestURL)
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", getUserRequestURL, false); // false for synchronous request
                xmlHttp.send(null);
                var response = JSON.parse(xmlHttp.responseText);
                console.log(response)
                if (response.interests === '&&') {
                    response.interests = '';
                }
                setUsername(response.username)
                setBio(response.intro)
                setImg(response.big_image)
                setInterests(response.interests.replaceAll('&&', ', '))
                setDisplayName(response.display_name)

                /* get all their posts */
                params.append("user_id", response.userId)
                params.append("token", currentUser.token)
                var getPostsRequest = endpoint + "getPosts/?" + params
                xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", getPostsRequest, true); // false for synchronous request
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

            })
            return() => clearTimeout(timer)
        }

    }, [currentUser.token]);

    return (
        <div className="page-container">
            <div className="profile-header">
                <div className='profile-picture'>
                    <div className='profile-photo-circle'>
                        <div className='upload-icon'>
                            <i
                                className='fa fa-user'
                                style={{
                                    fontSize: '9vmin'
                                }}></i>
                        </div>
                        {
                            (img !== "")
                                ? <img src={img} alt='img'/>
                                : <></>
                        }

                    </div>
                </div>
                <div className='profile-info'>
                    <h2>{displayName}</h2>
                    <p>Interests: {interests}</p>
                </div>
                <div className='profile-button'></div>

            </div>
            <div className='all-post'>
                {
                    posts.map(post => {
                        return <Post
                            token={currentUser.token}
                            disable={false}
                            userId={post.userId}
                            navigate={navigate}
                            id={post.id}
                            content={post.content}
                            username={currentUser.username}
                            postAt={post.postAt}
                            likes={post.likes}
                            comments={post.comments}
                            liked={post.liked}
                            img={post.image}
                            forumId={post.forumId}
                            forumName={post.forumName}/>
                    })
                }</div>
        </div>
    )
}
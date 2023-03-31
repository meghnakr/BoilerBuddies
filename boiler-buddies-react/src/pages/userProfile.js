import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import FriendProfile from '../components/FriendProfile';
import {endpoint} from '../global';
import useUser from '../hooks/useUser';
import Post from '../components/Post';

const UserProfile = () => {
    const currentUser = useUser();
    const {userId} = useParams()
    const [username, setUsername] = useState();
    const [bio, setBio] = useState();
    const [displayName, setDisplayName] = useState();
    const [img, setImg] = useState();
    const [interests, setInterests] = useState()
    const [posts, setUserPosts] = useState([]);
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
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", getPostsRequest, false); // false for synchronous request
        xmlHttp.send(null);
        var response_2 = JSON.parse(xmlHttp.responseText);
        var allPosts = [];
        response_2.map(element => {
            allPosts.push({
                id: element.postId,
                userId: userId,
                content: element.content,
                likes: element.likes,
                comments: element.comments,
                liked: element.isLiked,
                postAt: element.postedAt,
                image: element.image
            })
        });
        setUserPosts(allPosts)
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
                        userId={userId}/>
            }
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
                            username={username}
                            postAt={post.postAt}
                            likes={post.likes}
                            comments={post.comments}
                            liked={post.liked}
                            img={post.image}/>
                    })
                }</div>

        </div>
    )
}

export default UserProfile;
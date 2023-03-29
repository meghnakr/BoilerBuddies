import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FriendProfile from '../components/FriendProfile';
import { endpoint } from '../global';
import useUser from '../hooks/useUser';
import Post from '../components/Post';

const UserProfile = () => {
    const currentUser = useUser();
    const { userId } = useParams()
    const [userData, setUserData] = useState({username: '', displayName: '', interests: '', bio: ''});
    const [posts, setUserPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        /* info about user */
        var params = new URLSearchParams()
        params.append("user_id", userId)
        var getUserByIdRequest = endpoint + "getUserById/?" + params
        console.log(getUserByIdRequest)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", getUserByIdRequest, false); // false for synchronous request
        xmlHttp.send(null);
        var response = JSON.parse(xmlHttp.responseText);
        console.log(response)
        if(response.interests === '&&') {
            response.interests = '';
        }
        setUserData(
            {displayName: response.display_name, interests: response.interests.replaceAll('&&', ', '), bio: response.intro, image: response.big_image, username: response.username}
        )

        /* get all their posts */
        params.append("token", currentUser.token)
        var getPostsRequest = endpoint + "getPosts/?" + params
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", getPostsRequest, false); // false for synchronous request
        xmlHttp.send(null);
        var response_2 = JSON.parse(xmlHttp.responseText);
        var allPosts = [];
        response_2.map(element => {
            var ago = timeDifference(new Date(), new Date(element.postedAt))
            allPosts.push({id: element.postId, userId:{userId}, content: element.content, likes: element.likes, comments: element.comments, liked: element.isLiked, postAt: ago})
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
             return Math.round(elapsed/1000) + ' seconds ago';   
        }
    
        else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
    
        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
    
        else if (elapsed < msPerMonth) {
            var diff = Math.round(elapsed/msPerDay)
            if(diff === 1) {
                return '1 day ago';
            }
            return diff + ' days ago';   
        }

        else {
            return previous.toDateString();   
        }
    }

    return (
        <div className='page-container'>
            <FriendProfile username={userData.username} displayName={userData.displayName} interestTags={userData.interestTags} />
            <div className='all-post'> 
            {posts.map(post => {
                return <Post disable={false} userId={post.userId} navigate={navigate}
                id={post.id} content={post.content} username={userData.username} postAt={post.postAt} likes={post.likes} comments={post.comments} liked={post.liked} />
            })}</div>
           
        </div>
    )
}

export default UserProfile;
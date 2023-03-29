import React, { useEffect } from 'react';
import NewPost from '../components/NewPost';
import useUser from '../hooks/useUser';
import { useState } from 'react';
import Post from '../components/Post';
import { endpoint } from '../global';
import { useNavigate } from 'react-router-dom';

const Feed = (props) => {
    props.funcNav(true);
    const currentuser = useUser()
    const [postId , setPostId] = useState([]);
    const [forums, setForums] = useState([]);
    const navigate = useNavigate();
    const [bottomPostedAt, setBottomPostedAt] = useState(new Date().toISOString().replace('T', ' ').replace('Z', ''))
    const [bottomHotScore, setBottomHotScore] = useState(30000)

    useEffect(() => {
        var getForumsRequestURL = endpoint + "getForums/?"
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", getForumsRequestURL, false); // false for synchronous request
        xmlHttp.send(null);
        var response = JSON.parse(xmlHttp.responseText);
        var formatForum = []
        response.map(element => {
            formatForum.push({value: element.id, label: element.name})
        });
        setForums(formatForum)
    }, [])



    useEffect(() => {
        var params = new URLSearchParams();
        console.log(bottomPostedAt)
        params.append("token", currentuser.token)
        params.append("sort", 1)
        params.append("bottomPostedAt", bottomPostedAt)
        params.append("bottomHotScore", bottomHotScore)
        var getFeedRequestURL = endpoint + "getFeed/?" + params
        console.log(getFeedRequestURL)
        var xmlHttp = new XMLHttpRequest();
        /*
        xmlHttp.open("GET", getFeedRequestURL, false); // false for synchronous request
        xmlHttp.send(null);
        var response = JSON.parse(xmlHttp.responseText);
        var formatPosts = []
        response.map(element => {
            formatPosts.push({content: element.content, username})
        });
        console.log(formatForum)
        setForums(formatForum)*/
    }, [postId])



    function getPostId (newPost) { //this function is called every time the "Post" button is clicked
        setPostId(postId => [...postId, newPost]) //add new post to array
    }

    

    const dummyPostId = [
        {id: "1", content: "Content of test post 1", userId:'e6a00298-71bb-4891-90ad-6a0f18087d78', username:"samaraboilerbuddies ",  postAt:"March 26, 2023", likes:"20", comments:"2", liked:true, img:null},
        {id: "2", content: "Content of test post 2", userId:'e6a00298-71bb-4891-90ad-6a0f18087d78', username:"Blahblah",  postAt:"March 22, 2023", likes:"10", comments:"5", liked:false, img:null},
        {id: "3" , content: "Content of test post 3", userId:'e6a00298-71bb-4891-90ad-6a0f18087d78', username:"Blahblah",  postAt:"March 22, 2023", likes:"8", comments:"15", liked:false, img:null},
    ]
    return ( 
        <div className='page-container'>
            <NewPost tokenId={currentuser.token} handleCallback={getPostId} forums={forums}/>
            <div className='all-post'>
                {dummyPostId.map(post => {
                    return <Post navigate={navigate} token={currentuser.token} disable={false} userId={post.userId}
                    id={post.id} content={post.content} username={post.username} postAt={post.postAt} likes={post.likes} comments={post.comments} liked={post.liked}/>
                })}
                
            </div>
        </div>
    )
};

export default Feed;
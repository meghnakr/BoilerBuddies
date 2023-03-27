import React, { useEffect } from 'react';
import NewPost from '../components/NewPost';
import useUser from '../hooks/useUser';
import { useState } from 'react';
import Post from '../components/Post';
import { endpoint } from '../global';

const Feed = (props) => {
    props.funcNav(true);
    const currentuser = useUser()
    const [postId , setPostId] = useState([]);
    const [forums, setForums] = useState([]);

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
        console.log(formatForum)
        setForums(formatForum)
    }, [])

    function getPostId (newPost) { //this function is called every time the "Post" button is clicked
        setPostId(postId => [...postId, newPost]) //add new post to array
    }

    

    const dummyPostId = [
        {content: "Content of test post 1", username:"JaneDoe",  postAt:"March 26, 2023", likes:"20", comments:"2", liked:true, img:null},
        {content: "Content of test post 2", username:"Blahblah",  postAt:"March 22, 2023", likes:"10", comments:"5", liked:false, img:null},
        {content: "Content of test post 3", username:"Blahblah",  postAt:"March 22, 2023", likes:"8", comments:"15", liked:false, img:null},
    ]
    return ( 
        <div className='page-container'>
            <NewPost tokenId={currentuser.token} handleCallback={getPostId} forums={forums}/>
            <div className='all-post'>
                {dummyPostId.map(post => {
                    return <Post content={post.content} username={post.username} postAt={post.postAt} likes={post.likes} comments={post.comments} liked={post.liked}/>
                })}
                
            </div>
        </div>
    )
};

export default Feed;
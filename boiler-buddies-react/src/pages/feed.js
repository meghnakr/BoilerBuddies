import React from 'react';
import NewPost from '../components/NewPost';
import useUser from '../hooks/useUser';
import { useState } from 'react';
import Post from '../components/Post';

const Feed = (props) => {
    props.funcNav(true);
    const currentuser = useUser()
    const [postId , setPostId] = useState([]);

    function getPostId (newPost) {
        setPostId(postId => [...postId, newPost])
    }


    const dummyPostId = [
        {content: "Content of test post 1", username:"JaneDoe",  postAt:"March 26, 2023", likes:"20", comments:"2", liked:true, img:null},
        {content: "Content of test post 2", username:"Blahblah",  postAt:"March 22, 2023", likes:"10", comments:"5", liked:false, img:null},
    ]
    return ( 
        <div className='page-container'>
            <NewPost tokenId={currentuser.token} handleCallback={getPostId}/>
            <div className='all-post'>
                {dummyPostId.map(post => {
                    return <Post content={post.content} username={post.username} postAt={post.postAt} likes={post.likes} comments={post.comments} liked={post.liked}/>
                })}
                
            </div>
        </div>
    )
};

export default Feed;
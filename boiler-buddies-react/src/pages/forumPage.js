import React from 'react';
import NewPost from '../components/NewPost';
import useUser from '../hooks/useUser';
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import { useParams } from "react-router-dom";
import { endpoint } from "../global";
import axios from '../utils/Axios';
import { useNavigate } from 'react-router-dom';

const ForumPage = (props) => {
    props.funcNav(true);
    const { forumId } = useParams();
    const currentuser = useUser()
    const [forumPostList, setForumPostList] = useState([]);
    const [forumData, setForumData] = useState([]);
    const [postId , setPostId] = useState([]);

    function getPostId (newPost) {
        setPostId(postId => [...postId, newPost])
    }

    console.log("FORUM ID:" + forumId)


    // const dummyPostId = [
    //     {content: "Content of test post 1", username:"JaneDoe",  postAt:"March 26, 2023", likes:"20", comments:"2", liked:true, img:null},
    //     {content: "Content of test post 2", username:"Blahblah",  postAt:"March 22, 2023", likes:"10", comments:"5", liked:false, img:null},
    // ]

    var params = new URLSearchParams();
    console.log("Token: " + currentuser.token)
    params.append('token', currentuser.token)
    params.append('forumId', forumId)
    var forumPostsRequestURL = endpoint + "getForumPosts/?" + params

    var postJson = {}
    var postList = []

    console.log("Making request to get forum posts")
    console.log(forumPostsRequestURL)
        
    useEffect(() => {
    axios.get(forumPostsRequestURL).then( (result)=>{ 

    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open( "GET", forumPostsRequestURL, false ); // false for synchronous request
    // xmlHttp.send(null);

    // postJson = xmlHttp.responseText
    
        postJson = result.data;
        console.log(postJson);

        var numKeys = 0
        for (let key in postJson) {
            numKeys = numKeys + 1
        }

        postList = Array(numKeys).fill("")

        let i = 0;
        for (let key in postJson) {
            postList[i] = postJson[key]
            i++;
        }

        //console.log(dummyPostId)

        console.log("POST LIST: ")

        console.log(postList)

        setForumPostList(postList)

    } );
    }, [currentuser.token]);

    var forumParams = new URLSearchParams();
    forumParams.append("forum_id", forumId)

    var forumDataRequestURL = endpoint + "getForumData/?" + forumParams

    console.log("Making request to get forum data")
    console.log(forumDataRequestURL)
    useEffect(() => {
        axios.get(forumDataRequestURL).then( (result)=>{ 

            setForumData(result.data);
            console.log("Forum data:");
            console.log(result.data);
    
        } );
    }, []);


    // var formatForum = []
    // var response = JSON.parse(JSON.stringify(forumData));
    // response.map(element => {
    //     formatForum.push({value: forumId, label: element.name})
    // });
    // console.log("Format Forum: " + formatForum)

    var formatForum = [{"value":forumId, "label":forumData.name}]


        return ( 
            <div className='page-container'>
                {<NewPost tokenId={currentuser.token} handleCallback={getPostId} selectedForum={forumId} forums={formatForum}/>}
                <h2>{forumData.name}</h2>
                <h5>{forumData.description}</h5>
                <div className='all-post'>
                    {forumPostList.map(post => {
                        console.log(post)
                        console.log(post.content)
                        return <Post content={post.content} username={post.username} postAt={post.postedAt} likes={post.likes} comments={post.comments} liked={post.isLiked} img={post.bigImage}/>
                    })}
                    
                </div>
            </div>
        )
    
};

export default ForumPage;
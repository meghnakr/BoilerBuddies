import React, { useEffect } from 'react';
import NewPost from '../components/NewPost';
import useUser from '../hooks/useUser';
import { useState } from 'react';
import Post from '../components/Post';
import { endpoint } from '../global';
import { json, useNavigate } from 'react-router-dom';

const Feed = (props) => {
    props.funcNav(true);
    const currentuser = useUser()
    const [postId , setPostId] = useState([]);
    const [posts, setPosts] = useState([]);
    const [forums, setForums] = useState([]);
    const [token, setToken] = useState();
    const navigate = useNavigate();
    const [bottomPostedAt, setBottomPostedAt] = useState(new Date().toISOString().replace('T', ' ').replace('Z', ''))
    const [bottomHotScore, setBottomHotScore] = useState(30000)

    useEffect(() => {
        
        var getForumsRequestURL = endpoint + "getForums/?"
        console.log(getForumsRequestURL)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", getForumsRequestURL, true); // false for synchronous request
        xmlHttp.onload = (e) => { //handle async request
            if(xmlHttp.readyState === 4) {
                if(xmlHttp.status === 200) {
                    try {
                        var response = JSON.parse(xmlHttp.responseText);
                        var formatForum = []
                        response.map(element => {
                            formatForum.push({value: element.id, label: element.name})
                        });
                        setForums(formatForum)
                    }
                    catch (e) {
                        if (e instanceof SyntaxError) {
                            console.log(xmlHttp.responseText);
                            window.location.reload()
                        }
                    }
                } else { 
                    console.error(xmlHttp.statusText)
                }
            }
        }
        xmlHttp.send(null);
        
    }, [])



    useEffect(() => {
        var params = new URLSearchParams();
        if(currentuser.token !== null) {
            setToken(currentuser.token)
            let timer = setTimeout(() => {
                params.append("token", currentuser.token)
                params.append("sort", 1)
                params.append("bottomPostedAt", bottomPostedAt)
                params.append("bottomHotScore", bottomHotScore)
                var getFeedRequestURL = endpoint + "getFeed/?" + params
                console.log(getFeedRequestURL)
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", getFeedRequestURL, true); // false for synchronous request
                xmlHttp.onload = (e) => { //handle async request
                    if(xmlHttp.readyState === 4) {
                        if(xmlHttp.status === 200) {
                            try {
                                var response = JSON.parse(xmlHttp.responseText);
                                console.log(response)
                                var formatPosts = formatResults(response);
                                setPosts(formatPosts);
                                console.log(formatPosts);
                            }
                            catch (e) {
                                if (e instanceof SyntaxError) {
                                    console.log(xmlHttp.responseText);
                                    window.location.reload()
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

                xmlHttp.send(null)
                
            }, 1000);
            return () => clearTimeout(timer)
        }
        
    }, [postId, currentuser.token])

    function formatResults(result) {
        var jsonResults = result;
        var formattedResults = [];
        var highest = (Object.keys(jsonResults).length-1).toString();
        Object.keys(jsonResults).forEach(function (key) {
          if(key === highest) {
            setBottomHotScore(jsonResults[key]["bottomHotScore"])
            setBottomPostedAt(jsonResults[key]["bottomPostedAt"].replace('T', ' ').replace('Z', ''))
          } else {
            var curr = jsonResults[key]
            var post = {id: curr["postId"], userId: curr["userId"], username: curr["username"], lastVisitAt: curr["lastVisitAt"], content: curr["content"],
                        image: curr["image"], forumId: curr["forumId"], forumName: curr["forumName"], likes: curr["likes"], comments: curr["comments"], liked: curr["isLiked"], postAt: curr["postedAt"]}
            formattedResults.push(post)
          }
        });
        return formattedResults;
      }



    function getPostId (newPost) { //this function is called every time the "Post" button is clicked
        setPostId(postId => [...postId, newPost]) //add new post to array
    }


    return ( 
        <div className='page-container'>
            {token && <NewPost tokenId={token} handleCallback={getPostId} forums={forums}/>}
            <div className='all-post'>
                {posts.map(post => {
                    return <Post navigate={navigate} currentUser={currentuser.username} token={currentuser.token} disable={false} userId={post.userId} img={post.image} forumId={post.forumId} forumName={post.forumName}
                    id={post.id} content={post.content} username={post.username} postAt={post.postAt} likes={post.likes} comments={post.comments} liked={post.liked}/>
                })}
                
            </div>
        </div>
    )
};

export default Feed;
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";

const PostWithComments = () => {
    const { postId }= useParams()

    useEffect(() => {
        
    }, [])
    return (
        <div className="page-container">
            <h1>Post - {postId}</h1>
            <Post disable={true} />
        </div>
    )
}

export default PostWithComments;
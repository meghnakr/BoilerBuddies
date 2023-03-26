import React from 'react';
import Post from '../components/Post';
import useUser from '../hooks/useUser';

const Feed = (props) => {
    const currentuser = useUser()

    props.funcNav(true);
    return ( 
        <div className='page-container'>
            <Post tokenId={currentuser.token}/>
            
        </div>
    )
};

export default Feed;
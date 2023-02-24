import React from 'react';

const Feed = (props) => {
    props.funcNav(true);
    return ( 
        <div className='page-container'>
            <p>This is Feed</p>
        </div>
    )
};

export default Feed;
import React, { useEffect } from 'react';
import NewForum from '../components/NewForum.js';
import useUser from "../hooks/useUser";
import { useLocation, useNavigate } from 'react-router-dom';

export default function CreateForum(props) {
    props.funcNav(false);
    
    //const currentUser = useUser();
    const location = useLocation();
    const navigate = useNavigate();
    

    return (
        <div className='page-container' >
            <h3
                    style={{
                        fontWeight: 'bolder',
                        textAlign: 'left'
                    }}>Create a new forum</h3>
            <p style={{ fontWeight: 'lighter'}}>Fill out the information below!</p>
            <NewForum name=''
            description=''
            image=''
            navigation={navigate}/>
        </div>
    )
}
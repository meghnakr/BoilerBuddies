import React, { useEffect } from 'react';
import EditGroupChat from '../components/EditGroupChat.js';
import useUser from "../hooks/useUser";
import { useLocation, useNavigate } from 'react-router-dom';

export default function CreateGroup(props) {
    //props.funcNav(false);
    
    //const currentUser = useUser();
    const location = useLocation();
    const navigate = useNavigate();
    

    return (
        <div className='page-container' >
            <h3
                    style={{
                        fontWeight: 'bolder',
                        textAlign: 'left'
                    }}>Create a new group chat</h3>
            <p style={{ fontWeight: 'lighter'}}>Fill out the information below!</p>
            <EditGroupChat name=''
            description=''
            image=''
            isNew={true}
            navigation={navigate}/>
        </div>
    )
}
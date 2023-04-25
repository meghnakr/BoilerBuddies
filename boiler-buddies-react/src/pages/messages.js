import React, {useState} from 'react';
import { getusertoken } from '../utils/auth';
import { endpoint } from '../global';
import axios from "../utils/Axios";

const Messages = () => {

    getusertoken().then((token) => {

        var params = new URLSearchParams();
        params.append('token', token);
        var getChatsURL = endpoint + "getChats/?" + params;

        axios.get(getChatsURL).then((result)=>{
            console.log(result.data);
        });
    });

    return (
        <div className = "container">
            <p>Messages Page!</p>
        </div>
    )
};

export default Messages;
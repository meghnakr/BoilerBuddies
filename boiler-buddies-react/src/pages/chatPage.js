import React, { useRef, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {getusertoken} from "../utils/auth";
import { endpoint, socket } from '../global';
import axios from "../utils/Axios";

function formatMessages(response, currentUserId) {
    console.log(response)
    var formattedMessages = Array(50).fill("");
    var i = 0;
    var prevDate = "";
    Object.keys(response).forEach(function (key) {

        var fullTimestamp = response[key]["sent_at"]

        var dateOfMessage = fullTimestamp.substring(0, fullTimestamp.indexOf("T"))
        var timeOfMessage = fullTimestamp.substring(fullTimestamp.indexOf("T") + 1, fullTimestamp.indexOf("T") + 6)

        if (dateOfMessage != prevDate) {
            // new date, so indicate that in the chat
            formattedMessages[i] = (
                <div className="message-date">{dateOfMessage}</div>
            )
            i++;
            prevDate = dateOfMessage
        }

        if (response[key]["user_id"] == currentUserId) {
            // I sent this message to otherId (another user or a group chat)
            formattedMessages[i] = (
                <div className="my-message">
                    <p className="message-content">{response[key]["content"]}</p>
                    <div className="message-timestamp-right">{timeOfMessage}</div>
                </div>
            );
        }
        else {
            // Someone else sent this message 
            formattedMessages[i] = (
                <div className="other-message">
                    <p className="message-content">{response[key]["content"]}</p>
                    <div className="message-timestamp-right">{timeOfMessage}</div>
                </div>
            );
        }
        console.log(response[key]["content"])
        i++;
      });
    // if (formattedMessages[0] == "") {
    //     formattedMessages[0] = (
    //         <div>No messages yet! Start a conversation!</div>
    //     )
    // }
    return formattedMessages;
}

const ChatPage = (props) => {
    
    const { otherId } = useParams();
    const listRef = useRef(null);
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState("");
    const [chatName, setChatName] = useState('');

    const [token, setToken] = useState('');

    var loadMessageSignal = 1; // this changes value when the page needs to be reloaded

    useEffect(() => {
        if (listRef.current) {
          listRef.current.scrollTop = listRef.current.scrollHeight;
        }
      }, [messages]);

    const handleSubmit = (event) => {
        console.log("In handlesubmit")
        event.preventDefault();
        var params = new URLSearchParams();
        (async () => {
            setToken(await getusertoken());
            params.append('token', token);
            // use the params variable here
            console.log("TOKEN: " + token)
            params.append('otherId', otherId)
            params.append('content', messageText)
            var sendMessageURL = endpoint + "addMessage/?" + params
            console.log(sendMessageURL)
            axios.get(sendMessageURL).then( (result)=>{ 
                console.log("Making request to send a message")
                console.log(result.data)
                setMessageText("")
                loadMessages();
            } )
          })();
    }

    function loadMessages() {
        console.log("Loading messages...");
        (async () => {
            try {
                setToken(await getusertoken());
            }
            catch(e) {
                if (e instanceof TypeError) {
                    loadMessageSignal = loadMessageSignal * -1;
                }
            }
            

            var userIdParams = new URLSearchParams();
            userIdParams.append('token', token);
            var getCurrentUserIdURL = endpoint + "justGetMyId/?" + userIdParams;
            axios.get(getCurrentUserIdURL).then((idResult)=>{
                console.log("Current user id:", idResult.data.myId);

                // get messages
                var messageParams = new URLSearchParams();
                messageParams.append('token', token);
                messageParams.append('otherId', otherId);
                var getMessagesURL = endpoint + "getMessages/?" + messageParams
                axios.get(getMessagesURL).then( (result)=>{ 
                    console.log("Making request to get messages");
                    setMessages(formatMessages(result.data, idResult.data.myId));
            } )
            })
        })();
    }

    (async () => {
        try {
            setToken(await getusertoken());
        }
        catch(e) {
            if (e instanceof TypeError) {
                loadMessageSignal = loadMessageSignal * -1;
            }
        }

        var socketParams = new URLSearchParams();
        socketParams.append('token', token);

        const socket = new WebSocket("ws://54.200.193.22:3000/channelListener/?" + socketParams);

        socket.addEventListener('open', (event) => {
            console.log('WebSocket connection established!');
        });

        socket.addEventListener('message', (event) => {
            console.log('Received message: ', event.data);
            // Do something with the received message
            if (event.data == "sync") {
                var syncUserURL = endpoint + "syncUser/?" + socketParams;
                console.log(syncUserURL)
                axios.get(syncUserURL).then( (result)=>{ 
                    console.log("Sync User returned:", result.data)
                    if (result.data["hasInteraction"] == true) {
                        loadMessages();
                        //loadMessageSignal = loadMessageSignal * -1;
                    }
                } )
            }
        });

    })();

    // get chat title
    useEffect(() =>  {
        var titleParams = new URLSearchParams();
        titleParams.append('user_id', otherId);
        var getNameURL = endpoint + "getUserById/?" + titleParams
        var name = ""
        console.log(getNameURL);
        axios.get(getNameURL).then( (result)=>{ 
            console.log("Making request to get name of user we are chatting with")
            name = result.data.display_name;
            console.log(name)
            setChatName(name)
            loadMessages();
        } );
    }, [loadMessageSignal, token])



    return (
        <div className = "container">
            <p className="chat-title">{chatName}</p>
            <div className="message-container" ref={listRef}>
                <p>{messages}</p>
            </div>
            <form className="general-form" onSubmit={handleSubmit}>
                <input className="message-text-box" type='text' id='messageText' value={messageText} 
                onChange={(event) => {setMessageText(event.target.value)}} placeholder='Type a message here'/>
                <button type='submit' className="send-button">Send</button>
            </form>
        </div>
    )
}

export default ChatPage;
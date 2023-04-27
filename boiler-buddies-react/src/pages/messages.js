import React, {useState, useEffect} from 'react';
import { endpoint } from '../global';
import ChatEntry from '../components/ChatEntry';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router';

const Messages = () => {
    const currentUser = useUser();
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        var params = new URLSearchParams();
        if(currentUser.token !== null) {
            let timer = setTimeout(() => {
                params.append("token", currentUser.token)
                var getChatsRequestURL = endpoint + "getChats/?" + params
                console.log(getChatsRequestURL)
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", getChatsRequestURL, true); // false for synchronous request
                xmlHttp.onload = (e) => { //handle async request
                    if(xmlHttp.readyState === 4) {
                        if(xmlHttp.status === 200) {
                            try {
                                var response = JSON.parse(xmlHttp.responseText);
                                console.log(response)
                                var formatChats = formatResults(response);
                                console.log(formatChats)
                                setChats(formatChats);
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
        
    }, [currentUser.token])

    function formatResults(result) {
        var jsonResults = result;
        var formattedResults = [];
        Object.keys(jsonResults).forEach(function (key) {
            var curr = jsonResults[key]
            var chat = {name: curr["name"], chatId: curr["chat_id"], chatType: curr["chat_type"], lastActive: curr["last_active"], img: curr["big_image"]}
            formattedResults.push(chat)
        });
        return formattedResults;
      }

    return (
        <div className = "page-container" style={{textAlign:'left'}}>
            <h2 style={{textAlign:'left', fontWeight:'bold'}}>Chats</h2>
            {chats.map(chat => {
                return <ChatEntry navigate={navigate} name={chat.name} chatId={chat.chatId} chatType={chat.chatType} lastActive={chat.lastActive} img={chat.img} />
            })}
        </div>
    )
};

export default Messages;
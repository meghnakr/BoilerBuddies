import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getusertoken } from "../utils/auth";
import { endpoint, socket } from "../global";
import axios from "../utils/Axios";
import { display } from '@mui/system';
import logo from "../assets/logo_vector.png";
import { Navigate } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import useUser from "../hooks/useUser";

function formatMessages(response, currentUserId, directOrGroup) {
  console.log(response);
  var formattedMessages = Array(100).fill("");
  var i = 0;
  var prevDate = "";
  var idToName = {};
  Object.keys(response).forEach(function (key) {
    var fullTimestamp = response[key]["sent_at"];
    fullTimestamp = fullTimestamp.substring(0, fullTimestamp.indexOf("."));
    console.log(fullTimestamp);

    // // Get the user's timezone
    // var userTimezone = moment.tz.zone("America/New_York");

    // const format = "YYYY-MM-DDTHH:mm:ss"

    // // Create a moment object with the original date and time
    // const originalDateTime = moment(fullTimestamp, format);

    // // Convert to the user's timezone
    // const localDateTime = originalDateTime.tz(userTimezone);

    // Return the converted date and time as a string
    // fullTimestamp = localDateTime.format(format);

    // fullTimestamp = moment(fullTimestamp).tz("America/New_York").format();

    // console.log(fullTimestamp)

    var dateOfMessage = fullTimestamp.substring(0, fullTimestamp.indexOf("T"));
    var timeOfMessage = fullTimestamp.substring(
      fullTimestamp.indexOf("T") + 1,
      fullTimestamp.indexOf("T") + 6
    );

    if (dateOfMessage !== prevDate) {
      // new date, so indicate that in the chat
      formattedMessages[i] = (
        <div className="message-date">{dateOfMessage}</div>
      );
      i++;
      prevDate = dateOfMessage;
    }

    if (response[key]["user_id"] === currentUserId) {
      // I sent this message (to another user or a group chat)
      formattedMessages[i] = (
        <div className="my-message">
          <p className="message-content">{response[key]["content"]}</p>
          <div className="message-timestamp-right">{timeOfMessage}</div>
        </div>
      );
    } else {
      // Someone else sent this message
      var displayName = "";
      if (directOrGroup === "G" || directOrGroup === "g") {
        displayName = response[key]["display_name"];
      }
      formattedMessages[i] = (
        <div className="other-message">
          <div className="message-display-name">{displayName}</div>
          <p className="message-content">{response[key]["content"]}</p>
          <div className="message-timestamp-right">{timeOfMessage}</div>
        </div>
      );
    }
    console.log(response[key]["content"]);
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
  const navigate = useNavigate();
  const handleClick = (event) => {
    navigate(event.target.value, { replace: true });
  };
  const currentUser = useUser()
  const { chatId, directOrGroup } = useParams();
  const listRef = useRef(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState("");
  const [chatName, setChatName] = useState("");
  const [img, setImg] = useState("");
  const [openViewMembers, setOpenViewMembers] = useState(false)
  const [token, setToken] = useState("");

  var loadMessageSignal = 1;

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (event) => {
    console.log("In handlesubmit");
    event.preventDefault();
    var params = new URLSearchParams();
    (async () => {
      setToken(await getusertoken());
      if (token !== "") {
        params.append("token", token);
        // use the params variable here
        console.log("TOKEN: " + token);
        params.append("chatId", chatId);
        params.append("content", messageText);
        if (directOrGroup === "D" || directOrGroup === "d") {
          params.append("isGroup", "false");
        } else if (directOrGroup === "G" || directOrGroup === "g") {
          params.append("isGroup", "true");
        }
        var sendMessageURL = endpoint + "addMessage/?" + params;
        console.log(sendMessageURL);
        axios.get(sendMessageURL).then((result) => {
          console.log("Making request to send a message");
          console.log(result.data);
          setMessageText("");
          loadMessages();
        });
      }
    })();
  };

  function getAndSetToken() {
    (async () => {
      try {
        setToken(await getusertoken());
      } catch (e) {
        if (e instanceof TypeError) {
          loadMessageSignal = loadMessageSignal * -1;
        }
      }
    })();
  }

  function loadMessages() {
    console.log("Loading messages...");
    (async () => {
      try {
        setToken(await getusertoken());
      } catch (e) {
        if (e instanceof TypeError) {
          loadMessageSignal = loadMessageSignal * -1;
        }
      }

      if (token !== "") {
        // get title of chat
        var getNameURL = endpoint + "getChatName/?";
        var titleParams = new URLSearchParams();
        titleParams.append("token", token);
        titleParams.append("chatId", chatId);
        if (directOrGroup === "D" || directOrGroup === "d") {
          titleParams.append("isGroup", "false");
        } else if (directOrGroup === "G" || directOrGroup === "g") {
          titleParams.append("isGroup", "true");
        }
        getNameURL = getNameURL + titleParams;
        console.log(getNameURL);
        axios.get(getNameURL).then((nameResult) => {
          console.log("Name:", nameResult.data.name);
          setChatName(nameResult.data.name);
        });

        var userIdParams = new URLSearchParams();
        userIdParams.append("token", token);
        var getCurrentUserIdURL = endpoint + "justGetMyId/?" + userIdParams;
        axios.get(getCurrentUserIdURL).then((idResult) => {
          console.log("Current user id:", idResult.data.myId);

          // get messages
          var messageParams = new URLSearchParams();
          messageParams.append("token", token);
          messageParams.append("chatId", chatId);
          if (directOrGroup === "D" || directOrGroup === "d") {
            messageParams.append("isGroup", "false");
          } else if (directOrGroup === "G" || directOrGroup === "g") {
            messageParams.append("isGroup", "true");
          }
          var getMessagesURL = endpoint + "getMessages/?" + messageParams;
          axios.get(getMessagesURL).then((result) => {
            console.log("Making request to get messages");
            setMessages(
              formatMessages(result.data, idResult.data.myId, directOrGroup)
            );
          });
        });
      }
    })();
  }

  (async () => {
    try {
      setToken(await getusertoken());
    } catch (e) {
      if (e instanceof TypeError) {
        loadMessageSignal = loadMessageSignal * -1;
      }
    }

    if (token !== "") {
      var socketParams = new URLSearchParams();
      socketParams.append("token", token);

      const socket = new WebSocket(
        "ws://54.200.193.22:3000/channelListener/?" + socketParams
      );

        if (token !== "") {
            // get title of chat
            var getNameURL = endpoint + "getChatInfo/?"
            var titleParams = new URLSearchParams();
            titleParams.append('token', token);
            titleParams.append('chatId', chatId);
            if (directOrGroup === "D" || directOrGroup === "d") {
                titleParams.append('isGroup', "false");
            }
            else if (directOrGroup === "G" || directOrGroup === "g") {
                titleParams.append('isGroup', "true");
            }
            getNameURL = getNameURL + titleParams
            console.log(getNameURL)
            axios.get(getNameURL).then((nameResult)=>{
                console.log("Name:", nameResult.data.name);
                setChatName(nameResult.data.name);
                console.log("Image:", nameResult.data.big_image);
                setImg(nameResult.data.big_image);
            });
            

            var userIdParams = new URLSearchParams();
            userIdParams.append('token', token);
            var getCurrentUserIdURL = endpoint + "justGetMyId/?" + userIdParams;
            axios.get(getCurrentUserIdURL).then((idResult)=>{
                console.log("Current user id:", idResult.data.myId);

                // get messages
                var messageParams = new URLSearchParams();
                messageParams.append('token', token);
                messageParams.append('chatId', chatId);
                if (directOrGroup === "D" || directOrGroup === "d") {
                    messageParams.append('isGroup', "false");
                }
                else if (directOrGroup === "G" || directOrGroup === "g") {
                    messageParams.append('isGroup', "true");
                }
                var getMessagesURL = endpoint + "getMessages/?" + messageParams
                axios.get(getMessagesURL).then( (result)=>{ 
                    console.log("Making request to get messages");
                    setMessages(formatMessages(result.data, idResult.data.myId, directOrGroup));
            } )
            })

            socket.addEventListener("open", (event) => {
                console.log("WebSocket connection established!");
              });
        
              socket.addEventListener("message", (event) => {
                console.log("Received message: ", event.data);
                // Do something with the received message
                if (event.data === "sync") {
                  var syncUserURL = endpoint + "syncUser/?" + socketParams;
                  console.log(syncUserURL);
                  axios.get(syncUserURL).then((result) => {
                    console.log("Sync User returned:", result.data);
                    if (result.data.hasInteraction === true) {
                      loadMessages();
                      loadMessageSignal = loadMessageSignal * -1;
                    }
                  });
                }
              });
        }
        };
    })();

  console.log(messages);
  if (messages === "" || messages === []) {
    loadMessages();
  }

  // if (token == "") {
  //     loadMessageSignal = loadMessageSignal * -1
  // }

  // // get chat title
  // useEffect(() =>  {
  //     // var titleParams = new URLSearchParams();
  //     // var getNameURL = ""
  //     // if (directOrGroup == "D" || directOrGroup == "d") {
  //     //     titleParams.append('user_id', chatId);
  //     //     getNameURL = endpoint + "getUserById/?" + titleParams
  //     // }
  //     // var name = ""
  //     // console.log(getNameURL);
  //     // axios.get(getNameURL).then( (result)=>{
  //     //     console.log("Making request to get name of user we are chatting with")
  //     //     name = result.data.display_name;
  //     //     console.log(name)
  //     //     setChatName(name)
  //     //     loadMessages();
  //     // } );
  //     loadMessages();
  // }, [token])

  // function viewMembers() {
  //   navigate("/viewmembers");
  // }
/*
  function openViewMembersDialog() {
    if(directOrGroup === "G" || directOrGroup === "g") {
      var params = new URLSearchParams();
      params.append('groupId', chatId)
      var getGroupChatMembers = endpoint + "getGroupChatMembers/?" + params
      console.log(getGroupChatMembers)
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", getGroupChatMembers, true); // false for synchronous request
      xmlHttp.onload = (e) => { //handle async request
          if(xmlHttp.readyState === 4) {
              if(xmlHttp.status === 200) {
                  try {
                    var jsonResults = JSON.parse(xmlHttp.responseText)
                    var formattedResults = [];
                    Object.keys(jsonResults).forEach(function (key) {
                      var curr = jsonResults[key]
                      var user = (<ProfileHeader 
                        currentUser={currentUser.username}
                        displayName={curr["display_name"]}
                        userId = {curr["userId"]}
                        username = {curr["username"]}
                        img = {curr["big_image"]}
                      />)
                    formattedResults.push(user)
                    });
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
      xmlHttp.send(null);
    }
    
       
       
        
  }*/

  const leave = async () => {
    console.log(token)
    console.log(chatId)
    const {data:response} = await axios.get("/leaveGroupChat/", {
      params: {
        token: token,
        groupChatId: chatId,
      },
    });
    console.log(response)
    if (response.success == "false") {
      alert("To leave a group, you must promote at least one other member to admin!")
    } else {
      navigate(`/messages`)
    }
  };

  return (
    <div className="container">
        <div className='forum-picture'>
                <div className='profile-photo-circle'>
                <div className="upload-icon">
              <i
                className="fa fa-user"
                style={{
                  fontSize: "9vmin",
                }}
              ></i>
            </div>
                {
                    (img !== "")
                        ? <img src={img} alt={logo}/>
                        : <></>
                }
                </div>
                </div>
      <p> </p>

      <button
        className="default-btn"
        value={"/edit-group"}
        style={{
          fontWeight: "normal",
          textTransform: "capitalize",
          border: "1px solid #88BBF6",
          width: "150px",
          height: "30px",
          display: "block",
          margin: "0 auto",
        }}
        onClick={() => {
          const url = `/edit-group?chatId=${chatId}`;
          window.location.href = url;
        }}
      >
        Edit Chat
      </button>



      <p className="chat-title">{chatName}</p>
      <button
        className="default-btn"
        value={"/addpage"}
        style={{
          fontWeight: "normal",
          textTransform: "capitalize",
          border: "1px solid #88BBF6",
          width: "150px",
          height: "30px",
        }}
        onClick={() => {
          const url = `/addpage?chatId=${chatId}`;
          window.location.href = url;
        }}
      >
        Add Members
      </button>

      <button
        className="default-btn"
        value='/viewmembers'
        style={{
          fontWeight: "normal",
          textTransform: "capitalize",
          border: "1px solid #88BBF6",
          width: "150px",
          height: "30px",
        }}
        onClick={() => {
          const url = `/viewmembers?chatId=${chatId}&type=${directOrGroup}`;
          window.location.href = url;
        }}
      >
        View Members
      </button>
      <button
        className="default-btn"
        value='/leave'
        style={{
          fontWeight: "normal",
          textTransform: "capitalize",
          border: "1px solid #B53939",
          backgroundColor: "#B53939",
          width: "150px",
          height: "30px",
        }}
        onClick={leave}
      >
        Leave Chat
      </button>

      <div className="message-container" ref={listRef}>
        <p>{messages}</p>
      </div>
      <form className="general-form" onSubmit={handleSubmit}>
        <input
          className="message-text-box"
          type="text"
          id="messageText"
          value={messageText}
          onChange={(event) => {
            setMessageText(event.target.value);
          }}
          placeholder="Type a message here"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;

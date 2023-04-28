import React, { useEffect } from "react";
import EditGroupChat from "../components/EditGroupChat.js";
import useUser from "../hooks/useUser";
import { useLocation, useNavigate } from "react-router-dom";
import { endpoint } from "../global.js";
import axios from "../utils/Axios";
import { useState } from "react";
import { useParams } from "react-router";
import { useRef } from "react";
import { getusertoken } from "../utils/auth.js";

export default function EditGroup(props) {
  //props.funcNav(false);
  const currentUser = useUser();
  //const currentUser = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  //   let name = "";
  //   let description = "";
  //   let big_image = "";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [bigImage, setBigImage] = useState("");

  /* Make axios call to get chat info from chatId in URL */
  let chatId = new URLSearchParams(location.search).get("chatId");
  const [key, setKey] = useState(0);
  var random = 0;


  async function getChatFields() {
    const token = await getusertoken();
    const result = await axios.get("/getChatInfo/", {
      params: {
        token: token,
        chatId: chatId,
        isGroup: "true",
      },
    });

    setName(result.data.name);
    setDescription(result.data.description);
    setBigImage(result.data.big_image);
    setKey(key + 1);
  }

  useEffect(() => {
    async function fetchChatFields() {
      await getChatFields();
    }
    fetchChatFields();
  }, []);

   async function setUpdates() {

    const token = await getusertoken();
    // const result = await axios.get("/updateGroupChat/", {
    //   params: {
    //     token: token,
    //     chatId: chatId,
    //     name: name,
    //     description: description,
    //     bigImage: bigImage,
    //   },
    // });


    let updateURL = "http://54.200.193.22:3000/updateGroupChat/?";
    updateURL += "token=" + token + "&chatId=" + chatId + "&name=" + name + "&description=" + description + "&bigImage=" + bigImage;
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", updateURL, false); // false for synchronous request
    xmlHttp.send(null);
    const result = xmlHttp.responseText;

    console.log(result)
    
  }

  console.log("result before return: ", name, description, bigImage);

  return (
    <div className="page-container">
      <h3
        style={{
          fontWeight: "bolder",
          textAlign: "left",
        }}
      >
        Edit the group chat
      </h3>
      <p style={{ fontWeight: "lighter" }}>Fill out the information below!</p>
      <EditGroupChat
        key={key}
        name={name}
        description={description}
        image={bigImage}
        isNew={false}
        navigation={navigate}
        onClick={setUpdates}
      />
    </div>
  );
}



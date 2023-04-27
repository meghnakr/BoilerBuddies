import React from "react";
import { useState, useEffect } from "react";
import { endpoint } from "../global";
import NotifBox from "../components/NotifBox";
import FriendsTabProfile from "../components/FriendsTabProfile";
import axios from "../utils/Axios";
import { getusertoken } from "../utils/auth";
import FriendProfileForGroups from "../components/FriendProfileForGroups";
import { useLocation } from "react-router-dom";

const AddPage = () => {
  const [friendProfs, setFriendProfs] = useState([]);
  const location = useLocation();
  let chatId = new URLSearchParams(location.search).get("chatId");


  useEffect(() => {
    const fetchData = async () => {
      const token = await getusertoken();
      const result = await axios.get("/getFriends/", {
        params: {
          token: token,
        },
      });
      //console.log("TOKEN A: ", getusertoken());
      //console.log("Result data:", result.data);
      /* Call getUserById */
      const mappedUsers = await Promise.all(
        Object.values(result.data).map(
          // how to solve array of Promises
          async (currentfriend, index) => {
            const otherId = currentfriend.other_id;
            //console.log("OtherId:", otherId);
            const userObject = await axios.get("/getUserById/", {
              // must be in an async function
              params: {
                user_id: otherId,
              },
            });
            //          console.log(userObject.data);
            return await userObject.data;
          }
        )
      ); // closes map
      console.log("Mapped users: ", mappedUsers);
      setFriendProfs(mappedUsers);
      console.log("FRIEND PROFS2: ", friendProfs);
    };
    fetchData();

  }, [chatId]);

  useEffect(() => {
    console.log("FRIEND PROFS3: ", friendProfs);
  }, [friendProfs]);

  //console.log("FRIEND PROFS: ", friendProfs);

  function updateFriendsList(username) {

    // pass friendProfs here
    // loop through profiles
    // delete the one with the matching username
    console.log("FriendProfiles Before: ", friendProfs);
    const newFriendProfs = friendProfs.filter((currentfriendprof) => {
      if (currentfriendprof.username == username) {
        return false;
      }
      return true;
    });
    console.log("FriendProfiles After: ", newFriendProfs);
    setFriendProfs(newFriendProfs);
  }
  console.log("CHATID:", chatId);

  return (
    <div className="page-container">
      <form className="notifs-content">
        <span style={{ fontWeight: "bold", fontSize: 20 }}>Friends: </span>
        {friendProfs.length > 0 ? (
          friendProfs.map((currentfriend, index) => {
            currentfriend.interests = currentfriend.interests.replaceAll(
              "&&",
              " #"
            );
            return (
                <FriendProfileForGroups
                  username={currentfriend.username}
                  displayName={currentfriend.display_name}
                  interestTags={"#" + currentfriend.interests}
                  key={index}
                  updateFriendProfiles={updateFriendsList}
                  chatId={chatId}
                />
            );
          })
        ) : (
          <p>No friends</p>
        )}
      </form>
    </div>
  );
};
export default AddPage;

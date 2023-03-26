import React from "react";
import { useState, useEffect } from "react";
import { endpoint } from "../global";
import NotifBox from "../components/NotifBox";
import FriendsTabProfile from "../components/FriendsTabProfile";
import axios from "../utils/Axios";


const Friends = () => {
  function refreshPage() {
    window.location.reload(false);
  }

  const [friendProfs, setFriendProfs] = useState([]);

  useEffect(() => {
    /* Get Friend Requests */
    axios.get(/getFriends/).then((res) => {
      // callback function
      setFriendProfs(res.data);
    });
  }, []); // dependency array

  return (
    <div className="page-container">
      <form className="notifs-content">
      <span style={{ fontWeight: "bold", fontSize: 20 }}>
            Friends:{" "}
          </span>

          {/*friendProfs.map(
              (
                currentfriendrequest,
                index // goes through each element in friendReqs and maps it out by index
              ) => (
                <FriendsTabProfile
                  username={currentfriendrequest.username}
                  displayName={currentfriendrequest.displayName}
                  interestTags={currentfriendrequest.interestTags}
                  userId={currentfriendrequest.userId} //user_id property
                  key={index}
                />
              )
              )*/}

        {Array(5)
          .fill(0)
          .map(() => (
            <FriendsTabProfile />
          ))}
      </form>
    </div>

  );
};
export default Friends;

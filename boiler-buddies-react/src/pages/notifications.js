import React from "react";
import FriendProfile from "../components/FriendProfile";
import NotifBox from "../components/NotifBox";
import refresh from "../assets/refresh.png";
import logo from "../assets/logo_vector.png";
import axios from "../utils/Axios";
import { useEffect, useState } from "react";
import FriendRequest from "../components/FriendRequest";
import { getusertoken } from "../utils/auth";

const Notifications = () => {
  function refreshPage() {
    window.location.reload(false);
  }

  const [friendReqs, setFriendReqs] = useState([]);
  const [notifications, setNotifications] = useState([]);



  
  useEffect(() => {
    
    const fetchData = async () => {
      const token = await getusertoken();
      console.log("FriendRequests token: ", token)
      const result = await axios.get("/getFriendRequests/", {
        params: {
          token: token,
        },
      });

      /* Call getUserById */
      const mappedUsers = await Promise.all(
        Object.values(result.data).map(
          // how to solve array of Promises
          async (currentfriendrequest, index) => {
            const otherId = currentfriendrequest.other_id;
            const userObject = await axios.get("/getUserById/", {
              params: {
                user_id: otherId,
              },
            });
            //          console.log(userObject.data);
            return await userObject.data;
          }
        )
      ); // closes map
      setFriendReqs(mappedUsers);
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const token = await getusertoken();
      console.log("Notifications token: ", token)
      const result = await axios.get("/getNotifications/", {
        params: {
          token: token,
        },
      });

      /* Call getUserById */
      console.log("result.data: ", Object.values(result.data));
      const mappedNotif = await Promise.all(
        Object.values(result.data).map(
          // how to solve array of Promises
          async (currentnotif, index) => {
            console.log("Current Notif:", currentnotif);
            return await currentnotif.content;
          }
        )
      ); // closes map
      //console.log("NOTIF: ", mappedUsers)
      setNotifications(mappedNotif);
    };
    fetchData();
  }, []);

  console.log("ARRAY OF NOTIFS:", notifications);

  function updateRequestsList(username) {
    console.log("FriendProfiles Before: ", friendReqs)
    const newFriendReqs = friendReqs.filter((currentfriendreq) => {
      if (currentfriendreq.username == username) {
        return false;
      }
      return true;
    });
    console.log("FriendProfiles After: ", newFriendReqs)
    setFriendReqs(newFriendReqs)
  }

  return (
    <div className="page-container">
      <form className="notifs-content">
        <div className="refresh">
          <img
            style={{ width: 90, height: 90 }}
            src={refresh}
            alt="img"
            onClick={refreshPage}
          />
        </div>
        <div className="Signin-form-content">
          <span style={{ fontWeight: "bold", fontSize: 20 }}>
            Friend Requests:{" "}
          </span>
          <p></p>
          <p>

            {/* acceptFriendRequests */}
            {friendReqs.length > 0 ? (
              friendReqs.map((currentfriendrequest, index) => {
                return (
                  <FriendRequest
                    username={currentfriendrequest.username}
                    displayName={currentfriendrequest.display_name}
                    interestTags={currentfriendrequest.interests}
                    userId={currentfriendrequest.user_id}
                    key={index}
                    updateRequestProfiles={updateRequestsList}
                  />
                );
              })
            ) : (
              <p>No friend requests</p>
            )}

          </p>

          <p></p>
          <p></p>

          <span style={{ fontWeight: "bold", fontSize: 20 }}>
            Notifications:{" "}
          </span>
          <p></p>


          {notifications.map((notification, index) => (
            <NotifBox key={index} content={notification} />
          ))}

        </div>
      </form>
    </div>
  );
};

export default Notifications;

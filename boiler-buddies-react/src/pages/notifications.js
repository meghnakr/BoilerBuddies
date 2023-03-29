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


  useEffect(() => {
    const fetchData = async () => {
      const token = await getusertoken();
      const result = await axios.get("/getFriendRequests/", {
        params: {
          token: token,
        },
      });

      /* Call getUserById */
      const mappedUsers = await Promise.all(Object.values(result.data).map(     // how to solve array of Promises
        async (currentfriendrequest, index) => {
          const otherId = currentfriendrequest.other_id;
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
      )); // closes map
      console.log("Mapped users: ", mappedUsers)
      setFriendReqs(mappedUsers);
    };
    fetchData();
  }, []);


  console.log("FRIEND REQS 0: ", friendReqs);

  /* Get notifications */
  // const notifresult = axios
  //   .get("/getNotifications/")
  //   .then((response) => {
  //     // handle success
  //     console.log("SUCCESS NOTIFICATIONS");
  //   })
  //   .catch((error) => {
  //     // handle error
  //     console.log("FAILED NOTIFICATIONS");
  //   });


  /* Accept Friend Requests */

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
            {/* INSERT IMPLEMENTATION FOR ADDING FRIEND REQUESTS ARRAY HERE */}

            {/* acceptFriendRequests */}

            {friendReqs.length > 0 ? (
              friendReqs.map((currentfriendrequest, index) => {
                console.log("Current Friend Request: ", currentfriendrequest);
                return (
                  <FriendRequest
                    username={currentfriendrequest.username}
                    displayName={currentfriendrequest.display_name}
                    interestTags={currentfriendrequest.interests}
                    userId={currentfriendrequest.user_id}
                    key={index}
                  />
                );
              })
            ) : (
              <p>No friend requests</p>
            )}

            {/*Array(5)
              .fill(0)
              .map(() => (
                <FriendRequest username={"asaquib"}
                  displayName={"Samara"}
                  interestTags={["books", "coffee"]}
                  userId={1} //user_id property
                   />
              ))*/}

            {/* Replace Array.fill with actual array from database holding friends to user */}
          </p>

          <p></p>
          <p></p>

          <span style={{ fontWeight: "bold", fontSize: 20 }}>
            Notifications:{" "}
          </span>
          <p></p>

          {/* INSERT IMPLEMENTATION FOR ADDING OTHER NOTIFICATIONS ARRAY HERE */}

          {/* getNotifications */}

          {/* Check for likes on post */}

          {/* Check for comments on post */}

          {/* Check for likes on my comment */}

          {/* Check for replies to my comment */}

          {/* Check for accepted friend requests */}

          {Array(5)
            .fill(0)
            .map(() => (
              <NotifBox />
            ))}
        </div>
      </form>
    </div>
  );
};

export default Notifications;

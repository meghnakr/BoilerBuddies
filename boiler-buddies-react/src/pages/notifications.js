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

  // var token = getusertoken()
  // var sendRequestURL = "http://54.200.193.22:3000/getFriendRequests/?"
  // sendRequestURL += "user_id=" + token
  // var xmlHttp = new XMLHttpRequest();
  // xmlHttp.open( "GET", sendRequestURL, false ); // false for synchronous request
  // this.state.sendRequest = true;
  // xmlHttp.send(null);
  // setFriendReqs(xmlHttp.data)
  // var result = xmlHttp.responseText
  // console.log(result)

  // useEffect(() => {
  //   /* Get Friend Requests */
  //   axios.get("/getFriendRequests/").then((res) => {
  //     // callback function
  //     //console.log("RES: ", res)
  //     setFriendReqs(res.data);
  //   });
  // }, []); // dependency array

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/getFriendRequests/", {
        params: {
          user_id: "09aa1177-7e3d-4c83-9446-9079c048f5fe", //THIS SHOULD BE THE CURRENT USER'S USER ID
        },
      });
      console.log("Result data:", result.data);
      setFriendReqs(Object.values(result.data));
    };

    fetchData();
    //console.log("FRIEND REQS NEW1: ", friendReqs);
    //console.log ("length NEW1: ", friendReqs.length)
  }, []);

  useEffect(() => {
    //console.log("FRIEND REQS IN USE: ", friendReqs);
    //console.log ("length IN USE: ", friendReqs.length);
  }, [friendReqs]);

  console.log("FRIEND REQS 0: ", friendReqs);

  /* Get notifications */
  /*axios
    .get(/getNotifications/)
    .then((response) => {
      // handle success
      console.log("SUCCESS NOTIFICATIONS");
    })
    .catch((error) => {
      // handle error
      console.log("FAILED NOTIFICATIONS");
    });*/

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
              friendReqs.map((currentfriendrequest, index) => (
                <FriendRequest
                  username={currentfriendrequest.username}
                  displayName={currentfriendrequest.displayName}
                  interestTags={currentfriendrequest.interestTags}
                  userId={currentfriendrequest.userId}
                  key={index}
                />
              ))
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

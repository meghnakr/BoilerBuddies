import React from "react";
import FriendProfile from "../components/FriendProfile";
import NotifBox from "../components/NotifBox";
import refresh from "../assets/refresh.png";
import logo from "../assets/logo_vector.png";
import axios from '../utils/Axios';
import {useEffect, useState} from "react";




const Notifications = () => {

  function refreshPage() {
    window.location.reload(false);
  }

  const [friends, setFriends] = useState([]);

  useEffect( () => {
    /* Get Friend Requests */
    axios.get(/getFriendRequests/).then( (res) => {
      // callback function 
      setFriends(res.data);
    })
    
  },[]) // dependency array

  console.log("FRIENDS: ",friends)

  

  /* Accept Friend Requests */

  return (
    <div className="page-container">
      <form className="notifs-content">
        <div className="refresh">
          <img style={{ width: 300, height: 300 }} src={refresh} alt="img" onClick = {refreshPage} />
        </div>
        <div className="Signin-form-content">
          <span style={{ fontWeight: "bold", fontSize: 20 }}>
            Friend Requests:{" "}
          </span>
          <p></p>
          <p>
            {/* INSERT IMPLEMENTATION FOR ADDING FRIEND REQUESTS ARRAY HERE */}

            {/* getFriendRequests */ }
            

            {/* acceptFriendRequests */ }


            {Array(10)
              .fill(0)
              .map(() => (
                <FriendProfile />
              ))}
              
            
            {/* Replace Array.fill with actual array from database holding friends to user */}
          </p>

          <p></p>
          <p></p>

          <span style={{ fontWeight: "bold", fontSize: 20 }}>
            Likes and Comments:{" "}
          </span>
          <p></p>
          {/* INSERT IMPLEMENTATION FOR ADDING OTHER NOTIFICATIONS ARRAY HERE */}
          {/* getNotifications */}

          {/* Check if like or comment */}

          {Array(10)
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

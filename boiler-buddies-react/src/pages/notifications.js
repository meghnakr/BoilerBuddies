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

  // useEffect(() => {

  //   const fetchData = async () => {
  //     const result = await axios.get("/getFriendRequests/", {
  //       params: {
  //         token: await getusertoken(), //THIS SHOULD BE THE CURRENT USER'S TOKEN
  //       },
  //     });
  //     console.log("Result data:", result.data);
  //     setFriendReqs(Object.values(result.data));
  //   };
  //   console.log(getusertoken().Prom)
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getusertoken();
      const result = await axios.get("/getFriendRequests/", {
        params: {
          //token: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJ1c2VySWQiOiIwOWFhMTE3Ny03ZTNkLTRjODMtOTQ0Ni05MDc5YzA0OGY1ZmUiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9pbGVyYnVkZGllcy1lYzc4MSIsImF1ZCI6ImJvaWxlcmJ1ZGRpZXMtZWM3ODEiLCJhdXRoX3RpbWUiOjE2Nzk5NjYxNjAsInVzZXJfaWQiOiJ1UFJ1dEM1ZGdwYm5GTms3WEtzWDJDYzg1VXIyIiwic3ViIjoidVBSdXRDNWRncGJuRk5rN1hLc1gyQ2M4NVVyMiIsImlhdCI6MTY3OTk4MDkyNCwiZXhwIjoxNjc5OTg0NTI0LCJlbWFpbCI6ImFzYXF1aWJAcHVyZHVlLmVkdSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFzYXF1aWJAcHVyZHVlLmVkdSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Ao5gPJDGVrds1ADi82a3_t-1N0l8szUcqoMj1s3fTzw1Z3EIeJtSI7t3lR07VC11oXTyn9UIclqS22sCexxxHdTizfk4IILVco8W1tBF4Xce7pdDxcMpimfbvBX2k4-qHjvGdrnZMy1Df-mpGFuGlMm1jJ3voxEKgUAW-8-mhLjTe31go5yE4XHvcFVHBBd3GK62-LcE2Hw0CMu_cralH6L3C63lic2ItV1wXSzpPFR3DCU6lfaP7lz-eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJ1c2VySWQiOiIyNzI1OWNlMy0zZjc5LTQzNzMtOGRhYi1lZGFmZGEyMTczZjgiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9pbGVyYnVkZGllcy1lYzc4MSIsImF1ZCI6ImJvaWxlcmJ1ZGRpZXMtZWM3ODEiLCJhdXRoX3RpbWUiOjE2Nzk5NjE3MDYsInVzZXJfaWQiOiJkaU9iaEFVdklOZnhsUXlWMzNMZ1Z4dW1vWDYyIiwic3ViIjoiZGlPYmhBVXZJTmZ4bFF5VjMzTGdWeHVtb1g2MiIsImlhdCI6MTY3OTk4MTM0NywiZXhwIjoxNjc5OTg0OTQ3LCJlbWFpbCI6ImhwYm9pbGVyYnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiaHBib2lsZXJidWRkeUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.XDbtv2M3RHkRr76VCtGSmqwgCnVjF9LxEkgPmg4wIQcE_PTtDOe26Po_unhQwXENYpnszvg9R3LFF-xh3H2HEnDYA_WjgEmNMtykSjH1apm9mhKqimEwlC8uo1eslKaVgCYeiyklRKSBGitgO5DcixDGlLdlrrYoWGCoG-HFC3f0bOSpiq4NxOkUynMMB4AHzSCeuz_5YbPzHuSTohZH4czCFWvYH1LGDOjKknNMzV7G3SNlmOMfijM_1XbXLtZ7JWQ-UViQ3D9hTBdWkHu0Yow8qTAQHK0l_ofRZWa3Wrn-vmMeCQihjevrmum377LjRHjMBCNj6-zsP8yzBjTCyg",
          token: token,
        },
      });
      //console.log("TOKEN A: ", getusertoken());
      //console.log("Result data:", result.data);
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

  // useEffect(() => {
  //   //console.log("FRIEND REQS IN USE: ", friendReqs);
  //   //console.log ("length IN USE: ", friendReqs.length);
  // }, [friendReqs]);

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

import React from "react";
import { useState, useEffect } from "react";
import { endpoint } from "../global";
import NotifBox from "../components/NotifBox";
import FriendsTabProfile from "../components/FriendsTabProfile";
import axios from "../utils/Axios";
import { getusertoken } from "../utils/auth";

const Friends = () => {
  function refreshPage() {
    window.location.reload(false);
  }

  const [friendProfs, setFriendProfs] = useState([]);

  // useEffect(() => {
  //   /* Get Friend Requests */
  //   axios.get(/getFriends/).then((res) => {
  //     // callback function
  //     setFriendProfs(res.data);
  //   });
  // }, []); // dependency array

  useEffect(() => {
    const fetchData = async () => {
      const token = await getusertoken();
      const result = await axios.get("/getFriends/", {
        params: {
          //token: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJ1c2VySWQiOiIwOWFhMTE3Ny03ZTNkLTRjODMtOTQ0Ni05MDc5YzA0OGY1ZmUiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9pbGVyYnVkZGllcy1lYzc4MSIsImF1ZCI6ImJvaWxlcmJ1ZGRpZXMtZWM3ODEiLCJhdXRoX3RpbWUiOjE2Nzk5NjYxNjAsInVzZXJfaWQiOiJ1UFJ1dEM1ZGdwYm5GTms3WEtzWDJDYzg1VXIyIiwic3ViIjoidVBSdXRDNWRncGJuRk5rN1hLc1gyQ2M4NVVyMiIsImlhdCI6MTY3OTk4MDkyNCwiZXhwIjoxNjc5OTg0NTI0LCJlbWFpbCI6ImFzYXF1aWJAcHVyZHVlLmVkdSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFzYXF1aWJAcHVyZHVlLmVkdSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Ao5gPJDGVrds1ADi82a3_t-1N0l8szUcqoMj1s3fTzw1Z3EIeJtSI7t3lR07VC11oXTyn9UIclqS22sCexxxHdTizfk4IILVco8W1tBF4Xce7pdDxcMpimfbvBX2k4-qHjvGdrnZMy1Df-mpGFuGlMm1jJ3voxEKgUAW-8-mhLjTe31go5yE4XHvcFVHBBd3GK62-LcE2Hw0CMu_cralH6L3C63lic2ItV1wXSzpPFR3DCU6lfaP7lz-eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJ1c2VySWQiOiIyNzI1OWNlMy0zZjc5LTQzNzMtOGRhYi1lZGFmZGEyMTczZjgiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9pbGVyYnVkZGllcy1lYzc4MSIsImF1ZCI6ImJvaWxlcmJ1ZGRpZXMtZWM3ODEiLCJhdXRoX3RpbWUiOjE2Nzk5NjE3MDYsInVzZXJfaWQiOiJkaU9iaEFVdklOZnhsUXlWMzNMZ1Z4dW1vWDYyIiwic3ViIjoiZGlPYmhBVXZJTmZ4bFF5VjMzTGdWeHVtb1g2MiIsImlhdCI6MTY3OTk4MTM0NywiZXhwIjoxNjc5OTg0OTQ3LCJlbWFpbCI6ImhwYm9pbGVyYnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiaHBib2lsZXJidWRkeUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.XDbtv2M3RHkRr76VCtGSmqwgCnVjF9LxEkgPmg4wIQcE_PTtDOe26Po_unhQwXENYpnszvg9R3LFF-xh3H2HEnDYA_WjgEmNMtykSjH1apm9mhKqimEwlC8uo1eslKaVgCYeiyklRKSBGitgO5DcixDGlLdlrrYoWGCoG-HFC3f0bOSpiq4NxOkUynMMB4AHzSCeuz_5YbPzHuSTohZH4czCFWvYH1LGDOjKknNMzV7G3SNlmOMfijM_1XbXLtZ7JWQ-UViQ3D9hTBdWkHu0Yow8qTAQHK0l_ofRZWa3Wrn-vmMeCQihjevrmum377LjRHjMBCNj6-zsP8yzBjTCyg",
          token: token,
        },
      });
      console.log("TOKEN A: ", getusertoken());
      console.log("Result data:", result.data);
      setFriendProfs(Object.values(result.data));
    };
    fetchData();
  }, []);

  console.log("FRIEND PROFS: ", friendProfs)

  return (
    <div className="page-container">
      <form className="notifs-content">
        <span style={{ fontWeight: "bold", fontSize: 20 }}>Friends: </span>

        {/* {friendProfs.map(
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
        )} */}

        {friendProfs.length > 0 ? (
          friendProfs.map((currentfriendrequest, index) => (
            <FriendsTabProfile
              username={currentfriendrequest.username}
              displayName={currentfriendrequest.displayName}
              interestTags={currentfriendrequest.interestTags}
              userId={currentfriendrequest.userId}
              key={index}
            />
          ))
        ) : (
          <p>No friends</p>
        )}

        {/*Array(5)
          .fill(0)
          .map(() => (
            <FriendsTabProfile />
          ))*/}
      </form>
    </div>
  );
};
export default Friends;

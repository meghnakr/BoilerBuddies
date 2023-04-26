import React from "react";
import { useState, useEffect } from "react";

import axios from "../utils/Axios";
import { getusertoken } from "../utils/auth";
import BlockedProfile from "../components/BlockedProfile";

const BlockedList = () => {
  const [blockedProfs, setBlockedProfs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getusertoken();
      const result = await axios.get("/getBlockedUsers/", {
        params: {
          token: token,
        },
      });

      /* Call getUserById */
      const mappedUsers = await Promise.all(
        Object.values(result.data).map(
          // how to solve array of Promises
          async (current, index) => {
            const otherId = current.other_id;
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
      setBlockedProfs(mappedUsers);
    };
    fetchData();
  }, []);


  function updateBlockedList(username) {
    // loop through profiles
    // delete the one with the matching username
    console.log("Blocked Profiles Before: ", blockedProfs)
    const newBlockedProfs = blockedProfs.filter((currentprof) => {
      if (currentprof.username == username) {
        return false;
      }
      return true;
    });
    console.log("Blocked Profiles After: ", newBlockedProfs)
    setBlockedProfs(newBlockedProfs)
  }

  return (
    <div className="page-container">
      <form className="notifs-content">
        <span style={{ fontWeight: "bold", fontSize: 20 }}>Blocked Users: </span>
        {blockedProfs.length > 0 ? (
          blockedProfs.map((current, index) => {
            current.interests = current.interests.replaceAll("&&", " #")
            return (
              <BlockedProfile
                username={current.username}
                displayName={current.display_name}
                interestTags={"#" + current.interests}
                key={index}
                updateBlockProfiles={updateBlockedList}
              />
            );
          })
        ) : (
          <p>No users are blocked</p>
        )}
      </form>
    </div>
  );
};
export default BlockedList;

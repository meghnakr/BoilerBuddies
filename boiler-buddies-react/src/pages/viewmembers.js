import React from "react";
import {useState, useEffect} from "react";
import {endpoint} from "../global";
import {useLocation} from "react-router";
import useUser from "../hooks/useUser";
import ProfileHeader from "../components/ProfileHeader";

const ViewMembers = () => {
    const location = useLocation();
    var chatId = new URLSearchParams(location.search).get("chatId");
    var chatType = new URLSearchParams(location.search).get("type")
    const currentUser = useUser();
    const [members, setMembers] = useState()

    useEffect(() => {
        if (chatType === "G" || chatType === "g") {
            console.log(currentUser.username)
            var params = new URLSearchParams();
            params.append('groupId', chatId)
            var getGroupChatMembers = endpoint + "getGroupChatMembers/?" + params
            console.log(getGroupChatMembers)
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", getGroupChatMembers, true); // false for synchronous request
            xmlHttp.onload = (e) => { //handle async request
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 200) {
                        try {
                            var jsonResults = JSON.parse(xmlHttp.responseText)
                            console.log(jsonResults)
                            var formatted = formatResults(jsonResults)
                            setMembers(formatted)
                        } catch (e) {
                            if (e instanceof SyntaxError) {
                                console.log(xmlHttp.responseText);
                                window
                                    .location
                                    .reload()
                            }
                        }
                    } else {
                        console.error(xmlHttp.statusText)
                    }
                }
            }
            xmlHttp.onerror = (e) => {
                console.error(xmlHttp.statusText)
            }
            xmlHttp.send(null);
        }
    }, []);

    function formatResults(result) {
        var jsonResults = result
        var highest = (Object.keys(jsonResults).length - 1).toString();
        var adminUsernames = jsonResults[highest]["adminUsernames"]
        var formattedResults = [];
        Object
            .keys(jsonResults)
            .forEach(function (key) {
                if (key !== highest) {
                    var curr = jsonResults[key]
                    var user = (
                        <ProfileHeader
                            token={currentUser.token}
                            currentUser={currentUser.username}
                            displayName={curr["display_name"]}
                            userId={curr["userId"]}
                            username={curr["username"]}
                            img={curr["big_image"]}
                            forChat={true}
                            chatId={chatId}
                            isAdmin={curr["is_admin"]}
                            adminUsernames={adminUsernames}/>
                    )
                    formattedResults.push(user)
                }
            });
        return formattedResults
    }
    return (
        <div className="page-container">
            <h4 style={{
                    fontWeight: 'bold'
                }}>Members</h4>
            <p>{members}</p>
        </div>
    );
};
export default ViewMembers;

import axios from "../utils/Axios";
import React from "react";
import { useState, useEffect } from "react";
import ProfileHeader from "../components/ProfileHeader";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../global";
import { getusertoken } from "../utils/auth";

const Searches = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const navigate = useNavigate();
  console.log(searchResult);

  const handleChange = (event) => {
    setSearch(event.target.value);

    //call search algorithm here and return an array of results
    var searchRequestURL = "http://54.200.193.22:3000/searchUser/?";

    var searchVal = event.target.value;

    var searchName = "";
    var searchTags = "";

    // anything following a # is a tag
    // anything before the first # is a name

    // %26 in the url will translate to & in the http request

    if (searchVal.indexOf("#") === -1) {
      console.log("Here 1");
      searchName = searchVal.trim();
      searchTags = "%26%26";
    } else {
      console.log("Here 2");
      var index = searchVal.indexOf("#");
      searchName = searchVal.substring(0, index).trim();

      searchTags = "%26";

      var remainingSearch = searchVal;

      while (index !== -1) {
        remainingSearch = remainingSearch.substring(
          index + 1,
          remainingSearch.length
        );
        index = remainingSearch.indexOf("#");
        var nextTag = "";
        if (index === -1) {
          nextTag = remainingSearch.substring(0, remainingSearch.length).trim();
          if (nextTag !== "") {
            searchTags += nextTag.trim();
          }
          searchTags += "%26";
        } else {
          nextTag = remainingSearch.substring(0, index).trim();
          if (nextTag !== "") {
            searchTags += nextTag.trim();
          }
          searchTags += "%26%26";
        }
      }
    }

    searchRequestURL +=
      "searchName=" + searchName + "&searchTags=" + searchTags;
    console.log(searchRequestURL);

    //var searchRequestURL = "http://54.200.193.22:3000/searchUser/?searchName=abc&searchTags=%26one%26"

    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open( "GET", searchRequestURL, false ); // false for synchronous request
    // xmlHttp.send(null);
    // var result = xmlHttp.responseText

    /* One request to get block list from database */
    let unfilteredResults = [];
    let filteredResults = [];

    // declare anonymous function

    axios.get(searchRequestURL).then(async (result) => {
      //setSearchResult(formattedResult);
      console.log("Unfiltered Results: ", unfilteredResults);
      // axios.get("http://54.200.193.22:3000/blockOther/?").then((result) => {
      //   console.log("Blocked request: " + result.data)
      // });

      var token = await getusertoken();
      var blockUserURL = "http://54.200.193.22:3000/getBlockers/?";
      blockUserURL += "token=" + token;
      console.log(blockUserURL);
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", blockUserURL, false); // false for synchronous request
      xmlHttp.send(null);
      var blockedResult = JSON.parse(xmlHttp.responseText);
      console.log("Blocked request: ", blockedResult, typeof blockedResult);
      const blockedIDs = new Set();
      Object.keys(blockedResult).map((key) => {
        console.log("key", key, blockedResult[key].other_id); // get this to output other_id
        blockedIDs.add(blockedResult[key].other_id); // this gives us the other_id
      });

      console.log("Blocked IDs ", blockedIDs)
      setSearchResult([]);
      const formattedResult = formatResults(result.data, blockedIDs);   // array of components
      unfilteredResults = formattedResult;


      /* Filter out by the other_id */
      // done in format results
      // unfilteredObjects.filter((e) => {
      //   //if e.id is in blockedIDs,
      //   if (blockedIDs.has(e)) {
      //   }
      // });

      setSearchResult(unfilteredResults);
    });

    {
      /* sendFriendRequest */
    }
  };

  function formatResults(result, blockedIDs) {
    console.log("In formatResults: ", result);
    //  var jsonResults = JSON.parse(result);
    var jsonResults = result;
    var formattedResults = [];
    var i = 0;
    Object.keys(jsonResults).forEach(function (key) {
      //console.log('Key : ' + key + ', Value : ' + jsonResults[key])
      //formattedResults += jsonResults[key]["display_name"] + " " + jsonResults[key]["username"] + "| \n"
      //console.log("JSON RESULTS", jsonResults[key]);

      /* Check if user is blocked by anyone */
      console.log("JSON results ", jsonResults[key], blockedIDs.has(jsonResults[key].user_id))
      if (blockedIDs.has(jsonResults[key].user_id)) {
        console.log("User is blocked by someone ", jsonResults[key].user_id);
        console.log("Blocked IDS: ", blockedIDs)
        return;
      }
      var interests = jsonResults[key]["interests"];
      interests = interests.trim().substring(0, interests.length).trim();
      interests = "#" + interests.replaceAll("&&", " #");
      formattedResults[i] = (
        <ProfileHeader
          displayName={jsonResults[key]["display_name"]}
          userId={jsonResults[key]["user_id"]}
          username={jsonResults[key]["username"]}
          interestTags={interests}
          img={jsonResults[key]["big_image"]}
        />
      );
      /*
      console.log(
        String(i) +
          " " +
          jsonResults[key]["display_name"] +
          " " +
          jsonResults[key]["username"]
      );*/
      i++;
    });
    return formattedResults;
  }


  return (
    <div className="page-container">
      <input
        className="search-bar"
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />
      {/*console.log("SEARCH: ", search)*/}
      <p className="search-result">{searchResult}</p>
      {/*console.log("SEARCH RESULT: ", searchResult)*/}
    </div>
  );
};

export default Searches;

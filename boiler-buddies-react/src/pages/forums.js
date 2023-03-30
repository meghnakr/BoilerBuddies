import React from 'react';
import { useState } from "react";
import { endpoint } from "../global";
import ForumResult from '../components/ForumResult';
import { useNavigate } from 'react-router-dom'

function formatResults(result) {
    var jsonResults = JSON.parse(result);
    var formattedResults = Array(20).fill("");
    var i = 0;
    Object.keys(jsonResults).forEach(function(key) {
        //console.log('Key : ' + key + ', Value : ' + jsonResults[key])
        //formattedResults += jsonResults[key]["display_name"] + " " + jsonResults[key]["username"] + "| \n"
        formattedResults[i] = <ForumResult forumId = {jsonResults[key]["forum_id"]}
            name = {jsonResults[key]["name"]} 
            description = {jsonResults[key]["description"]} />;
        console.log(String(i) + " " + jsonResults[key]["name"] + " " + jsonResults[key]["description"]);
        i++;
    });
    return formattedResults;
}

const Forums = () => {
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState('');
    console.log(searchResult)

    const handleChange = (event) => {
        setSearch(event.target.value)
        //call search algorithm here and return an array of results
        var searchRequestURL = endpoint + "searchForum/?"

        var searchVal = event.target.value

        console.log(searchVal)

        var searchText = searchVal.trim()

        searchRequestURL += "searchText=" + searchText
        console.log(searchRequestURL)

        //var searchRequestURL = "http://54.200.193.22:3000/searchUser/?searchText=myforum"
        
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", searchRequestURL, false ); // false for synchronous request
        xmlHttp.send(null);
        var result = xmlHttp.responseText
        result = formatResults(result)
        setSearchResult(result)
        console.log(searchResult)
    }

    const navigate = useNavigate();

    return (
        <div className='page-container'>
            <input className='search-bar'
            placeholder='Search'
            onChange={handleChange}
            value={search}/>
            <p>{searchResult}</p>
            <button className="default-btn" 
                    style={{width: '20%'}}
                    onClick={() => {
                        navigate('/create-forum');
                        this.setState({ open: false });
                      }}>Create a new forum</button>
        </div>
    )  
};

export default Forums;
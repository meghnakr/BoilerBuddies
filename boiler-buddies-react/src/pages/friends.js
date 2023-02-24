import { React, useState } from 'react';


const Friends = () => {
    const [search, setSearch] = useState('');

    const handleChange = (event) => {
        setSearch(event.target.value)
        //call search algorithm here and return an array of results
        var searchRequestURL = "http://54.200.193.22:3000/searchUser/?"
        console.log(search);

        var searchName = ""
        var searchTags = ""
        
        // anything following a # is a tag
        // anything before the first # is a name

        // %26 in the url will translate to & in the http request

        if (search.indexOf("#") === -1) {
            console.log("Here 1")
            searchName = search.trim()
            searchTags = "%26%26"
        }
        else {
            console.log("Here 2")
            var index = search.indexOf("#")
            searchName = search.substring(0, index).trim()

            searchTags = "%26"

            var remainingSearch = search
            
            while (index !== -1) {
                remainingSearch = remainingSearch.substring(index + 1, remainingSearch.length)
                index = remainingSearch.indexOf("#")
                var nextTag = ""
                if (index === -1) {
                    nextTag = remainingSearch.substring(0, remainingSearch.length).trim()
                    if (nextTag !== "") {
                        searchTags += nextTag.trim()
                    }
                    searchTags += "%26"
                }
                else {
                    nextTag = remainingSearch.substring(0, index).trim()
                    if (nextTag !== "") {
                        searchTags += nextTag.trim()
                    }
                    searchTags += "%26%26"
                }
            }
        }

        searchRequestURL += "searchName=" + searchName + "&searchTags=" + searchTags
        console.log(searchRequestURL)

        //var searchRequestURL = "http://54.200.193.22:3000/searchUser/?searchName=abc&searchTags=%26one%26"
        
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", searchRequestURL, false ); // false for synchronous request
        xmlHttp.send(null);
        console.log(xmlHttp.responseText);
    }
    return (
        <div className='page-container'>
            <input className='search-bar'
            placeholder='Search'
            value={search} onChange={handleChange}/>
            <p>{search}</p> {/* for debug only */}
        </div>
    )
};

export default Friends;
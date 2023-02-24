import { React, useState } from 'react';

/*handleSubmit = () => {
    let profile = {
        token: 0,
        displayName: this.state.name,
        interests: this.state.tags,
        intro: this.state.biography,
        bigImage: this.state.base64Image,
        smallImage: this.state.base64Image
    }
    axios.post(endpoint + "updateUser/", {
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        profile})
        .then(response => console.log(response));
    
}*/

const Friends = () => {
    const [search, setSearch] = useState('');

    const handleChange = (event) => {
        setSearch(event.target.value)
        //call search algorithm here and return an array of results
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
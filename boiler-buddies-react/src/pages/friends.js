import { React, useState } from 'react';


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
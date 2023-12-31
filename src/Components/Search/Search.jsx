import React from 'react';
import './Search.css'
function Search() {
    return (
        <div className='search-wrapper'>
            <input type="text" placeholder='Pokemon Name...' id='pokemon-name-search' />
        </div>
    )
}

export default Search;
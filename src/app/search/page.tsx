'use client'

import { useEffect, useState } from "react";

const getResults = async (query: string) => await fetch(`/api/v1/get/song/${query}`);

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('amaka');
  const [results, setSearchResults] = useState([{
    artist: 'VintejVic',
    song: 'N Yo Dress'
  }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await getResults(searchQuery);
    const response = await res.json();
    setSearchResults(response.result);
  }

  return (
    <>
      <div className=''>
        Search for your music!
        <div>
          <form onSubmit={handleSubmit}>
            <input
              onChange={({target: { value }}) => setSearchQuery(value)}
              style={{color: "#000"}}
              />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          { results.map((result, i) => {
            return (
              <li key={i}>
                {result.artist} - {result.song}
              </li>
            )
          }) }
        </div>
      </div>
    </>
  )
}

export default SearchPage
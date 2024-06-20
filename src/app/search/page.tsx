'use client'

import { useState } from "react";
import { useCtx } from "@/components/Context";
import { SET_SEARCH_QUERY, SET_SEARCH_RESULTS } from "@/components/Context/actions";

const getResults = async (query: string) => await fetch(`/api/v1/get/song/${query}`);

const SearchPage = () => {
  const [state, dispatch] = useCtx() as any;
  console.log("STATE", state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await getResults(state.searchQuery);
    const response = await res.json();
    dispatch({
      type: SET_SEARCH_RESULTS,
      payload: response.result
    });
  };

  return (
    <>
      <div className=''>
        Search for your music!
        <div>
          <form onSubmit={handleSubmit}>
            <input
              onChange={({target: { value }}) => dispatch({
                type: SET_SEARCH_QUERY,
                payload: value
              })}
              style={{color: "#000"}}
              />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          { state.searchResults.map((result, i) => {
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
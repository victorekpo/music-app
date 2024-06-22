'use client'

import { useState } from "react";
import { useCtx } from "@/components/Context";
import { SET_SEARCH_QUERY, SET_SEARCH_QUERY_TYPE, SET_SEARCH_RESULTS } from "@/components/Context/actions";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import gql from "graphql-tag";

export const dynamic = "force-dynamic";

const query = gql`query {
  hello
}`

const getResults = async (query: string, queryType: string) => await fetch(`/api/v1/get/${queryType}/${query}`);

const SearchPage = () => {
  const [state, dispatch] = useCtx() as any;
  const { data } = useSuspenseQuery(query);

  console.log("STATE", state);
  console.log("GQL", data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await getResults(state.searchQuery, state.queryType);
    console.log("RES", res);
    const response = await res.json();
    console.log("RESPONSE", response);
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
            <select onChange={({target: { value }}) => dispatch({
              type: SET_SEARCH_QUERY_TYPE,
              payload: value
            })}>
              <option value='song'>Song</option>
              <option value='artist'>Artist</option>
              <option value='album'>Album</option>
              <option value='genre'>Genre</option>
              <option value='tags'>Tags</option>
              <option value='quotes'>Quotes</option>
            </select>
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
                {result.artist} - {result.song}{state.queryType !== 'song' && state.queryType !== 'artist' && result[state.queryType] && " - " + result[state.queryType]}
              </li>
            )
          }) }
        </div>
      </div>
    </>
  )
}

export default SearchPage
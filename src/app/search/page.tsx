'use client'

import { useLazyQuery } from "@apollo/client";
import { useCtx } from "@/components/Context";
import { SET_SEARCH_QUERY, SET_SEARCH_QUERY_TYPE, SET_SEARCH_RESULTS } from "@/components/Context/actions";
import { SEARCH_MUSIC_QUERY } from "@/graphql/queries/searchMusic";

export const dynamic = "force-dynamic";

const SearchPage = () => {
  const [state, dispatch] = useCtx() as any;
  const [searchMusic, { loading, error}] = useLazyQuery(SEARCH_MUSIC_QUERY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await searchMusic({
      variables: {
        searchTerm: state.searchQuery || 'a',
        searchType: state.queryType || 'song'
      }
    })

    console.log("RESPONSE", data);
    dispatch({
      type: SET_SEARCH_RESULTS,
      payload: data
    });
  };

  return (
    <>
      <div className=''>
        Search for your music!
        <div>
          { loading ? '.......' : ''}
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
          {/*{ state?.searchResults || [].map((result, i) => {*/}
          {/*  return (*/}
          {/*    <li key={i}>*/}
          {/*      {result.artist} - {result.song}{state.queryType !== 'song' && state.queryType !== 'artist' && result[state.queryType] && " - " + result[state.queryType]}*/}
          {/*    </li>*/}
          {/*  )*/}
          {/*}) }*/}
        </div>
      </div>
    </>
  )
}

export default SearchPage
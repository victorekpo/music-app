'use client'

import { useLazyQuery } from "@apollo/client";
import { useCtx } from "@/components/Context";
import { SET_SEARCH_QUERY, SET_SEARCH_QUERY_TYPE, SET_SEARCH_RESULTS } from "@/components/Context/actions";
import { SEARCH_MUSIC_QUERY } from "@/graphql/queries/searchMusic";
import { Input } from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import { useEffect } from "react";

export const dynamic = "force-dynamic";

const SearchPage = () => {
  const [state, dispatch] = useCtx() as any;
  const [searchMusic, { loading, error}] = useLazyQuery(SEARCH_MUSIC_QUERY);

  useEffect(() => {
    console.log("STATE", state);
  },[state])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await searchMusic({
      variables: {
        searchTerm: state.searchQuery || 'a',
        searchType: state.queryType || 'song'
      }
    })

    dispatch({
      type: SET_SEARCH_RESULTS,
      payload: data.searchMusic
    });
  };

  const types = ['song', 'artist', 'album', 'genre', 'tags', 'quotes']

  return (
    <>
      <div className=''>
        Search for your music!
        <div>
          {/*{ loading ? '.......' : ''}*/}
          <form onSubmit={handleSubmit}>
            <Select
              label="Select search type"
              className="max-w-xs"
              onChange={async ({target: { value }}) => {
                dispatch({
                  type: SET_SEARCH_QUERY_TYPE,
                  payload: value
                })
              }
            }
            >
              {types.map((type) => (
                <SelectItem key={type}>
                  {type}
                </SelectItem>
              ))}
            </Select>
            <br />
            <br />
            <Input
              type="SearchQuery"
              label="Search"
              onChange={async ({target: { value }}) => {
                dispatch({
                type: SET_SEARCH_QUERY,
                payload: value
              });
                const { data } = await searchMusic({
                  variables: {
                    searchTerm: value,
                    searchType: state.queryType
                  }
                });

                dispatch({
                  type: SET_SEARCH_RESULTS,
                  payload: data.searchMusic
                });
              }
              }
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          { !loading && state?.searchResults?.slice(0,20).map((result, i) => {
            return (
              <li key={i}>
                {result.song}{state.queryType !== 'song' && state.queryType !== 'artist' && result.songInfo[state.queryType] && " - " + result.songInfo[state.queryType]}
              </li>
            )
          }) }
        </div>
      </div>
    </>
  )
}

export default SearchPage
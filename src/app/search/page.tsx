'use client'

import { useLazyQuery } from "@apollo/client";
import { useCtx } from "@/components/Context";
import { SET_SONG_QUERY, SET_ARTIST_QUERY, SET_SEARCH_RESULTS } from "@/components/Context/actions";
import { SEARCH_MUSIC_QUERY } from "@/graphql/queries/searchMusic";
import { Input } from "@nextui-org/react";
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
        songQuery: state.songQuery,
        artistQuery: state.artistQuery
      }
    })

    dispatch({
      type: SET_SEARCH_RESULTS,
      payload: data.searchMusic
    });
  };

  return (
    <>
      <div className=''>
        Search for your music!
        <div>
          {/*{ loading ? '.......' : ''}*/}
          <form onSubmit={handleSubmit}>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                type="SongSearch"
                label="Song Search"
                onChange={async ({ target: { value } }) => {
                  dispatch({
                    type: SET_SONG_QUERY,
                    payload: value
                  });
                  const { data } = await searchMusic({
                    variables: {
                      songQuery: value,
                      artistQuery: state.artistQuery
                    }
                  });

                  dispatch({
                    type: SET_SEARCH_RESULTS,
                    payload: data?.searchMusic
                  });
                }
                }
              />
              <Input
                type="ArtistSearch"
                label="Artist Search"
                onChange={async ({ target: { value } }) => {
                  dispatch({
                    type: SET_ARTIST_QUERY,
                    payload: value
                  });
                  const { data } = await searchMusic({
                    variables: {
                      artistQuery: value,
                      songQuery: state.songQuery
                    }
                  });

                  dispatch({
                    type: SET_SEARCH_RESULTS,
                    payload: data?.searchMusic
                  });
                }
                }
              />
            </div>
              <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          {!loading && state?.searchResults?.slice(0,20).map((result, i) => {
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
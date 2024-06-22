'use client'

import { useLazyQuery } from "@apollo/client";
import { useCtx } from "@/components/Context";
import {
  SET_SONG_QUERY,
  SET_ARTIST_QUERY,
  SET_GENRE_QUERY,
  SET_QUOTES_QUERY,
  SET_SEARCH_RESULTS
} from "@/components/Context/actions";
import { SEARCH_MUSIC_QUERY } from "@/graphql/queries/searchMusic";
import { Input } from "@nextui-org/react";

export const dynamic = "force-dynamic";

const SearchPage = () => {
  const [state, dispatch] = useCtx() as any;
  const [searchMusic, { loading, error}] = useLazyQuery(SEARCH_MUSIC_QUERY);

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
                      artistQuery: state.artistQuery,
                      albumQuery: state.albumQuery,
                      genreQuery: state.genreQuery,
                      tagsQuery: state.tagsQuery,
                      quotesQuery: state.quotesQuery
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
                      songQuery: state.songQuery,
                      albumQuery: state.albumQuery,
                      genreQuery: state.genreQuery,
                      tagsQuery: state.tagsQuery,
                      quotesQuery: state.quotesQuery
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
            <br />
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                type="GenreQuery"
                label="Genre Search"
                onChange={async ({ target: { value } }) => {
                  dispatch({
                    type: SET_GENRE_QUERY,
                    payload: value
                  });
                  const { data } = await searchMusic({
                    variables: {
                      songQuery: state.songQuery,
                      artistQuery: state.artistQuery,
                      albumQuery: state.albumQuery,
                      genreQuery: value,
                      tagsQuery: state.tagsQuery,
                      quotesQuery: state.quotesQuery
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
                type="QuotesSearch"
                label="Quotes Search"
                onChange={async ({ target: { value } }) => {
                  dispatch({
                    type: SET_QUOTES_QUERY,
                    payload: value
                  });
                  const { data } = await searchMusic({
                    variables: {
                      artistQuery: state.artistQuery,
                      songQuery: state.songQuery,
                      albumQuery: state.albumQuery,
                      genreQuery: state.genreQuery,
                      tagsQuery: state.tagsQuery,
                      quotesQuery: value
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
          {!loading && state?.searchResults?.slice(0, 20).map((result, i) => {
            return (
              <li key={i}>
                {result.song}
              </li>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default SearchPage
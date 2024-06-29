'use client'

import { useRouter } from "next/navigation";
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
import { Button, Input, Listbox, ListboxItem } from "@nextui-org/react";
import { shuffleArr } from "@/utils/shuffle";
import type { FormEvent } from "react";
import styles from './page.module.css';

export const dynamic = "force-dynamic";

const SearchPage = () => {
  const [state, dispatch] = useCtx() as any;
  const [searchMusic, { loading, error }] = useLazyQuery(SEARCH_MUSIC_QUERY);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await searchMusic({
      variables: {
        songQuery: state.songQuery,
        artistQuery: state.artistQuery
      }
    })

    dispatch({
      type: SET_SEARCH_RESULTS,
      payload: shuffleArr(data?.searchMusic)
    });
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Search for your music!</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                type="SongSearch"
                label="Song Search"
                value={state.songQuery}
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
                    payload: shuffleArr(data?.searchMusic)
                  });
                }
                }
              />
              <Input
                type="ArtistSearch"
                label="Artist Search"
                value={state.artistQuery}
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
                    payload: shuffleArr(data?.searchMusic)
                  });
                }
                }
              />
            </div>
            <br/>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                type="GenreQuery"
                label="Genre Search"
                value={state.genreQuery}
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
                    payload: shuffleArr(data?.searchMusic)
                  });
                }
                }
              />
              <Input
                type="QuotesSearch"
                label="Quotes Search"
                value={state.quotesQuery}
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
                    payload: shuffleArr(data?.searchMusic)
                  });
                }
                }
              />
            </div>
            <br/>
            <Button
              type="submit"
              color="primary"
              variant="flat"
            >
              Submit
            </Button>
          </form>
        </div>
        <div className={styles.listBoxContainer}>
          <Listbox
            aria-label="Actions"
            onAction={(key) => router.push(key as string)}
          >
            {!loading && state?.searchResults?.slice(0, 20).map((result) => {
              return (
                <ListboxItem key={`/song/${result.song.replace(" -- ", "--").replaceAll(" ", "_")}`}>
                  {result.song}
                </ListboxItem>
              )
            })}
          </Listbox>
        </div>
      </div>
    </>
  )
}

export default SearchPage
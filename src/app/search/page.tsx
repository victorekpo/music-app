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
import { debounce } from "@/utils/debounce";
import { FormEvent, useMemo, useEffect } from "react";
import styles from './page.module.css';

export const dynamic = "force-dynamic";

const SearchPage = () => {
  const [state, dispatch] = useCtx() as any;
  const [searchMusic, { loading, error }] = useLazyQuery(SEARCH_MUSIC_QUERY);
  const router = useRouter();

  const searchResults = useMemo(() => state?.searchResults?.slice(0, 20), [state?.searchResults]);

  const debouncedSearchMusic = useMemo(() =>
      debounce(async (variables) => {
        const { data } = await searchMusic({ variables });
        dispatch({
          type: SET_SEARCH_RESULTS,
          payload: shuffleArr(data?.searchMusic)
        });
      }, 300),
    [searchMusic, dispatch]
  );

  const handleInputChange = async (type: string, value: string) => {
    dispatch({ type, payload: value });
    debouncedSearchMusic({
      songQuery: type === SET_SONG_QUERY ? value : state.songQuery,
      artistQuery: type === SET_ARTIST_QUERY ? value : state.artistQuery,
      albumQuery: state.albumQuery,
      genreQuery: type === SET_GENRE_QUERY ? value : state.genreQuery,
      tagsQuery: state.tagsQuery,
      quotesQuery: type === SET_QUOTES_QUERY ? value : state.quotesQuery
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await searchMusic({
      variables: {
        songQuery: state.songQuery,
        artistQuery: state.artistQuery
      }
    });

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
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 sm:gap-4">
              <Input
                type="SongSearch"
                label="Song Search"
                value={state.songQuery}
                onChange={({ target: { value } }) => handleInputChange(SET_SONG_QUERY, value)}
              />
              <Input
                type="ArtistSearch"
                label="Artist Search"
                value={state.artistQuery}
                onChange={({ target: { value } }) => handleInputChange(SET_ARTIST_QUERY, value)}
              />
              <Input
                type="GenreQuery"
                label="Genre Search"
                value={state.genreQuery}
                onChange={({ target: { value } }) => handleInputChange(SET_GENRE_QUERY, value)}
              />
              <Input
                type="QuotesSearch"
                label="Quotes Search"
                value={state.quotesQuery}
                onChange={({ target: { value } }) => handleInputChange(SET_QUOTES_QUERY, value)}
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
            {searchResults?.map((result) => (
              <ListboxItem key={`/song/${result.song.replace(" -- ", "--").replaceAll(" ", "_")}`}>
                {result.song}
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      </div>
    </>
  );
}

export default SearchPage;

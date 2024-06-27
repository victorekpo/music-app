'use client'

import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useCtx } from "@/components/Context";
import { useMutation } from "@apollo/client";
import { UPDATE_SONG } from "@/components/Context/actions";
import { UPDATE_MUSIC_QUERY } from "@/graphql/queries/updateMusic";
import styles from './page.module.css';
import type { SongInfo } from "@/@types/Music";

const SongPage = ({ params }) => {
  const [edit, setEdit] = useState(false);
  const [formState, setFormState] = useState({}) as any;
  const [state, dispatch] = useCtx() as any;
  const { music } = state;

  const songId = params.song
    .replace("--"," -- ")
    .replaceAll("_"," ")
    .replaceAll("%3B",";")
    .replaceAll("%2C",",");

  const found = music.songs.find((s: SongInfo) => s.song === songId);
  const [song, setSong] = useState(found) as any;

  const [updateSong, { error } ] = useMutation(UPDATE_MUSIC_QUERY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mutation query to update song in db
    await updateSong({
      variables: { oldSongId: song.song, song: { ...formState } }
    })
    // Dispatch to update global state music object
    dispatch({
      type: UPDATE_SONG,
      payload: { oldSongId: song.song, ...formState }
    });
    // Set new song to local state for current page
    setSong({
      song: `${formState.artist} -- ${formState.song}`,
      songInfo: { ...formState }
    })
  };
  
  useEffect(() => {
    if (found.songInfo) {
      setFormState(found.songInfo);
    }
  },[]);

  return (
    <>
      <h1 className='' style={{fontSize: "30px"}}>
        {song?.song}
      </h1>
      <br/>
      <form
        className={styles.formContainer + " " + (edit ? styles.editable + " flex w-full flex-wrap md:flex-nowrap gap-4" : "")}
        onSubmit={handleSubmit}
      >
        {Object.entries(song?.songInfo || {}).map(([k,v], i) => (
          <div key={i}>
            { edit ? (
              <>
                <Input
                  type={k}
                  label={k}
                  value={formState[k]}
                  onChange={({target: { value }}) => {
                    setFormState(prev => ({
                      ...prev,
                      [k]: value
                    }));
                  }}
                />
              </>
            ) : (
              <>
                <strong>{k}:</strong> {v} <br />
              </>
              )
            }
          </div>
        ))}
      { edit ? (<Button
        color="primary"
        onClick={() => {
          setEdit(!edit)
        }}
      >
        Submit
      </Button>) : (
        <Button
          type="submit"
          color="primary"
          onClick={() => {
            setEdit(!edit)
          }}
        >
          Edit Song
        </Button>
      ) }
      </form>
    </>
  )
}

export default SongPage;

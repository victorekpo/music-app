'use client'

import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useCtx } from "@/components/Context";
import styles from './page.module.css';
import type { SongInfo } from "@/@types/Music";
import { UPDATE_SONG } from "@/components/Context/actions";

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
        onSubmit={(e) => {
          e.preventDefault();
          console.log("form submission", formState);
          // Mutation query to update song in db
          // Dispatch to update state
          dispatch({
            type: UPDATE_SONG,
            payload: { oldSongId: song.song, ...formState }
          });
          // Set new song to state
          setSong({
            song: `${formState.artist} -- ${formState.song}`,
            songInfo: { ...formState }
          })
        }}
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

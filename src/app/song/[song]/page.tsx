'use client'

import { Button, Input } from "@nextui-org/react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useCtx } from "@/components/Context";
import { useMutation } from "@apollo/client";
import { UPDATE_SONG } from "@/components/Context/actions";
import { UPDATE_MUSIC_QUERY } from "@/graphql/queries/updateMusic";
import styles from './page.module.css';
import type { SongInfo } from "@/@types/Music";

const SongPage = ({ params }) => {
  const [state, dispatch] = useCtx() as any;
  const { user } = state;
  const [edit, setEdit] = useState(false);
  const [formState, setFormState] = useState({}) as any;
  const { music } = state;

  const songId = useMemo(() => (
    params.song
      .replace("--", " -- ")
      .replaceAll("_", " ")
      .replaceAll("%3B", ";")
      .replaceAll("%2C", ",")
  ), [params.song]);

  const found = useMemo(() => {
    const ignoredKeys = ['__typename'];
    const f = music?.songs.find((s: SongInfo) => s.song === songId)
    if (f) {
      const s = { ...f, songInfo: { ...f.songInfo } };
      ignoredKeys.forEach(k => {
        delete s.songInfo[k];
      });
      return s;
    }
  }, [music, songId]);

  const [song, setSong] = useState(found);

  useEffect(() => {
    if (found && !song) {
      setSong(found);
    }
  }, [song, found]);

  useEffect(() => {
    if (song?.songInfo) {
      setFormState(song.songInfo);
    }
  }, [song]);

  const [updateSong, { error }] = useMutation(UPDATE_MUSIC_QUERY);

  const handleSubmit = async (e) => {
    console.log("editing song")
    e.preventDefault();
    // Mutation query to update song in db
    await updateSong({
      variables: {
        user,
        oldSongId: song._id,
        song: { ...formState }
      }
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
    });
    // Delete local storage to force a refresh
    localStorage.removeItem('musicData');
  };

  return (
    <>
      <h1 className='' style={{ fontSize: "30px" }}>
        {song?.song}
      </h1>
      <br/>
      <form
        className={styles.formContainer + " " + (edit ? styles.editable + " flex w-full flex-wrap md:flex-nowrap gap-2 sm:gap-4" : "")}
        onSubmit={handleSubmit}
      >
        {Object.entries(song?.songInfo || {}).map(([k, v], i) => (
          <div key={i}>
            {edit ? (
              <>
                <Input
                  type={k}
                  label={k}
                  value={formState[k]}
                  onChange={({ target: { value } }) => {
                    setFormState(prev => ({
                      ...prev,
                      [k]: value
                    }));
                  }}
                />
              </>
            ) : (
              <>
                <strong>{k}:</strong> {v} <br/>
              </>
            )
            }
          </div>
        ))}
        {edit ? (
          <div style={{ width: "100%" }}>
            <div className={styles.buttonContainer}>
              <Button
                color="primary"
                onClick={(e) => {
                  setEdit(!edit)
                  handleSubmit(e)
                }}
              >
                Submit
              </Button>
              <Button
                variant="bordered"
                color="danger"
                onClick={() => {
                  setEdit(!edit)
                }}
              >
                Delete Song
              </Button>
            </div>
          </div>
        ) : (
          <Button
            color="primary"
            variant="bordered"
            onClick={() => {
              setEdit(!edit)
            }}
          >
            Edit Song
          </Button>
        )}
      </form>
    </>
  )
}

export default SongPage;

'use client'

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useCtx } from "@/components/Context";
import styles from './page.module.css';
import type { SongInfo } from "@/@types/Music";

const SongPage = ({ params }) => {
  const [edit, setEdit] = useState(false);
  const [state, dispatch] = useCtx() as any;
  const { music } = state;

  const song = params.song
    .replace("--"," -- ")
    .replaceAll("_"," ")
    .replaceAll("%3B",";")
    .replaceAll("%2C",",");

  const found = music.songs.find((s: SongInfo) => s.song === song);

  return (
    <>
      <h1 className='' style={{fontSize: "30px"}}>
        {found?.song}
      </h1>
      <br/>
      <form className={styles.formContainer + " " + (edit ? styles.editable + " flex w-full flex-wrap md:flex-nowrap gap-4" : "")}>
        {Object.entries(found?.songInfo || {}).map(([k,v], i) => (
          <div key={i}>
            { edit ? (
              <>
                <Input
                  type={k}
                  label={k}
                  value={v + ""}
                  onChange={(e) => console.log(e.target.value)}
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
